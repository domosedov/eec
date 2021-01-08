import { AppProps } from "next/app";
import { ThemeProvider as DarkThemeProvider } from "next-themes";
import "../styles/tailwind.css";
import "focus-visible";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import MainLayout from "../components/layout/MainLayout";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <DefaultSeo {...SEO} />
      <ApolloProvider client={apolloClient}>
        <DarkThemeProvider attribute="class">
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </DarkThemeProvider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
