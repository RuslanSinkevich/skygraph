# SkyGraph — Adapter Style Divergence Audit (auto)

> Сгенерировано `scripts/audit-adapter-styles.mjs`. CSS общий; здесь — расхождения,
> которые адаптер вносит сам (inline-стили, CSS-переменные из JS, хардкод).

## 1. CSS-переменные `--sg-*`, выставляемые из адаптера

- React трогает токенов: **26**
- Vue трогает токенов: **26**
- Только в React: **0**
- Только в Vue: **0**

### Только в React (Vue не выставляет)

_нет_

### Только в Vue (React не выставляет)

_нет_

## 2. Расхождение токенов по компонентам (общее имя файла)

_совпадают по сопоставимым компонентам_

## 3. Хардкод в inline-стилях (hex / px-литералы)

### React

- `packages/react/src/components/complex/AutoField/AutoField.tsx`
  - hex: `#faad14` — `background: 'none',
                  border: 'none',
                  cursor: disabled ? 'default' : 'pointer',
      `
  - hex: `#ff4d4f` — `color: 'var(--sg-color-error, #ff4d4f)', fontSize: 12`
  - hex: `#faad14` — `color: 'var(--sg-color-warning, #faad14)', fontSize: 12`
- `packages/react/src/components/complex/Calendar/Calendar.tsx`
  - hex: `#1677ff` — `backgroundColor: ev.color ?? 'var(--sg-color-primary, #1677ff)',`
- `packages/react/src/components/complex/DataGrid/DataGrid.tsx`
  - hex: `#999` — `width: ROW_NUMBER_COL_WIDTH,
                        minWidth: ROW_NUMBER_COL_WIDTH,
                        display: 'f`
- `packages/react/src/components/ui/Collapse.tsx`
  - px: `'0px'` — `['--sg-collapse-content-max-height' as string]:
            height !== undefined ? `${height}px` : isActive ? 'none' : '`
- `packages/react/src/components/ui/ColorPicker.tsx`
  - hex: `#000` — `width: 200, height: 150, position: 'relative', background: `linear-gradient(to top, #000, transparent), linear-gradient(`
  - hex: `#f00` — `width: 200, height: 12, background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%`
  - hex: `#000` — `background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})``
- `packages/react/src/components/ui/Progress.tsx`
  - hex: `#eee` — `width: '100%', height: strokeWidth ?? 8, background: '#eee'`
  - hex: `#1677ff` — `width: `${clampedPercent}%`, height: '100%', background: strokeColor ?? '#1677ff'`

### Vue

- `packages/vue/src/components/complex/Dashboard/DashboardEditor.vue`
  - px: `'12px'` — `{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '12px',
          height: '1`
  - px: `'12px'` — `{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '12px',
          height: '1`
- `packages/vue/src/components/complex/DataGrid/DataGrid.vue`
  - px: `'120px'` — `{
          width: col.width ? `${col.width}px` : '120px',
          minWidth: col.minWidth ? `${col.minWidth}px` : unde`
  - px: `'120px'` — `{
              width: col.width ? `${col.width}px` : '120px',
              minWidth: col.minWidth ? `${col.minWidth}px`
  - px: `'120px'` — `{
            width: col.width ? `${col.width}px` : '120px',
            textAlign: col.align ?? 'left',
          }`
- `packages/vue/src/components/complex/Gantt/Gantt.vue`
  - px: `'6px'` — `{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
   `
- `packages/vue/src/components/complex/ResourceCalendar/ResourceCalendar.vue`
  - px: `'6px'` — `{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
            `
  - px: `'6px'` — `{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
           `
- `packages/vue/src/components/complex/SchemaForm/AutoField.vue`
  - hex: `#faad14` — `{
          background: 'none',
          border: 'none',
          cursor: isDisabled ? 'default' : 'pointer',
        `
  - px: `'20px'` — `{
          background: 'none',
          border: 'none',
          cursor: isDisabled ? 'default' : 'pointer',
        `
  - hex: `#ff4d4f` — `color: var(--sg-color-error, #ff4d4f); font-size: 12px`
  - hex: `#faad14` — `color: var(--sg-color-warning, #faad14); font-size: 12px`
- `packages/vue/src/components/complex/Table/Table.vue`
  - px: `'240px'` — `{ maxWidth: '240px' }`
- `packages/vue/src/components/devtools/HistoryPanel.vue`
  - px: `'10px'` — `{ marginLeft: 'auto', fontSize: '10px', opacity: 0.6 }`
- `packages/vue/src/components/ui/Calendar.vue`
  - hex: `#1677ff` — `{ backgroundColor: ev.color ?? 'var(--sg-color-primary, #1677ff)' }`
- `packages/vue/src/components/ui/ColorPicker.vue`
  - px: `'16px'` — `unstyled
            ? { display: 'inline-block', width: '16px', height: '16px', background: current }
            : { b`
  - px: `'16px'` — `unstyled
            ? { display: 'inline-block', width: '16px', height: '16px', background: current }
            : { b`
  - px: `'200px'` — `unstyled
            ? { width: '200px', height: '150px', position: 'relative', background: satBackground }
            `
  - px: `'150px'` — `unstyled
            ? { width: '200px', height: '150px', position: 'relative', background: satBackground }
            `
  - hex: `#f00` — `unstyled
            ? {
                width: '200px',
                height: '12px',
                background:
   `
  - px: `'200px'` — `unstyled
            ? {
                width: '200px',
                height: '12px',
                background:
   `
  - px: `'12px'` — `unstyled
            ? {
                width: '200px',
                height: '12px',
                background:
   `
  - px: `'4px'` — `unstyled ? { display: 'flex', flexWrap: 'wrap', gap: '4px' } : undefined`
  - px: `'16px'` — `unstyled ? { width: '16px', height: '16px', background: c } : { background: c }`
  - px: `'16px'` — `unstyled ? { width: '16px', height: '16px', background: c } : { background: c }`
- `packages/vue/src/components/ui/Progress.vue`
  - hex: `#eee` — `{ width: '100%', height: `${strokeWidth ?? 8}px`, background: '#eee' }`
  - hex: `#1677ff` — `{ width: `${clampedPercent}%`, height: '100%', background: strokeColor ?? '#1677ff' }`
- `packages/vue/src/components/ui/Skeleton.vue`
  - px: `'16px'` — `{ width: toCss(titleWidth), height: '16px' }`
  - px: `'16px'` — `{ width: toCss(getRowWidth(i - 1, rows)), height: '16px' }`

