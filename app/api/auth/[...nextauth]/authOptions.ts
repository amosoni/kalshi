import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'libs/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

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
        try {
          console.error('===DEBUG ENV===', {
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
            NODE_ENV: process.env.NODE_ENV,
            ALL_ENV: Object.keys(process.env).filter(k => k.toLowerCase().includes('auth') || k.toLowerCase().includes('api') || k.toLowerCase().includes('base')),
          });
          if (!_credentials) {
            return null;
          }
          console.error('authorize credentials:', _credentials);
          // 兼容 email、username 字段
          const usernameOrEmail = _credentials.usernameOrEmail?.trim() || '';
          const body = { usernameOrEmail, password: _credentials.password };
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
              const userObj = {
                id: String(result.user.id),
                name: String(result.user.username || result.user.email || 'User'), // 强制为字符串且有值
                username: result.user.username,
                email: result.user.email,
                image: result.user.image || null,
                emailVerified: result.user.emailVerified || new Date(),
              };
              console.error('authorize return:', userObj); // 关键日志
              return userObj;
            }
            return null;
          } catch (err) {
            console.error('LOGIN API FETCH ERROR:', err);
            return null;
          }
        } catch (e) {
          console.error('Authorize error:', e);
          throw e;
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
    async session({ session, user }: any) {
      try {
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
      } catch (e) {
        console.error('Session callback error:', e);
        throw e;
      }
    },
  },
  events: {
    createSession: (message: any) => {
      try {
        console.error('=== [NextAuth] createSession event ===', message);
      } catch (e) {
        console.error('createSession event error:', e);
      }
    },
    signIn: (message: any) => {
      try {
        console.error('=== [NextAuth] signIn event ===', message);
      } catch (e) {
        console.error('signIn event error:', e);
      }
    },
  },
};
