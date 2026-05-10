# T-React-I18n-Styles — done

## Часть 1 — i18n хардкоды → `useConfig().locale`

### Расширения `SgLocale` (`packages/react/src/types/locale.ts`)

Новые подключи (на каждый компонент):

- `inputPassword`: `showPassword`, `hidePassword`
- `searchInput`: `clear`
- `inlineEdit`: `save`, `cancel`
- `tagInput`: `removeTag(tag)`
- `drawer`: `closeAriaLabel`
- `notification`: `closeAriaLabel`
- `tag`: `closeAriaLabel`
- `spin`: `loading`
- `skeleton`: `loading`
- `breadcrumb`: `ariaLabel`
- `carousel`: `slide(index)`
- `rate`: `ariaLabel`, `star(count)`
- `charts`: `lineChart`, `barChart`, `areaChart`, `pieChart`, `legend`, `actions`
- `datePicker`: `prevYear`, `nextYear`, `prevMonth`, `nextMonth`
- `cascader`: `searchPlaceholder`, `noMatches`
- `treeSelect`: `searchPlaceholder`, `noMatches`
- `dashboard`: `ariaLabel`, `editorAriaLabel`, `resizeWidget`, `widgetActions`
- `gantt`: `ariaLabel`, `resizeTask`
- `resourceCalendar`: `ariaLabel`, `resource(name)`, `capacity(n)`, `resizeStart`, `resizeEnd`, `conflictSuffix`
- `timeline`: `ariaLabel`
- `schemaFormEditor`: `undo`, `redo`, `removeOption`, `schemaView`, `optionLabelPlaceholder`, `optionValuePlaceholder`, `moveFieldUp`, `moveFieldDown`, `duplicateField`, `deleteField`

Дополнения существующих:

- `pagination`: `+ ariaLabel`
- `modal`: `+ closeAriaLabel`
- `upload`: `+ uploadAriaLabel`
- `calendar`: `+ prevYear`, `+ nextYear`, `+ prevMonth`, `+ nextMonth`
- `tree` (внутренний `Tree/types.ts`): `+ clearSearch`

Все ключи добавлены в `packages/react/src/locales/en_US.ts` и `ru_RU.ts`.

### Компоненты, которые перевели на `useConfig().locale`

`packages/react/src/components/`:

- `ui/InputPassword.tsx` — `aria-label` toggle.
- `ui/SearchInput.tsx` — `aria-label` clear.
- `ui/InlineEdit.tsx` — `aria-label` save / cancel.
- `ui/Drawer.tsx` — `aria-label` close.
- `ui/Modal.tsx` — `aria-label` close.
- `ui/Notification.tsx` — `aria-label` close.
- `ui/Tag.tsx` — `aria-label` close.
- `ui/Spin.tsx` — `aria-label` loading.
- `ui/Skeleton.tsx` — `aria-label` loading.
- `ui/Breadcrumb.tsx` — `aria-label` nav.
- `ui/Pagination.tsx` — `aria-label` nav.
- `ui/Carousel.tsx` — `aria-label` slides.
- `ui/Rate.tsx` — `aria-label` root + per-star.
- `ui/Upload.tsx` — `aria-label` input + remove.
- `ui/TagInput.tsx` — `aria-label` remove tag.
- `complex/Calendar/Calendar.tsx` — title/aria-label nav buttons.
- `complex/Cascader/Cascader.tsx` — search placeholder + «No matches».
- `complex/TreeSelect/TreeSelect.tsx` — search placeholder + «No matches».
- `complex/Tree/Tree.tsx` — clear-search button aria-label.
- `complex/Charts/{LineChart,BarChart,AreaChart,PieChart,ChartLegend,ChartHoverToolbar}.tsx`
  — chart `<svg>` aria-labels.
- `complex/Dashboard/{Dashboard,DashboardEditor}.tsx` — root aria-label,
  resize-widget, widget-actions.
- `complex/Gantt/Gantt.tsx` — root aria-label, resize-task.
- `complex/Timeline/Timeline.tsx` — root aria-label.
- `complex/ResourceCalendar/ResourceCalendar.tsx` — root aria-label,
  per-resource lane, capacity, conflict suffix, resize handles.
- `complex/SchemaFormEditor/{SchemaFormEditor,SchemaFormEditorCanvas,SchemaFormEditorInspector,SchemaFormEditorSchemaView}.tsx`
  — toolbar undo/redo, per-field actions, schema view aria-label,
  option-row placeholders + remove button.

Все замены делаются через паттерн:

```ts
const xLocale = useConfig().locale?.x
// …
aria-label={xLocale?.someKey ?? 'English fallback'}
```

