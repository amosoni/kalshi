type IUserProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function UserProfilePage({ params: _params }: IUserProfilePageProps) {
  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
}
