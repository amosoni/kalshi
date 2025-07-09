import type { ReactNode } from 'react';

type IAuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: IAuthLayoutProps) {
  return <>{children}</>;
}
