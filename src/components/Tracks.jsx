import React, { useState } from 'react'
import { useSpotifyArtistGenre } from '../hooks/useSpotifyArtists';
import { useSpotifyTopTracks } from '../hooks/useSpotifyTopTracks';
import './Tracks.css'
import AlbumImageModal from './AlbumImageModal.jsx';

function Tracks() {
    // memoize?
    const { topTracks } = useSpotifyTopTracks();
    const { artistsGenres } = useSpotifyArtistGenre();
    const [sortKey, setSortKey] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");
    const [modalImgUrl, setModalImgUrl] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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

    const preloaded = new Set();

    const preloadImage = (url) => {
        if (!preloaded.has(url)) {
            const img = new Image();
            img.src = url;
            preloaded.add(url);
        }
    };

    const handleImgClick = (url) => {
        setModalImgUrl(url);
        setModalVisible(true);
    }
    console.log(sortedTracks);

    return (
        <>
            {modalVisible && (
                <AlbumImageModal imageUrl={modalImgUrl} onClose={() => setModalVisible(false)} />
            )}
            <table className="track-table">
                <thead>
                    <tr>
                        <th></th>
                        <th onClick={() => handleSort("title")}>Title {sortKey === "title" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th onClick={() => handleSort("artist")}>Artist {sortKey === "artist" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th onClick={() => handleSort("album")}>Album {sortKey === "album" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th>Genre</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTracks.map(track => (
                        <tr key={track.id}>
                            <td>
                                <img
                                    onMouseEnter={() => preloadImage(track.album.images[0].url)}
                                    onClick={() => handleImgClick(track.album.images[0].url)}
                                    src={track.album.images[2].url} alt="Album Art" loading="lazy" width='44' />
                            </td>
                            <td onClick={() => window.open(track.external_urls.spotify, '_blank')}>{track.name}</td>
                            <td>
                                {track.artists.map((a, i) => (
                                    <span
                                        key={a.id}
                                        onClick={() => window.open(a.external_urls.spotify, '_blank')}
                                    >
                                        {a.name}{i < track.artists.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </td>
                            <td>{track.album.name}</td>
                            <td>{[...new Set(
                                track.artists
                                    .flatMap(a => artistsGenres[a.id] || [])
                            )].join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Tracks;