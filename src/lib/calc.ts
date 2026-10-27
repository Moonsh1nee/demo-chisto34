import { AREA_PER_HOUR, EXTRAS, MIN_ORDER, RATE } from "@/data/content";

export function calcPrice(type: number, area: number, extras: number[]): number {
  let s = RATE[type] * area;
  extras.forEach((i) => (s += EXTRAS[i].price));
  return Math.max(MIN_ORDER, Math.round(s / 50) * 50);
}

export function calcHours(type: number, area: number, extras: number[]): number {
  return Math.max(2, Math.round(area / AREA_PER_HOUR[type] + extras.length * 0.4));
}

export function fmtRub(n: number): string {
  return n.toLocaleString("ru-RU").replace(/\s/g, " ") + " ₽";
}
