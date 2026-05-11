# T-Vue-Demo-Header-Parity — Волна 3.4: паритет шапки и страниц demo-vue с React

> Читать первым: `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`,
> `docs/_streams/done/T-Vue-Demo-Wrappers-Parity.md`. Это **новый** стрим
> Волны 3.4, не путать с Wrappers-Parity (3.3a) и PostMigration-Audit (3.3).

## ID и волна

- **ID:** T-Vue-Demo-Header-Parity
- **Волна:** 3.4 (один независимый стрим)
- **Режим:** один таб, **параллельно** с T-Angular-Wave42-Components (4.2). Зоны не пересекаются.

## Зачем стрим

Сейчас в `examples/demo-vue/src/App.vue` в верхней навигации только **2 пункта**: `Компоненты` + `GitHub`. В React-демо (`examples/demo/src/App.tsx`) их **7**: Компоненты, Руководство, Кейсы, Бенчмарки, Roadmap, О проекте, GitHub. Также в `extras` у React есть `<FrameworkSwitcher>` (React/Vue/Angular).

Vue-демо должно повторить **5** пунктов: Компоненты, Руководство, Roadmap, О проекте, GitHub. **Кейсы (Showcases) и Бенчмарки (Benchmarks)** в этой волне **не делаются** — они React-эксклюзив (см. корневой CHARTER §2 «Вне рамок»).

Дополнительно нужно создать соответствующие Vue-страницы (`/roadmap`, `/about`, `/guide/*`), их сайдбар и `FrameworkSwitcher`, чтобы новые пункты nav вели куда-то осмысленное.

## Эталоны (READ-ONLY)

- `examples/demo/src/App.tsx` — `navItems`, `sectionForRoute`,
  `buildComponentsSidebar`, `buildGuideSidebar`, маршрутизация.
- `examples/demo/src/components/FrameworkSwitcher.tsx`.
- `examples/demo/src/pages/Roadmap/Roadmap.tsx`.
- `examples/demo/src/pages/About/About.tsx`.
- `examples/demo/src/demos/GettingStartedPage.tsx`,
  `examples/demo/src/demos/ThemingPage.tsx`,
  `examples/demo/src/demos/StylingShowcasePage.tsx`.
- `examples/demo/src/i18n/{types,dict-en,dict-ru}.ts` — секция
  `header.*`, `menuSections.*`, `menuItems.*`.

## Зона файлов

### Можно править / создавать

#### Vue demo
- `examples/demo-vue/src/App.vue` — расширение `navItems` до 5 пунктов, расширение `sectionForRoute`, добавление `buildGuideSidebar`, FrameworkSwitcher в extras.
- `examples/demo-vue/src/nav.ts` — экспорт `buildGuideSidebar(t)`.
- `examples/demo-vue/src/router/index.ts` — добавить маршруты:
  - `/roadmap` → `pages/Roadmap.vue`
  - `/about` → `pages/About.vue`
  - `/guide/getting-started` → `guide/GettingStarted.vue`
  - `/guide/styling-showcase` → `guide/StylingShowcase.vue`
  - `/guide/theming` → `guide/Theming.vue`
  - `/guide/design-tokens` → `guide/DesignTokens.vue` (если в React-эталоне есть содержимое; иначе stub-страница «coming soon»)
  - `/guide/core-api` → `guide/CoreApi.vue` (так же)
  - `/guide/config-provider` → `guide/ConfigProviderGuide.vue` (так же)
- `examples/demo-vue/src/pages/Roadmap.vue` (новый, порт `Roadmap.tsx`).
- `examples/demo-vue/src/pages/About.vue` (новый, порт `About.tsx`).
- `examples/demo-vue/src/guide/*.vue` (6 новых страниц, см. список выше).
- `examples/demo-vue/src/components/FrameworkSwitcher.vue` (новый, порт `FrameworkSwitcher.tsx`).
- `examples/demo-vue/src/i18n/types.ts` — добавить ключи:
  - `header.navGuide`, `header.navRoadmap`, `header.navAbout`,
  - `menuSections.guide`,
  - `menuItems.gettingStarted`, `menuItems.stylingShowcase`, `menuItems.theming`, `menuItems.designTokens`, `menuItems.coreApi`, `menuItems.configProvider`.
  - (если для FrameworkSwitcher и Roadmap/About нужны новые секции — добавить там же).
