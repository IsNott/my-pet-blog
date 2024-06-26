import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/log",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/plog");
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/plog", nextUrl));
      }
      return true;
    },
    session(params) {
      return {
        ...params.token,
        ...params.session,
        user: {
          ...params.session.user,
          id: params.session.user.id as string,
        },
        status: "cool",
      };
    },
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
