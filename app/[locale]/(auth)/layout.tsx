import { setRequestLocale } from 'next-intl/server';

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  // 保留本地化参数逻辑（如有需要可通过context传递给子组件）
  // const clerkLocale = ClerkLocalizations.supportedLocales[locale] ?? ClerkLocalizations.defaultLocale;
  // let signInUrl = '/sign-in';
  // let signUpUrl = '/sign-up';
  // let dashboardUrl = '/dashboard';
  // let afterSignOutUrl = '/';
  // if (locale !== routing.defaultLocale) {
  //   signInUrl = `/${locale}${signInUrl}`;
  //   signUpUrl = `/${locale}${signUpUrl}`;
  //   dashboardUrl = `/${locale}${dashboardUrl}`;
  //   afterSignOutUrl = `/${locale}${afterSignOutUrl}`;
  // }

  return props.children;
}