- `examples/demo-vue/src/i18n/dict-en.ts` + `dict-ru.ts` — значения новых ключей. Брать тексты из аналогичных полей `examples/demo/src/i18n/dict-{en,ru}.ts`.
- `examples/demo-vue/src/style.css` — **только** если для FrameworkSwitcher или новых страниц нужно скопировать правила из `examples/demo/src/app.css`. Никаких новых селекторов, не существующих в React.

#### shared-vue
- `examples/_shared-vue/src/layout/index.ts` — **не трогаем**. Все новые компоненты — в `examples/demo-vue/src/components/`. Если нужна общая утилита — finding, не делаем сами.

#### Документация
- `docs/_streams/{decisions,findings,done}/T-Vue-Demo-Header-Parity.md` (новые).

### Нельзя трогать

- `packages/{core,react,vue,angular,styles}/**` — целиком read-only.
- `examples/demo/**` — целиком read-only (это эталон).
- `examples/_shared-react/**` — read-only.
- `examples/_shared-vue/**` — read-only (Header.vue / Sidebar.vue / Footer.vue уже паритетны с React, см. `done/T-VueLayout.md`).
- `examples/_shared/**`, `examples/showcases/**` — read-only.
- `examples/demo-angular/**` — зона стрима T-Angular-Wave42-Components (4.2).
- `tsconfig.base.json`, root `package.json`, `pnpm-lock.yaml`.
- `.size-limit.json` — лимит demo-vue main bundle = 400 KB. Не повышать; если упирается, finding.

## ⚠️ Правила автономности

Не останавливаться, не задавать вопросов. Решения вне карты —
`docs/_streams/decisions/T-Vue-Demo-Header-Parity.md`. Пропуски и
ограничения — `docs/_streams/findings/T-Vue-Demo-Header-Parity.md`.
В конце — отчёт `docs/_streams/done/T-Vue-Demo-Header-Parity.md`.

**Никаких:**
- `git commit` / `push`,
- `pnpm install` / `add`,
- глобальных `pnpm typecheck` / `build` / `test`. Только `--filter demo-vue`.

## Конкретные шаги

### 0. Эталон (~10 мин)
- Прочитать `examples/demo/src/App.tsx` (раздел `navItems`, `sectionForRoute`, `buildGuideSidebar`).
- Прочитать `Roadmap.tsx`, `About.tsx`, 3 главных guide-страницы (`GettingStartedPage.tsx`, `ThemingPage.tsx`, `StylingShowcasePage.tsx`).
- Прочитать `FrameworkSwitcher.tsx`.
- Прочитать `examples/demo/src/i18n/types.ts` — какие именно ключи `header.*`, `menuItems.*` уже есть в React.

### 1. i18n keys (~10 мин)
Добавить в `examples/demo-vue/src/i18n/{types,dict-en,dict-ru}.ts` все недостающие ключи (`header.navGuide`, `header.navRoadmap`, `header.navAbout`, `menuSections.guide`, `menuItems.*`, и при необходимости подсекции для текстов Roadmap/About если они хардкодятся в page).

### 2. FrameworkSwitcher (~15 мин)
`examples/demo-vue/src/components/FrameworkSwitcher.vue` — DOM/класcы 1:1 с `FrameworkSwitcher.tsx`. Активный: `'vue'`. Кнопки React и Angular ведут на соседние демо (URL — те же, что в React-аналоге). Использовать `<a href="…">` без VueRouter (внешние URL).

### 3. Roadmap + About страницы (~30 мин)
Минимальный порт. Если в React много текста — переносить через i18n-ключи (или оставить заглушку «coming soon» и зафиксировать finding о неполном паритете). Главное — DOM/секции/класcы совпадают, тексты идут через `t.value.*`.

### 4. Guide-страницы (~30 мин)
- `getting-started` / `theming` / `styling-showcase` — главные, перенести содержимое (порядок секций, демо).
- `design-tokens` / `core-api` / `config-provider` — если в React есть страница, портировать; если нет, stub с заголовком и заглушкой «See React docs» (finding).

### 5. router + nav.ts (~15 мин)
- В `router/index.ts` добавить 8 новых маршрутов (`/roadmap`, `/about`, `/guide/getting-started`, `/guide/styling-showcase`, `/guide/theming`, `/guide/design-tokens`, `/guide/core-api`, `/guide/config-provider`) через `() => import('../pages/Roadmap.vue')`-стиль, в порядке после `components/*`.
- В `nav.ts` экспортировать `buildGuideSidebar(t)` по образцу React `buildGuideSidebar`.

