// 启动测试脚本
console.warn('🔍 检查环境变量...');

const requiredEnvVars = [
  'R2_ENDPOINT',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET',
];

console.warn('必需的环境变量:');
requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    console.warn(`   ✅ ${varName}: ${value.substring(0, 10)}...`);
  } else {
    console.warn(`   ❌ ${varName}: 未设置`);
  }
});

console.warn('\n可选的环境变量:');
const optionalEnvVars = [
  'REPLICATE_API_TOKEN',
  'NODE_ENV',
  'PORT',
];

optionalEnvVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    console.warn(`   ✅ ${varName}: ${value.substring(0, 10)}...`);
  } else {
    console.warn(`   ⚠️  ${varName}: 未设置`);
  }
});

console.warn('\n🔍 尝试启动服务器...');

try {
  // 模拟启动过程
  require('./index.js');
  console.warn('✅ 服务器启动成功！');
} catch (error) {
  console.error('❌ 服务器启动失败:', error.message);
  console.error('错误详情:', error);
}
