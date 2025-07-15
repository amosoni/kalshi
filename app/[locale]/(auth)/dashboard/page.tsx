import { Hello } from '@/components/Hello';

export function generateMetadata(_props: any) {
  return {
    title: 'Dashboard',
    description: 'Dashboard page',
  };
}

export default function Dashboard() {
  return (
    <div className="py-5 [&_p]:my-6">
      <Hello />
    </div>
  );
}
