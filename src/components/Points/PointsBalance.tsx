import { usePoints } from '../../hooks/usePoints';

type PointsBalanceProps = {
  className?: string;
  showLabel?: boolean;
};

export default function PointsBalance({ className = '', showLabel = true }: PointsBalanceProps) {
  const { points, loading, error } = usePoints();

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
        {showLabel && <span className="text-gray-500">Loading...</span>}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-red-500 text-sm">Error loading points</span>
      </div>
    );
  }

  if (!points) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center space-x-1">
        <span className="text-lg font-semibold text-blue-600">
          {points.balance.toLocaleString()}
        </span>
        {showLabel && (
          <span className="text-sm text-gray-600">Points</span>
        )}
      </div>
    </div>
  );
}
