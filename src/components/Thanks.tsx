"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readJSON } from "@/lib/storage";

export function Thanks() {
  const [info, setInfo] = useState<{ no: string; name: string; date: string } | null>(null);
  useEffect(() => {
    setInfo(readJSON<{ no: string; name: string; date: string } | null>("last", null));
  }, []);
  return (
    <section>
      <div className="w" style={{ maxWidth: 640 }}>
        <div className="ok">
          <div className="big">✓</div>
          <h1 className="h2">Заявка принята</h1>
          {info ? (
            <p style={{ color: "var(--mute)", marginTop: 12 }}>
              {info.name}, номер вашей заявки: <b>№{info.no}</b>. Дата уборки: {info.date}.
            </p>
          ) : null}
          <p style={{ color: "var(--mute)", marginTop: 12 }}>
            Это демо: заявка никуда не отправлена и сохранена только в вашем браузере. На рабочем сайте мы перезвонили бы за 10 минут, назвали итоговую цену и зафиксировали её в договоре.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link className="btn" href="/">На главную</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
