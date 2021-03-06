import { useMemo } from "react";
import {
  ApolloClient,
  from,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { cache } from "./cache";
import { getMainDefinition } from "@apollo/client/utilities";

const __isBrowser__ = typeof window !== "undefined";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_SSR_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://domosedov-dev.info/graphql"
      : "http://localhost:8080/graphql",
  credentials: "include",
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `ws://localhost:8080/graphql`,
      options: {
        reconnect: true,
      },
    })
  : null;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink!,
      httpLink
    )
  : httpLink;

const createApolloClient = () => {
  return new ApolloClient({
    link: from([errorLink, splitLink]),
    cache,
    ssrMode: !__isBrowser__,
  });
};

export const initializeApollo = (initialState?: NormalizedCacheObject) => {
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
    });

    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  return useMemo(() => initializeApollo(state), [state]);
};
