import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
  return (
    <button type="button" onClick={toggleTheme} aria-label={label} title={label}
      aria-pressed={theme === "dark"} className="theme-toggle">
      <span className="theme-moon"><FiMoon size={19} /><span className="theme-star">✦</span></span>
      <FiSun size={21} className="theme-sun" />
    </button>
  );
}
