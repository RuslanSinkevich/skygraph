# Wave 4 — Angular adapter (расширение основного CHARTER)

> Этот документ — мини-конституция Волны 4. Он **не заменяет** корневой
> `docs/_streams/CHARTER.md`, а дополняет его. Все стримы Волны 4
> сначала читают корневой CHARTER, потом этот.

---

## 1. Контекст

В монорепо есть React-адаптер (`@skygraph/react`, ~96 компонентов,
демо `examples/demo`) и Vue-адаптер (`@skygraph/vue`, ~88 компонентов,
демо `examples/demo-vue`). Оба используют framework-agnostic ядро
(`@skygraph/core`) и общие стили (`@skygraph/styles`, `sg-*` классы).

Волна 4 заводит **третий адаптер — `@skygraph/angular`**, по тому же
принципу: одно ядро, одни стили, разная обвязка фреймворка. Эталон
визуала и API — React-пакет (`packages/react/**`).

**Принцип:** «не изобретай свой визуал и стили» — каждый Angular-
компонент **копирует DOM/className/aria-set React-аналога 1:1**, меняя
только обвязку (Inputs/Outputs/DI вместо props/callbacks/Context).

---

## 2. Цель Волны 4

Привести Angular-адаптер к функциональному и визуальному паритету с
React (по образцу того, что Vue прошёл за Waves 2–3).

Волна 4 разбита на под-волны (по аналогии с Wave 2/3 для Vue):

- **4.1 — Foundation** (этот документ + `T-Angular-Foundation.md`):
  пакет `@skygraph/angular`, инфраструктура, DI-эквиваленты
  (`SgConfigProvider`/`provideSgConfig`/`injectSgConfig`), 2 эталонных
  компонента (`SgButton` + `SgSpin`), демо `examples/demo-angular`
  (Landing + 1 страница Button), парность-тест с React.
- **4.2 — Components-Batch** (планируется после 4.1): 4–6
  параллельных табов, каждый порт батча компонентов из React по
  готовому шаблону (UI / data-entry / display / nav-feedback / complex).
- **4.3 — Demo Parity** (после 4.2): полное Angular-демо по образцу
  `examples/demo` / `examples/demo-vue`, аналогично Wave 3.2.
- **4.4 — Post-Migration QA** (после 4.3): полный аудит, как 3.3.

**Сейчас открыта только 4.1.** Карты 4.2+ заводим позже на основе
findings из 4.1.

---

## 3. Что **в** рамках 4.1

- Создание пакета `packages/angular/` (структура, package.json,
  tsconfig, build via ng-packagr, тесты via Vitest).
- Создание демо-приложения `examples/demo-angular/` (Angular 18+
  standalone bootstrap, hash-router, Landing + страница Button,
  layout shell inline в demo на этом этапе).
- DI-эквиваленты config/locale: `SgConfigService`,
  `provideSgConfig()`, `injectSgConfig()`, `SgConfigProvider`
  (компонент-обёртка, аналог React `<ConfigProvider>`).
- 2 эталонных компонента: `SgButton` (полная парность с
  `packages/react/src/components/ui/Button.tsx`) + `SgSpin` (минимум,
  как зависимость Button).
- Локали `en_US` + `ru_RU` (минимум, чтобы ConfigProvider был
  осмысленным; остальные — Wave 4.2+).
- Тест парности `packages/angular/__tests__/styling-contract.parity.test.ts`
  (Button DOM/classes/aria 1:1 с React).
- Подключение в workspace (`pnpm-workspace.yaml` уже подхватит, без
  правок) + `.size-limit.json` (esm-лимит для пакета + main bundle
  лимит для демо).
- Документация: `packages/angular/README.md`, `decisions/`,
  `findings/`, `done/T-Angular-Foundation.md`.

## 4. Что **вне** рамок 4.1

- Не портируем все ~96 компонентов — только Button + Spin (эталон).
- Не делаем `examples/_shared-angular/` отдельным пакетом (Wave 4.2,
  если сочтём нужным).
- Не делаем showcases на Angular (как и для Vue — отдельная история).
- Не делаем benchmarks на Angular.
- Не покрываем все 6 локалей (en/ru только; остальные — Wave 4.2).
- Не настраиваем Angular Universal / SSR.
- Не лезем в `packages/{core,react,vue,styles}/**` — это эталоны,
  read-only.

---

## 5. Зависимости с другими волнами

- Параллельность с Wave 3 (3.3a/b/c) **технически возможна по зонам
  файлов**, но **`pnpm install` параллельно с другими стримами
  запрещён** (см. корневой CHARTER §5). Angular-foundation тянет
  ~15-20 новых devDependencies, без которых ничего не строится.

- **Рекомендуемый режим:** запускать **после** закрытия Wave 3.3a/b/c,
  но **до** Wave 3.3 PostMigration-Audit. Тогда `pnpm install` пройдёт
  чисто, и Wave 3.3 не пострадает (она читает только demo-vue +
  packages/vue/styles).

- **Альтернативный режим (если нужно срочно параллельно):** стрим
  пишет **только файлы** (package.json, tsconfig, src/*, demo/src/*),
  но **не** запускает `pnpm install`, **не** запускает `build`/`test`
  (потому что зависимости не установлены). Acceptance criteria
  переходят в finding «требуется ручной `pnpm install` пользователя».
  Это ослабленный приём, выбирает пользователь явно.

Запреты (как в Wave 1–3):
- никаких `git commit`/`push`/`stash`/`rebase`;
- никаких правок в `packages/{core,react,vue,styles}/**`;
- никаких глобальных `pnpm typecheck`/`build`/`test` без `--filter`.

---

## 6. Реестр карт Волны 4

| Файл | Статус |
|---|---|
| `docs/_streams/wave-4/T-Angular-Foundation.md` | план |
| (4.2 / 4.3 / 4.4 — карты заводятся после 4.1) | tbd |
