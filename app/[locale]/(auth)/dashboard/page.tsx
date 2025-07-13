import { Hello } from '@/components/Hello';

type IDashboardProps = {
  params: { locale: string };
};

export async function generateMetadata(_props: IDashboardProps) {
  return {
    title: 'Dashboard',
  };
}

export default function Dashboard() {
  return (
    <div className="py-5 [&_p]:my-6">
      <Hello />
    </div>
  );
}
