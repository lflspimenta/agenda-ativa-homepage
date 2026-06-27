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

export async function GET(request: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    return NextResponse.redirect(
      new URL("/entrar?produto=imobiliario", request.url)
    );
  }

  const admin = createSupabaseAdminClient();
  const { data: buyer, error: buyerError } = await admin
    .from("users")
    .select("first_name, products")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  if (
    buyerError ||
    !buyer ||
    !Array.isArray(buyer.products) ||
    !buyer.products.includes("imobiliario")
  ) {
    return NextResponse.redirect(
      new URL("/entrar?estado=sem_acesso&produto=imobiliario", request.url)
    );
  }

  const htmlTemplate = await readFile(
    path.join(process.cwd(), "private", "agenda-imobiliario-final.html"),
    "utf8"
  );
  const firstName = buyer.first_name?.trim();
  const greeting = firstName ? `Olá, ${escapeHtml(firstName)}` : "Olá";
  const html = htmlTemplate.replace("Olá, Luís", greeting);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}
