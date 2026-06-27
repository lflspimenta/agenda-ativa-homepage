import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { requiredEnv } from "@/lib/env";

export const runtime = "nodejs";

function getFirstName(name?: string | null) {
  return name?.trim().split(/\s+/)[0] || null;
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

    await admin
      .from("users")
      .upsert(
        {
          email,
          first_name: firstName,
          purchase_date: purchaseDate
        },
        { onConflict: "email" }
      );

    const supabase = createClient(
      requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    );

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${requiredEnv("NEXT_PUBLIC_APP_URL")}/auth/callback`
      }
    });
  }

  return NextResponse.json({ received: true });
}
