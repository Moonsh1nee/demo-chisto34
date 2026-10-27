"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV } from "@/data/content";
import { OrderButton } from "./OrderButton";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="hdwrap">
      <header className="hd">
        <div className="w">
          <Link className="logo" href="/">
            <i />
            Чисто34
          </Link>
          <nav className="nav" aria-label="Разделы">
            {NAV.map((n) => (
              <Link key={n.id} href={`/#${n.id}`}>
                {n.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <OrderButton>Заказать уборку</OrderButton>
          <button
            type="button"
            className="burger"
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </header>
      <nav className={"menu" + (open ? " open" : "")} aria-label="Меню">
        {NAV.map((n) => (
          <Link key={n.id} href={`/#${n.id}`} onClick={() => setOpen(false)}>
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
