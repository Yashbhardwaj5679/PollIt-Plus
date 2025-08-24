import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/layout/Layout';

// Lazy load pages for code splitting
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const CreatePollPage = React.lazy(() => import('./pages/CreatePollPage'));
const PollDetailsPage = React.lazy(() => import('./pages/PollDetailsPage'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('pollit_token');
  
  if (!token) {
    return <HomePage />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <Suspense fallback={<PageLoader />}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path="auth/login"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <LoginPage />
                  </Suspense>
                }
              />
              <Route
                path="auth/register"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <RegisterPage />
                  </Suspense>
                }
              />
              <Route
                path="dashboard"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="polls/create"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ProtectedRoute>
                      <CreatePollPage />
                    </ProtectedRoute>
                  </Suspense>
                }
              />
              <Route
                path="polls/:id"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PollDetailsPage />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;