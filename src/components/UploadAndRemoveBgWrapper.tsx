'use client';
import { SessionProvider } from 'next-auth/react';
import UploadAndRemoveBg from './UploadAndRemoveBg';

// 复制 UploadAndRemoveBgProps 类型定义
export type UploadAndRemoveBgProps = {
  title?: string;
  glass?: boolean;
};

export default function UploadAndRemoveBgWrapper(props: UploadAndRemoveBgProps) {
  return (
    <SessionProvider>
      <UploadAndRemoveBg {...props} />
    </SessionProvider>
  );
}
