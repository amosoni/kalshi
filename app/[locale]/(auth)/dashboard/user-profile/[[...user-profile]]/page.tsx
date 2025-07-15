export function generateMetadata(_props: any) {
  return {
    title: 'User Profile',
    description: 'User profile page',
  };
}

export default function UserProfilePage(_props: any) {
  return (
    <div>
      <h1>User Profile Page</h1>
      <pre>{JSON.stringify(_props.params, null, 2)}</pre>
    </div>
  );
}
