// 本地测试脚本
const fetch = globalThis.fetch;

const API_BASE = 'http://localhost:3001';

async function testLocalHealth() {
  try {
    console.warn('🔍 测试本地健康检查端点...');
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();

    console.warn('✅ 本地健康检查结果:');
    console.warn('   状态:', data.status);
    console.warn('   服务:', data.service);
    console.warn('   版本:', data.version);

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
    console.error('❌ 本地健康检查失败:', error.message);
    return null;
  }
}

async function testLocalR2() {
  try {
    console.warn('\n🔍 测试本地R2连接...');
    const response = await fetch(`${API_BASE}/api/test-r2`);
    const data = await response.json();

    if (data.success) {
      console.warn('✅ 本地R2连接成功');
      console.warn('   存储桶:', data.bucket);
      console.warn('   端点:', data.endpoint);
    } else {
      console.warn('❌ 本地R2连接失败:', data.error);
    }

    return data.success;
  } catch (error) {
    console.error('❌ 本地R2连接测试失败:', error.message);
    return false;
  }
}

async function main() {
  console.warn('🚀 KalshiAI 后端本地测试\n');

  // 测试本地健康检查
  const healthData = await testLocalHealth();

  // 测试本地R2连接
  const r2Status = await testLocalR2();

  console.warn('\n📊 本地测试总结:');
  console.warn('   健康检查:', healthData ? '✅' : '❌');
  console.warn('   R2连接:', r2Status ? '✅' : '❌');

  if (healthData && r2Status) {
    console.warn('\n🎉 本地测试通过！后端服务运行正常。');
  } else {
    console.warn('\n⚠️  本地测试失败，请检查配置。');
  }
}

main().catch(console.error);
