import React, { useMemo } from 'react'
import { useAuth } from "../auth/AuthProvider.jsx";
import { useSpotifyUser } from '../hooks/useSpotifyUser';

function Header() {
    const { logout } = useAuth();
    const { user, loading, error } = useSpotifyUser();
    const userInitials = useMemo(() => {
        if (user?.display_name) {
          return getInitials(user.display_name);
        }
        return '';
      }, [user]);
    

    return (
        <div className="header">
            <h1>Your Top 50 Explorer</h1>
            <div className="header-right">
                <p>{userInitials}</p>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

function getInitials(name) {
    const matches = name.match(/(?:^|[ \-_])([a-zA-Z])/g);
    if (!matches) return '';
    return matches.map(ch => ch.slice(-1).toUpperCase()).join('');
  }

export default Header;