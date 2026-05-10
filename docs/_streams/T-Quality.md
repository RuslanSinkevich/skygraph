# T-Quality — A11y axe + расширение benchmarks

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-Quality
- **Волна:** 2

## Цель
1. Подключить axe-core к Playwright и прогнать a11y-проверки по обоим демо.
2. Расширить набор benchmarks: Table / Tree / Chart (Form benchmark уже есть).

## Зона файлов (можно трогать)

- `tests/a11y/` (новая папка)
- `tests/a11y/react.spec.ts`
- `tests/a11y/vue.spec.ts`
- `playwright-a11y.config.ts` (новый)
- `examples/demo/src/demos/benchmarks/TableBenchmark.tsx` (новый)
- `examples/demo/src/demos/benchmarks/TreeBenchmark.tsx` (новый)
- `examples/demo/src/demos/benchmarks/ChartBenchmark.tsx` (новый)
- `examples/demo/src/demos/benchmarks/index.ts` (если есть — добавить exports)
- `examples/demo/src/App.tsx` — **только** добавление route entries для трёх новых benchmark-страниц

## Чек-лист

### Часть 1 — A11y axe

1. ⚠ Если T-Smoke уже создал `playwright.config.ts` — прочитать его и не дублировать. Базу взять оттуда.
2. Создать `playwright-a11y.config.ts` (или extend от smoke-конфига) с тестовыми проектами:
   - `react-demo` → `http://localhost:5173` (или порт demo).
   - `vue-demo` → `http://localhost:5174` (или порт demo-vue).
3. Тесты `tests/a11y/react.spec.ts` и `tests/a11y/vue.spec.ts`:
   - Перебрать ключевые страницы (Home, Forms, Table, Tree, Chart минимум).
   - На каждой странице вызвать `@axe-core/playwright` `AxeBuilder` с дефолтными правилами WCAG 2.1 AA.
   - Падать только на нарушениях с `impact === 'critical'` или `'serious'` (для остальных — warn-репорт).
4. Скрипт в **не корневом** `package.json` — нет, нельзя трогать корневой `package.json` если это не T-CI. Поэтому:
   - Запись в `findings/T-Quality.md`: «Нужен npm script `test:a11y` в корневом `package.json`, координация с T-CI».
   - В рамках стрима — тесты можно запустить вручную через `npx playwright test --config=playwright-a11y.config.ts`.
5. **Зависимости:** axe-core и `@axe-core/playwright` могут быть **не установлены**. По CHARTER `pnpm install` запрещён. Решение:
   - Проверить `package.json` корня — есть ли уже `@axe-core/playwright` (T-Smoke мог поставить).
   - Если нет → создать тесты с `import` как **подготовку**, но не запускать. Записать в `blocked/T-Quality.md`: «axe-core не установлен, нужно `pnpm add -DW @axe-core/playwright axe-core` от пользователя».

### Часть 2 — Benchmarks

1. Открыть существующий `examples/demo/src/demos/benchmarks/FormBenchmark.tsx` и `benchUtils.ts` — понять стиль и инфраструктуру.
2. Создать `TableBenchmark.tsx`:
   - Прогон: `@skygraph/react` `Table` vs «голая» React-таблица или `@tanstack/react-table` (если уже в deps; иначе — без сравнения, только sky).
   - Метрики: initial render, scroll fps proxy, sort, filter.
   - Использовать `benchUtils.ts` для измерений.
3. Создать `TreeBenchmark.tsx`:
   - Прогон: `@skygraph/react` `Tree` (большое дерево, 10k нод).
   - Метрики: initial render, expand/collapse, virtualization scroll.
4. Создать `ChartBenchmark.tsx`:
   - Прогон: SkyGraph `LineChart`/`BarChart` с 10k точек.
   - Метрики: initial render, hover-update.
5. Прописать страницы в `App.tsx` рядом с `FormBenchmark`. Использовать существующую конвенцию route ключей (`benchmarks/table`, `benchmarks/tree`, `benchmarks/chart`).

### Финал

```bash
pnpm --filter demo typecheck
pnpm --filter demo build
```
- A11y тесты — собрать без runtime-ошибок (компиляция проходит).
- Demo build с тремя новыми страницами проходит.

## Acceptance criteria

- `tests/a11y/` существует, содержит axe-проверки по обоим демо (по 1 spec на демо).
- 3 новых benchmark-страницы (Table/Tree/Chart) интегрированы в demo.
- `pnpm --filter demo build` зелёный.
- Если axe-core/playwright не установлены — задокументировано в `blocked/T-Quality.md`.

## Стоп-лист

- НЕ трогать корневой `package.json` (это зона T-CI).
- НЕ запускать `pnpm install`.
- НЕ дублировать `playwright.config.ts` если он существует — расширять/наследовать.
- НЕ трогать Vue-демо (демо-vue benchmarks не делаем).
- НЕ менять `@skygraph/*` пакетные исходники.

## Зависимости
- T-Smoke (Playwright + конфиг) — желательно, но не блокирующая. Если T-Smoke не закончен — Playwright уже мог быть установлен раньше; проверить `node_modules`.

## Финал
Отчёт: `docs/_streams/done/T-Quality.md` с метриками первого прогона benchmarks.
