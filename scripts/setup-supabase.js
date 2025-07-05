#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

console.log('🚀 Supabase 快速设置脚本');
console.log('========================\n');

// 检查 .env.local 文件是否存在
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  发现现有的 .env.local 文件');
  console.log('请手动添加以下 Supabase 配置：\n');
} else {
  console.log('📝 创建 .env.local 文件...\n');
}

const envContent = `# Supabase Configuration
# 请替换为你的 Supabase 项目信息
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Database URL for Drizzle ORM (Supabase PostgreSQL connection)
# 格式: postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Disable Sentry in development
NEXT_PUBLIC_SENTRY_DISABLED=true

# Clerk Authentication (configure these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
`;

if (!envExists) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local 文件已创建');
} else {
  console.log('📋 请将以下内容添加到 .env.local 文件：');
  console.log('=====================================');
  console.log(envContent);
  console.log('=====================================\n');
}

console.log('📋 设置步骤：');
console.log('1. 访问 https://supabase.com 创建新项目');
console.log('2. 在项目设置 > API 中获取连接信息');
console.log('3. 更新 .env.local 文件中的配置');
console.log('4. 运行: npm run db:migrate');
console.log('5. 启动开发服务器: npm run dev');
console.log('6. 访问: http://localhost:3000/supabase-demo');
console.log('7. 测试 API: http://localhost:3000/api/test-supabase\n');

console.log('📚 更多信息请查看: SUPABASE_SETUP.md');
console.log('🎯 演示页面: /supabase-demo');
console.log('🔧 API 测试: /api/test-supabase\n');

console.log('✨ 设置完成！');
