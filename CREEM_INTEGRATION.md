# Creem 支付集成说明

## 概述

本项目已集成 Creem 支付系统，用于用户积分充值功能。

## 环境变量配置

在 `.env.local` 文件中配置以下环境变量：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Creem 支付配置
CREEM_API_KEY=your_creem_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## API 路由

### 1. 创建支付订单
- **路径**: `/api/creem/checkout`
- **方法**: `POST`
- **功能**: 创建 Creem 支付订单，返回支付链接

### 2. 支付成功处理
- **路径**: `/api/creem/success`
- **方法**: `GET`
- **功能**: 验证支付状态，更新用户积分

### 3. 支付失败处理
- **路径**: `/api/creem/fail`
- **方法**: `GET`
- **功能**: 处理支付失败情况

## 数据库表结构

### 订单表 (orders)
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  stripe_session_id TEXT NOT NULL, -- 复用字段名，存储 Creem session_id
  amount INTEGER NOT NULL, -- 积分数量
  price DECIMAL(10,2) NOT NULL, -- USD 金额
  status TEXT NOT NULL, -- 'pending' | 'completed' | 'failed'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 支付流程

1. **用户选择充值金额**
   - 前端调用 `/api/creem/checkout`
   - 传递积分数量和用户ID

2. **创建 Creem 订单**
   - 调用 Creem API 创建订单
   - 设置成功/失败回调URL
   - 在数据库中记录订单信息

3. **用户完成支付**
   - 跳转到 Creem 支付页面
   - 用户完成支付后跳转到成功/失败页面

4. **支付结果处理**
   - 成功：验证支付状态，更新用户积分
   - 失败：更新订单状态为失败

## 积分价格

- 1 积分 = $0.01 USD
- 支持充值金额：100、500、1000、2000 积分

## 错误处理

- 支付验证失败
- 网络错误
- 数据库操作失败
- 用户未登录

## 安全考虑

- 所有 API 调用都需要验证用户身份
- 支付状态通过 Creem API 验证
- 敏感信息存储在环境变量中
- 数据库操作使用事务确保一致性

## 测试

1. 配置环境变量
2. 启动开发服务器
3. 注册/登录用户
4. 测试充值功能
5. 验证积分到账

## 注意事项

- 确保 Creem API 密钥安全
- 生产环境使用 HTTPS
- 定期检查支付状态
- 监控支付成功率
