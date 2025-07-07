// Google reCAPTCHA v2/v3 后端校验
export async function verifyCaptcha(token: string): Promise<boolean> {
  // 简单校验，实际应接入第三方验证码服务
  if (!token) {
    return false;
  }
  return true;
}
