export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/request-tickets",
        "/tickets",
        "/admin/:path*",
        "/profile/:path*",
    ],
};