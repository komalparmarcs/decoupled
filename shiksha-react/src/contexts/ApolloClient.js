// src/ApolloClient.js

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://shiksha-drupal.ddev.site:8443/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;
