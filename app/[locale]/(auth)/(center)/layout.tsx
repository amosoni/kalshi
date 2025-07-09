import type { ReactNode } from 'react';

type IAuthCenterLayoutProps = {
  children: ReactNode;
};

export default async function AuthCenterLayout({ children }: IAuthCenterLayoutProps) {
  return <>{children}</>;
}
