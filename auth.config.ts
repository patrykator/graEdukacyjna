import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ID,
      clientSecret: process.env.AUTH_MICROSOFT_SECRET,
      issuer: `https://login.microsoftonline.com/${
        process.env.AUTH_MICROSOFT_TENANT_ID ?? "common"
      }/v2.0`,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedDomain = process.env.ALLOWED_DOMAIN;

      if (!allowedDomain) {
        console.error("Missing ALLOWED_DOMAIN environment variable");
        return false;
      }

      if (user.email && !user.email.endsWith(allowedDomain)) {
        return false;
      }
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
} satisfies NextAuthConfig;
