"use client";

import { OrderButton } from "./OrderButton";

export function StickyCall() {
  return (
    <div className="sticky-call">
      <OrderButton>Заказать уборку</OrderButton>
      <a className="btn" href="#calc">Рассчитать</a>
    </div>
  );
}
