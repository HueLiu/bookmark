import { useEffect, useState } from "react";
import Sun from "../assets/sun.svg";
import Moon from "../assets/moon.svg";

const ThemeToggleButton: React.FC = () => {
  const [isLight, setIsLight] = useState<boolean>(true);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    if (isLight) {
      setIsLight(false);
    } else {
      setIsLight(true);
    }
  };

  useEffect(() => {
    const prefersDarkTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsLight(!prefersDarkTheme);

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", event => {
        setIsLight(!event.matches);
      });
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Switch theme"
        className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:pintree-bg-gray-900 dark:ring-white/10 dark:hover:ring-white/20"
        onClick={toggleTheme}
      >
        {isLight ? (
          <Sun className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
        ) : (
          <Moon className="h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggleButton;
