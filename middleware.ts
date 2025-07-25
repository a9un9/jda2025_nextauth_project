import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  // Halaman yang tidak butuh autentikasi
  const publicPaths = ["/", "/login", "/register", "/verify-otp", "/request-otp"];

  if (!isAuth && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuth && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/", "/login", "/register", "/verify-otp", "/request-otp"],
};
