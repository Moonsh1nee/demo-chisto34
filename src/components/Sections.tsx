import Link from "next/link";
import { DISTRICTS, FAQ, MARQUEE, PRICES, REVIEWS, SERVICES, STEPS } from "@/data/content";
import { OrderButton } from "./OrderButton";
import { Reveal } from "./Reveal";
import { WipeGlass } from "./WipeGlass";

export function Marquee() {
  return (
    <section className="mq" aria-hidden="true">
      <div>
        {MARQUEE.map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="uslugi">
      <div className="w">
        <div className="sec-h">
          <div className="kick">Услуги</div>
          <h2 className="h2">Три формата уборки на любой случай</h2>
          <p>Состав работ прописан в договоре, чтобы вы не спорили о том, что считалось уборкой.</p>
        </div>
        <div className="cards">
          {SERVICES.map((s) => (
            <Reveal key={s.title} className="card">
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d={s.icon} />
                </svg>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <div className="pr">{s.price}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Result() {
  return (
    <section id="ba" style={{ background: "var(--tint)" }}>
      <div className="w ba-wrap">
        <div>
          <div className="kick">Результат</div>
          <h2 className="h2">Протрите грязь и посмотрите сами</h2>
          <p style={{ color: "var(--mute)", marginTop: 14 }}>
            Так бригада работает на объекте. Здесь иллюстрация, а на рабочем сайте будут настоящие фото до и после.
          </p>
          <div style={{ marginTop: 22 }}>
            <a className="btn" href="#calc">Хочу так же</a>
          </div>
        </div>
        <WipeGlass />
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <section id="kak">
      <div className="w">
        <div className="sec-h">
          <div className="kick">Как работаем</div>
          <h2 className="h2">От заявки до чистой квартиры за четыре шага</h2>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.t}>
              <b>{s.t}</b>
              <p>{s.p}</p>
              <small>{s.s}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Prices() {
  return (
    <section id="price" style={{ background: "var(--tint)" }}>
      <div className="w">
        <div className="sec-h">
          <div className="kick">Цены</div>
          <h2 className="h2">Прайс без звёздочек</h2>
        </div>
        <div className="tw">
          <table className="price">
            <thead>
              <tr><th>Услуга</th><th>Единица</th><th>Цена</th></tr>
            </thead>
            <tbody>
              {PRICES.map((r) => (
                <tr key={r[0]}>
                  <td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section id="otz">
      <div className="w">
        <div className="sec-h">
          <div className="kick">Отзывы</div>
          <h2 className="h2">Что пишут клиенты</h2>
          <p>Тексты ниже написаны для демонстрации. На рабочем сайте здесь будут настоящие отзывы со ссылками на карты.</p>
        </div>
        <div className="rv">
          {REVIEWS.map((r) => (
            <figure key={r.who}>
              <div className="st" aria-label={`Оценка: ${r.stars.replace(/☆/g, "").length} из 5`}>{r.stars}</div>
              <blockquote>{r.text}</blockquote>
              <figcaption>
                {r.who}
                <span>{r.where}, демонстрационный отзыв</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" style={{ background: "var(--tint)" }}>
      <div className="w">
        <div className="sec-h">
          <div className="kick">Вопросы</div>
          <h2 className="h2">Что обычно спрашивают</h2>
        </div>
        <div className="faq">
          {FAQ.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section>
      <div className="w">
        <div className="cta-b">
          <div>
            <h2>Назовите удобное время, остальное мы возьмём на себя</h2>
            <p>Перезвоним за 10 минут в рабочее время с 8:00 до 21:00.</p>
          </div>
          <OrderButton className="btn">Оставить заявку</OrderButton>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="ft">
      <div className="w">
        <div>
          <b style={{ color: "var(--ink)" }}>Чисто34</b>
          <br />
          Демо-проект студии Akimov Web. Организация вымышлена.
          <div className="chips">
            {DISTRICTS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
        <div>
          Телефон: 8 (000) 000-00-00
          <br />
          Ежедневно 8:00 – 21:00
          <br />
          г. Волгоград (вымышленный адрес)
          <br />
          <Link href="/privacy/" style={{ textDecoration: "underline" }}>Политика (демо)</Link>
        </div>
      </div>
    </footer>
  );
}
