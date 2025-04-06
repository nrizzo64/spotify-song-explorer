import React from 'react'
import { useAuth } from "../auth/AuthProvider.jsx";

function Header() {
    const { logout } = useAuth();
    return (
        <div className="header">
            <h1>Spotify Song Explorer</h1>
            <div className="header-right">
                <p>NR</p>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Header;