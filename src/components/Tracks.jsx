import React, { useState } from 'react'
import { useSpotifyArtistGenre } from '../hooks/useSpotifyArtists';
import { useSpotifyTopTracks } from '../hooks/useSpotifyTopTracks';
import './Tracks.css'

function Tracks() {
    // memoize?
    const { topTracks } = useSpotifyTopTracks();
    const { artistsGenres } = useSpotifyArtistGenre();
    const [sortKey, setSortKey] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    const sortedTracks = [...topTracks].sort((a, b) => {
        let valA, valB;

        switch (sortKey) {
            case "title":
                valA = a.name.toLowerCase();
                valB = b.name.toLowerCase();
                break;
            case "artist":
                valA = a.artists[0].name.toLowerCase();
                valB = b.artists[0].name.toLowerCase();
                break;
            case "album":
                valA = a.album.name.toLowerCase();
                valB = b.album.name.toLowerCase();
                break;
            default:
                return 0;
        }

        return sortOrder === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
    });

    const handleSort = (key) => {
        if (sortKey === key) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
          setSortKey(key);
          setSortOrder("asc");
        }
      };

    return (
        <table className="track-table">
            <thead>
                <tr>
                    <th></th>
                    <th onClick={() => handleSort("title")}>Title</th>
                    <th onClick={() => handleSort("artist")}>Artist</th>
                    <th onClick={() => handleSort("album")}>Album</th>
                    <th>Genre</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {sortedTracks.map(track => (
                    <tr key={track.id}>
                        <td>
                            <img src="album.jpg" alt="Album Art" width="44" />
                        </td>
                        <td>{track.name}</td>
                        <td>{track.artists.map(a => a.name).join(", ")}</td>
                        <td>{track.album.name}</td>
                        <td>{[...new Set(
                            track.artists
                                .flatMap(a => artistsGenres[a.id] || [])
                        )].join(", ")}</td>
                        <td>
                            <button>▶</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Tracks;