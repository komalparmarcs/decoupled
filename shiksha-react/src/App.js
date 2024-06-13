import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import AppContent from './components/AppContent';
import { BaseUrlProvider } from './contexts/BaseUrlContext';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <BaseUrlProvider>
          <AppContent />
        </BaseUrlProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
