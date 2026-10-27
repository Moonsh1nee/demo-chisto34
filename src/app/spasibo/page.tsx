import type { Metadata } from "next";
import { AppProvider } from "@/components/AppProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { Thanks } from "@/components/Thanks";

export const metadata: Metadata = { title: "Заявка принята (демо) · Чисто34" };

export default function Page() {
  return (
    <AppProvider>
      <div className="site">
        <div className="demo-note">Демонстрационный сайт: компания, цены и отзывы вымышлены</div>
        <Header />
        <main>
          <Thanks />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
