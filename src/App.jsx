import Header from './components/Header.jsx'
import LoginModal from './components/LoginModal.jsx'
import { useAuth } from "./auth/AuthProvider.jsx";
import Dashboard from './components/Dashboard.jsx'


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated && <LoginModal />
        ||
        <div>
          <Header />
          <Dashboard />
        </div>}
    </>

  )
}

export default App
