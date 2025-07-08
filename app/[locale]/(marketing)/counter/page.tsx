import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Suspense } from 'react';
import { CounterForm } from '@/components/CounterForm';
import { CurrentCount } from '@/components/CurrentCount';

export async function generateMetadata(_props: {
  params: Promise<{ locale: string }>;
}) {
  // const { locale } = await props.params;
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Counter',
  // });

  return {
    title: 'Counter', // Placeholder, as namespace fallback is commented out
    description: 'Counter description', // Placeholder, as namespace fallback is commented out
  };
}

export default function Counter() {
  const t = useTranslations('Counter');

  return (
    <>
      <CounterForm />

      <div className="mt-3">
        <Suspense fallback={<p>{t('loading_counter')}</p>}>
          <CurrentCount />
        </Suspense>
      </div>

      <div className="mt-5 text-center text-sm">
        {`${t('security_powered_by')} `}
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
