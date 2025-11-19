// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token as any;

    // 1) If not logged in at all, let "authorized" handle redirect to login
    if (!token) return NextResponse.next();

    const pathname = req.nextUrl.pathname;
    const backendToken = token.token; // backend JWT

    // If somehow logged in but missing backend JWT
    if (!backendToken) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    // ---------------------------------------------
    // NEW RULE: ADMIN CANNOT ACCESS /request-tickets
    // ---------------------------------------------
    if (pathname.startsWith("/request-tickets")) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${backendToken}`,
            },
          }
        );

        if (!res.ok) {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        const json = await res.json();
        const role = json?.data?.role;

        if (role === "admin") {
          // Admins not allowed here
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
      } catch (err) {
        console.error("Error checking role for request-tickets:", err);
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // ---------------------------------------------
    // ADMIN CHECK FOR /admin ROUTES
    // ---------------------------------------------
    if (pathname.startsWith("/admin")) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${backendToken}`,
            },
          }
        );

        if (!res.ok) {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        const json = await res.json();
        const role = json?.data?.role;

        if (role !== "admin") {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        return NextResponse.next(); // allow admin
      } catch (err) {
        console.error("Error checking admin in middleware:", err);
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // Everything else allowed if logged in
    return NextResponse.next();
  },
  {
    callbacks: {
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