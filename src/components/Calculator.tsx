"use client";

import { CLEAN_TYPES, EXTRAS } from "@/data/content";
import { fmtRub } from "@/lib/calc";
import { useApp } from "./AppProvider";
import { OrderButton } from "./OrderButton";

export function Calculator() {
  const { type, area, extras, sum, hours, setType, setArea, toggleExtra } = useApp();
  return (
    <div className="calc" id="calc">
      <h3>Калькулятор уборки</h3>
      <div className="sub">Итоговая цена считается по тарифам ниже</div>
      <div className="seg3" role="group" aria-label="Тип уборки">
        {CLEAN_TYPES.map((n, i) => (
          <button key={n} type="button" aria-pressed={type === i} onClick={() => setType(i)}>
            {n}
          </button>
        ))}
      </div>
      <div className="fld">
        <div className="l">
          <label htmlFor="area">Площадь</label>
          <output htmlFor="area">{area} м²</output>
        </div>
        <input
          type="range"
          id="area"
          min={20}
          max={200}
          value={area}
          onChange={(e) => setArea(+e.target.value)}
        />
      </div>
      <div className="fld">
        <div className="l">
          <span>Дополнительно</span>
        </div>
        <div className="chk">
          {EXTRAS.map((x, i) => (
            <label key={x.name}>
              <input type="checkbox" checked={extras.includes(i)} onChange={() => toggleExtra(i)} />
              {x.name}
              <small>+{x.price}</small>
            </label>
          ))}
        </div>
      </div>
      <div className="total">
        <div>
          <div className="t" style={{ textAlign: "left" }}>
            ≈ {hours} {hours < 5 ? "часа" : "часов"}, 2 человека
          </div>
          <div className="p" aria-live="polite">
            {fmtRub(sum)}
          </div>
        </div>
        <div className="t">
          Фиксируем цену
          <br />
          до начала работ
        </div>
      </div>
      <OrderButton>Оставить заявку</OrderButton>
    </div>
  );
}
