import NextAuth from 'next-auth';
import { prisma } from './lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { authConfig } from './auth.config'; // <-- Import the config
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // <-- Spread the base config
  adapter: PrismaAdapter(prisma), // <-- Add the database adapter
  session: { strategy: 'database' },
});