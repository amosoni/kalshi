import { usePoints } from '../hooks/usePoints';
import { useUser } from '../hooks/useUser';

export default function DebugPoints() {
  const user = useUser();
  const { points, loading, error, refetch } = usePoints();

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

        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          刷新积分
        </button>
      </div>
    </div>
  );
}
