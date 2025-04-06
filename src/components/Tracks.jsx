import React from 'react'

function Tracks() {

    return (
        <table className = "track-table">
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
                <tr>
                    <td>
                        <img src="album.jpg" alt="Album Art" width="44" />
                        Song Name
                    </td>
                    <td>Artist Name</td>
                    <td>0.87</td>
                    <td>0.65</td>
                    <td>0.92</td>
                    <td>
                        <button>▶</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="album.jpg" alt="Album Art" width="44" />
                        Song Name
                    </td>
                    <td>Artist Name</td>
                    <td>0.87</td>
                    <td>0.65</td>
                    <td>0.92</td>
                    <td>
                        <button>▶</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="album.jpg" alt="Album Art" width="44" />
                        Song Name
                    </td>
                    <td>Artist Name</td>
                    <td>0.87</td>
                    <td>0.65</td>
                    <td>0.92</td>
                    <td>
                        <button>▶</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="album.jpg" alt="Album Art" width="44" />
                        Song Name
                    </td>
                    <td>Artist Name</td>
                    <td>0.87</td>
                    <td>0.65</td>
                    <td>0.92</td>
                    <td>
                        <button>▶</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="album.jpg" alt="Album Art" width="44" />
                        Song Name
                    </td>
                    <td>Artist Name</td>
                    <td>0.87</td>
                    <td>0.65</td>
                    <td>0.92</td>
                    <td>
                        <button>▶</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="album.jpg" alt="Album Art" width="44" />
                        Song Name
                    </td>
                    <td>Artist Name</td>
                    <td>0.87</td>
                    <td>0.65</td>
                    <td>0.92</td>
                    <td>
                        <button>▶</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Tracks;