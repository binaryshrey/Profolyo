import React from 'react';
import Home from './views/home/Home';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthContextProvider } from './hooks/AuthContext';
import { EditorContextProvider } from './hooks/EditorContext';
import { ProfileContextProvider } from './hooks/ProfileContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Login = React.lazy(() => import('./views/login/Login'));
const Register = React.lazy(() => import('./views/register/Register'));
const Redirect = React.lazy(() => import('./views/redirect/Redirect'));
const OnboardContainer = React.lazy(() => import('./views/onboard/OnboardContainer'));
const EditorContainer = React.lazy(() => import('./views/editor/EditorContainer'));
const EditorPreview = React.lazy(() => import('./views/editor/EditorPreview'));
const EditorPublish = React.lazy(() => import('./views/editor/EditorPublish'));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ProfileContextProvider>
            <EditorContextProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:profolyoID" element={<EditorPublish />} />
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
                  path="/redirect"
                  element={
                    <React.Suspense fallback={<></>}>
                      <ProtectedRoute>
                        <Redirect />
                      </ProtectedRoute>
                    </React.Suspense>
                  }
                />
                <Route
                  path="/editor"
                  element={
                    <React.Suspense fallback={<></>}>
                      <ProtectedRoute>
                        <EditorContainer />
                      </ProtectedRoute>
                    </React.Suspense>
                  }
                />
                <Route
                  path="/preview"
                  element={
                    <React.Suspense fallback={<></>}>
                      <ProtectedRoute>
                        <EditorPreview />
                      </ProtectedRoute>
                    </React.Suspense>
                  }
                />
              </Routes>
            </EditorContextProvider>
          </ProfileContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
