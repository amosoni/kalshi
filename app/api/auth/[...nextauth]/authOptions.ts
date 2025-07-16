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
            let result: any = null;
            try {
              result = await res.json();
            } catch (_e) {
              console.error('LOGIN API JSON PARSE ERROR:', _e);
            }
            console.error('LOGIN API RESULT:', res.status, result);
            if (res.ok && result && result.success && result.user) {
              // 重新查库，确保 userObj 字段与 User 表完全一致
              const dbUser = await prisma.user.findUnique({ where: { id: result.user.id } });
              if (!dbUser) {
                console.error('authorize: user not found in db after login');
                return null;
              }
              const userObj = {
                id: dbUser.id,
                name: dbUser.username || dbUser.email || 'User',
                username: dbUser.username,
                email: dbUser.email,
                image: dbUser.image || null,
                emailVerified: dbUser.emailVerified || null,
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
    strategy: 'jwt' as const,
  },
  cookies: {
    sessionToken: {
      name: '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax' as const,
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      try {
        console.error('[NextAuth] signIn callback ===', { user, account, profile, email, credentials });

        // 如果是Google登录且是新用户，赠送免费积分
        if (account?.provider === 'google' && user?.id) {
          // 检查用户是否已有积分记录
          const existingPoints = await prisma.points.findUnique({
            where: { user_id: user.id },
          });
          // 如果没有积分记录，说明是新用户，赠送180积分（3分钟）
          if (!existingPoints) {
            console.warn(`[NextAuth] 新用户 ${user.email} 通过Google登录，赠送180积分（3分钟）`);
            await prisma.points.create({
              data: {
                user_id: user.id,
                balance: 180,
                total_earned: 180,
                total_spent: 0,
              },
            });
            await prisma.pointsLog.create({
              data: {
                user_id: user.id,
                type: 'earn',
                amount: 180,
                balance_after: 180,
                description: 'Google登录新用户赠送180积分（3分钟）',
              },
            });
          }
        }

        return true;
      } catch (e) {
        console.error('signIn callback error:', e);
        return false;
      }
    },
    async jwt({ token, user }: any) {
      try {
        if (user) {
          token.sub = user.id;
          token.username = user.username;
        }
        console.warn('=== [NextAuth] JWT callback ===', { token, user });
        return token;
      } catch (e) {
        console.error('JWT callback error:', e);
        throw e;
      }
    },
    async session({ session, token }: any) {
      try {
        if (token) {
          session.user = {
            id: token.sub,
            name: token.name || token.username,
            username: token.username,
            email: token.email,
            image: token.picture,
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
