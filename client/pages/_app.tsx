import { AppProps } from "next/app";
import { ThemeProvider as DarkThemeProvider } from "next-themes";
import "../styles/tailwind.css";
import "focus-visible";
import {ApolloProvider} from '@apollo/client'
import {useApollo} from "../lib/apolloClient";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const apolloClient = useApollo(pageProps.initialApolloState)

  return (
      <ApolloProvider client={apolloClient}>
          <DarkThemeProvider attribute="class">
              <Component {...pageProps} />
          </DarkThemeProvider>
      </ApolloProvider>
  );
}

export default MyApp;
