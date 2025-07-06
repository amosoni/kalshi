import { useState } from 'react';
import { usePoints } from '../../hooks/usePoints';

type ConsumePointsButtonProps = {
  videoLengthSeconds: number; // Video duration in seconds
  description: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function ConsumePointsButton({
  videoLengthSeconds,
  description,
  onSuccess,
  onError,
  children,
  className = '',
  disabled = false,
}: ConsumePointsButtonProps) {
  const { points, consumePoints } = usePoints();
  const [loading, setLoading] = useState(false);

  // Round up to the nearest minute
  const requiredPoints = Math.ceil(videoLengthSeconds / 60);

  const handleClick = async () => {
    if (!points) {
      onError?.('Please log in first.');
      return;
    }

    if (points.balance < requiredPoints) {
      onError?.(`Insufficient points. This video requires ${requiredPoints} points, but you have ${points.balance}.`);
      return;
    }

    try {
      setLoading(true);
      await consumePoints(requiredPoints, description);
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to consume points.';
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = disabled || loading || !points || points.balance < requiredPoints;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isDisabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
      } ${className}`}
    >
      {loading
        ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          )
        : (
            children || `Consume ${requiredPoints} Points`
          )}
    </button>
  );
}
