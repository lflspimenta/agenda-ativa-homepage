import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { requiredEnv } from "@/lib/env";

export const runtime = "nodejs";

// Mapeamento Price ID → produto
// Adiciona aqui os Price IDs do Stripe de cada edição
const PRICE_PRODUCT_MAP: Record<string, string> = {
  // Wedding
  [process.env.STRIPE_PRICE_WEDDING ?? "price_wedding"]: "wedding",
  // Imobiliário
  [process.env.STRIPE_PRICE_IMOBILIARIO ?? "price_imobiliario"]: "imobiliario",
};

function getFirstName(name?: string | null) {
  return name?.trim().split(/\s+/)[0] || null;
}

function getProductFromSession(session: Stripe.Checkout.Session): string {
  // 1. Tentar via metadata (mais explícito)
  if (session.metadata?.product) {
    return session.metadata.product;
  }

  // 2. Tentar via line items / price id
  // (necessita de expand — ver nota abaixo)
  if (session.metadata?.price_id) {
    return PRICE_PRODUCT_MAP[session.metadata.price_id] ?? "wedding";
  }

  // 3. Fallback: wedding (compatibilidade com compras anteriores)
  return "wedding";
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
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      requiredEnv("STRIPE_WEBHOOK_SECRET")
    );
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
    const product = getProductFromSession(session);

    // Verificar se o utilizador já existe
    const { data: existing } = await admin
      .from("users")
      .select("email, products")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      // Utilizador existe — adicionar produto ao array se ainda não estiver
      const currentProducts: string[] = existing.products ?? [];
      if (!currentProducts.includes(product)) {
        await admin
          .from("users")
          .update({ products: [...currentProducts, product] })
          .eq("email", email);
      }
    } else {
      // Utilizador novo — criar registo
      await admin.from("users").insert({
        email,
        first_name: firstName,
        products: [product],
        purchase_date: purchaseDate,
      });
    }

    // Enviar magic link para acesso
    const redirectPath = product === "imobiliario"
      ? "/imobiliario/agenda"
      : "/agenda";

    const supabase = createClient(
      requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    );

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${requiredEnv("NEXT_PUBLIC_APP_URL")}/auth/callback?next=${redirectPath}`
      }
    });
  }

  return NextResponse.json({ received: true });
}
