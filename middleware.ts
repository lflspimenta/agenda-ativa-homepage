import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(
      new URL("/agenda-ativa-homepage-final.html", request.url)
    );
  }

  const isProtectedAgenda =
    request.nextUrl.pathname === "/agenda" ||
    request.nextUrl.pathname === "/agenda-wedding-final.html";

  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
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

  if (isProtectedAgenda && !user?.email) {
    return NextResponse.redirect(new URL("/entrar", request.url));
  }

  if (isProtectedAgenda && user?.email) {
    const { data: buyer, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", user.email.toLowerCase())
      .maybeSingle();

    if (error || !buyer) {
      return NextResponse.redirect(
        new URL("/entrar?estado=sem_acesso", request.url)
      );
    }

    if (request.nextUrl.pathname === "/agenda-wedding-final.html") {
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

  return response;
}

export const config = {
  matcher: ["/", "/agenda/:path*", "/agenda-wedding-final.html"]
};
