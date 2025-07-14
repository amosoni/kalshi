import { Sponsors } from './Sponsors';

export const Hello = () => {
  return (
    <>
      <p>
        👋 Hello! Welcome to the dashboard.
      </p>
      <p>
        Check out our
        {' '}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://nextjs-boilerplate.com/pro-saas-starter-kit"
        >
          Next.js Boilerplate SaaS
        </a>
        {' '}
        for more features.
      </p>
      <Sponsors />
    </>
  );
};
