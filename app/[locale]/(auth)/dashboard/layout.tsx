// 添加类型定义
import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';

import DashboardLayoutClient from './DashboardLayoutClient';

type DashboardLayoutProps = {
  params: { locale: string };
  children: ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
  const { locale } = props.params;
  setRequestLocale(locale);

  return <DashboardLayoutClient {...props} />;
}
