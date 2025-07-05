'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/libs/supabase';

type Counter = {
  id: number;
  count: number;
  updated_at: string;
  created_at: string;
};

export default function SupabaseCounter() {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载计数器数据
  const loadCounters = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('counter')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCounters(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载失败');
    } finally {
      setLoading(false);
    }
  };

  // 增加计数器
  const incrementCounter = async (id: number, currentCount: number) => {
    try {
      const { error } = await supabase
        .from('counter')
        .update({ count: currentCount + 1 })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // 重新加载数据
      await loadCounters();
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新失败');
    }
  };

  // 创建新计数器
  const createCounter = async () => {
    try {
      const { error } = await supabase
        .from('counter')
        .insert([{ count: 0 }]);

      if (error) {
        throw error;
      }

      // 重新加载数据
      await loadCounters();
    } catch (err) {
      setError(err instanceof Error ? err.message : '创建失败');
    }
  };

  // 删除计数器
  const deleteCounter = async (id: number) => {
    try {
      const { error } = await supabase
        .from('counter')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // 重新加载数据
      await loadCounters();
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败');
    }
  };

  // 设置实时订阅
  useEffect(() => {
    loadCounters();

    // 订阅数据库变化
    const subscription = supabase
      .channel('counter_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'counter' }, () => {
        // 当数据变化时重新加载
        loadCounters();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Supabase 计数器示例</h2>
        <button
          onClick={createCounter}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          创建新计数器
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {counters.length === 0
          ? (
              <div className="text-gray-500 text-center py-8">
                暂无计数器，点击上方按钮创建一个
              </div>
            )
          : (
              counters.map(counter => (
                <div
                  key={counter.id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="text-lg font-semibold">
                      计数器 #
                      {counter.id}
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                      {counter.count}
                    </div>
                    <div className="text-sm text-gray-500">
                      创建于:
                      {' '}
                      {new Date(counter.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => incrementCounter(counter.id, counter.count)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      type="button"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => deleteCounter(counter.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      type="button"
                    >
                      删除
                    </button>
                  </div>
                </div>
              ))
            )}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">功能说明：</h3>
        <ul className="text-sm space-y-1">
          <li>• 实时数据同步：数据变化会自动更新</li>
          <li>• 创建计数器：点击按钮创建新的计数器</li>
          <li>• 增加计数：点击 +1 按钮增加计数</li>
          <li>• 删除计数器：点击删除按钮移除计数器</li>
          <li>• 错误处理：显示操作错误信息</li>
        </ul>
      </div>
    </div>
  );
}
