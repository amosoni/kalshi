import { Hello } from '@/components/Hello';

type IDashboardProps = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata(_props: IDashboardProps) {
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
