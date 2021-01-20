import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import HeroIcon from "./common/HeroIcon";

const ThemeSwitcher = () => {
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

  if (!isMounted) return null;

  return (
    <button
      className="rounded-full outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-500"
      onClick={switchTheme}
      aria-label="Toggle Theme Button"
    >
      <HeroIcon
        name={theme === "light" ? "moon" : "sun"}
        className={`w-8 h-8 fill-current pointer-events-none ${
          theme === "light" ? "text-indigo-400" : "text-yellow-400"
        }`}
      />
    </button>
  );
};

export default ThemeSwitcher;
