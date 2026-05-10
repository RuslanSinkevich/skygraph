# T-VueLayout — _shared-vue/layout + перевод demo-vue

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-VueLayout
- **Волна:** 2

## Цель
Привести Vue-демо визуально к React-демо. Создать `examples/_shared-vue/layout` (зеркало `_shared-react/layout`) и перевести `examples/demo-vue` на этот общий layout. Showcases и Benchmarks НЕ переносим.

## Зона файлов (можно трогать)

- `examples/_shared-vue/` (новый рабочий пакет, если ещё не существует — создать)
  - `examples/_shared-vue/package.json`
  - `examples/_shared-vue/src/layout/AppShell.vue`
  - `examples/_shared-vue/src/layout/Header.vue`
  - `examples/_shared-vue/src/layout/Sidebar.vue`
  - `examples/_shared-vue/src/layout/Footer.vue`
  - `examples/_shared-vue/src/layout/ThemeToggle.vue`
  - `examples/_shared-vue/src/layout/LanguageToggle.vue`
  - `examples/_shared-vue/src/layout/index.ts`
  - `examples/_shared-vue/src/index.ts`
  - `examples/_shared-vue/tsconfig.json`
  - `examples/_shared-vue/vite.config.ts` (если нужно для типизации)
- `examples/demo-vue/src/App.vue`
- `examples/demo-vue/src/main.ts`
- `examples/demo-vue/src/nav.ts` (или подобный — список страниц)
- `examples/demo-vue/src/components/Header.vue` (удалить или перенести в shared)
- `examples/demo-vue/src/components/Sidebar.vue` (удалить или перенести)
- `examples/demo-vue/src/components/ThemeToggle.vue` (удалить или перенести)
- `examples/demo-vue/src/components/LanguageToggle.vue` (удалить или перенести)
- `examples/demo-vue/package.json` (только добавление workspace-зависимости `@skygraph/_shared-vue` или как назван)

## Чек-лист

### Шаг 0. Аудит React-эталона

1. Прочитать `examples/_shared-react/layout/*` — это **визуальный эталон**.
2. Зафиксировать:
   - DOM-структуру AppShell.
   - `sg-*` классы хедера/сайдбара/футера.
   - Поведение theme toggle и language toggle.
   - Контракт пропов (nav items, brand, footer links, etc.).

### Шаг 1. Создать _shared-vue/layout

1. Создать пакет `examples/_shared-vue` если ещё нет (workspace package).
2. По одному компоненту перенести:
   - **Идиоматично Vue 3** (см. CHARTER §8). Не порт-в-лоб React-кода.
   - DOM-структура и `sg-*` классы — **строго как в React**.
   - Локали — через `@skygraph/vue` `useConfig()`. Если ключи отсутствуют в `SgLocale` (нет `appShell.*`/`header.*`) → завести их **в локалях `@skygraph/vue`** (только если эти ключи уже есть в React; иначе — записать в `findings/T-VueLayout.md` и отдать T-Docs-Locales).
3. Экспортировать из `examples/_shared-vue/src/index.ts`.
4. Описать пакет в `pnpm-workspace.yaml`? — **НЕ ТРОГАТЬ**, если нужно — записать в `blocked/T-VueLayout.md`. По CHARTER корневые конфиги не трогаем без согласования.
   - Альтернатива: использовать относительный путь `../_shared-vue` в `examples/demo-vue/package.json` через `workspace:*` — если это уже работает для `_shared-react` в demo, повторить ту же схему.

### Шаг 2. Перевести demo-vue на _shared-vue/layout

1. В `examples/demo-vue/src/App.vue` использовать `<AppShell>` из `_shared-vue`.
2. Header/Sidebar/Footer — через слоты или пропы AppShell.
3. Удалить локальные `Header.vue`/`Sidebar.vue`/`ThemeToggle.vue`/`LanguageToggle.vue` из `examples/demo-vue/src/components/` если их функционал полностью покрыт shared-версиями.
4. Список navItems — отзеркалить от `examples/demo/src/App.tsx`, **минус** `showcases` и `benchmarks`.
5. Убедиться, что theme persistence (localStorage) работает идентично React-демо.
6. Убедиться, что routing использует те же ключи страниц, что demo (для будущих сравнений).

### Шаг 3. Проверка

```bash
pnpm --filter demo-vue typecheck
pnpm --filter demo-vue build
```
Зелёные. Запустить dev (если возможно без install) — `pnpm --filter demo-vue dev` и убедиться, что:
- Header выглядит как в React-демо.
- Sidebar — список страниц (без showcases/benchmarks).
- Theme toggle переключает класс `data-theme` на `<html>` или body.
- Language toggle переключает локаль (en/ru).

## Acceptance criteria

- Пакет `_shared-vue/layout` существует, экспортирует AppShell + 5 связанных компонентов.
- `examples/demo-vue` использует `AppShell` из `_shared-vue`.
- DOM-структура хедера/сайдбара совпадает с React-демо по `sg-*` классам.
- `pnpm --filter demo-vue build` зелёный.
- Theme toggle и language toggle работают.
- В навигации Vue-демо нет пунктов «Showcases» и «Benchmarks».

## Стоп-лист

- НЕ переносить Showcases/Benchmarks страницы.
- НЕ менять корневой `pnpm-workspace.yaml` без записи в `blocked/`.
- НЕ ставить новые пакеты (`pnpm install` запрещён).
- НЕ трогать React-демо.
- НЕ трогать `@skygraph/vue` исходники.

## Зависимости
- Желательно после T-Vue-Cleanup (чтобы AppShell видел чистые SFC), но не блокирующая зависимость — Layout не использует InputPassword/PinInput и т. п.

## Финал
Отчёт: `docs/_streams/done/T-VueLayout.md`. В отчёте — скриншот-диф (если возможно) или текстовое сравнение DOM-структуры.
