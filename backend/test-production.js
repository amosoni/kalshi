// 生产环境测试脚本
// Node.js 18+ 内置 fetch
const fetch = globalThis.fetch;

const API_BASE = 'https://api.kalshiai.org';

async function testHealth() {
  try {
    console.warn('🔍 测试健康检查端点...');
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();

    console.warn('✅ 健康检查结果:');
    console.warn('   状态:', data.status);
    console.warn('   服务:', data.service);
    console.warn('   版本:', data.version);

    // 安全地检查可选字段
    if (data.features) {
      console.warn('   功能配置:');
      console.warn('     - R2存储:', data.features.r2_storage ? '✅' : '❌');
      console.warn('     - AI处理:', data.features.ai_processing ? '✅' : '❌');
      console.warn('     - FFmpeg:', data.features.ffmpeg ? '✅' : '❌');
    }

    if (data.config) {
      console.warn('   环境配置:');
      console.warn('     - R2端点:', data.config.r2_endpoint || '未配置');
      console.warn('     - R2存储桶:', data.config.r2_bucket || '未配置');
      console.warn('     - Replicate令牌:', data.config.replicate_token || '未配置');
    }

    return data;
  } catch (error) {
    console.error('❌ 健康检查失败:', error.message);
    return null;
  }
}

async function testR2Connection() {
  try {
    console.warn('\n🔍 测试R2连接...');
    const response = await fetch(`${API_BASE}/api/test-r2`);
    const data = await response.json();

    if (data.success) {
      console.warn('✅ R2连接成功');
      console.warn('   存储桶:', data.bucket);
      console.warn('   端点:', data.endpoint);
    } else {
      console.warn('❌ R2连接失败:', data.error);
    }

    return data.success;
  } catch (error) {
    console.error('❌ R2连接测试失败:', error.message);
    return false;
  }
}

async function main() {
  console.warn('🚀 KalshiAI 后端生产环境测试\n');

  // 测试健康检查
  const healthData = await testHealth();

  // 测试R2连接
  const r2Status = await testR2Connection();

  console.warn('\n📊 测试总结:');
  console.warn('   健康检查:', healthData ? '✅' : '❌');
  console.warn('   R2连接:', r2Status ? '✅' : '❌');

  if (healthData && r2Status) {
    console.warn('\n🎉 所有测试通过！后端服务运行正常。');
  } else {
    console.warn('\n⚠️  部分测试失败，请检查配置。');
  }
}

main().catch(console.error);
