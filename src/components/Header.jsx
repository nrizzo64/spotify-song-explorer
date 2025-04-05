import React from 'react'

function Header() {
    return (
        <div className="header">
            <h1>Spotify Song Explorer</h1>
            <div className="header-right">
                <p>NR</p>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Header;