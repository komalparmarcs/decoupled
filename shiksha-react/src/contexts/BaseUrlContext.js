import React, { createContext, useContext } from 'react';

// Create a Context for the base URL
const BaseUrlContext = createContext();

// Create a provider component
export const BaseUrlProvider = ({ children }) => {
  const BASE_URL = 'https://shiksha-drupal.ddev.site:8443';

  return (
    <BaseUrlContext.Provider value={BASE_URL}>
      {children}
    </BaseUrlContext.Provider>
  );
};

// Create a custom hook to use the Base URL context
export const useBaseUrl = () => {
  return useContext(BaseUrlContext);
};
