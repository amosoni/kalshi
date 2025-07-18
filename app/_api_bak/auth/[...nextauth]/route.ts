import NextAuth from 'next-auth';
import { authOptions } from './authOptions';

console.error('=== NEXTAUTH ROUTE HIT ===');

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
