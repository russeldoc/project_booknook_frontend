"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "booknook");
  }, []);

  function toggle() {
    const next = theme === "booknook-dark" ? "booknook" : "booknook-dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("booknook-theme", next);
    } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
      title="Switch light / dark theme"
    >
      {theme === "booknook-dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
}
