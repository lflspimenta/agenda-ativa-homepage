import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { requiredEnv } from "@/lib/env";

export const runtime = "nodejs";

type AgendaProduct =
  | "wedding"
  | "imobiliario"
  | "fotografos"
  | "estetica_facial"
  | "medicina_estetica"
  | "advogados"
  | "psicologos"
  | "cabeleireiros"
  | "unhas";

const paidProducts: AgendaProduct[] = [
  "imobiliario",
  "fotografos",
  "estetica_facial",
  "medicina_estetica",
  "advogados",
  "psicologos",
  "cabeleireiros",
  "unhas"
];

function getFirstName(name?: string | null) {
  return name?.trim().split(/\s+/)[0] || null;
}

async function getProductFromSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session
) {
  if (paidProducts.includes(session.metadata?.product as AgendaProduct)) {
    return session.metadata?.product as AgendaProduct;
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
    paidProducts.includes(product?.metadata?.product as AgendaProduct)
    ? (product?.metadata?.product as AgendaProduct)
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
    const product = await getProductFromSession(stripe, session);

    const { data: existing } = await admin
      .from("users")
      .select(
        "email, products, wedding_purchase_date, imobiliario_purchase_date, fotografos_purchase_date, estetica_facial_purchase_date, medicina_estetica_purchase_date, advogados_purchase_date, psicologos_purchase_date, cabeleireiros_purchase_date, unhas_purchase_date"
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
        medicina_estetica_purchase_date?: string;
        advogados_purchase_date?: string;
        psicologos_purchase_date?: string;
        cabeleireiros_purchase_date?: string;
        unhas_purchase_date?: string;
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
        product === "medicina_estetica" &&
        !existing.medicina_estetica_purchase_date
      ) {
        updates.medicina_estetica_purchase_date = purchaseDate;
      } else if (
        product === "advogados" &&
        !existing.advogados_purchase_date
      ) {
        updates.advogados_purchase_date = purchaseDate;
      } else if (
        product === "psicologos" &&
        !existing.psicologos_purchase_date
      ) {
        updates.psicologos_purchase_date = purchaseDate;
      } else if (
        product === "cabeleireiros" &&
        !existing.cabeleireiros_purchase_date
      ) {
        updates.cabeleireiros_purchase_date = purchaseDate;
      } else if (product === "unhas" && !existing.unhas_purchase_date) {
        updates.unhas_purchase_date = purchaseDate;
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
        medicina_estetica_purchase_date:
          product === "medicina_estetica" ? purchaseDate : null,
        advogados_purchase_date:
          product === "advogados" ? purchaseDate : null,
        psicologos_purchase_date:
          product === "psicologos" ? purchaseDate : null,
        cabeleireiros_purchase_date:
          product === "cabeleireiros" ? purchaseDate : null,
        unhas_purchase_date: product === "unhas" ? purchaseDate : null
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
                : product === "medicina_estetica"
                  ? "/medicina-estetica/agenda"
                  : product === "advogados"
                    ? "/advogados/agenda"
                    : product === "psicologos"
                      ? "/psicologos/agenda"
                  : product === "cabeleireiros"
                    ? "/cabeleireiros/agenda"
                    : product === "unhas"
                      ? "/unhas/agenda"
                      : "/agenda"
        }`
      }
    });
  }

  return NextResponse.json({ received: true });
}

