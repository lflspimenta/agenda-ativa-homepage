import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  createSupabaseAdminClient,
  createSupabaseServerClient
} from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user?.email) {
    return NextResponse.redirect(new URL("/entrar", request.url));
  }

  const admin = createSupabaseAdminClient();
  const { data: buyer, error: buyerError } = await admin
    .from("users")
    .select("products")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  if (
    buyerError ||
    !buyer ||
    !Array.isArray(buyer.products) ||
    !buyer.products.includes("wedding")
  ) {
    return NextResponse.redirect(
      new URL("/entrar?estado=sem_acesso", request.url)
    );
  }

  const html = await readFile(
    path.join(process.cwd(), "private", "agenda-wedding-final.html"),
    "utf8"
  );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}
