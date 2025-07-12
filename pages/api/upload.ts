import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs';
// TODO: Supabase 相关上传逻辑已弃用，待替换为新存储方案
// import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import formidable from 'formidable';

dotenv.config({ path: '.env.local' });

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
// );

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ multiples: false });
  form.parse(req, async (err, _fields, files) => {
    if (err) {
      return res.status(500).json({ error: '上传解析失败' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // 本地存储上传
    const uploadPath = `public/uploads/${file.originalFilename}`;
    fs.copyFileSync(file.filepath, uploadPath);
    const fileUrl = `/uploads/${file.originalFilename}`;
    res.status(200).json({ url: fileUrl });
  });
}
