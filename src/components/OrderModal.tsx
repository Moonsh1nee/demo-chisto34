"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { CLEAN_TYPES, EXTRAS } from "@/data/content";
import { fmtRub } from "@/lib/calc";
import { orderSchema, type OrderInput } from "@/lib/orderSchema";
import { readJSON, writeJSON } from "@/lib/storage";
import { useApp } from "./AppProvider";

const DAYS = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export function OrderModal({ onClose }: { onClose: () => void }) {
  const { type, area, extras, sum } = useApp();
  const router = useRouter();
  const first = useRef<HTMLInputElement | null>(null);
  const dates = useMemo(() => {
    const now = Date.now();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now + (i + 1) * 864e5);
      return `${DAYS[d.getDay()]}, ${d.getDate()}.${("0" + (d.getMonth() + 1)).slice(-2)}`;
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderInput>({ resolver: zodResolver(orderSchema), defaultValues: { name: "", phone: "", date: dates[0] } });

  useEffect(() => {
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const submit = handleSubmit(async (v) => {
    await new Promise((r) => setTimeout(r, 600)); // имитация сети
    const list = readJSON<unknown[]>("orders", []);
    const no = String(1000 + Math.floor(Math.random() * 9000));
    list.push({ no, name: v.name.trim(), type: CLEAN_TYPES[type], area, sum, date: v.date, at: Date.now() });
    writeJSON("orders", list);
    writeJSON("last", { no, name: v.name.trim(), date: v.date });
    onClose();
    router.push(`/spasibo/?no=${no}`);
  });

  const { ref: nameRef, ...nameReg } = register("name");

  return (
    <div className="ov on" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="ord-t">
        <button className="x" type="button" onClick={onClose} aria-label="Закрыть">×</button>
        <h3 id="ord-t">Заявка на уборку</h3>
        <div className="sum">
          <b>{CLEAN_TYPES[type]}</b>, {area} м²
          {extras.length ? ", " + extras.map((i) => EXTRAS[i].name.toLowerCase()).join(", ") : ""}
          <br />
          Предварительно: <b>{fmtRub(sum)}</b>
        </div>
        <form onSubmit={submit} noValidate>
          <div className="row">
            <label htmlFor="fn">Как к вам обращаться</label>
            <input id="fn" placeholder="Мария" autoComplete="given-name" aria-invalid={!!errors.name} {...nameReg} ref={(e) => { nameRef(e); first.current = e; }} />
            {errors.name && <span className="err">{errors.name.message}</span>}
          </div>
          <div className="row">
            <label htmlFor="fp">Телефон</label>
            <input id="fp" inputMode="tel" autoComplete="tel" placeholder="+7 900 000-00-00" aria-invalid={!!errors.phone} {...register("phone")} />
            {errors.phone && <span className="err">{errors.phone.message}</span>}
          </div>
          <div className="row">
            <label htmlFor="fd">Удобная дата</label>
            <select id="fd" {...register("date")}>
              {dates.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <button className="btn sun" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Отправляем…" : "Отправить заявку"}
          </button>
          <div className="fine">Демо: заявка никуда не отправляется, а сохраняется только в вашем браузере.</div>
        </form>
      </div>
    </div>
  );
}
