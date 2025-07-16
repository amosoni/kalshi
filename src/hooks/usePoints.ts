import { signIn } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { apiUrl } from '@/utils/api';
import { useUser } from './useUser';

export type PointsData = {
  balance: number;
  total_earned: number;
  total_spent: number;
};

export type PointsLogEntry = {
  id: number;
  type: 'earn' | 'spend' | 'recharge';
  amount: number;
  balance_after: number;
  description: string;
  created_at: string;
};

// 重试函数
const retryFetch = async (
  url: string,
  options: RequestInit,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<Response> => {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      // 如果是服务器错误，尝试重试
      if (response.status >= 500 && attempt < maxRetries) {
        console.warn(`Server error on attempt ${attempt}, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // 指数退避
        continue;
      }

      return response;
    } catch (error: any) {
      lastError = error;

      // 如果是网络错误，尝试重试
      if (attempt < maxRetries) {
        console.warn(`Network error on attempt ${attempt}, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }

      throw error;
    }
  }

  throw lastError;
};

export function usePoints() {
  const user = useUser();
  const [points, setPoints] = useState<PointsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastUserId = useRef<string | null>(null);

  const fetchPoints = useCallback(async () => {
    // Skip API calls during build time
    if (typeof window === 'undefined' || process.env.NEXT_PHASE === 'phase-production-build') {
      setPoints(null);
      setLoading(false);
      return;
    }

    if (!user) {
      setPoints(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await retryFetch(apiUrl('/api/points'), {
        credentials: 'include',
      });

      if (!response.ok) {
        // 如果是服务器错误，返回默认值而不是抛出错误
        if (response.status >= 500) {
          console.warn('Server error, using default points values');
          setPoints({ balance: 0, total_earned: 0, total_spent: 0 });
          return;
        }
        throw new Error('Failed to fetch points');
      }

      const data = await response.json();
      setPoints(data);
    } catch (err) {
      console.error('Error fetching points:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');

      // 如果是网络错误，设置默认值而不是显示错误
      if (err instanceof Error && (
        err.message.includes('Failed to fetch')
        || err.message.includes('NetworkError')
        || err.message.includes('connection')
      )) {
        console.warn('Network error, using default points values');
        setPoints({ balance: 0, total_earned: 0, total_spent: 0 });
        setError(null); // 清除错误状态
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.id && lastUserId.current !== user.id) {
      lastUserId.current = user.id;
      fetchPoints();
    }
  }, [user?.id, fetchPoints]);

  const consumePoints = async (amount: number, description: string) => {
    // Skip API calls during build time
    if (typeof window === 'undefined' || process.env.NEXT_PHASE === 'phase-production-build') {
      throw new Error('Cannot consume points during build time');
    }

    if (!user) {
      throw new Error('User not authenticated');
    }

    const response = await retryFetch(apiUrl('/api/points/consume'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, amount, description }), // amount 直接为秒数
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to consume points');
    }

    await fetchPoints(); // Refresh points data
    return await response.json();
  };

  return {
    points,
    loading,
    error,
    refetch: fetchPoints,
    consumePoints,
  };
}

export function usePointsLog() {
  const user = useUser();
  const [logs, setLogs] = useState<PointsLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    // Skip API calls during build time
    if (typeof window === 'undefined' || process.env.NEXT_PHASE === 'phase-production-build') {
      setLogs([]);
      setLoading(false);
      return;
    }

    if (!user) {
      setLogs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl('/api/points/log'), {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch points log');
      }
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    refetch: fetchLogs,
  };
}

export function useRecharge() {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recharge = async (product_id: string) => {
    // Skip API calls during build time
    if (typeof window === 'undefined' || process.env.NEXT_PHASE === 'phase-production-build') {
      throw new Error('Cannot recharge during build time');
    }

    if (!user) {
      signIn('google');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl('/api/creem/checkout'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, product_id }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session');
      }

      const data = await response.json();
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return {
    recharge,
    loading,
    error,
  };
}
