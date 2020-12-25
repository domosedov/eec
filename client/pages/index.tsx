import Head from "next/head";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white text-black dark:bg-black dark:text-white">
        <h1>Main content</h1>
        <button onClick={switchTheme}>Switch theme</button>
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
