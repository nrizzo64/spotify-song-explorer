import { useEffect, useState } from 'react';
import './AlbumImageModal.css';

const AlbumImageModal = ({ imageUrl, onClose }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <div className="album-modal-backdrop" onClick={onClose}>
            <img
                src={imageUrl}
                className={`album-modal-img ${show ? 'show' : ''}`}
                onClick={(e) => e.stopPropagation()}
                alt="Album Cover"
            />
        </div>
    );
};

export default AlbumImageModal;