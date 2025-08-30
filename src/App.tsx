import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Suggestions from './components/Suggestions';
import AIContent from './components/AIContent';
import PaymentModal from './components/PaymentModal';
import Login from './components/Login';
import LoadingSpinner from './components/LoadingSpinner';

type Tab = 'dashboard' | 'suggestions' | 'ai-content';

const AppInner: React.FC = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [billingOpen, setBillingOpen] = useState(false);

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

  useEffect(() => {
    const saved = localStorage.getItem('activeTab');
    if (saved === 'dashboard' || saved === 'suggestions' || saved === 'ai-content') {
      setActiveTab(saved);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

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
    <>
      <Layout
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t)}
        onOpenBilling={() => setBillingOpen(true)}
        onLogout={() => {
          setActiveTab('dashboard');
          navigate('/', { replace: true });
        }}
      >
        {activeTab === 'dashboard' && <Dashboard onOpenBilling={() => setBillingOpen(true)} />}
        {activeTab === 'suggestions' && <Suggestions onOpenBilling={() => setBillingOpen(true)} />}
        {activeTab === 'ai-content' && <AIContent />}
      </Layout>

      <PaymentModal isOpen={billingOpen} onClose={() => setBillingOpen(false)} />
    </>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppInner />
  </AuthProvider>
);

export default App;
