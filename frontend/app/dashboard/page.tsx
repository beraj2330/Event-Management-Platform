'use client';

import { useEffect, useState } from 'react';
import { fetchProtectedData } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const protectedData = await fetchProtectedData(token);
          setData(protectedData);
        }
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };

    fetchData();
  }, [token]);

  if (!token) {
    return <p>Please log in to view your dashboard.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading your protected data...</p>
      )}
    </div>
  );
}
