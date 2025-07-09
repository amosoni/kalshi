import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
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
        if (!credentials) {
          return null;
        }
        // 调用本地 API
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usernameOrEmail: credentials.usernameOrEmail,
            password: credentials.password,
          }),
        });
        const user = await res.json();
        if (res.ok && user && !user.error) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
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
        (session.user as any) = {
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
