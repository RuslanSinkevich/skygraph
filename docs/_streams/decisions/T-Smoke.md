# T-Smoke — decisions

## Как добавлять новый роут в smoke

Не нужно. Smoke-спеки **сами обнаруживают** все hash-роуты, парся
`<a href>` со стартовой страницы:

```ts
const hrefs = Array.from(document.querySelectorAll('a[href]'))
  .map((a) => a.getAttribute('href'))
  .filter((h) => h.startsWith('#/'))
```

Если новая страница попала в Header/Sidebar обоих демо — она
автоматически попадёт в smoke. Если новая страница доступна только
программно (без видимого `<a href="#/...">` в DOM) — её надо явно
прокликать через дополнительный `navigateHash(page, '#/secret-page')`
в спеке.

## Что считаем «pass»

1. Mount-узел (`#root` для demo, `#app` для demo-vue) видим.
2. На странице есть хоть один child-узел (приложение реально
   отрендерилось, а не просто пустой `<div id="root">`).
3. Нет `pageerror` — uncaught JS-ошибки.
4. Нет `console.error` (исключение: благ favicon 404).
5. Нет 5xx ответов с того же origin.

## Что НЕ считаем регрессией

- Network warnings про CORS / mixed content от внешних ресурсов
  (analytics, fonts) — фильтруем по origin.
- `console.warn` любого характера — Vue/React могут писать дев-warnings;
  prod-сборки обычно молчат, но это не gate.
- Внешние 404 (например, иконки сторонних провайдеров).

## Почему `vite preview`, а не `vite dev`

Карта T-Smoke явно запрещает `vite dev` — стоп-лист пункт 3.
Прод-сборка `vite preview` ловит регрессии, которые в dev-сервере
могут не появиться: tree-shaking edge cases, env-flag conditional
imports, lazy-chunk резолвинг.

## Порты и base-path

| App      | Port | Base path     |
|----------|------|---------------|
| demo     | 5173 | `/skygraph/` (см. `examples/demo/vite.config.ts`) |
| demo-vue | 5174 | `/`           |

`webServer.url` в `playwright.config.ts` указывает на полный путь с
base, чтобы Playwright дождался реального health-check'а от vite.

## Параллельность / ретраи

- `fullyParallel: false`, `workers: 1` — одна Chromium-инстанция, два
  spec'а последовательно. Smoke шустрый и не пайповый — параллелизм
  усложнит дебаг при падении.
- `retries: 1` только в CI — ловить flaky network на vite preview.
  Локально — 0, чтобы падения были видны сразу.

## Browsers

Только Chromium. Карта явно запрещает «функциональные тесты» — это
гейт «приложение монтируется и не падает в консоли», не cross-browser
matrix.

## Стоимость в CI

- Playwright install (chromium только) ≈ 30-60s.
- 2 builds (`demo`, `demo-vue`) уже идут в `build-and-test` job —
  smoke job их повторяет в чистом checkout. Альтернатива — передавать
  artefact из `build-and-test`; это усложняет workflow.
- Прогон обоих специй ≤ 1 минута на типичном CI-runner'е.

Целевой бюджет: ≤ 3 минуты (acceptance из карты).

## Известные подводные камни

1. **`base: '/skygraph/'` в demo.** Любой `page.goto('/some/path')`
   без base превратится в 404 → 5xx-проверка падает. Решено через
   `baseURL: 'http://127.0.0.1:5173/skygraph/'` в проекте.
2. **Hash-router не триггерит `goto`.** При смене хеша `page.goto`
   на тот же URL+другой хеш не вызывает navigation. Поэтому
   `navigateHash` использует `window.location.hash = ...` через
   `page.evaluate`, что синхронно эмитит `hashchange`.
3. **Vue `RouterView` — асинхронный.** Все vue-страницы — динамические
   импорты (см. `examples/demo-vue/src/router/index.ts`). 50ms wait
   между навигациями — буфер для `<Suspense>`-аналога.
