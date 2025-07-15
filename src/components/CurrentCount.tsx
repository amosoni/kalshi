'use client';

import { useEffect, useState } from 'react';

export const CurrentCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        // Skip API call during build time
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }

        const response = await fetch('/api/counter');
        if (response.ok) {
          const data = await response.json();
          setCount(data.count || 0);
        }
      } catch (error) {
        console.error('Failed to fetch count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (loading) {
    return <div>Count: 0</div>;
  }

  return (
    <div>
      Count:
      {' '}
      {count}
    </div>
  );
};
