# T-VueDemo-Pages — Догнать страницы demo-vue до уровня React-демо

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-VueDemo-Pages
- **Волна:** 2

## Контекст

В React-демо (`examples/demo`) присутствует ~50 компонентов с подробными вариантами. В Vue-демо (`examples/demo-vue`) сейчас 23 страницы. Гэп — около 25-30 страниц.

Задача стрима — портировать **только те** страницы, для которых соответствующий компонент **уже существует** в `@skygraph/vue`. Если компонента нет в Vue-пакете → пропускаем эту страницу и записываем в `findings/T-VueDemo-Pages.md` (отдельная задача — портить компонент в Vue, не наша зона).

Showcases и Benchmarks — **не переносим** (явная не-цель из CHARTER §2).

## Зависимость от T-VueLayout (CRITICAL)

T-VueLayout правит `examples/demo-vue/src/{App.vue,main.ts,nav.ts}` и удаляет local Header/Sidebar. Этот стрим тоже регистрирует новые маршруты в `nav.ts` / `main.ts`. Поэтому идёт **строго после** T-VueLayout (последовательно в одном табе).

## Зона файлов (можно трогать)

- `examples/demo-vue/src/pages/*.vue` — **создание новых** Page-компонентов.
- `examples/demo-vue/src/nav.ts` или `routes.ts` (если так называется) — **только append** новых маршрутов.
- `examples/demo-vue/src/main.ts` — если роутинг встроен сюда, добавление маршрутов append.
- `examples/demo-vue/src/components/DemoBox.vue` / `ComponentDoc.vue` / `PropsTable.vue` — **только** добавление новых пропов/типов если нужно (без поломки существующих API).

### НЕЛЬЗЯ трогать

- `packages/**` (любой пакет SkyGraph).
- `examples/demo/**` (React-демо).
- `examples/showcases/**`.
- `examples/_shared-react/**`.
- `examples/_shared-vue/**` — это зона T-VueLayout, не трогаем.
- `examples/demo-vue/src/App.vue`, `examples/demo-vue/src/components/{Header,Sidebar,ThemeToggle,LanguageToggle}.vue` — это зона T-VueLayout.
- Существующие 23 страницы в `examples/demo-vue/src/pages/` (только если соответствующая страница в React-демо реально расширилась — тогда апдейт допустим, но **НЕ переписывать с нуля**).

## Чек-лист

### Шаг 0. Аудит

1. Прочитать `examples/demo/src/App.tsx` (или `nav.ts`) — список всех маршрутов React-демо.
2. Прочитать `examples/demo-vue/src/main.ts` (или `nav.ts`) — список всех маршрутов Vue-демо.
3. Прочитать `packages/vue/src/index.ts` — список доступных экспортов в `@skygraph/vue`.
4. Составить три списка:
   - **A** — есть в React-демо, есть в Vue-пакете, **нет** в Vue-демо: **портим**.
   - **B** — есть в React-демо, **нет** в Vue-пакете: **пропускаем**, записываем в `findings/T-VueDemo-Pages.md` как «нужен порт компонента в Vue-пакет».
   - **C** — есть в обоих демо: проверяем расхождения. Не переписываем.

### Шаг 1. Порт страниц из списка A

Для каждой страницы из A:

1. Прочитать React-эталон (`examples/demo/src/pages/<Name>Page.tsx` или подобное).
2. Создать `examples/demo-vue/src/pages/<Name>Page.vue`:
   - **Идиоматично Vue** (`<script setup>`, `defineProps` если нужно, `useConfig()` для locale).
   - Использовать существующие layout-обёртки `DemoBox`, `ComponentDoc`, `PropsTable` (см. как сделано в существующих страницах Vue-демо).
   - DOM-структура и `sg-*` классы примеров — **строго как в React-демо** (визуальная идентичность).
   - Локали — через `useConfig()`. Если ключи отсутствуют в `SgLocale` → `findings/T-VueDemo-Pages.md`, **не добавлять** ключи (это зона T-Docs-Locales).
3. Зарегистрировать маршрут:
   - Добавить в `nav.ts` / `main.ts` запись о новой странице (append).
   - Имя маршрута — то же, что в React-демо (для будущих smoke-сравнений).
4. Зайти в demo-vue dev (если можно) и убедиться, что страница рендерится без ошибок.

### Шаг 2. Список приоритетов

Если время ограничено — берём в порядке популярности компонентов:

1. **List** (часто используется).
2. **Tree** + **TreeSelect** (если есть в Vue).
3. **Form** (если в Vue есть FormEngine bindings).
4. **Cascader**.
5. **ColorPicker**.
6. **Steps**.
7. **Notification** + **Popconfirm**.
8. **Carousel**.
9. **Collapse**.
10. **Descriptions**.
11. **Empty**.
12. **Rate**.
13. **Segmented**.
14. **Timeline**.
15. **TimePicker**.
16. **Transfer**.
17. **Upload**.
18. **Calendar**.
19. **Diagram** (если в Vue есть Diagram).
20. **Charts** (Line/Bar/Area — если в Vue есть; ChartCrosshair/Brush/HoverToolbar **не покрываем** — они появятся только после T-Vue-Charts).
21. **DesignTokens** / **ConfigProvider** — если страница в demo-vue нужна.

Останавливаемся на любом разумном пункте, если выходим из бюджета. Остальное — `findings/`.

### Шаг 3. Финал

```bash
pnpm --filter demo-vue typecheck
pnpm --filter demo-vue build
```

Зелёные. Запустить dev (если возможно) — `pnpm --filter demo-vue dev` и пройти по новым страницам глазами на предмет очевидных рантайм-ошибок.

## Acceptance criteria

- В `examples/demo-vue/src/pages/` есть страницы для всех компонентов из списка **A**, существующих в `@skygraph/vue`.
- В `findings/T-VueDemo-Pages.md` есть список из **B** — компоненты, не покрытые Vue-пакетом.
- Маршруты зарегистрированы в `nav.ts`/`main.ts`.
- `pnpm --filter demo-vue build` зелёный.
- В нав-сайдбаре Vue-демо новые страницы видны.

## Стоп-лист

- НЕ переносить Showcases / Benchmarks.
- НЕ менять `packages/**`.
- НЕ переписывать существующие 23 страницы demo-vue.
- НЕ запускать `pnpm install`.
- НЕ запускать глобальные команды без `--filter`.
- НЕ добавлять новые компоненты в `@skygraph/vue` (если страницы для них нужны, но компонента нет — пропускаем + finding).
- НЕ менять `package.json` пакета demo-vue.

## Зависимости
- **СТРОГО ПОСЛЕ** T-VueLayout (тот же таб, последовательно).
- **НЕ зависит** от T-Vue-Charts (если он не закончен — Charts-страницы пропускаем + finding).

## Финал
Отчёт: `docs/_streams/done/T-VueDemo-Pages.md`. Список добавленных страниц и список пропущенных (с причиной).
