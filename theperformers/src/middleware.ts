import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Protect /admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!token || token.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // allow only logged in users
    },
  }
);

export const config = {
  matcher: [
    "/request-tickets",
    "/tickets",
    "/admin/:path*",
    "/profile/:path*",
  ],
};