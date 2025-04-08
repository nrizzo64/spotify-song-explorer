import React, { useState } from 'react'
import { useSpotifyTopTracks } from '../hooks/useSpotifyTopTracks';
import { useSpotifyArtistGenre } from '../hooks/useSpotifyArtists';
import './Dashboard.css'
import AlbumImageModal from './AlbumImageModal.jsx';

function Dashboard() {
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

    return (
        <>
            {modalVisible && (
                <AlbumImageModal imageUrl={modalImgUrl} onClose={() => setModalVisible(false)} />
            )}
            <div className="table-wrapper">
                <table className="track-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th className={sortKey === "title" ? "sorted-col" : ""}
                                onClick={() => handleSort("title")}>Title {sortKey === "title" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("artist")}>Artist {sortKey === "artist" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                            <th onClick={() => handleSort("album")}>Album {sortKey === "album" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTracks.map(track => (
                            <tr key={track.id}>
                                <td>
                                    <img
                                        onMouseEnter={() => preloadImage(track.album.images[0].url)}
                                        onClick={() => handleImgClick(track.album.images[0].url)}
                                        src={track.album.images[2].url} alt="Album Art" loading="lazy" width='64' />
                                </td>
                                <td className={sortKey === "title" ? "sorted-col" : ""}
                                    onClick={() => window.open(track.external_urls.spotify, '_blank')}>{track.name}</td>
                                <td className={sortKey === "artist" ? "sorted-col" : ""}>
                                    {track.artists.map((a, i) => (
                                        <span
                                            key={a.id}
                                            onClick={() => window.open(a.external_urls.spotify, '_blank')}
                                        >
                                            {a.name}{i < track.artists.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </td>
                                <td className={sortKey === "album" ? "sorted-col" : ""}>{track.album.name}</td>
                                <td>
                                    {[...new Set(
                                        track.artists.flatMap(a => artistsGenres[a.id] || [])
                                    )].map((genre, i) => (
                                        <span key={i} className="genre-pill">
                                            {genre}
                                        </span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Dashboard;