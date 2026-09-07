import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requiredEnv } from "@/lib/env";
import { getCommerceEdition } from "@/lib/commerce-editions";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase-server";
import { CONTENT_LIMIT_MAX, CONTENT_LIMIT_STEP, getProductAccessLimit } from "@/lib/stripe-entitlements";
export const runtime = "nodejs";
export async function POST(request: Request, { params }: { params: { edition: string } }) {
  const edition = getCommerceEdition(params.edition);
  if (!edition) return NextResponse.json({ error: "Invalid edition" }, { status: 400 });
  const supabase = createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user?.email) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const email = user.email.toLowerCase();
  const admin = createSupabaseAdminClient();
  const { data: buyer, error } = await admin.from("users").select("products").eq("email", email).maybeSingle();
  if (error || !buyer) return NextResponse.json({ error: "Access record not found" }, { status: 403 });
  const currentLimit = getProductAccessLimit(buyer.products, edition.product);
  if (!currentLimit) return NextResponse.json({ error: "Edition access required" }, { status: 403 });
  if (currentLimit >= CONTENT_LIMIT_MAX) return NextResponse.json({ error: "Edition already complete" }, { status: 409 });
  const targetLimit = Math.min(currentLimit + CONTENT_LIMIT_STEP, CONTENT_LIMIT_MAX);
  const stripe = new Stripe(requiredEnv(process.env.VERCEL_ENV === "preview" ? "STRIPE_TEST_SECRET_KEY" : "STRIPE_SECRET_KEY"));
  const appUrl = new URL(request.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment", customer_email: email,
    line_items: [{ price_data: { currency: "eur", unit_amount: 6700, product_data: { name: `Agenda Ativa™ ${edition.name} — conteúdos ${currentLimit + 1}–${targetLimit}` } }, quantity: 1 }],
    metadata: { product: edition.product, purchase_type: "continuation", target_limit: String(targetLimit) },
    success_url: `${appUrl}${edition.agendaPath}?dia=${targetLimit}`, cancel_url: `${appUrl}${edition.agendaPath}?dia=${currentLimit}`
  });
  return session.url ? NextResponse.json({ url: session.url }) : NextResponse.json({ error: "Checkout unavailable" }, { status: 502 });
}
