type IUserProfilePageProps = {
  params: { 'locale': string; 'user-profile'?: string[] };
};

export function generateMetadata(_props: IUserProfilePageProps) {
  return {
    title: 'User Profile',
    description: 'User profile page',
  };
}

export default function UserProfilePage(props: IUserProfilePageProps) {
  return (
    <div>
      <h1>User Profile Page</h1>
      <pre>{JSON.stringify(props.params, null, 2)}</pre>
    </div>
  );
}
