import type { NextPage } from 'next';
import Head from 'next/head';
import SupabaseCounter from '@/components/SupabaseCounter';

const SupabaseDemo: NextPage = () => {
  return (
    <>
      <Head>
        <title>Supabase Demo - Kalshiai</title>
        <meta name="description" content="Supabase database integration demo" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Supabase Integration Demo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This page demonstrates how to use Supabase for database operations in a Next.js project,
              including real-time data synchronization, CRUD operations, and more.
            </p>
          </div>

          <SupabaseCounter />

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Supabase Advantages</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-600">
                    ✅ Fully Compatible
                  </h3>
                  <p className="text-gray-600">
                    Based on PostgreSQL, 100% compatible with existing Drizzle ORM,
                    no need to modify any database code.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600">
                    ⚡ Real-time Features
                  </h3>
                  <p className="text-gray-600">
                    Built-in real-time subscription functionality, UI updates automatically when data changes,
                    no manual polling required.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-600">
                    🔐 Authentication System
                  </h3>
                  <p className="text-gray-600">
                    Built-in user authentication system, supports email, social login and more,
                    can work with Clerk.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-orange-600">
                    📁 File Storage
                  </h3>
                  <p className="text-gray-600">
                    Built-in file storage functionality, supports image processing, CDN distribution, etc.,
                    no need for additional AWS S3 configuration.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Free Tier Limits</h2>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">500MB</div>
                  <div className="text-sm text-gray-600">Database Storage</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2GB</div>
                  <div className="text-sm text-gray-600">Bandwidth</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">50K</div>
                  <div className="text-sm text-gray-600">API Requests/Month</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  1. Follow the
                  {' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">SUPABASE_SETUP.md</code>
                  {' '}
                  guide to create a Supabase project
                </p>
                <p className="text-gray-600">
                  2. Configure environment variables
                  {' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code>
                  {' '}
                  and
                  {' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                </p>
                <p className="text-gray-600">
                  3. Run database migrations:
                  <code className="bg-gray-100 px-2 py-1 rounded">npm run db:migrate</code>
                </p>
                <p className="text-gray-600">
                  4. Test connection: visit
                  {' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">/api/test-supabase</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupabaseDemo;
