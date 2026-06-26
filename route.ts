import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { requiredEnv } from "@/lib/env";

export const runtime = "nodejs";

const PRICE_PRODUCT_MAP: Record<string, string> = {
  [process.env.STRIPE_PRICE_WEDDING ?? "price_wedding"]: "wedding",
  [process.env.STRIPE_PRICE_IMOBILIARIO ?? "price_imobiliario"]: "imobiliario",
};

function getFirstName(name?: string | null) {
  return name?.trim().split(/\s+/)[0] || null;
}

function getProductFromSession(session: Stripe.Checkout.Session): string {
  if (session.metadata?.product) return session.metadata.product;
  if (session.metadata?.price_id) return PRICE_PRODUCT_MAP[session.metadata.price_id] ?? "wedding";
  return "wedding";
}

export async function POST(request: Request) {
  const stripe = new Stripe(requiredEnv("STRIPE_SECRET_KEY"));
  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, requiredEnv("STRIPE_WEBHOOK_SECRET"));
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email?.toLowerCase();
    if (!email) return NextResponse.json({ received: true });

    const admin = createSupabaseAdminClient();
    const product = getProductFromSession(session);
    const firstName = getFirstName(session.customer_details?.name);

    const { data: existing } = await admin.from("users").select("email, products").eq("email", email).maybeSingle();

    if (existing) {
      const current: string[] = existing.products ?? [];
      if (!current.includes(product)) {
        await admin.from("users").update({ products: [...current, product] }).eq("email", email);
      }
    } else {
      await admin.from("users").insert({ email, first_name: firstName, products: [product], purchase_date: new Date().toISOString() });
    }

    const redirectPath = product === "imobiliario" ? "/imobiliario/agenda" : "/agenda";
    const supabase = createClient(requiredEnv("NEXT_PUBLIC_SUPABASE_URL"), requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"));
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${requiredEnv("NEXT_PUBLIC_APP_URL")}/auth/callback?next=${redirectPath}` } });
  }

  return NextResponse.json({ received: true });
}
