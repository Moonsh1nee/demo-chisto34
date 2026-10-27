# Чисто34 · демо-сайт клининговой компании

Демонстрационный сайт для портфолио студии Akimov Web. Компания, цены, телефон и отзывы вымышлены. Бэкенда нет: заявки и расчёты работают на фронтенде, данные сохраняются только в localStorage браузера. Страницы закрыты от индексации (`noindex`).

Стек: Next.js (App Router, статический экспорт), TypeScript, Tailwind CSS v4, React Hook Form + Zod, шрифты Onest и Unbounded.

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # проверка типов
npm run build   # статика в папке out/
```

Эталон вёрстки лежит в `design/maket-1.html`.

## Деплой на GitHub Pages

1. В репозитории: Settings → Pages → Source: **GitHub Actions**.
2. Любой push в `main` запускает `.github/workflows/deploy.yml` (сборка и публикация папки `out`).
3. Адрес: `https://<логин>.github.io/demo-chisto34/`. Базовый путь берётся из `NEXT_PUBLIC_BASE_PATH` (в workflow подставляется имя репозитория).

Снять `noindex`: поправить `robots` в `src/app/layout.tsx`.
