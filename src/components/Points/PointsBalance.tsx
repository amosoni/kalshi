import { usePoints } from '../../hooks/usePoints';

type PointsBalanceProps = {
  className?: string;
  showLabel?: boolean;
  showRetry?: boolean;
};

export default function PointsBalance({
  className = '',
  showLabel = true,
  showRetry = true,
}: PointsBalanceProps) {
  const { points, loading, error, refetch } = usePoints();

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
        {showLabel && <span className="text-gray-500">Loading...</span>}
      </div>
    );
  }

  if (error && showRetry) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-red-500 text-sm">积分加载失败</span>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          重试
        </button>
      </div>
    );
  }

  if (error && !showRetry) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-red-500 text-sm">积分加载失败</span>
      </div>
    );
  }

  if (!points) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-gray-500 text-sm">未登录</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center space-x-1">
        <span className="text-lg font-semibold text-blue-600">
          {points.balance.toLocaleString()}
        </span>
        {showLabel && (
          <span className="text-sm text-gray-600">积分</span>
        )}
      </div>
    </div>
  );
}
