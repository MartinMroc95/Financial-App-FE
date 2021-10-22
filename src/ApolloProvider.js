import React from 'react'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

import App from './App'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
