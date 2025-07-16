export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';
export function apiUrl(path: string) {
  // 如果设置了API_BASE，使用它；否则使用相对路径
  if (API_BASE) {
    return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  }
  // 使用相对路径，这样cookie会自动包含
  return path.startsWith('/') ? path : `/${path}`;
}
