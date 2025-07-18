import type { ReactNode } from 'react';

type IAuthCenterLayoutProps = {
  children: ReactNode;
};

export default function AuthCenterLayout({ children }: IAuthCenterLayoutProps) {
  return <>{children}</>;
}
