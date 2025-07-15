import { checkDeviceId } from 'lib/checkDeviceId';
import { verifyCaptcha } from 'lib/verifyCaptcha';
import { authOptions } from 'libs/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Skip during build time
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ success: true, consumedAmount: 0 });
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const body = await req.json();
  const { captchaToken, deviceId, amount, description } = body;
  if (!(await verifyCaptcha(captchaToken))) {
    return NextResponse.json({ error: '验证码校验失败' }, { status: 400 });
  }
  if (!(await checkDeviceId(deviceId))) {
    return NextResponse.json({ error: '设备操作过于频繁' }, { status: 429 });
  }
  if (!amount || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (amount <= 0) {
    return NextResponse.json({ error: 'Amount must be positive' }, { status: 400 });
  }
  // TODO: 用 Prisma/新方案重写积分消耗逻辑
  return NextResponse.json({ success: true, consumedAmount: amount });
}
