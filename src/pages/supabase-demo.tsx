import type { NextPage } from 'next';
import Head from 'next/head';
import SupabaseCounter from '@/components/SupabaseCounter';

const SupabaseDemo: NextPage = () => {
  return (
    <>
      <Head>
        <title>Supabase 演示 - Kalshiai</title>
        <meta name="description" content="Supabase 数据库集成演示" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Supabase 集成演示
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              这个页面展示了如何在 Next.js 项目中使用 Supabase 进行数据库操作，
              包括实时数据同步、CRUD 操作等功能。
            </p>
          </div>

          <SupabaseCounter />

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Supabase 优势</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-600">
                    ✅ 完全兼容
                  </h3>
                  <p className="text-gray-600">
                    基于 PostgreSQL，与现有的 Drizzle ORM 100% 兼容，
                    无需修改任何数据库代码。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600">
                    ⚡ 实时功能
                  </h3>
                  <p className="text-gray-600">
                    内置实时订阅功能，数据变化时自动更新 UI，
                    无需手动轮询。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-600">
                    🔐 认证系统
                  </h3>
                  <p className="text-gray-600">
                    内置用户认证系统，支持邮箱、社交登录等多种方式，
                    可与 Clerk 配合使用。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-orange-600">
                    📁 文件存储
                  </h3>
                  <p className="text-gray-600">
                    内置文件存储功能，支持图片处理、CDN 分发等，
                    无需额外配置 AWS S3。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">免费层限制</h2>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">500MB</div>
                  <div className="text-sm text-gray-600">数据库存储</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2GB</div>
                  <div className="text-sm text-gray-600">带宽</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">50K</div>
                  <div className="text-sm text-gray-600">API 请求/月</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">下一步</h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  1. 按照
                  {' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">SUPABASE_SETUP.md</code>
                  {' '}
                  指南创建 Supabase 项目
                </p>
                <p className="text-gray-600">
                  2. 配置环境变量
                  {' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code>
                  {' '}
                  和
                  {' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                </p>
                <p className="text-gray-600">
                  3. 运行数据库迁移：
                  <code className="bg-gray-100 px-2 py-1 rounded">npm run db:migrate</code>
                </p>
                <p className="text-gray-600">
                  4. 测试连接：访问
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
