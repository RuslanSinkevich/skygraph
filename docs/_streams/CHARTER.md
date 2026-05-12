# Skycode/SkyGraph — Parallel Streams Charter

> Конституция работы параллельных табов в монорепо `skygraph`.
> Каждый стрим читает этот документ **перед стартом**. Если что-то здесь
> противоречит твоей task-карте — побеждает CHARTER.

---

## 1. Контекст

Монорепо `skygraph` (pnpm workspaces).

- `@skygraph/core` — ядро (Core, FormEngine, TableEngine, TreeEngine, GraphEngine, виртуализация). Без UI.
- `@skygraph/react` — React-адаптер.
- `@skygraph/vue` — Vue 3 адаптер.
- `@skygraph/angular` — Angular-адаптер.
- `@skygraph/styles` — общий CSS (`.sg-*` классы), используется всеми адаптерами.
- `examples/demo` (React), `examples/demo-vue`, `examples/demo-angular`, `examples/showcases` (только React).
- `examples/_shared` — кросс-фреймворковые константы и locale-словари.
- `examples/_shared-react/layout`, `examples/_shared-vue/layout` — общие AppShell/Header/Footer/Sidebar.

---

## 2. Правила параллельной работы

Стримы работают **параллельно в одном working tree**. Никаких git-веток, worktrees, коммитов. Финальное ревью делает пользователь сам через `git status` / `git diff`.

### Жёсткие запреты

1. **НЕ запускать `pnpm install`.** Пересоздаёт `node_modules` и убивает параллельные процессы. Новые зависимости — только если task-карта это явно разрешает и оговаривает стрим как одиночный.
2. **НЕ запускать глобальные команды:** `pnpm typecheck`, `pnpm build`, `pnpm test`, `pnpm lint` без `--filter` — race condition по `node_modules/.cache/*` и временным файлам tsc.
3. **Только точечные команды через `--filter`:**
   - `pnpm --filter @skygraph/<pkg> typecheck`
   - `pnpm --filter @skygraph/<pkg> test`
   - `pnpm --filter <demo> build`
4. **НЕ запускать `pnpm clean`** — снесёт `dist/` чужим стримам.
5. **Зоны изоляции из task-карты — закон.** Любая правка чужой зоны = катастрофа, нет git-снимков для отката.
6. **НЕ менять `pnpm-lock.yaml` руками.**
7. **НЕ менять CSS-токены в `packages/styles/tokens.css`** без явного разрешения task-карты.
8. **НЕ удалять чужие тесты.**
9. **НЕ расширять scope** за пределы task-карты.
10. **НЕ коммитить** `dist/` или `node_modules/`.

### Что разрешено

- Точечный typecheck/test/build своего пакета через `--filter`.
- Создание новых файлов в своей зоне.
- Чтение любых файлов в репо.

---

## 3. Decision Protocol (без обратной связи)

Стрим **не имеет права** задавать вопросы пользователю. Все решения сам по правилам.

### 3.1 Неоднозначное API
1. Минимально инвазивный вариант (минимум изменений в публичном API).
2. Запись в `docs/_streams/decisions/<stream-id>.md`.
3. Идти дальше.

### 3.2 Чужой файл понадобился
1. **НЕ ТРОГАТЬ.**
2. В своём файле сделать TODO/заглушку.
3. Запись в `docs/_streams/blocked/<stream-id>.md`.
4. Продолжить оставшийся scope.

### 3.3 Тесты падают
- 3 попытки чинить.
- Не вышло — отменить последнее изменение в **своих** файлах (не через git).
- Запись в `docs/_streams/blocked/<stream-id>.md`.
- Идти к следующей задаче scope.

### 3.4 Находка вне scope
- Сломано/мёртво/неконсистентно вне твоей зоны.
- **НЕ ЧИНИ.**
- Запись в `docs/_streams/findings/<stream-id>.md`.

Логи `decisions/`, `findings/`, `blocked/`, `done/` — **только append**, никогда не редактируй чужие записи.

---

## 4. Workflow стрима

**Старт:** прочитать CHARTER → прочитать свою task-карту → свериться с картой зон в карте.

**Во время работы:** точечные команды через `--filter` — можно; глобальные — нельзя; новые файлы только в своей зоне.

**Перед завершением** прогнать только своего пакета:
```bash
pnpm --filter <свой-пакет> typecheck
pnpm --filter <свой-пакет> test
pnpm --filter <свой-пакет> build   # если применимо
```
Все зелёные.

