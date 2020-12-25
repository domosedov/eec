import { AppProps } from "next/app";
import { ThemeProvider as DarkThemeProvider } from "next-themes";
import "../styles/tailwind.css";
import "focus-visible";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DarkThemeProvider attribute="class">
      <Component {...pageProps} />
    </DarkThemeProvider>
  );
}

export default MyApp;
