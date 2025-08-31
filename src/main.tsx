import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './i18n';
import './index.css';
import App from './App';
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary';
import { validateEnvironment } from './lib/config';

// Validate environment on startup
try {
  validateEnvironment();
} catch (error) {
  console.error('[CONFIG] Environment validation failed:', error);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<App />} />
          <Route path="/login" element={<App />} />
          <Route path="/register" element={<App />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
