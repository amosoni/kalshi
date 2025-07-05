# Supabase 设置指南

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并注册账户
2. 点击 "New Project"
3. 选择组织并输入项目名称（例如：kalshiai）
4. 设置数据库密码
5. 选择地区（建议选择离你最近的地区）
6. 点击 "Create new project"

## 2. 获取连接信息

项目创建完成后，在 Supabase 控制台中：

1. 进入 **Settings** > **API**
2. 复制以下信息：
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## 3. 配置环境变量

创建 `.env.local` 文件并添加以下内容：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Database URL for Drizzle ORM (Supabase PostgreSQL connection)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Disable Sentry in development
NEXT_PUBLIC_SENTRY_DISABLED=true

# Clerk Authentication (configure these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 4. 运行数据库迁移

```bash
# 生成迁移文件（如果需要）
npm run db:generate

# 运行迁移
npm run db:migrate
```

## 5. 测试连接

启动开发服务器：

```bash
npm run dev
```

然后访问：`http://localhost:3000/api/test-supabase`

如果看到成功消息，说明 Supabase 配置正确。

## 6. Supabase 功能

### 数据库功能
- ✅ PostgreSQL 数据库
- ✅ 实时订阅
- ✅ 自动生成的 API
- ✅ 行级安全 (RLS)

### 认证功能
- ✅ 用户认证
- ✅ 社交登录
- ✅ 邮箱验证
- ✅ 密码重置

### 存储功能
- ✅ 文件上传
- ✅ 图片处理
- ✅ CDN 分发

### 实时功能
- ✅ 实时数据同步
- ✅ WebSocket 连接
- ✅ 实时通知

## 7. 使用示例

### 查询数据
```typescript
import { supabase } from '@/libs/supabase';

// 查询 counter 表
const { data, error } = await supabase
  .from('counter')
  .select('*');
```

### 插入数据
```typescript
const { data, error } = await supabase
  .from('counter')
  .insert([{ count: 1 }])
  .select();
```

### 实时订阅
```typescript
const subscription = supabase
  .channel('counter_changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'counter' }, (payload) => {
    console.log('Change received!', payload);
  })
  .subscribe();
```

## 8. 免费层限制

- 数据库：500MB
- 带宽：2GB
- 文件存储：1GB
- 实时连接：2个并发
- API 请求：50,000/月

## 9. 故障排除

### 常见问题

1. **连接错误**
   - 检查 DATABASE_URL 格式
   - 确认密码正确
   - 检查网络连接

2. **权限错误**
   - 检查 RLS 策略
   - 确认用户权限

3. **实时连接失败**
   - 检查 NEXT_PUBLIC_SUPABASE_URL
   - 确认 anon key 正确

### 获取帮助

- [Supabase 文档](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
