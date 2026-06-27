import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requiredEnv } from "@/lib/env";

export const runtime = "nodejs";

async function createCheckoutSession(email?: string) {
  const stripe = new Stripe(requiredEnv("STRIPE_SECRET_KEY"));
  const appUrl = requiredEnv("NEXT_PUBLIC_APP_URL");

  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price: requiredEnv("STRIPE_PRICE_ID"),
        quantity: 1
      }
    ],
    success_url: `${appUrl}/entrar?estado=enviado`,
    cancel_url: appUrl
  });
}

export async function GET() {
  const session = await createCheckoutSession();

  if (!session.url) {
    return NextResponse.redirect(requiredEnv("NEXT_PUBLIC_APP_URL"));
  }

  return NextResponse.redirect(session.url);
}

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({ email: undefined }));
  const session = await createCheckoutSession(email);

  return NextResponse.json({ url: session.url });
}
