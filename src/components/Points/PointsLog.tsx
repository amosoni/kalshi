import { usePointsLog } from '../../hooks/usePoints';

type PointsLogProps = {
  className?: string;
  limit?: number;
};

export default function PointsLog({ className = '', limit = 50 }: PointsLogProps) {
  const { logs, loading, error } = usePointsLog();

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: 3 }).fill(null).map((_, i) => (
          <div key={`points-loading-skeleton-${String.fromCharCode(97 + i)}`} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-red-500 text-sm ${className}`}>
        Error loading points log:
        {error}
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className={`text-gray-500 text-center py-8 ${className}`}>
        No points history yet.
      </div>
    );
  }

  const displayLogs = logs.slice(0, limit);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Points History</h3>
      {loading
        ? (
            <div className="text-gray-500">Loading...</div>
          )
        : error
          ? (
              <div className="text-red-500">Failed to load points log</div>
            )
          : displayLogs.length === 0
            ? (
                <div className="text-gray-500">No points history yet.</div>
              )
            : (
                <ul className="divide-y divide-gray-200">
                  {displayLogs.map(log => (
                    <li key={log.id} className="py-2 flex justify-between items-center">
                      <span className="text-gray-700">{log.description}</span>
                      <span className={`font-mono ${log.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {log.amount > 0 ? '+' : ''}
                        {log.amount}
                      </span>
                      <span className="text-xs text-gray-400">{new Date(log.created_at).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              )}
    </div>
  );
}
