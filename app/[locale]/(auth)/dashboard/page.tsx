import { Hello } from '@/components/Hello';

export async function generateMetadata(_props: {
  params: Promise<{ locale: string }>;
}) {
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Dashboard',
  // });

  return {
    title: 'Dashboard', // Fallback title
  };
}

export default function Dashboard() {
  return (
    <div className="py-5 [&_p]:my-6">
      <Hello />
    </div>
  );
}
