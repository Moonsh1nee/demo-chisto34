"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { calcHours, calcPrice } from "@/lib/calc";
import { OrderModal } from "./OrderModal";

type Ctx = {
  type: number;
  area: number;
  extras: number[];
  sum: number;
  hours: number;
  setType: (v: number) => void;
  setArea: (v: number) => void;
  toggleExtra: (i: number) => void;
  openOrder: () => void;
  toast: (m: string) => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function useApp(): Ctx {
  const c = useContext(AppCtx);
  if (!c) throw new Error("AppProvider missing");
  return c;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState(0);
  const [area, setArea] = useState(54);
  const [extras, setExtras] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [on, setOn] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const toast = useCallback((m: string) => {
    setMsg(m);
    setOn(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOn(false), 3200);
  }, []);

  // Анимации проявления включаются только после первой прокрутки
  useEffect(() => {
    const arm = () => document.documentElement.classList.add("armed");
    window.addEventListener("scroll", arm, { once: true, passive: true });
    return () => window.removeEventListener("scroll", arm);
  }, []);

  const sum = calcPrice(type, area, extras);
  const hours = calcHours(type, area, extras);

  const value: Ctx = {
    type,
    area,
    extras,
    sum,
    hours,
    setType,
    setArea,
    toggleExtra: (i) => setExtras((e) => (e.includes(i) ? e.filter((x) => x !== i) : [...e, i])),
    openOrder: () => setOpen(true),
    toast,
  };

  return (
    <AppCtx.Provider value={value}>
      {children}
      {open && <OrderModal onClose={() => setOpen(false)} />}
      <div className={"toast" + (on ? " on" : "")} role="status">
        {msg}
      </div>
    </AppCtx.Provider>
  );
}
