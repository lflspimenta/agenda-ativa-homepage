import { NextResponse } from "next/server";
import {
  createSupabaseAdminClient,
  createSupabaseServerClient
} from "@/lib/supabase-server";

const PRODUCT = "imobiliario";

async function getAuthorizedBuyer() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user?.email) return null;

  const email = user.email.toLowerCase();
  const admin = createSupabaseAdminClient();
  const { data: buyer, error: buyerError } = await admin
    .from("users")
    .select("products")
    .eq("email", email)
    .maybeSingle();

  if (
    buyerError ||
    !buyer ||
    !Array.isArray(buyer.products) ||
    !buyer.products.includes(PRODUCT)
  ) {
    return null;
  }

  return { admin, email };
}

function getDay(value: unknown) {
  const day = Number(value);
  return Number.isInteger(day) && day >= 1 && day <= 30 ? day : null;
}

async function getPayload(request: Request) {
  try {
    return (await request.json()) as { produto?: unknown; dia?: unknown };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const product = new URL(request.url).searchParams.get("produto");
  if (product !== PRODUCT) {
    return NextResponse.json({ error: "Produto inválido." }, { status: 400 });
  }

  const buyer = await getAuthorizedBuyer();
  if (!buyer) {
    return NextResponse.json({ error: "Sem acesso." }, { status: 401 });
  }

  const { data, error } = await buyer.admin
    .from("agenda_favorites")
    .select("day_number")
    .eq("email", buyer.email)
    .eq("product", PRODUCT)
    .order("day_number");

  if (error) {
    return NextResponse.json({ error: "Não foi possível carregar os favoritos." }, { status: 500 });
  }

  return NextResponse.json({ days: (data ?? []).map((favorite) => favorite.day_number) });
}

export async function POST(request: Request) {
  const payload = await getPayload(request);
  const day = getDay(payload?.dia);
  if (payload?.produto !== PRODUCT || !day) {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const buyer = await getAuthorizedBuyer();
  if (!buyer) {
    return NextResponse.json({ error: "Sem acesso." }, { status: 401 });
  }

  const { error } = await buyer.admin.from("agenda_favorites").upsert(
    { email: buyer.email, product: PRODUCT, day_number: day },
    { onConflict: "email,product,day_number" }
  );

  if (error) {
    return NextResponse.json({ error: "Não foi possível guardar o favorito." }, { status: 500 });
  }

  return NextResponse.json({ saved: true });
}

export async function DELETE(request: Request) {
  const payload = await getPayload(request);
  const day = getDay(payload?.dia);
  if (payload?.produto !== PRODUCT || !day) {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const buyer = await getAuthorizedBuyer();
  if (!buyer) {
    return NextResponse.json({ error: "Sem acesso." }, { status: 401 });
  }

  const { error } = await buyer.admin
    .from("agenda_favorites")
    .delete()
    .eq("email", buyer.email)
    .eq("product", PRODUCT)
    .eq("day_number", day);

  if (error) {
    return NextResponse.json({ error: "Não foi possível remover o favorito." }, { status: 500 });
  }

  return NextResponse.json({ removed: true });
}
