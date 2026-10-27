import { AppProvider } from "@/components/AppProvider";
import { Facts } from "@/components/Facts";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Faq, FinalCta, Footer, Marquee, Prices, Result, Reviews, Services, Steps } from "@/components/Sections";
import { StickyCall } from "@/components/StickyCall";

export default function Home() {
  return (
    <AppProvider>
      <div className="site">
        <a className="skip" href="#main">К содержимому</a>
        <div className="demo-note">Демонстрационный сайт: компания, цены и отзывы вымышлены</div>
        <Header />
        <main id="main">
          <Hero />
          <Facts />
          <Marquee />
          <Services />
          <Result />
          <Steps />
          <Prices />
          <Reviews />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <StickyCall />
      </div>
    </AppProvider>
  );
}
