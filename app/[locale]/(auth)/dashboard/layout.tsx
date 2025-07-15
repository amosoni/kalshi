// 添加类型定义
import type { ReactNode } from 'react';

import DashboardLayoutClient from './DashboardLayoutClient';

type DashboardLayoutProps = {
  params: { locale: string };
  children: ReactNode;
};

export default function DashboardLayout(props: DashboardLayoutProps) {
  return <DashboardLayoutClient {...props} />;
}
