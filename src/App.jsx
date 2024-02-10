
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './pages/login/Login.jsx';
import config from './main_components/config.js';

import Admin from './layouts/Admin.jsx';

function useAuth() {
  // Function to clear isLoggedIn cookie
  const clearIsLoggedInCookie = () => {
    document.cookie = 'isLoggedIn=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(Cookies.get('isLoggedIn') === 'true');
  const logoutTimeout = 5 * 60 * 1000; 
  const logoutTimer = React.useRef();

  // Function to reset the logout timer
  const resetLogoutTimer = React.useCallback(() => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(() => {
      clearIsLoggedInCookie();
      setIsLoggedIn(false);
    }, logoutTimeout);
  }, [logoutTimeout]);

  React.useEffect(() => {
    // Clear isLoggedIn cookie when the application first loads
    if (!sessionStorage.getItem('hasLoaded')) {
      clearIsLoggedInCookie();
      sessionStorage.setItem('hasLoaded', 'true');
    }

    // Set the initial logout timer
    resetLogoutTimer();

    // Set up event listeners for user activity
    window.addEventListener('mousemove', resetLogoutTimer);
    window.addEventListener('keydown', resetLogoutTimer);

    // Clear isLoggedIn cookie when the window is unloaded
    window.onbeforeunload = clearIsLoggedInCookie;

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
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default App;