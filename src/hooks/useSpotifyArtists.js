// Step 2 - Get artist data from top tracks
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useSpotifyTopTracks } from "./useSpotifyTopTracks";

export const useSpotifyArtistGenre = () => {
  const { accessToken } = useAuth();
  const { topTracks } = useSpotifyTopTracks();
  const  [artistsGenres, setArtistsGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current || !accessToken || topTracks.length === 0) return;
    hasRun.current = true;
    const seenArtistIds = new Set();
    topTracks.forEach((track) => {
      track.artists.forEach((artist) => {
        seenArtistIds.add(artist.id);
      });
    });
    const artistIdsString = [...seenArtistIds].join(",");

    const fetchArtists = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.spotify.com/v1/artists?ids=${artistIdsString}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch audio features");

        const data = await res.json();
        setArtistsGenres(mapArtistToGenres(data.artists));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [accessToken, topTracks]);
  
  return { artistsGenres, loading, error };
};

const mapArtistToGenres = (artists) => {
  const map = {};
  artists.forEach((a) => {
    if (!map[a.id]) {
      map[a.id] = a.genres;
    }
  });

  return map;
};
