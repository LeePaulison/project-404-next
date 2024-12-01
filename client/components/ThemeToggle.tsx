"use client";

import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Sync the theme with the <html> element
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("class", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("class", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className='ml-auto p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
