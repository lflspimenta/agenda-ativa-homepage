import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requiredEnv } from "@/lib/env";
import { entryPlanAmounts, getCommerceEdition, isEntryPlanLimit } from "@/lib/commerce-editions";
export const runtime = "nodejs";
function stripeSecretKey() { return requiredEnv(process.env.VERCEL_ENV === "preview" ? "STRIPE_TEST_SECRET_KEY" : "STRIPE_SECRET_KEY"); }
async function checkout(request: Request, editionSlug: string, limit: number, email?: string) {
  const edition = getCommerceEdition(editionSlug);
  if (!edition || !isEntryPlanLimit(limit)) return null;
  const stripe = new Stripe(stripeSecretKey());
  const appUrl = new URL(request.url).origin;
  return stripe.checkout.sessions.create({
    mode: "payment", customer_email: email?.trim().toLowerCase() || undefined,
    line_items: [{ price_data: { currency: "eur", unit_amount: entryPlanAmounts[limit], product_data: { name: `Agenda Ativa™ ${edition.name} — ${limit} conteúdos` } }, quantity: 1 }],
    metadata: { product: edition.product, purchase_type: "initial", target_limit: String(limit) },
    success_url: `${appUrl}/entrar?estado=enviado`, cancel_url: `${appUrl}/${editionSlug}`
  });
}
export async function GET(request: Request, { params }: { params: { edition: string } }) {
  const url = new URL(request.url);
  const session = await checkout(request, params.edition, Number(url.searchParams.get("plano")), url.searchParams.get("email") || undefined);
  if (!session) return NextResponse.json({ error: "Invalid edition or plan" }, { status: 400 });
  return session.url ? NextResponse.redirect(session.url) : NextResponse.json({ error: "Checkout unavailable" }, { status: 502 });
}
export async function POST(request: Request, { params }: { params: { edition: string } }) {
  const body = await request.json().catch(() => ({}));
  const session = await checkout(request, params.edition, Number(body?.plano), typeof body?.email === "string" ? body.email : undefined);
  if (!session) return NextResponse.json({ error: "Invalid edition or plan" }, { status: 400 });
  return NextResponse.json({ url: session.url });
}
