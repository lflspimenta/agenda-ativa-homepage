import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  createSupabaseAdminClient,
  createSupabaseServerClient
} from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[character]!
  );
}

function getAgendaDay(purchaseDate?: string | null) {
  if (!purchaseDate) return 1;

  const purchasedAt = new Date(purchaseDate).getTime();
  if (Number.isNaN(purchasedAt)) return 1;

  const elapsedDays = Math.floor((Date.now() - purchasedAt) / 86_400_000);
  return Math.min(30, Math.max(1, elapsedDays + 1));
}

export async function GET(request: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    return NextResponse.redirect(new URL("/entrar?produto=unhas", request.url));
  }

  const admin = createSupabaseAdminClient();
  const { data: buyer, error: buyerError } = await admin
    .from("users")
    .select("first_name, products, unhas_purchase_date")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  if (
    buyerError ||
    !buyer ||
    !Array.isArray(buyer.products) ||
    !buyer.products.includes("unhas")
  ) {
    return NextResponse.redirect(
      new URL("/entrar?estado=sem_acesso&produto=unhas", request.url)
    );
  }

  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "agenda-unhas-final.html"),
    "utf8"
  );
  const firstName = buyer.first_name?.trim();
  const greeting = firstName ? `Olá, ${escapeHtml(firstName)}` : "Olá";
  const agendaDay = getAgendaDay(buyer.unhas_purchase_date);
  const html = htmlTemplate
    .replace("Olá, Ana", greeting)
    .replace("Olá, Luís", greeting)
    .replace("Olá, Sofia", greeting)
    .replace(
      "<div class=\"greeting-name\">Olá</div>",
      `<div class=\"greeting-name\">${greeting}</div>`
    )
    .replace("renderDay(1);", `renderDay(${agendaDay});`);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}
