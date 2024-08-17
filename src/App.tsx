import React from 'react';
import Home from './views/home/Home';
import { AuthContextProvider } from './hooks/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';

const Login = React.lazy(() => import('./views/login/Login'));
const Register = React.lazy(() => import('./views/register/Register'));
const Onboard = React.lazy(() => import('./views/onboard/Onboard'));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/onboard"
              element={
                <React.Suspense fallback={<></>}>
                  <ProtectedRoute>
                    <Onboard />
                  </ProtectedRoute>
                </React.Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <React.Suspense fallback={<></>}>
                  <Login />
                </React.Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <React.Suspense fallback={<></>}>
                  <Register />
                </React.Suspense>
              }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
