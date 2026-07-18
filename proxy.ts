import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (
    pathname === "/" ||
    pathname === "/success" ||
    pathname === "/mentions-legales" ||
    pathname === "/confidentialite" ||
    pathname === "/contact" ||
    pathname === "/fondateur" ||
    pathname === "/prevente" ||
    pathname === "/retractation" ||
    pathname === "/cgv" ||
    pathname === "/livre-audio" ||
    pathname.startsWith("/api/prevente") ||
    pathname.startsWith("/api/retractation") ||
    pathname.startsWith("/api/waitlist") ||
    pathname.startsWith("/api/checkout") ||
    pathname.startsWith("/api/stripe/") ||
    pathname.startsWith("/api/register-fondateur") ||
    pathname.startsWith("/api/webhook") ||
    pathname.startsWith("/api/cron/")
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo-kunuz-adin\\.png|images/|extraits/).*)",
  ],
};
