import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { requiredEnv } from "@/lib/env";

export const runtime = "nodejs";

function getFirstName(name?: string | null) {
  return name?.trim().split(/\s+/)[0] || null;
}

async function getProductFromSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session
) {
  if (session.metadata?.product === "imobiliario") {
    return "imobiliario";
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 1,
    expand: ["data.price.product"]
  });
  const product = lineItems.data[0]?.price?.product as
    | Stripe.Product
    | string
    | null
    | undefined;

  return typeof product !== "string" &&
    product?.metadata?.product === "imobiliario"
    ? "imobiliario"
    : "wedding";
}

export async function POST(request: Request) {
  const stripe = new Stripe(requiredEnv("STRIPE_SECRET_KEY"));
  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, requiredEnv("STRIPE_WEBHOOK_SECRET"));
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email?.toLowerCase();

    if (!email) {
      return NextResponse.json({ received: true });
    }

    const admin = createSupabaseAdminClient();
    const purchaseDate = new Date().toISOString();
    const firstName = getFirstName(session.customer_details?.name);
    const product = await getProductFromSession(stripe, session);

    const { data: existing } = await admin
      .from("users")
      .select("email, products")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      const products: string[] = Array.isArray(existing.products)
        ? existing.products
        : ["wedding"];

      if (!products.includes(product)) {
        await admin
          .from("users")
          .update({ products: [...products, product] })
          .eq("email", email);
      }
    } else {
      await admin.from("users").insert({
        email,
        first_name: firstName,
        purchase_date: purchaseDate,
        products: [product]
      });
    }

    const supabase = createClient(
      requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    );

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${requiredEnv("NEXT_PUBLIC_APP_URL")}/auth/callback?next=${
          product === "imobiliario" ? "/imobiliario/agenda" : "/agenda"
        }`
      }
    });
  }

  return NextResponse.json({ received: true });
}
