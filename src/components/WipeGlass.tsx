"use client";

import { useCallback, useEffect, useRef } from "react";
import { useApp } from "./AppProvider";

const GX = 28;
const GY = 20;

function Scene() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8f7f8" />
          <stop offset="1" stopColor="#cfeef0" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill="url(#wg)" />
      <rect y="150" width="320" height="70" fill="#e9c88f" />
      <g stroke="#d5b277" strokeWidth="1">
        <path d="M0 168h320M0 188h320M0 208h320M60 150v70M150 150v70M240 150v70" />
      </g>
      <rect x="200" y="30" width="86" height="86" rx="6" fill="#9fdcf0" />
      <path d="M243 30v86M200 73h86" stroke="#fff" strokeWidth="5" />
      <rect x="198" y="28" width="90" height="90" rx="8" fill="none" stroke="#fff" strokeWidth="5" />
      <rect x="30" y="104" width="130" height="52" rx="14" fill="#0fb3c2" />
      <rect x="22" y="118" width="26" height="40" rx="10" fill="#0a8f9c" />
      <rect x="142" y="118" width="26" height="40" rx="10" fill="#0a8f9c" />
      <ellipse cx="170" cy="190" rx="70" ry="12" fill="#ffd23f" opacity=".85" />
      <rect x="274" y="130" width="22" height="26" rx="4" fill="#c97a4b" />
      <path d="M285 130c-14-20-8-34 0-46 8 12 14 26 0 46z" fill="#3fae6a" />
      <g fill="#fff">
        <path d="M120 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3zM60 70l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM170 60l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
      </g>
    </svg>
  );
}

