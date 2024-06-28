import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import AppContent from './components/AppContent';
import { BaseUrlProvider } from './contexts/BaseUrlContext';
import { ApolloProvider } from '@apollo/client';
import client from './contexts/ApolloClient';

const App = () => {
  return (
    <ApolloProvider client={client}>
    <Router>
      <ErrorBoundary>
        <BaseUrlProvider>
          <AppContent />
        </BaseUrlProvider>
      </ErrorBoundary>
    </Router>
      </ApolloProvider>
  );
};

export default App;
