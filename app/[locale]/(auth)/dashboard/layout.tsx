// 添加类型定义
import type { ReactNode } from 'react';

import DashboardLayoutClient from './DashboardLayoutClient';

type DashboardLayoutProps = {
  params: Promise<{ locale: string }>;
  children: ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  return <DashboardLayoutClient {...props} />;
}
