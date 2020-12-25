/**
 * Example from https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
 */
import {useMemo} from 'react'
import {ApolloClient, InMemoryCache, NormalizedCacheObject} from '@apollo/client'
import {createUploadLink} from "apollo-upload-client"
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = () => {
    return new ApolloClient({
        link: createUploadLink({
            uri: process.env.NODE_ENV === 'production' ? 'https://domosedov-dev.info/graphql' : 'http://localhost:8080/graphql',
        }),
        cache: new InMemoryCache(),
        ssrMode: typeof window === 'undefined',
        credentials: "include"
    })
}

export const initializeApollo = (initialState: NormalizedCacheObject | null = null) => {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = _apolloClient.extract();

        const data = merge(initialState, existingCache, {

            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        })

        _apolloClient.cache.restore(data);
    }

    if (typeof window === 'undefined') return _apolloClient

    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export const useApollo = (initialState: NormalizedCacheObject | null | undefined) => {
    return useMemo(() => initializeApollo(initialState), [initialState]);
}
