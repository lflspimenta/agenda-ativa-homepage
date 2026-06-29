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
  if (["imobiliario", "fotografos", "estetica_facial", "cabeleireiros"].includes(session.metadata?.product ?? "")) {
    return session.metadata?.product as "imobiliario" | "fotografos" | "estetica_facial" | "cabeleireiros";
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
    ["imobiliario", "fotografos", "estetica_facial", "cabeleireiros"].includes(product?.metadata?.product ?? "")
    ? (product?.metadata?.product as "imobiliario" | "fotografos" | "estetica_facial" | "cabeleireiros")
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
      .select(
        "email, products, wedding_purchase_date, imobiliario_purchase_date, fotografos_purchase_date, estetica_facial_purchase_date, cabeleireiros_purchase_date"
      )
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      const products: string[] = Array.isArray(existing.products)
        ? existing.products
        : ["wedding"];
      const updates: {
        products?: string[];
        wedding_purchase_date?: string;
        imobiliario_purchase_date?: string;
        fotografos_purchase_date?: string;
        estetica_facial_purchase_date?: string;
        cabeleireiros_purchase_date?: string;
      } = {};

      if (!products.includes(product)) {
        updates.products = [...products, product];
      }

      if (product === "imobiliario" && !existing.imobiliario_purchase_date) {
        updates.imobiliario_purchase_date = purchaseDate;
      } else if (product === "fotografos" && !existing.fotografos_purchase_date) {
        updates.fotografos_purchase_date = purchaseDate;
      } else if (
        product === "estetica_facial" &&
        !existing.estetica_facial_purchase_date
      ) {
        updates.estetica_facial_purchase_date = purchaseDate;
      } else if (
        product === "cabeleireiros" &&
        !existing.cabeleireiros_purchase_date
      ) {
        updates.cabeleireiros_purchase_date = purchaseDate;
      } else if (product === "wedding" && !existing.wedding_purchase_date) {
        updates.wedding_purchase_date = purchaseDate;
      }

      if (Object.keys(updates).length > 0) {
        await admin.from("users").update(updates).eq("email", email);
      }
    } else {
      await admin.from("users").insert({
        email,
        first_name: firstName,
        purchase_date: purchaseDate,
        products: [product],
        wedding_purchase_date: product === "wedding" ? purchaseDate : null,
        imobiliario_purchase_date:
          product === "imobiliario" ? purchaseDate : null,
        fotografos_purchase_date:
          product === "fotografos" ? purchaseDate : null,
        estetica_facial_purchase_date:
          product === "estetica_facial" ? purchaseDate : null,
        cabeleireiros_purchase_date:
          product === "cabeleireiros" ? purchaseDate : null
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
          product === "imobiliario"
            ? "/imobiliario/agenda"
            : product === "fotografos"
              ? "/fotografos/agenda"
              : product === "estetica_facial"
                ? "/estetica-facial/agenda"
                : product === "cabeleireiros"
                  ? "/cabeleireiros/agenda"
                  : "/agenda"
        }`
      }
    });
  }

  return NextResponse.json({ received: true });
}

