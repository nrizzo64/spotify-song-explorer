import React from 'react'
import { useSpotifyArtistGenre } from '../hooks/useSpotifyArtists';
import { useSpotifyTopTracks } from '../hooks/useSpotifyTopTracks';

function Tracks() {
    // memoize?
    const { topTracks } = useSpotifyTopTracks();
    const { artistsGenres } = useSpotifyArtistGenre();
    console.log(artistsGenres)

    return (
        <table className="track-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Genre</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {topTracks.map(track => (
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