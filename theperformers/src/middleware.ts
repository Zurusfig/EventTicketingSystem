// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token as any;

    // 1) If not logged in at all, let "authorized" callback handle it
    if (!token) return NextResponse.next();

    const pathname = req.nextUrl.pathname;

    // 2) Only do admin check for /admin routes
    if (pathname.startsWith("/admin")) {
      const backendToken = token.token;   // <-- backend JWT we stored from login

      if (!backendToken) {
        // Logged in to NextAuth but no backend token -> force login again
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
      }

      try {
        // Call backend /auth/me to ask: "who is this user?"
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${backendToken}`,
            },
          }
        );

        if (!res.ok) {
          // token invalid/expired -> treat as unauthorized
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        const json = await res.json();
        const role = json?.data?.role;

        // 3) Only allow admins
        if (role !== "admin") {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        // if role is admin -> allow through
        return NextResponse.next();
      } catch (err) {
        console.error("Error checking admin in middleware:", err);
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // 4) For non-admin routes just continue
    return NextResponse.next();
  },
  {
    callbacks: {
      // "authorized" just checks that there *is* a NextAuth token.
      // The admin role check is handled above.
      authorized: ({ token }) => !!token,
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