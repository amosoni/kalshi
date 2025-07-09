'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInButton() {
  const sessionData = useSession();
  const session = sessionData?.data;

  if (session) {
    return (
      <div>
        <span>
          Welcome,
          {session.user?.name || session.user?.email}
        </span>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn('google')}>Sign in with Google</button>
  );
}
