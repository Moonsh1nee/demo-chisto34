"use client";

import { writeRaw } from "@/lib/storage";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme:dark)").matches;
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    writeRaw("demo-theme", next);
  };
  return (
    <button type="button" className="thm-btn" onClick={toggle} aria-label="Сменить тему">
      Тема
    </button>
  );
}

export const THEME_SCRIPT = `try{var t=localStorage.getItem('demo-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;
