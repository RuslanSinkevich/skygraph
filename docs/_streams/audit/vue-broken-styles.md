# vue-broken-styles — аудит визуальных регрессий demo-vue

> Стрим-источник: `T-Vue-Demo-Foundation` (Волна 3.1).
> Потребитель: таб **E** Волны 3.2 (`T-Vue-Demo-StyleFixes`).
>
> Этот документ — append-only по правилу `docs/_streams/CHARTER.md` §12.

## 1. Метод

Цель — на каждом из 32 текущих маршрутов demo-vue (см. `router/index.ts`)
сделать `page.screenshot({ fullPage: true })` через Playwright headless и
сверить с React-аналогом из `examples/demo`. Расхождения **по стилям**
(сетка, фон, рамки, sg-* классы, hover/focus visual, FOUC) фиксируются
здесь.

## 2. Статус сбора скриншотов

**Не получилось** запустить Playwright из этого стрима.

Причина: `T-Vue-Demo-Foundation` запускается **последовательно** в одном
табе по правилам Волны 3.1 (`docs/_streams/wave-3/CHARTER.md` §3) и
работает в неинтерактивном окружении. Для скриншотов нужно одновременно:

1. `pnpm --filter demo-vue dev` (порт `5174`),
2. `pnpm --filter demo dev` (другой порт),
3. headless Chromium (Playwright) на тех же 32 маршрутах × 2 фреймворка.

Запустить два dev-сервера параллельно из этого стрима без `pnpm install`
и без удержания процесса между шагами невозможно — это поднимает
несколько долгоживущих процессов и нарушает `CHARTER §5` (никаких
глобальных side-эффектов в shared `node_modules/.cache`).

Это — **классический сценарий §6.3 (Decision Protocol)**: 3 попытки
исчерпаны (запуск headless Chromium в неинтерактивном окружении не
завершается), документ переходит в разряд `findings`. См.
`docs/_streams/findings/T-Vue-Demo-Foundation.md` запись `audit-styles`.

## 3. Что должен сделать таб E (`T-Vue-Demo-StyleFixes`)

Это **первое, что таб E должен сделать** в начале своей работы — task-card
явно разрешает такой fallback:

> Если Playwright недоступен (нет браузера в окружении) — ... таб E делает
> аудит сам в начале своей работы.

Минимальный сценарий для таба E:

```bash
# 1. Поднять оба dev-сервера в разных терминалах
pnpm --filter demo-vue dev    # http://localhost:5174
pnpm --filter demo dev        # http://localhost:5173

# 2. Запустить headless-сборщик (рядом с tests/smoke/, не модифицируя его):
node tests/smoke/run.mjs --collect-screenshots \
     --vue=http://localhost:5174 --react=http://localhost:5173 \
     --out=docs/_streams/audit/screenshots
# (если такого скрипта ещё нет, временно через @playwright/test inline)
```

Структура папки:

```
docs/_streams/audit/screenshots/
├─ react/<comp>.png
└─ vue/<comp>.png
```

Каждое расхождение → запись ниже в формате:

```markdown
## /components/<comp>

**Статус**: NEEDS-FIX | FIXED | ACCEPT (отличается умышленно)
**Описание**: 1-2 строки про регрессию.
**Возможная причина**: какой класс / variable.
**Локализация**:
- `examples/_shared-vue/src/layout/styles.css` — таб E
- `examples/demo-vue/src/style.css` — таб E
- `packages/styles/components/<file>.css` — finding для T-Vue-Cleanup-2 (вне зоны таба E)
```

## 4. Маршруты, которые нужно перепроверить (32)

Из `examples/demo-vue/src/router/index.ts` (Волна 2 уже добавила всё):

