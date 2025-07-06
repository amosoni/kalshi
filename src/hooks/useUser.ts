import { useUser as useClerkUser } from '@clerk/nextjs';

export function useUser() {
  const { user, isSignedIn } = useClerkUser();
  if (!isSignedIn || !user) {
    return null;
  }
  // 兼容原有supabase user结构，返回id和email
  return {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress || '',
    // 可按需扩展其它字段
  };
}
