import { useState, useEffect } from 'react'
import './App.css'
import './components/Header.css'
import './components/Dashboard.css'
import BarChartFeature from './components/BarChartFeature.jsx'
import Tracks from './components/Tracks.jsx'
import Header from './components/Header.jsx'
import LoginModal from './components/LoginModal.jsx'
import { useAuth } from "./auth/AuthProvider.jsx";


function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, login } = useAuth();
  console.log("App")
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  return (
    <>
      {showLoginModal && <LoginModal />
        || <div className="wrapper">
          <Header />

          <div className="dashboard">
            <Tracks />
          </div>
        </div>}

    </>

  )
}

export default App
