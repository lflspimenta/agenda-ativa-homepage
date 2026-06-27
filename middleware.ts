import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.rewrite(
    new URL("/agenda-ativa-homepage-final.html", request.url)
  );
}

export const config = {
  matcher: ["/"]
};
