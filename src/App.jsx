import Header from './components/Header.jsx'
import LoginModal from './components/LoginModal.jsx'
import { useAuth } from "./auth/AuthProvider.jsx";
import Dashboard from './components/Dashboard.jsx'
import { useEffect, useState } from 'react';

function App() {
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <>
      {!isAuthenticated && <LoginModal />
        ||
        <div>
          <Header toggleTheme={toggleTheme}/>
          <Dashboard />
        </div>}
    </>

  )
}

export default App
