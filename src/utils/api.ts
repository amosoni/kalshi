export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';
export function apiUrl(path: string) {
  // 强制使用相对路径，避免跨域cookie问题
  // 即使设置了API_BASE，也使用相对路径，因为API实际上在同一个域名上
  return path.startsWith('/') ? path : `/${path}`;
}