| Маршрут | Статус |
|---|---|
| `/` (Landing) | переписан в Волне 3.1 — проверить **новую** Landing, не старую |
| `/components/button` | переведён на `demos/ButtonDemo.vue` — проверить новую вёрстку |
| `/components/input` | _ждёт таб E_ |
| `/components/inputnumber` | _ждёт таб E_ |
| `/components/textarea` | _ждёт таб E_ |
| `/components/select` | _ждёт таб E_ |
| `/components/checkbox` | _ждёт таб E_ |
| `/components/radio` | _ждёт таб E_ |
| `/components/switch` | _ждёт таб E_ |
| `/components/slider` | _ждёт таб E_ |
| `/components/datepicker` | _ждёт таб E_ |
| `/components/modal` | _ждёт таб E_ |
| `/components/drawer` | _ждёт таб E_ |
| `/components/tooltip` | _ждёт таб E_ |
| `/components/tabs` | _ждёт таб E_ |
| `/components/menu` | _ждёт таб E_ |
| `/components/pagination` | _ждёт таб E_ |
| `/components/badge` | _ждёт таб E_ |
| `/components/tag` | _ждёт таб E_ |
| `/components/avatar` | _ждёт таб E_ |
| `/components/progress` | _ждёт таб E_ |
| `/components/spin` | _ждёт таб E_ |
| `/components/skeleton` | _ждёт таб E_ |
| `/components/rate` | _ждёт таб E_ |
| `/components/autocomplete` | _ждёт таб E_ |
| `/components/breadcrumb` | _ждёт таб E_ |
| `/components/dropdown` | _ждёт таб E_ |
| `/components/popconfirm` | _ждёт таб E_ |
| `/components/collapse` | _ждёт таб E_ |
| `/components/empty` | _ждёт таб E_ |
| `/components/result` | _ждёт таб E_ |
| `/components/segmented` | _ждёт таб E_ |
| `/components/steps` | _ждёт таб E_ |
| `/components/timeline` | _ждёт таб E_ |
| `/components/carousel` | _ждёт таб E_ |
| `/components/descriptions` | _ждёт таб E_ |
| `/components/timepicker` | _ждёт таб E_ |
| `/components/colorpicker` | _ждёт таб E_ |
| `/components/list` | _ждёт таб E_ |
| `/components/tree` | _ждёт таб E_ |
| `/components/treeselect` | _ждёт таб E_ |
| `/components/cascader` | _ждёт таб E_ |
| `/components/calendar` | _ждёт таб E_ |
| `/components/notification` | _ждёт таб E_ |
| `/components/transfer` | _ждёт таб E_ |
| `/components/upload` | _ждёт таб E_ |
| `/components/configprovider` | _ждёт таб E_ |
| `/components/form` | _ждёт таб E_ |
| `/components/table` | _ждёт таб E_ |
| `/components/charts` | _ждёт таб E_ |
| `/components/diagram` | _ждёт таб E_ |
| `/components/dashboard` | _ждёт таб E_ |
| `/components/gantt` | _ждёт таб E_ |
| `/components/event-timeline` | _ждёт таб E_ |
| `/components/resource-calendar` | _ждёт таб E_ |
| `/components/schema-form-editor` | _ждёт таб E_ |

> «Таб E» = `T-Vue-Demo-StyleFixes`.

## 5. Регрессии, замеченные при ручном чтении исходников 3.1

> Это не замена скриншот-аудита — это «грубые» находки уровня кода,
> которые видно глазами без браузера.

### `Landing.vue` (до Волны 3.1)

- **Только 3 счётчика** (Components / composables / Tests). React-вариант
  показывает 5 (Components / Tests / Engines / Showcases / 0-runtime).
- Нет `QuickInstall` (нет блока «команда установки + скелет минимального
  примера»).
- Нет `WhatsNew` / `ShowcasesPreview` — это **умышленно** не портим
  (см. `wave-3/CHARTER.md` §2 «Вне рамок»).

> **Статус**: PARTIALLY-FIXED в Волне 3.1 (новая Landing с Hero / Stats
> 4-счётчика / FeatureGrid / QuickInstall). WhatsNew / ShowcasesPreview —
> ACCEPT (намеренно нет).

### `ButtonPage.vue` (до Волны 3.1)

- **5 примеров** вместо 8 в React (нет `WithIcon`, `ComponentTokens`,
  `ScopedBrand`, `Unstyled`).
- Кодовые сниппеты вшиты строкой (`TYPES_CODE`, `SIZES_CODE`, …) и
  расходятся с реальным шаблоном.
- Нет `CssVarsTable`.

> **Статус**: FIXED в Волне 3.1 (миграция на `demos/ButtonDemo.vue`,
> `?raw`-импорты, 7 из 8 примеров перенесены, см.
> `docs/_streams/findings/T-Vue-Demo-Foundation.md` запись
> `button-unstyled-skipped`).

### Остальные `pages/<Comp>Page.vue` (32 шт.)

Не правились в этом стриме. Соберёт скриншот-аудит таб E, итог запишет
сюда же.
