// Node.js 脚本：测试 /api/remove-bg 路由
// 用法：node test_remove_bg_api.js

const { Buffer } = require('node:buffer');
const fs = require('node:fs');
const path = require('node:path');
const FormData = require('form-data');
const fetch = require('node-fetch');

// 你的 Vercel 生产环境 API 地址
const API_URL = 'https://kalshiai.org/api/remove-bg';

// 测试用的小文件路径（你可以换成任意小视频或图片）
const TEST_FILE = path.join(__dirname, 'test.mp4');

async function testRemoveBg() {
  if (!fs.existsSync(TEST_FILE)) {
    // 生成一个小的测试文件
    fs.writeFileSync(TEST_FILE, Buffer.alloc(1024, 0));
  }

  const form = new FormData();
  form.append('file', fs.createReadStream(TEST_FILE), 'test.mp4');
  form.append('background_color', '#FFFFFF');

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
      // 如果需要带 cookie，可以加上 credentials
    });
    const text = await res.text();

    console.warn('Status:', res.status);

    console.warn('Response:', text);
  } catch (err) {
    console.error('Request error:', err);
  }
}

testRemoveBg();
