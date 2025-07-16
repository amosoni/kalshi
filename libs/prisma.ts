import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// 创建带有重试机制的Prisma客户端
const createPrismaClient = () => {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // 为Neon数据库优化连接池
    ...(process.env.DATABASE_URL?.includes('neon.tech') && {
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    }),
  });
};

export const prisma
  = globalForPrisma.prisma
    || createPrismaClient();

// 添加连接重试机制
const reconnectPrisma = async () => {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error disconnecting Prisma:', error);
  }

  try {
    // 重新创建连接
    const newPrisma = createPrismaClient();
    globalForPrisma.prisma = newPrisma;
    return newPrisma;
  } catch (error) {
    console.error('Error reconnecting Prisma:', error);
    throw error;
  }
};

// 添加错误处理中间件
prisma.$use(async (params, next) => {
  try {
    return await next(params);
  } catch (error: any) {
    // 检查是否是连接错误
    if (error?.code === 'P1001' || error?.message?.includes('Closed') || error?.kind === 'Closed') {
      console.warn('Database connection lost, attempting to reconnect...');
      try {
        const newPrisma = await reconnectPrisma();
        // 重试原始操作 - 使用类型安全的方式
        const model = params.model as keyof PrismaClient;
        const action = params.action as string;
        const modelClient = (newPrisma as any)[model];
        if (modelClient && typeof modelClient[action] === 'function') {
          return await modelClient[action](params.args);
        }
        throw new Error('Invalid model or action');
      } catch (reconnectError) {
        console.error('Failed to reconnect to database:', reconnectError);
        throw error; // 抛出原始错误
      }
    }
    throw error;
  }
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