Английский fallback совпадает с тем, что лежит в `en_US.ts`, чтобы
консьюмеры без `<ConfigProvider>` всё равно видели читаемый текст.

### Дополнительно: `index.ts` (только добавления)

`packages/react/src/index.ts` дополнен реэкспортами новых типов локалей
(`InputPasswordLocale`, `SearchInputLocale`, …, `SchemaFormEditorLocale`),
и `packages/react/src/types/index.ts` — соответствующими `export type`.

## Часть 2 — инлайн `style={{}}` → CSS

### Перенос статичных стилей в CSS-классы

- `complex/Charts/ChartLegend.tsx` — было ~3 inline-style блока с layout
  (`display: flex`, `gap`, `marginTop`, `fontSize`, `display: inline-flex`,
  `width: 10`, `height: 10`, `border-radius`, …). Layout переехал в
  `packages/styles/components/charts.css`:
  - `.sg-chart-legend` — `display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; font-size: 12px;`
  - `.sg-chart-legend-item` — `display: inline-flex; align-items: center; gap: 6px;`
  - `.sg-chart-legend-swatch` — `display: inline-block; width: 10px; height: 10px; border-radius: 2px;`
  В TSX остался только динамический `background: colorForSeries(s, i)`
  (требуется существующим тестом `charts.test.tsx`).

- `ui/Modal.tsx` — `style={{ width }}` → `style={{ ['--sg-modal-width']: ... }}`.
  В `modal.css`: `.sg-modal { --sg-modal-width: 520px; width: var(--sg-modal-width); }`.

- `ui/Collapse.tsx` — `style={{ maxHeight: ..., overflow: 'hidden' }}` →
  `style={{ ['--sg-collapse-content-max-height']: ... }}`. В `collapse.css`:
  `.sg-collapse-content { --sg-collapse-content-max-height: 0px; max-height: var(...); overflow: hidden; }`.

- `complex/Field.tsx` — снят статичный `flexShrink: 0` из inline-стиля
  `.sg-field-label-wrap`, добавлено правило `.sg-field-label-wrap { flex-shrink: 0 }`
  в `form.css`.

### Что осталось inline (динамика)

Все остальные `style={{}}` в `packages/react/src/components/**/*.tsx`
зависят от пропов / state (размеры, цвета по статусу, координаты
drag-ghost, computed `gridColumn`). По §6.1 CHARTER оставлены как есть.
Статичных нерефакторенных кейсов не осталось (кроме `unstyled`-веток
у `Tooltip`/`Popconfirm`/`Dropdown`/`Cascader` — там `position: relative`
обязателен для работоспособности при отключённом `unstyled`).

## Acceptance criteria — статус

| Пункт | Статус | Комментарий |
|---|---|---|
| `SgLocale` расширен новыми ключами | ✅ | См. список выше; `en_US`, `ru_RU` дополнены. |
| Хардкод user-facing строк в TSX вычищен | ✅ | Покрыто всё в `packages/react/src/components/**` кроме исключений (Table, unicode `×`/`✓`/…, `data-*`, технические идентификаторы). |
| Статичные `style={{}}` переведены в CSS | ✅ | См. «Часть 2». Динамика осталась как inline / CSS-переменные. |
| `pnpm --filter @skygraph/react typecheck` | ✅ | OK |
| `pnpm --filter @skygraph/react test` | ✅ | 626 passed \| 2 skipped |
| `pnpm --filter @skygraph/react build` | ✅ | OK |
| `pnpm --filter @skygraph/react api:check` | ✅ | OK после `api:update` (см. `decisions/T-React-I18n-Styles.md`). |
| `pnpm check:styles` | ✅ | check-tokens + check-no-important зелёные. |
| `pnpm --filter demo build` | ❌ pre-existing | Падает на T-Showcases-I18n. См. `findings/T-React-I18n-Styles.md`. |

## Стоп-лист — соблюдение

- ✅ Не трогал `packages/react/src/components/complex/Table/**`.
- ✅ Не трогал `packages/vue/src/components/`, `examples/`, корневые конфиги.
- ✅ В `packages/react/src/index.ts` — только добавления (новые `export type`).
- ✅ В `packages/styles/components/*.css` — только добавления; ничего не удалял (это зона T-React-Cleanup).
- ✅ Не запускал `pnpm install`, `pnpm clean`, глобальные команды без `--filter`.
- ⚠️ `etc/react.api.md` — обновлён (только additive). Решение зафиксировано
  в `decisions/T-React-I18n-Styles.md` по §6.1 CHARTER: альтернатива —
  блокировка card'а. Diff additive, без removals/breaking.
