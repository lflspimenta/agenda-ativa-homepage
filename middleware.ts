import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let authResponse = NextResponse.next({ request });
  type CookieToSet = {
    name: string;
    value: string;
    options?: Parameters<typeof authResponse.cookies.set>[2];
  };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: CookieToSet[]) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            authResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              authResponse.cookies.set(name, value, options)
            );
          }
        }
      });

      await supabase.auth.getUser();
    } catch (error) {
      console.error("Unable to refresh Supabase session in middleware", error);
    }
  }

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

  authResponse.cookies.getAll().forEach(({ name, value }) => {
    response.cookies.set(name, value);
  });
  return response;
}

export const config = {
  matcher: [
    "/",
    "/imobiliario",
    "/minha-agenda/:path*",
    "/agenda/:path*",
    "/imobiliario/agenda/:path*",
    "/fotografos/agenda/:path*",
    "/estetica-facial/agenda/:path*",
    "/medicina-estetica/agenda/:path*",
    "/advogados/agenda/:path*",
    "/cabeleireiros/agenda/:path*",
    "/unhas/agenda/:path*"
  ]
};