### 6. App.vue (~25 мин)
- Расширить `navItems` до 5 пунктов: `components`, `guide`, `roadmap`, `about`, `github`.
- Расширить `sectionForRoute`: `'guide'` для `/guide/*`, `'roadmap'`, `'about'`.
- Расширить `componentsSidebar` → теперь делается выбор `componentsSidebar | guideSidebar` в зависимости от section.
- Расширить `headerActive`: для `/guide/*` → `'guide'`; для `/roadmap` → `'roadmap'`; для `/about` → `'about'`.
- Расширить `showSidebar` → также `true` для `'guide'`.
- Добавить `<FrameworkSwitcher active="vue" />` в `<template #extras>` **перед** `<LanguageSwitcher>` (как в React).

### 7. Verify (~10 мин)
```text
pnpm --filter demo-vue typecheck
pnpm --filter demo-vue build
```
Оба зелёные. (Опц.) `pnpm --filter demo-vue dev` и кликнуть по каждому из 5 пунктов nav, убедиться что переход идёт и страница рендерится без console-warnings.

### 8. Финал
- `pnpm size` — зелёный (без поднятия лимита).
- Отчёт `done/T-Vue-Demo-Header-Parity.md`: список изменённых файлов, новых страниц, добавленных i18n-ключей, скриншоты до/после (опц.), findings/decisions со ссылками.

## Acceptance criteria

- В `examples/demo-vue` верхняя навигация показывает 5 пунктов в порядке: Components, Guide, Roadmap, About, GitHub. Кейсы и Бенчмарки **отсутствуют** — это явное решение.
- Каждый пункт ведёт на работающую страницу/маршрут (без 404, без console-error).
- В extras справа: FrameworkSwitcher (React/Vue/Angular, активна Vue) → LanguageSwitcher → ThemeSwitcher.
- Сайдбар работает для `/components/*` (как раньше) и `/guide/*` (по образцу React `buildGuideSidebar`).
- `pnpm --filter demo-vue {typecheck,build}` зелёные.
- `pnpm size` зелёный (лимит demo-vue main bundle 400 KB, не повышать).
- Отчёт сдан, decisions/findings заполнены.

## Зависимости

- **Параллельно** с T-Angular-Wave42-Components (4.2) — зоны не пересекаются (`examples/demo-vue/**` vs `packages/angular/**` + `examples/demo-angular/**`).
- **До** T-Vue-Demo-PostMigration-Audit (3.3) — иначе аудит будет фиксировать «нет Roadmap/About/Guide», что чинит этот стрим.

---

## Текст запуска стрима (копипаст в новый таб Cursor)

```text
Ты — стрим T-Vue-Demo-Header-Parity (Волна 3.4) в репозитории skygraph.

Задача: привести верхнюю навигацию examples/demo-vue к паритету с React-
демо. Сейчас в Vue только 2 пункта (Components, GitHub), нужно 5:
Components, Guide, Roadmap, About, GitHub. Кейсы и Бенчмарки НЕ делаем
(явное решение CHARTER, они React-эксклюзив).

Дополнительно: создать Vue-страницы /roadmap, /about, /guide/* (6 guide-
страниц по образцу examples/demo/src/demos/{GettingStarted,Theming,
StylingShowcase}Page.tsx плюс stub'ы для design-tokens / core-api /
config-provider если в React-демо есть). Создать FrameworkSwitcher.vue
по образцу examples/demo/src/components/FrameworkSwitcher.tsx и
вставить в extras перед LanguageSwitcher. Расширить sidebar (для
секции 'guide') через buildGuideSidebar(t) в src/nav.ts. Добавить
i18n-ключи (header.navGuide/navRoadmap/navAbout, menuSections.guide,
menuItems.*).

Принцип: НЕ ИЗОБРЕТАЙ свой визуал — копируй DOM/className из
examples/demo/src/{App.tsx, components/FrameworkSwitcher.tsx, pages/
Roadmap/Roadmap.tsx, pages/About/About.tsx, demos/{GettingStarted,
Theming,StylingShowcase}Page.tsx}.

Полная карта: docs/_streams/wave-3/T-Vue-Demo-Header-Parity.md

Правила автономности: не останавливаться, не спрашивать. Решения
вне карты — docs/_streams/decisions/T-Vue-Demo-Header-Parity.md,
пропуски — findings/. В конце — отчёт docs/_streams/done/T-Vue-Demo-
Header-Parity.md. Никаких git commit / pnpm install. Не лезь в
packages/**, examples/{demo,_shared*,showcases,demo-angular}/**.
Параллельно с 4.2, зоны не пересекаются.

Старт: Шаг 0 (читать React-эталоны), потом Шаг 1 (i18n keys).
```
