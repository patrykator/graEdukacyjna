import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/quiz/:path*", "/results/:path*", "/api/((?!auth).*)"],
};
