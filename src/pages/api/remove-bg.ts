import type { NextApiRequest, NextApiResponse } from 'next';
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import formidable from 'formidable';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetchOrig from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: '.env.local' });

const fetch = (url: any, options: any) => fetchOrig(url, options); // 兼容类型

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const proxyUrl = process.env.PROXY_URL; // 例：http://127.0.0.1:7899
const agent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const form = formidable({ multiples: false });
    const data = await new Promise<{ buffer: Buffer; fileName: string; fileType: string }>((resolve, reject) => {
      form.parse(req, (err, _fields, files) => {
        if (err) {
          return reject(err);
        }
        const fileField = files.file;
        const file = Array.isArray(fileField) ? fileField[0] : fileField;
        if (!file) {
          return reject(new Error('No file uploaded'));
        }
        const fileName = `${uuidv4()}-${file.originalFilename}`;
        const fileType = file.mimetype || 'video/mp4';
        const buffers: Buffer[] = [];
        const stream = fs.createReadStream(file.filepath);
        stream.on('data', chunk => buffers.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        stream.on('end', () => {
          resolve({ buffer: Buffer.concat(buffers), fileName, fileType });
        });
        stream.on('error', (e) => {
          reject(e);
        });
      });
    });

    const { error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_STORAGE_BUCKET!)
      .upload(`videos/${data.fileName}`, data.buffer, {
        contentType: data.fileType,
        upsert: true,
      });
    if (uploadError) {
      throw uploadError;
    }
    const { data: publicUrlData } = supabase
      .storage
      .from(process.env.SUPABASE_STORAGE_BUCKET!)
      .getPublicUrl(`videos/${data.fileName}`);
    const fileUrl = publicUrlData.publicUrl;

    // AI 处理
    const replicateRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'c18392381d1b5410b5a76b9b0c58db132526d3f79fe602e04e0d80cb668df509',
        input: {
          video: fileUrl,
          mode: 'Fast',
          background_color: '#FFFFFF',
        },
      }),
      agent,
    });
    const prediction = await replicateRes.json();

    let result: any = prediction;
    while (result.status !== 'succeeded' && result.status !== 'failed') {
      await new Promise(r => setTimeout(r, 3000));
      const poll = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
        agent,
      });
      result = await poll.json();
    }

    if (result.status === 'succeeded') {
      res.status(200).json({ resultUrl: result.output });
    } else {
      res.status(500).json({ error: 'AI处理失败' });
    }
  } catch (err) {
    res.status(500).json({ error: '服务器异常', detail: String(err) });
  }
}
