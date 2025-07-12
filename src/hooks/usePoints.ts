import { signIn } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
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

export function usePoints() {
  const user = useUser();
  const [points, setPoints] = useState<PointsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastUserId = useRef<string | null>(null);

  const fetchPoints = async () => {
    if (!user) {
      setPoints(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl('/api/points'), {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch points');
      }
      const data = await response.json();
      setPoints(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id && lastUserId.current !== user.id) {
      lastUserId.current = user.id;
      fetchPoints();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const consumePoints = async (amount: number, description: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(apiUrl('/api/points/consume'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, amount, description }),
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

  const fetchLogs = async () => {
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
  };

  useEffect(() => {
    fetchLogs();
  }, [user]);

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
