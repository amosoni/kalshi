import { useSession } from 'next-auth/react';

export function useUser() {
  const sessionData = useSession();
  const session = sessionData?.data;
  if (!session || !session.user) {
    return null;
  }
  return {
    id: (session.user as any).id,
    email: session.user.email || '',
  };
}
