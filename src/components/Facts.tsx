"use client";

import { useEffect, useRef, useState } from "react";
import { FACTS } from "@/data/content";

const fmt = (n: number) => Math.round(n).toLocaleString("ru-RU");

function Fact({ to, pre, suf, label }: (typeof FACTS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || !to || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      let t0 = 0;
      const f = (t: number) => {
        if (!t0) t0 = t;
        const k = Math.min(1, (t - t0) / 1300);
        setV(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) raf = requestAnimationFrame(f);
      };
      setV(0);
      raf = requestAnimationFrame(f);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <div ref={ref}>
      <b>
        {pre}
        {fmt(v)}
        {suf}
      </b>
      <span>{label}</span>
    </div>
  );
}

export function Facts() {
  return (
    <div className="strip">
      <div className="w">
        {FACTS.map((f) => (
          <Fact key={f.label} {...f} />
        ))}
      </div>
    </div>
  );
}
