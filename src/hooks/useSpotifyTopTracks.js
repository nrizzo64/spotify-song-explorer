// Step 1 - Get user's top 50 tracks
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';

export const useSpotifyTopTracks = () => {
  const { accessToken } = useAuth();
  const [topTracks, setTopTracks] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchUsersTopTracks = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch user');

        const data = await res.json();
        setTopTracks(data.items);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersTopTracks();
  }, [accessToken]);
  return { topTracks, loading, error };
};
