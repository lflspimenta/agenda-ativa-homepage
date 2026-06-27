import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Homepage ───────────────────────────────────────────────
  if (pathname === "/") {
    return NextResponse.rewrite(
      new URL("/agenda-ativa-homepage-final.html", request.url)
    );
  }

  // ─── Landing Imobiliário (pública) ──────────────────────────
  if (pathname === "/imobiliario") {
    return NextResponse.rewrite(
      new URL("/agenda-imobiliario-landing.html", request.url)
    );
  }

  // ─── Rotas protegidas ────────────────────────────────────────
  const isProtectedWedding =
    pathname === "/agenda" ||
    pathname === "/agenda-wedding-final.html";

  const isProtectedImobiliario =
    pathname === "/imobiliario/agenda" ||
    pathname === "/agenda-imobiliario-final.html";

  const isProtected = isProtectedWedding || isProtectedImobiliario;

  if (!isProtected) return NextResponse.next();

  // ─── Verificar sessão Supabase ───────────────────────────────
  const response = NextResponse.next({
    request: { headers: request.headers }
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: Parameters<typeof response.cookies.set>[2];
          }[]
        ) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  // Sem sessão → login
  if (!user?.email) {
    return NextResponse.redirect(new URL("/entrar", request.url));
  }

  // ─── Verificar acesso na tabela users ────────────────────────
  if (isProtectedWedding) {
    const { data: buyer, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", user.email.toLowerCase())
      .contains("products", ["wedding"])
      .maybeSingle();

    if (error || !buyer) {
      return NextResponse.redirect(
        new URL("/entrar?estado=sem_acesso", request.url)
      );
    }

    // Evitar loop — se já está na rota canónica, rewrite directo
    if (pathname === "/agenda-wedding-final.html") {
      return NextResponse.redirect(new URL("/agenda", request.url));
    }

    const rewrite = NextResponse.rewrite(
      new URL("/agenda-wedding-final.html", request.url)
    );
    response.cookies.getAll().forEach((cookie) => {
      rewrite.cookies.set(cookie);
    });
    return rewrite;
  }

  if (isProtectedImobiliario) {
    const { data: buyer, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", user.email.toLowerCase())
      .contains("products", ["imobiliario"])
      .maybeSingle();

    if (error || !buyer) {
      return NextResponse.redirect(
        new URL("/entrar?estado=sem_acesso", request.url)
      );
    }

    if (pathname === "/agenda-imobiliario-final.html") {
      return NextResponse.redirect(
        new URL("/imobiliario/agenda", request.url)
      );
    }

    const rewrite = NextResponse.rewrite(
      new URL("/agenda-imobiliario-final.html", request.url)
    );
    response.cookies.getAll().forEach((cookie) => {
      rewrite.cookies.set(cookie);
    });
    return rewrite;
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/imobiliario",
    "/imobiliario/:path*",
    "/agenda/:path*",
    "/agenda-wedding-final.html",
    "/agenda-imobiliario-final.html"
  ]
};
