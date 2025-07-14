import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/libs/prisma';

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
      async authorize(credentials) {
        console.error('===DEBUG ENV===', {
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
          NODE_ENV: process.env.NODE_ENV,
          ALL_ENV: Object.keys(process.env).filter(k => k.toLowerCase().includes('auth') || k.toLowerCase().includes('api') || k.toLowerCase().includes('base')),
        });
        if (!credentials) {
          return null;
        }
        console.error('authorize credentials:', credentials);
        // 兼容 email、username 字段
        const usernameOrEmail = credentials.usernameOrEmail?.trim() || '';
        const body = { usernameOrEmail, password: credentials.password };
        const fetchUrl = `${process.env.NEXTAUTH_URL}/api/login`;
        console.error('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
        console.error('fetchUrl:', fetchUrl);
        try {
          const res = await fetch(fetchUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          let result = null;
          try {
            result = await res.json();
          } catch (_e) {
            console.error('LOGIN API JSON PARSE ERROR:', _e);
          }
          console.error('LOGIN API RESULT:', res.status, result);
          if (res.ok && result && result.success && result.user) {
            return {
              id: result.user.id,
              username: result.user.username,
              email: result.user.email,
              image: result.user.image || null,
            };
          }
          return null;
        } catch (err) {
          console.error('LOGIN API FETCH ERROR:', err);
          return null;
        }
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
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        const u = user as any;
        token.id = u.id;
        token.username = u.username;
        token.email = u.email;
        token.image = u.image;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
          email: token.email,
          image: token.image,
        };
      }
      return session;
    },
  },
};
