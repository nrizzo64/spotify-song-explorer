import './App.css'
import './components/Header.css'
import Tracks from './components/Tracks.jsx'
import Header from './components/Header.jsx'
import LoginModal from './components/LoginModal.jsx'
import { useAuth } from "./auth/AuthProvider.jsx";


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated && <LoginModal />
        ||
        <div>
          <Header />
          <Tracks />
        </div>}

    </>

  )
}

export default App
