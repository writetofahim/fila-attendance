import { useEffect, useState } from "react";

export default function useDarkMode() {
  const storedTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(storedTheme);
  const colorTheme = theme === "dark" ? "light" : "dark";
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    return () => {};
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
