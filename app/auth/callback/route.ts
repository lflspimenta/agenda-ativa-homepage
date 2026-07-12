import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const requestedNext = url.searchParams.get("next");
  const next =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/minha-agenda";
  const redirectUrl = new URL(next, url.origin);
  const errorUrl = new URL(
    next === "/minha-agenda" ? "/entrar?area=1&estado=erro" : "/entrar?estado=erro",
    url.origin
  );
  const supabase = createSupabaseServerClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(errorUrl);
    }

    return NextResponse.redirect(redirectUrl);
  }

  if (tokenHash) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type === "email" ? "email" : "magiclink"
    });

    if (error) {
      return NextResponse.redirect(errorUrl);
    }

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.redirect(errorUrl);
}