export function WipeGlass() {
  const { toast } = useApp();
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const pt = useRef<HTMLSpanElement>(null);
  const pr = useRef<HTMLDivElement>(null);
  const s = useRef({ W: 0, H: 0, cells: new Uint8Array(GX * GY), done: false, drawing: false, lx: 0, ly: 0, auto: false });

  const prog = (p: number) => {
    if (pt.current) pt.current.textContent = `Чисто на ${p}%`;
    if (pr.current) pr.current.style.width = p + "%";
  };

  const finish = useCallback(() => {
    const st = s.current;
    const c = cv.current;
    if (!c || st.done) return;
    st.done = true;
    if (hint.current) hint.current.style.opacity = "0";
    const cx = c.getContext("2d")!;
    cx.globalCompositeOperation = "destination-out";
    cx.fillRect(0, 0, st.W, st.H);
    prog(100);
    if (!matchMedia("(prefers-reduced-motion:reduce)").matches) {
      for (let i = 0; i < 7; i++) {
        const sp = document.createElement("span");
        sp.className = "spk";
        sp.setAttribute("aria-hidden", "true");
        sp.textContent = "✦";
        sp.style.left = 10 + Math.random() * 80 + "%";
        sp.style.top = 10 + Math.random() * 70 + "%";
        sp.style.animationDelay = i * 90 + "ms";
        wrap.current?.appendChild(sp);
        setTimeout(() => sp.remove(), 1600);
      }
    }
    toast("Вот так выглядит результат. Теперь рассчитайте цену");
  }, [toast]);

  const dirt = useCallback(() => {
    const c = cv.current;
    if (!c) return;
    const st = s.current;
    const r = c.getBoundingClientRect();
    st.W = c.width = Math.max(10, Math.round(r.width));
    st.H = c.height = Math.max(10, Math.round(r.height));
    const { W, H } = st;
    const cx = c.getContext("2d")!;
    cx.globalCompositeOperation = "source-over";
    cx.fillStyle = "rgba(98,86,62,.86)";
    cx.fillRect(0, 0, W, H);
    let seed = 7;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 46; i++) {
      const x = rnd() * W, y = rnd() * H, rad = 20 + rnd() * 60;
      const g = cx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, "rgba(55,46,30,.55)");
      g.addColorStop(1, "rgba(55,46,30,0)");
      cx.fillStyle = g;
      cx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }
    cx.strokeStyle = "rgba(40,34,22,.35)";
    cx.lineWidth = 2;
    for (let k = 0; k < 14; k++) {
      const sx = rnd() * W, sy = rnd() * H;
      cx.beginPath();
      cx.moveTo(sx, sy);
      cx.lineTo(sx + rnd() * 40 - 20, sy + 30 + rnd() * 70);
      cx.stroke();
    }
    st.cells.fill(0);
    st.done = false;
    if (hint.current) hint.current.style.opacity = "1";
    prog(0);
  }, []);

  const erase = useCallback(
    (x: number, y: number) => {
      const st = s.current;
      const c = cv.current;
      if (!c) return;
      const { W, H, cells } = st;
      const cx = c.getContext("2d")!;
      cx.globalCompositeOperation = "destination-out";
      const rad = Math.max(22, W * 0.055);
      cx.lineCap = "round";
      cx.lineWidth = rad * 2;
      cx.beginPath();
      cx.moveTo(st.lx, st.ly);
      cx.lineTo(x, y);
      cx.stroke();
      const gx0 = Math.floor(((x - rad) / W) * GX), gx1 = Math.floor(((x + rad) / W) * GX);
      const gy0 = Math.floor(((y - rad) / H) * GY), gy1 = Math.floor(((y + rad) / H) * GY);
      for (let gx = gx0; gx <= gx1; gx++)
        for (let gy = gy0; gy <= gy1; gy++) {
          if (gx < 0 || gy < 0 || gx >= GX || gy >= GY) continue;
          if (Math.hypot(((gx + 0.5) / GX) * W - x, ((gy + 0.5) / GY) * H - y) < rad) cells[gx * GY + gy] = 1;
        }
      let n = 0;
      for (let i = 0; i < cells.length; i++) n += cells[i];
      const p = Math.min(100, Math.round(((n / cells.length) * 100) / 0.9));
      prog(p);
      if (p >= 100 && !st.done) finish();
      st.lx = x;
      st.ly = y;
    },
    [finish],
  );

  useEffect(() => {
    dirt();
    const c = cv.current;
    if (!c || !window.ResizeObserver) return;
    const ro = new ResizeObserver(() => {
      const st = s.current;
      if (!st.done && Math.abs(c.getBoundingClientRect().width - st.W) > 4) dirt();
    });
    ro.observe(c);
    return () => ro.disconnect();
  }, [dirt]);

  const pos = (e: React.PointerEvent) => {
    const c = cv.current!;
    const r = c.getBoundingClientRect();
    const st = s.current;
    return [(e.clientX - r.left) * (st.W / r.width), (e.clientY - r.top) * (st.H / r.height)];
  };

  const auto = () => {
    const st = s.current;
    if (st.done || st.auto) return;
    st.auto = true;
    const seq: number[][] = [];
    for (let r = 0; r < 7; r++) seq.push([r % 2 ? 0.95 : 0.05, (r + 0.5) / 7]);
    let k = 0;
    st.lx = st.W * 0.05;
    st.ly = st.H * 0.07;
    const step = () => {
      if (st.done) { st.auto = false; return; }
      if (k >= seq.length) { st.auto = false; finish(); return; }
      const tx = seq[k][0] * st.W, ty = seq[k][1] * st.H;
      let n = 0;
      const seg = () => {
        n++;
        erase(st.lx + (tx - st.lx) * 0.14, st.ly + (ty - st.ly) * 0.14);
        if (n < 22 && !st.done) requestAnimationFrame(seg);
        else { k++; step(); }
      };
      seg();
    };
    step();
  };

  return (
    <div>
      <div className="wipe" ref={wrap}>
        <div id="wSc"><Scene /></div>
        <canvas
          ref={cv}
          role="img"
          aria-label="Протрите грязь, чтобы увидеть чистую комнату"
          onPointerDown={(e) => {
            const st = s.current;
            if (st.done) return;
            st.drawing = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            const [x, y] = pos(e);
            st.lx = x;
            st.ly = y;
            erase(x + 0.01, y);
            if (hint.current) hint.current.style.opacity = "0";
          }}
          onPointerMove={(e) => {
            const st = s.current;
            if (!st.drawing || st.done) return;
            const [x, y] = pos(e);
            erase(x, y);
          }}
          onPointerUp={() => (s.current.drawing = false)}
          onPointerCancel={() => (s.current.drawing = false)}
        />
        <div className="wh" ref={hint}>Сотрите грязь пальцем или мышью</div>
        <span className="wpt" ref={pt}>Чисто на 0%</span>
        <div className="wpr" ref={pr} />
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn sun" type="button" onClick={auto}>Показать результат</button>
        <button className="btn ghost" type="button" onClick={dirt}>Запачкать снова</button>
      </div>
    </div>
  );
}
