import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx';
import Cookies from 'js-cookie';
import './App.css'
import Page1 from './pages/Page1.jsx';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login.jsx';
import config from './config.js';

function useAuth() {
  // Function to clear all cookies
  const clearAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(Cookies.get('isLoggedIn') === 'true');
  const logoutTimeout = 5 * 60 * 1000; 
  const logoutTimer = React.useRef();

  // Function to reset the logout timer
  const resetLogoutTimer = React.useCallback(() => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(() => {
      clearAllCookies();
      setIsLoggedIn(false);
    }, logoutTimeout);
  }, [logoutTimeout]);

  React.useEffect(() => {
    // Clear all cookies when the application first loads
    if (!sessionStorage.getItem('hasLoaded')) {
      clearAllCookies();
      sessionStorage.setItem('hasLoaded', 'true');
    }

    // Set the initial logout timer
    resetLogoutTimer();

    // Set up event listeners for user activity
    window.addEventListener('mousemove', resetLogoutTimer);
    window.addEventListener('keydown', resetLogoutTimer);

    // Clear all cookies when the window is unloaded
    window.onbeforeunload = clearAllCookies;

    return () => {
      // Clear the logout timer and remove event listeners when the component unmounts
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      window.removeEventListener('mousemove', resetLogoutTimer);
      window.removeEventListener('keydown', resetLogoutTimer);
      window.onbeforeunload = null;
    };
  }, [resetLogoutTimer]);

  return [isLoggedIn, setIsLoggedIn];
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useAuth();
  const isTesting = config.isTesting;

  if (!isLoggedIn && !isTesting) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/*" element={<Navigate to="/" replace />} /> {/* Redirect to main page if none of the above routes match */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;