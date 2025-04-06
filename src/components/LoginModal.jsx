
import { useAuth } from "../auth/AuthProvider.jsx";
import './LoginModal.css';
function LoginModal() {

    const { login } = useAuth();

    return (
        <div className="modal">
          <div className="modal-content">
            <h2>Connect to Spotify</h2>
            <p>This app needs access to your Spotify account to work.</p>
            <button onClick={login}>Login with Spotify</button>
          </div>
        </div>
    );
}

export default LoginModal;
