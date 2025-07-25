import { usePoints } from '../hooks/usePoints';
import { useUser } from '../hooks/useUser';
import { apiUrl } from '../utils/api';

export default function DebugPoints() {
  const user = useUser();
  const { points, loading, error, refetch } = usePoints();

  const handleGiveBonus = async () => {
    try {
      const response = await fetch(apiUrl('/api/points/bonus'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        alert(`成功发放积分！新余额: ${data.newBalance}`);
        refetch(); // 刷新积分数据
      } else {
        alert(`发放失败: ${data.error}`);
      }
    } catch (err) {
      alert(`请求失败: ${err}`);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">积分系统调试</h3>

      <div className="space-y-2">
        <div>
          <strong>用户状态:</strong>
          {user
            ? (
                <span className="text-green-600 ml-2">
                  已登录 (
                  {user.email}
                  )
                </span>
              )
            : (
                <span className="text-red-600 ml-2">未登录</span>
              )}
        </div>

        <div>
          <strong>用户ID:</strong>
          <span className="ml-2">{user?.id || '无'}</span>
        </div>

        <div>
          <strong>加载状态:</strong>
          <span className={`ml-2 ${loading ? 'text-yellow-600' : 'text-green-600'}`}>
            {loading ? '加载中...' : '已完成'}
          </span>
        </div>

        {error && (
          <div>
            <strong>错误:</strong>
            <span className="text-red-600 ml-2">{error}</span>
          </div>
        )}

        {points && (
          <div>
            <strong>积分数据:</strong>
            <div className="ml-2 mt-1">
              <div>
                余额:
                {points.balance}
              </div>
              <div>
                总收入:
                {points.total_earned}
              </div>
              <div>
                总支出:
                {points.total_spent}
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            刷新积分
          </button>

          <button
            onClick={handleGiveBonus}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            发放免费积分
          </button>
        </div>
      </div>
    </div>
  );
}
