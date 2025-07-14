'use client';

import type { ReactNode } from 'react';

type IBaseTemplateProps = {
  leftNav: ReactNode;
  rightNav?: ReactNode;
  children: ReactNode;
};

const BaseTemplate = ({ leftNav, rightNav, children }: IBaseTemplateProps) => {
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <div className="mx-auto max-w-screen-md">
        <header className="border-b border-gray-300">
          <div className="pb-8 pt-16">
            <h1 className="text-3xl font-bold text-gray-900">
              Next.js Boilerplate
            </h1>
            <h2 className="text-xl">Starter code for your Nextjs Boilerplate with Tailwind CSS</h2>
          </div>

          <div className="flex justify-between">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {leftNav}
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {rightNav}
              </ul>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-gray-300 py-8 text-center text-sm">
          © Copyright
          {' '}
          {new Date().getFullYear()}
          {' '}
          Next.js Boilerplate. Made with
          {' '}
          <a
            href="https://creativedesignsguru.com"
            className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          >
            CreativeDesignsGuru
          </a>
        </footer>
      </div>
    </div>
  );
};

export { BaseTemplate };
export type { IBaseTemplateProps };
