import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Cart from './pages/Cart';
import Welcome from './pages/Welcome';
import Scan from './pages/Scan';
import ProtectRoutes from './components/ProtectRoutes';
import OpenRoutes from './components/OpenRoutes';
import { ToastProvider } from './context/ToastContext';
import FindYourAccount from './pages/FindYourAccount';

// import AuthenticatedLayout from './components/AuthenticatedLayout';
const App = () => {

  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/t/:slug" element={<Welcome />} />
          <Route path="/scan" element={<Scan />} />
          <Route
            path="/"
            element={
              //required accessToken to get this page
              <ProtectRoutes>
                <Homepage />
              </ProtectRoutes>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectRoutes>
                <Cart />
              </ProtectRoutes>
            }
          />

          <Route
            path="/login"
            element={
              <OpenRoutes>
                <Login />
              </OpenRoutes>
            }
          />
          <Route
            path="/recovery"
            element={
              <OpenRoutes>
                <FindYourAccount />
              </OpenRoutes>
            }
          />

          <Route
            path="/register"
            element={
              <OpenRoutes>
                <Register />
              </OpenRoutes>
            }
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;