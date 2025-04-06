import React from 'react'
import { useSpotifyTopTracks } from '../hooks/useSpotifyTopTracks';

function Tracks() {
    const { topTracks, loading, error } = useSpotifyTopTracks();
    console.log(topTracks)
    return (
        <table className="track-table">
            <thead>
                <tr>
                    <th>Track</th>
                    <th>Artist</th>
                    {/* <th>Acousticness</th>
              <th>Instrumentalness</th>
              <th>Liveness</th>
              <th>Loudness</th>
              <th>Mode</th>
              <th>Speechiness</th>
              <th>Tempo</th>
              <th>Time Signature</th> */}
                    <th>Energy</th>
                    <th>Valence</th>
                    <th>Danceability</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {topTracks.map(track => (
                    <tr key={track.id}>
                        <td>
                            <img src="album.jpg" alt="Album Art" width="44" />
                            {track.name}
                        </td>
                        <td>{track.artists[0].name}</td>
                        <td>0.87</td>
                        <td>0.65</td>
                        <td>0.92</td>
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