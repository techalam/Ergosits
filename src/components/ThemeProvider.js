import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);
export const THEME_KEY = "ergosits-theme";

// Runs before the first paint so a saved preference never flashes the wrong theme.
export const themeScript = `(function(){var t;try{t=localStorage.getItem('${THEME_KEY}')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t})()`;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#111418" : "#ffffff");
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let saved;
      try { saved = localStorage.getItem(THEME_KEY); } catch {}
      const next = saved === "light" || saved === "dark" ? saved : media.matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(THEME_KEY, next); } catch {}
    applyTheme(next);
    setTheme(next);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
