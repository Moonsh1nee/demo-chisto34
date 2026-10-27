import type { Metadata } from "next";
import Link from "next/link";
import { AppProvider } from "@/components/AppProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";

export const metadata: Metadata = { title: "Политика (демо) · Чисто34" };

export default function Page() {
  return (
    <AppProvider>
      <div className="site">
        <div className="demo-note">Демонстрационный сайт: компания, цены и отзывы вымышлены</div>
        <Header />
        <main>
          <section>
            <div className="w" style={{ maxWidth: 720 }}>
              <h1 className="h2">Политика конфиденциальности (демо)</h1>
              <p style={{ marginTop: 16 }}>
                Это демонстрационная страница. Организация «Чисто34» вымышлена, а настоящей политики здесь нет.
              </p>
              <p style={{ marginTop: 12 }}>
                Форма заявки на сайте ничего не передаёт на сервер: введённые имя и телефон сохраняются только в localStorage вашего браузера и пропадают, если очистить данные сайта.
              </p>
              <p style={{ marginTop: 12 }}>
                На рабочем сайте здесь будет политика обработки персональных данных, соответствующая 152-ФЗ.
              </p>
              <div style={{ marginTop: 24 }}>
                <Link className="btn" href="/">На главную</Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
