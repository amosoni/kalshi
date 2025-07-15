import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        usernameOrEmail: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(_credentials) {
        // 临时写死 userObj，排查 session 写入问题
        return {
          id: 'testid',
          name: 'Test User',
          email: 'test@example.com',
          username: 'testuser',
          image: null,
          emailVerified: new Date(),
        };
      },
    }),
  ],
  session: {
    strategy: 'database' as const,
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax' as const,
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      if (user) {
        session.user = {
          id: user.id,
          name: user.name || user.username,
          username: user.username,
          email: user.email,
          image: user.image,
        };
        console.warn('=== [NextAuth] Session callback user ===', session.user);
      }
      console.warn('=== [NextAuth] Session callback return ===', session);
      return session;
    },
  },
};
