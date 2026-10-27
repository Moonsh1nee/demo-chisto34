"use client";

import { useEffect, useRef } from "react";

// Блок виден по умолчанию; скрывается (через .armed) только после первой прокрутки,
// и только если ещё не попадал в экран.
export function Reveal({ className = "", delay, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={"r " + className} style={delay ? ({ "--d": `${delay}s` } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