**Финал:** стрим **не делает** PR/commit/push. Финальный отчёт — `docs/_streams/done/<stream-id>.md`: список изменённых файлов, acceptance criteria, ссылки на decision/blocked/findings.

---

## 5. Vue-идиоматика

Цель — код понятен большинству Vue-разработчиков. Без имитации React-паттернов.

### Скрипт
- `<script setup lang="ts">` всегда.
- Пропы: `withDefaults(defineProps<Props>(), {...})`.
- События: `defineEmits<{...}>()`.
- Слоты: `defineSlots<{...}>()`.
- v-model: `modelValue` + `update:modelValue`. Вспомогательные — `update:foo`.
- `ref` для скаляров, `reactive` только для сложных мутируемых коллекций.
- `computed` для производных, `watch`/`watchEffect` для эффектов.
- Lifecycle: `onMounted`/`onBeforeUnmount`/`onScopeDispose` (последнее — для композаблов с подписками core).
- Композабл = `use*`, возвращает `Ref<T>` или объект из `Ref`-ов. Не сырое значение.
- DI: `provide`/`inject` через `InjectionKey<T>`.

### Шаблон
- **Не объявлять `class` как проп.** Vue сам пробрасывает `class` на корень. Никаких `customClass`.
- `v-bind="$attrs"` где надо явно прокинуть атрибуты в дочерний элемент.
- `v-show` для частых toggle, `v-if` для условного маунта.
- DOM-ref: `const el = ref<HTMLElement | null>(null)` + `:ref="el"`.

### Запрещено
- Имитировать `useState`/`useEffect` через `reactive`-обёртки.
- Возвращать «готовое значение» из композабла вместо `Ref`.
- Объявлять `class`/`style` пропами «как в React».
- `defineExpose` без явной необходимости.

### Имена
- Компоненты — `Sg*` (`SgInput`, `SgChartCrosshair`).
- Композаблы — `use*`.
- Публичные типы — без префикса (`InputProps`, `TableColumn`).

---

## 6. Angular-идиоматика

- Standalone-компоненты, `ChangeDetectionStrategy.OnPush` по умолчанию.
- Шаблоны — inline или отдельный `.html`, как удобнее SFC, но контракт DOM/`sg-*` классов 1:1 с React/Vue.
- DI: `provideSgConfig` + `injectSgConfig` (эквивалент `useConfig`), `<sg-config-provider>` для дерева.
- Attribute-selectors для примитивов где это идиоматично (`button[sg-button]`).
- Локали — те же ключи `SgLocale` через DI-токен.
- Компоненты — `Sg*` (`SgButton`, `SgSpin`), сервисы — `Sg*Service`.

---

## 7. API Parity

**Паритет = публичный API одинаков, реализация идиоматична для фреймворка.**

### Должно совпадать между адаптерами
- Список экспортов из `index.ts` (имена, типы, дженерики).
- Имена пропов и их типы.
- Имена эмитов/коллбэков и сигнатуры.
- DOM-структура и `sg-*` классы.
- Ключи в `SgLocale`.
- Поведение в граничных случаях.

### Может (и должно) отличаться
- Внутренний state (`ref`/`computed` vs `useState`/`useMemo` vs Angular signals).
- Сигнатура композаблов: React `T`, Vue `Ref<T>`, Angular `Signal<T>`.
- Render lifecycle.
- Слоты Vue / `ng-content` Angular ↔ render-props/children React — по смыслу, не по сигнатуре.

---

## 8. Локализация

### НЕ локализуем (хардкод оставляем)
- Символы Unicode: `✓ ✕ ○ ◉ ⌕ × ✎ →` и подобные.
- Технические идентификаторы: имена ключей роутов, классы, ARIA-роли.
- `sg-*` имена классов.

### Локализуем
- Все человекочитаемые строки UI: placeholders, button labels, error messages, текст в `aria-label`.
- Имена меню, заголовки секций.

---

## 9. Команды (справка)

```bash
# Per-package (РАЗРЕШЕНО)
pnpm --filter @skygraph/core test
pnpm --filter @skygraph/react test
pnpm --filter @skygraph/vue typecheck
pnpm --filter @skygraph/vue build
pnpm --filter @skygraph/angular test
pnpm --filter demo build
pnpm --filter demo-vue build
pnpm --filter demo-angular build

# Глобальные (ЗАПРЕЩЕНО — race condition)
# pnpm typecheck / build / test / install / clean / lint

# Аудит стилей
pnpm audit:styles
pnpm check:styles
```
