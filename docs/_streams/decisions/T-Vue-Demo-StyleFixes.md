# Decisions — T-Vue-Demo-StyleFixes

> Append-only.

## ports-non-default-2026-05-10

В момент старта таба E порты `5173` и `5174` уже заняты (видимо, dev-сервера
других табов 3.2). Мои свежезапущенные `pnpm --filter demo dev` и
`pnpm --filter demo-vue dev` поднялись на:

- React `demo` → `http://localhost:5174/skygraph/`
- Vue `demo-vue` → `http://localhost:5175/`

Карта `T-Vue-Demo-StyleFixes.md` §«Шаг 1» рекомендует `5174` и `5173`, но это
только пример. Использую фактические порты, в `scripts/screenshot-audit.mjs`
прокидываю их через CLI-флаги — никаких хардкодов.

## screenshot-audit-script-architecture

`scripts/screenshot-audit.mjs` — отдельный файл, рядом с `gen-vue-demo.mjs`,
не в `tests/smoke/`. Карта явно разрешает создание этого скрипта в моей зоне.

Параметры (все через CLI):

```
node scripts/screenshot-audit.mjs \
  --vue=http://localhost:5175 \
  --react=http://localhost:5174/skygraph \
  --routes=docs/_streams/audit/screenshots/routes.json \
  --out=docs/_streams/audit/screenshots
```

`routes.json` — 32 маршрута + Landing (33 записи), генерируется один раз
вручную (а не парсингом `router/index.ts` — оверкилл для одноразового
скрипта). Vue использует hash-router → URL: `<vue>/#<route>`. React
использует обычный history-router c base `/skygraph` → URL: `<react><route>`.

Вьюпорт: 1280×800 (как в `tests/smoke/run.mjs`), `fullPage: true`.

## react-base-path

React-demo вшивает base `/skygraph/`. Поэтому URL = `http://localhost:5174/skygraph/components/<comp>`,
а не `http://localhost:5174/components/<comp>`. В скрипте параметр
`--react` принимает уже base-path-aware строку (например
`http://localhost:5174/skygraph`).

## landing-route

`/` (Landing) включён в скриншот-аудит — он переписан в Волне 3.1, надо
проверить визуальную целостность. Имя файла в screenshots/{vue,react}/
— `landing.png`.
