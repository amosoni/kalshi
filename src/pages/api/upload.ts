import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import formidable from 'formidable';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

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

    const fileStream = fs.createReadStream(file.filepath);
    const { error } = await supabase.storage
      .from(process.env.SUPABASE_STORAGE_BUCKET!)
      .upload(`videos/${file.originalFilename}`, fileStream, {
        contentType: file.mimetype || 'video/mp4',
      });

    if (error) {
      return res.status(500).json({ error: 'Supabase 上传失败', detail: error.message });
    }

    // 获取公开访问 URL
    const { data: publicUrl } = supabase
      .storage
      .from(process.env.SUPABASE_STORAGE_BUCKET!)
      .getPublicUrl(`videos/${file.originalFilename}`);

    res.status(200).json({ url: publicUrl.publicUrl });
  });
}
