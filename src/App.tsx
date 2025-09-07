import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import LoadingSpinner from './components/LoadingSpinner';

const AppInner: React.FC = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we should show login based on route
  const shouldShowLogin = !user && (
    location.pathname === '/login' || 
    location.pathname === '/register' || 
    location.pathname === '/app'
  );

  const loginMode = location.pathname === '/register' ? 'register' : 'login';

  // Redirect authenticated users from auth pages
  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/app', { replace: true });
    }
  }, [user, location.pathname, navigate]);

  if (isLoading) {
    return <LoadingSpinner message="weeme.ai yükleniyor..." size="lg" fullScreen />;
  }
  
  if (shouldShowLogin) {
    return <Login mode={loginMode} />;
  }

  if (!user) {
    navigate('/', { replace: true });
    return null;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppInner />
  </AuthProvider>
);

export default App;