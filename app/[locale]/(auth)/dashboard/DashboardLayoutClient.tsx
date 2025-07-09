'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default function DashboardLayoutClient(props: { children: React.ReactNode }) {
  return (
    <BaseTemplate
      leftNav={(
        <>
          <li>
            <Link
              href="/dashboard/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {/* Dashboard */}
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/user-profile/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {/* User Profile */}
              User Profile
            </Link>
          </li>
        </>
      )}
      rightNav={(
        <>
          <li>
            <button className="border-none text-gray-700 hover:text-gray-900" type="button" onClick={() => signOut()}>
              Sign out
            </button>
          </li>
          <li>
            <LocaleSwitcher />
          </li>
        </>
      )}
    >
      {props.children}
    </BaseTemplate>
  );
}
