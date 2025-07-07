export async function checkDeviceId(deviceId: string): Promise<boolean> {
  // 简单防刷逻辑，实际可接入更复杂风控
  if (!deviceId) {
    return false;
  }
  return true;
}
