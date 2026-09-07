import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requiredEnv } from "@/lib/env";

export const runtime = "nodejs";

const entryPlans = {
  30: 9700,
  120: 22700,
  360: 39700
} as const;

type EntryLimit = keyof typeof entryPlans;

function isEntryLimit(value: number): value is EntryLimit {
  return value === 30 || value === 120 || value === 360;
}

function stripeSecretKey() {
  return requiredEnv(
    process.env.VERCEL_ENV === "preview"
      ? "STRIPE_TEST_SECRET_KEY"
      : "STRIPE_SECRET_KEY"
  );
}

async function createCheckoutSession(request: Request, limit: EntryLimit, email?: string) {
  const stripe = new Stripe(stripeSecretKey());
  const appUrl = new URL(request.url).origin;

  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email?.trim().toLowerCase() || undefined,
    line_items: [{
      price_data: {
        currency: "eur",
        unit_amount: entryPlans[limit],
        product_data: {
          name: `Agenda Ativa™ Imobiliário — ${limit} conteúdos`,
          metadata: { product: "imobiliario", target_limit: String(limit) }
        }
      },
      quantity: 1
    }],
    metadata: {
      product: "imobiliario",
      purchase_type: "initial",
      target_limit: String(limit)
    },
    success_url: `${appUrl}/entrar?estado=enviado`,
    cancel_url: appUrl
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("plano"));
  const email = url.searchParams.get("email") || undefined;

  if (!isEntryLimit(limit)) {
    return NextResponse.json({ error: "Invalid entry plan" }, { status: 400 });
  }

  const session = await createCheckoutSession(request, limit, email);
  return session.url
    ? NextResponse.redirect(session.url)
    : NextResponse.json({ error: "Checkout unavailable" }, { status: 502 });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const limit = Number(body?.plano);

  if (!isEntryLimit(limit)) {
    return NextResponse.json({ error: "Invalid entry plan" }, { status: 400 });
  }

  const session = await createCheckoutSession(
    request,
    limit,
    typeof body?.email === "string" ? body.email : undefined
  );

  return NextResponse.json({ url: session.url });
}
