'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../libs/supabase';

export default function SupabaseCounter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load counter data
  const loadCount = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('counters')
        .select('count')
        .eq('id', 1)
        .single();

      if (err) {
        throw err;
      }
      setCount(data?.count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  // Increment counter
  const incrementCount = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error: err } = await supabase
        .from('counters')
        .update({ count: count + 1 })
        .eq('id', 1);

      if (err) {
        throw err;
      }
      // Reload data
      await loadCount();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  // Create new counter
  const createCounter = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error: err } = await supabase
        .from('counters')
        .insert({ id: 1, count: 0 });

      if (err) {
        throw err;
      }
      // Reload data
      await loadCount();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Creation failed');
    } finally {
      setLoading(false);
    }
  };

  // Delete counter
  const deleteCounter = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error: err } = await supabase
        .from('counters')
        .delete()
        .eq('id', 1);

      if (err) {
        throw err;
      }
      setCount(0);
      // Reload data
      await loadCount();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deletion failed');
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    loadCount();

    // Subscribe to database changes
    const channel = supabase
      .channel('counter_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'counters' }, () => {
        loadCount();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Real-time Counter</h2>

      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-blue-600 mb-2">{count}</div>
        <div className="text-sm text-gray-500">Current Count</div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={incrementCount}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {loading ? 'Processing...' : 'Increment'}
        </button>

        <button
          type="button"
          onClick={createCounter}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {loading ? 'Processing...' : 'Create Counter'}
        </button>

        <button
          type="button"
          onClick={deleteCounter}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {loading ? 'Processing...' : 'Delete Counter'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>This counter demonstrates real-time updates using Supabase subscriptions.</p>
        <p>Open this page in multiple tabs to see real-time synchronization.</p>
      </div>
    </div>
  );
}
