import Image from 'next/image';
// import { Suspense } from 'react';
import { CounterForm } from '@/components/CounterForm';
import { CurrentCount } from '@/components/CurrentCount';

export function generateMetadata(_props: any) {
  return {
    title: 'Counter',
    description: 'Counter page',
  };
}

export default function Counter() {
  return (
    <>
      <CounterForm />

      <div className="mt-3">
        {/* 直接渲染 CurrentCount，不要用 Suspense 包裹 */}
        <CurrentCount />
      </div>

      <div className="mt-5 text-center text-sm">
        Security, bot detection and rate limiting powered by
        {' '}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://launch.arcjet.com/Q6eLbRE"
        >
          Arcjet
        </a>
      </div>

      <a
        href="https://launch.arcjet.com/Q6eLbRE"
      >
        <Image
          className="mx-auto mt-2"
          src="/assets/images/arcjet-light.svg"
          alt="Arcjet"
          width={128}
          height={38}
        />
      </a>
    </>
  );
};
