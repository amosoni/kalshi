import Image from 'next/image';

type IPortfolioDetailProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  return Array.from({ length: 6 }, (_, i) => ({
    slug: `${i}`,
    locale: 'en',
  }));
}

export function generateMetadata(_props: IPortfolioDetailProps) {
  return {
    title: 'Portfolio Detail',
    description: 'Portfolio detail page',
  };
}

export default function PortfolioDetail(props: IPortfolioDetailProps) {
  return (
    <>
      <h1 className="capitalize">Portfolio Detail</h1>
      <p>This is the portfolio detail content.</p>

      <div className="mt-5 text-center text-sm">
        Code review powered by
        {' '}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025"
        >
          CodeRabbit
        </a>
      </div>

      <a
        href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025"
      >
        <Image
          className="mx-auto mt-2"
          src="/assets/images/coderabbit-logo-light.svg"
          alt="CodeRabbit"
          width={128}
          height={22}
        />
      </a>
    </>
  );
}

export const dynamicParams = false;
