import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase-server";
import { requiredEnv } from "@/lib/env";
import { CONTENT_LIMIT_MAX, CONTENT_LIMIT_STEP, getProductAccessLimit } from "@/lib/stripe-entitlements";

export const runtime = "nodejs";

function stripeSecretKey() {
  return requiredEnv(
    process.env.VERCEL_ENV === "preview"
      ? "STRIPE_TEST_SECRET_KEY"
      : "STRIPE_SECRET_KEY"
  );
}

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const email = user.email.toLowerCase();
  const admin = createSupabaseAdminClient();
  const { data: buyer, error: buyerError } = await admin
    .from("users")
    .select("products")
    .eq("email", email)
    .maybeSingle();

  if (buyerError || !buyer) {
    return NextResponse.json({ error: "Access record not found" }, { status: 403 });
  }

  const currentLimit = getProductAccessLimit(buyer.products, "imobiliario");
  if (!currentLimit) {
    return NextResponse.json({ error: "Edition access required" }, { status: 403 });
  }
  if (currentLimit >= CONTENT_LIMIT_MAX) {
    return NextResponse.json({ error: "Edition already complete" }, { status: 409 });
  }

  const targetLimit = Math.min(currentLimit + CONTENT_LIMIT_STEP, CONTENT_LIMIT_MAX);
  const stripe = new Stripe(stripeSecretKey());
  const appUrl = new URL(request.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [{
      price: requiredEnv(
        process.env.VERCEL_ENV === "preview"
          ? "STRIPE_TEST_IMOBILIARIO_CONTINUATION_PRICE_ID"
          : "STRIPE_IMOBILIARIO_CONTINUATION_PRICE_ID"
      ),
      quantity: 1
    }],
    metadata: {
      product: "imobiliario",
      purchase_type: "continuation",
      target_limit: String(targetLimit)
    },
    success_url: `${appUrl}/imobiliario/agenda?dia=${targetLimit}`,
    cancel_url: `${appUrl}/imobiliario/agenda?dia=${currentLimit}`
  });

  if (!session.url) {
    return NextResponse.json({ error: "Checkout unavailable" }, { status: 502 });
  }

  return NextResponse.json({ url: session.url });
}
