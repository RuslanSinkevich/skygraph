# Stream 1 — Table (ядро)

> Часть плана `demo-and-fixes-plan.md` (индекс). Один из 3 параллельных стримов. Зоны не пересекаются с S2/S3 — можно вести одновременно.

## Charter (правила исполнения)
1. **Не останавливаться** до конца стрима. Не спрашивать — все решения принимать самому.
2. **Не выходить за свою файловую зону** (ниже). Чужие зоны не трогать даже «по пути».
3. **Без субагентов.**
4. Definition of done: правки сделаны в React и Vue, `pnpm --filter @skygraph/react build` / `@skygraph/vue` и typecheck зелёные, фиксы проверены визуально по репорт-ссылкам.

## Ветка
`stream/table`

## Файловая зона (эксклюзивно)
- `packages/react/src/components/complex/Table/**`
- `packages/vue/src/components/complex/Table/**`
- `packages/styles/components/table.css`

Ничего вне этой зоны не трогать. `examples/` — зона S3 (демо `Sortable.demo.tsx` править НЕ нужно, см. A3). `components/ui`, `locales` — зона S2.

## Предусловие
`packages/` должна быть на диске. Если нет — восстановить: `git restore packages`.

---

## A1. Vue: иконка фильтра — треугольник `▾`
- **Репорт:** `/vue/#/components/table~filtry-kolonok`, `~svoy-filtr-dropdaun` — значок поиска отличается от React (виден треугольничек).
- **Корень:** в `Table.vue` иконка захардкожена символом `▾` (≈ строки 1223 и 1290). React рисует SVG (`Table/defaultIcons.tsx`: `FilterIcon` воронка, `SearchIcon` лупа).
- **Фикс:** вынести SVG-иконки в Vue по образцу React и использовать в обоих триггерах (preset-filter и `#filterDropdown`). Рассмотреть поддержку `filterMode: 'search'` на колонке (в Vue его нет — только глобальный toolbar).

## A2. Vue: empty state не по центру
- **Репорт:** `/vue/#/components/table~pustoe-sostoyanie` — «No records yet» прижат влево.
- **Корень:** empty-ячейка получает и `sg-table-td` (flex, `justify-content: flex-start`), и `sg-table-empty` (`text-align: center`). `text-align` не центрирует flex-детей. React класс `sg-table-td` не вешает.
- **Фикс:** убрать `sg-table-td` с empty-ячейки в `Table.vue` (как React) либо добавить `justify-content: center` в `.sg-table-empty`.

## A3. React: мультисорт — второй клик не реагирует
- **Репорт:** `/react/#/components/table~sortirovka` — первый клик сортирует, повторный по той же колонке игнорируется.
- **Корень:** в `handleSort` (`useTableState.ts`) при переданном `onSortsChange` не вызывается `setInternalSorts`. Демо `Sortable.demo.tsx` передаёт `onSortsChange` без controlled `sorts` → internal state всегда `[]` → цикл asc→desc→none не работает.
- **Фикс:** различать controlled (проп `sorts` задан) и callback. Всегда обновлять internal state при отсутствии controlled-пропа; `onSortsChange` вызывать как уведомление. Дополнительно починить ветку `sorts.length === 1 ? sorts[0] : null`: клик без Shift по уже сортированной колонке при мультисорте должен переключать направление, а не сбрасывать.
- **Важно:** фикс делается в библиотеке так, чтобы uncontrolled + callback работали вместе → демо менять НЕ нужно (это зона S3).

## A4. React: resizable — прыжок влево на первом drag
- **Репорт:** `/react/#/components/table~resizable-kolonki` — первое смещение даёт скачок влево, дальше норм; повторяется каждый раз.
- **Корень:** `startW` берётся из declared/persisted ширины (`colWidths ?? DEFAULT_COL_WIDTH=150`), не из реальной. Колонки тянутся по `fr`/`minmax` → на первом `mousemove` колонка скачет к declared.
- **Фикс:** измерять реальную ширину `th.getBoundingClientRect().width` в `handleResizeStart`. В Vue уже сделано (`onResizeStart` измеряет DOM) — портировать в React.

## A5. React: подключить Table к `ConfigProvider.locale.table`
- Сейчас Table читает `useConfig()` только для `size`/`bordered`; `config.locale.table` игнорирует (берёт только `props.locale`).
- **Фикс:** мержить `config.locale?.table` в источники locale Table. Делается здесь (не в S2), чтобы не пересекаться по файлам.
- **Независимость:** читать с hardcoded-fallback (как сейчас `DEFAULT_LOCALE`), чтобы работало и до мержа S2 (там C1 добавит `table`-ключи в React-пресеты).

---

## Для релиза (передать в E)
Записать в CHANGELOG (делает стрим E после мержа):
- Vue `Table`: иконки фильтра/поиска приведены к SVG (как в React).
- Vue `Table`: пустое состояние центрируется.
- React `Table`: исправлен мультисорт (повторный клик переключает направление).
- React `Table`: исправлен прыжок колонки при первом resize.
- React `Table`: подхватывает `locale.table` из `ConfigProvider`.
