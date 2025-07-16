async function testPointsAPI() {
  const baseUrl = 'http://localhost:3000'; // 本地开发服务器

  try {
    console.log('Testing Points API...');

    // 1. 测试积分API端点是否存在
    console.log('1. Testing points API endpoint...');
    const response = await fetch(`${baseUrl}/api/points`);

    if (response.status === 401) {
      console.log('✅ API endpoint exists (401 Unauthorized - expected for unauthenticated request)');
    } else if (response.ok) {
      const data = await response.json();
      console.log('✅ API endpoint exists and returned data:', data);
    } else {
      console.log(`⚠️  API endpoint returned status: ${response.status}`);
    }

    // 2. 测试积分日志API端点
    console.log('2. Testing points log API endpoint...');
    const logResponse = await fetch(`${baseUrl}/api/points/log`);

    if (logResponse.status === 401) {
      console.log('✅ Points log API endpoint exists (401 Unauthorized - expected)');
    } else if (logResponse.ok) {
      const logData = await logResponse.json();
      console.log('✅ Points log API endpoint exists and returned data:', logData);
    } else {
      console.log(`⚠️  Points log API endpoint returned status: ${logResponse.status}`);
    }

    console.log('🎉 API tests completed!');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('💡 Make sure the development server is running: npm run dev');
  }
}

testPointsAPI();
