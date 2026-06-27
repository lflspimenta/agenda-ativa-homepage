import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let authResponse = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          authResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            authResponse.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  await supabase.auth.getUser();

  let response = authResponse;
  if (request.nextUrl.pathname === "/imobiliario") {
    response = NextResponse.rewrite(
      new URL("/agenda-imobiliario-landing.html", request.url)
    );
  } else if (request.nextUrl.pathname === "/") {
    response = NextResponse.rewrite(
      new URL("/agenda-ativa-homepage-final.html", request.url)
    );
  }

  authResponse.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
  return response;
}

export const config = {
  matcher: [
    "/",
    "/imobiliario",
    "/minha-agenda/:path*",
    "/agenda/:path*",
    "/imobiliario/agenda/:path*"
  ]
};
