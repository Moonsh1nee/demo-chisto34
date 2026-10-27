import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import { THEME_SCRIPT } from "@/components/ThemeToggle";
import "./globals.css";

const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-onest", display: "swap" });
const unbounded = Unbounded({ subsets: ["latin", "cyrillic"], variable: "--font-unbounded", display: "swap" });

const title = "Чисто34: уборка квартир и офисов в Волгограде (демо)";
const description =
  "Демонстрационный сайт клининговой компании из портфолио студии Akimov Web. Компания, цены и отзывы вымышлены.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: { title, description, type: "website", locale: "ru_RU", siteName: "Чисто34 (демо)" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${onest.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
