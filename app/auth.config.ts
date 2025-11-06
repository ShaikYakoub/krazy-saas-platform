import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [], // We will add providers (like Google/GitHub) later
  pages: {
    signIn: '/login', // A custom login page we'll create
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      return true;
    },
  },
} satisfies NextAuthConfig;