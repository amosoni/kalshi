import { SignUp } from '@clerk/nextjs';
import { setRequestLocale } from 'next-intl/server';
import { getI18nPath } from '@/utils/Helpers';

type ISignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(_props: ISignUpPageProps) {
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'SignUp',
  // });

  return {
    title: 'SignUp',
    description: 'SignUp',
  };
}

export default async function SignUpPage(props: ISignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <SignUp path={getI18nPath('/sign-up', locale)} />
  );
};
