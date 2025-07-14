type IUserProfilePageProps = {
  params: Promise<{ 'locale': string; 'user-profile': string[] }>;
};

export function generateMetadata(_props: IUserProfilePageProps) {
  return {
    title: 'User Profile',
    description: 'User profile page',
  };
}

export default function UserProfilePage() {
  return (
    <div className="py-5 [&_p]:my-6">
      <p>User Profile Page</p>
    </div>
  );
}
