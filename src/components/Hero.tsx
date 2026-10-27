import { HERO_WORDS } from "@/data/content";
import { Calculator } from "./Calculator";

const BUBBLES: React.CSSProperties[] = [
  { width: 180, height: 180, right: -40, top: 20 },
  { width: 90, height: 90, left: "44%", bottom: 40, animationDelay: "-2s" },
  { width: 46, height: 46, right: "8%", bottom: "6%", animationDelay: "-4s" },
  { width: 30, height: 30, left: "52%", top: "14%", animationDelay: "-1s" },
];

export function Hero() {
  return (
    <section className="hero" id="top">
      {BUBBLES.map((s, i) => (
        <span key={i} className="bub" style={s} aria-hidden="true" />
      ))}
      <div className="w">
        <div>
          <div className="pill">
            <b>Волгоград</b> уборка квартир и офисов в день обращения
          </div>
          <h1>
            {HERO_WORDS.map((w, i) => (
              <span key={i}>
                {w === "захочется" ? (
                  <em className="wd" style={{ "--i": i } as React.CSSProperties}>
                    {w}
                  </em>
                ) : (
                  <span className="wd" style={{ "--i": i } as React.CSSProperties}>
                    {w}
                  </span>
                )}{" "}
              </span>
            ))}
          </h1>
          <p className="lead">
            Бригада из двух человек приезжает со своей химией и пылесосом. Цена фиксируется до начала
            работ, оплата после того, как вы приняли результат.
          </p>
          <div className="cta">
            <a className="btn" href="#calc">
              Рассчитать стоимость
            </a>
            <a className="btn ghost" href="#ba">
              Посмотреть результат
            </a>
          </div>
          <div className="perks">
            <span>Гарантия переделки 48 часов</span>
            <span>Без предоплаты</span>
            <span>Экологичная химия</span>
          </div>
        </div>
        <Calculator />
      </div>
    </section>
  );
}
