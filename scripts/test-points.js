const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testPointsSystem() {
  try {
    console.log('Testing points system...');

    // 1. 测试数据库连接
    console.log('1. Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // 2. 测试查询积分表结构
    console.log('2. Testing points table structure...');
    const pointsCount = await prisma.points.count();
    console.log(`✅ Points table accessible, total records: ${pointsCount}`);

    // 3. 测试查询积分日志表结构
    console.log('3. Testing points log table structure...');
    const logsCount = await prisma.pointsLog.count();
    console.log(`✅ Points log table accessible, total records: ${logsCount}`);

    // 4. 测试查询用户表
    console.log('4. Testing users table...');
    const usersCount = await prisma.user.count();
    console.log(`✅ Users table accessible, total users: ${usersCount}`);

    // 5. 如果有用户，测试查询第一个用户的积分
    if (usersCount > 0) {
      console.log('5. Testing points query for first user...');
      const firstUser = await prisma.user.findFirst({
        include: {
          points: true,
        },
      });

      if (firstUser) {
        console.log(`✅ Found user: ${firstUser.email}`);
        if (firstUser.points) {
          console.log(`✅ User points: ${firstUser.points.balance}`);
        } else {
          console.log('⚠️  User has no points record');
        }
      }
    }

    console.log('🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPointsSystem();
