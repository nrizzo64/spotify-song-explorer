// Get username for initials

import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';

export const useSpotifyUser = () => {
  const { accessToken } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch user');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [accessToken]);

  return { user, loading, error };
};
