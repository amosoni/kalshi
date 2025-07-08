import { UserProfile } from '@clerk/nextjs';
import { setRequestLocale } from 'next-intl/server';
import { getI18nPath } from '@/utils/Helpers';

type IUserProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(_props: IUserProfilePageProps) {
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'UserProfile',
  // });

  return {
    title: 'User Profile', // Fallback title as namespace is commented out
  };
}

export default async function UserProfilePage(props: IUserProfilePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="my-6 -ml-16">
      <UserProfile
        path={getI18nPath('/dashboard/user-profile', locale)}
      />
    </div>
  );
};
