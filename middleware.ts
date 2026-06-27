import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.rewrite(
      new URL("/agenda-ativa-homepage-final.html", request.url)
    );
  }

  const isProtectedAgenda =
    pathname === "/agenda" ||
    pathname === "/agenda-wedding-final.html";

  const isProtectedImobiliario =
    pathname === "/imobiliario/agenda" ||
    pathname === "/agenda-imobiliario-final.html";

  const isProtected = isProtectedAgenda || isProtectedImobiliario;

  const response = NextResponse.next({
    request: { headers: request.headers }
  });

  if (!isProtected) return response;

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

  if (isProtectedAgenda) {
    if (!user?.email) {
      return NextResponse.redirect(new URL("/entrar", request.url));
    }

    const { data: buyer, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", user.email.toLowerCase())
      .maybeSingle();

    if (error || !buyer) {
      return NextResponse.redirect(new URL("/entrar?estado=sem_acesso", request.url));
    }

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
    if (!user?.email) {
      return NextResponse.redirect(new URL("/entrar", request.url));
    }

    const { data: buyer, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", user.email.toLowerCase())
      .maybeSingle();

    if (error || !buyer) {
      return NextResponse.redirect(new URL("/entrar?estado=sem_acesso", request.url));
    }

    if (pathname === "/agenda-imobiliario-final.html") {
      return NextResponse.redirect(new URL("/imobiliario/agenda", request.url));
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
  matcher: ["/", "/agenda/:path*", "/agenda-wedding-final.html", "/imobiliario/agenda/:path*", "/agenda-imobiliario-final.html"]
};
