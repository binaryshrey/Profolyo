import React from 'react';
import Home from './views/home/Home';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthContextProvider } from './hooks/AuthContext';
import { ProfileContextProvider } from './hooks/ProfileContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Login = React.lazy(() => import('./views/login/Login'));
const Register = React.lazy(() => import('./views/register/Register'));
const OnboardContainer = React.lazy(() => import('./views/onboard/OnboardContainer'));
const EditorContainer = React.lazy(() => import('./views/editor/EditorContainer'));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ProfileContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/onboard"
                element={
                  <React.Suspense fallback={<></>}>
                    <ProtectedRoute>
                      <OnboardContainer />
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
              <Route
                path="/editor"
                element={
                  <React.Suspense fallback={<></>}>
                    <EditorContainer />
                  </React.Suspense>
                }
              />
            </Routes>
          </ProfileContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
