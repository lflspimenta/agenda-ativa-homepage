import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/imobiliario") {
    return NextResponse.rewrite(
      new URL("/agenda-imobiliario-landing.html", request.url)
    );
  }

  return NextResponse.rewrite(
    new URL("/agenda-ativa-homepage-final.html", request.url)
  );
}

export const config = {
  matcher: ["/", "/imobiliario"]
};
