# Конвенции

## Именование

### Файлы

| Что | Формат | Пример |
|---|---|---|
| UI-компонент | `PascalCase.tsx` | `Button.tsx`, `DatePicker.tsx` |
| Complex-компонент (папка) | `PascalCase/` | `Table/`, `Tree/` |
| Хук | `camelCase.ts` | `useTable.ts`, `useTree.ts` |
| Типы | `types.ts` | `types.ts` |
| Хелперы | `helpers.ts` | `helpers.ts` |
| CSS | `kebab-case.css` | `date-picker.css`, `input-number.css` |
| Тесты | `*.test.ts` | `table.test.ts` |
| Демо | `PascalCaseDemo.tsx` | `TableDemo.tsx` |

### CSS-классы

Префикс `sg-` + компонент + модификатор:

```
sg-button
sg-button-primary
sg-button-disabled
sg-button-loading

sg-table-wrapper
sg-table-th
sg-table-td
sg-table-row-selected

sg-tree-node
sg-tree-node-expanded
sg-tree-switcher
```

### TypeScript

| Что | Формат | Пример |
|---|---|---|
| Компонент | `PascalCase` | `Table`, `TreeNodeRow` |
| Props interface | `ComponentNameProps` | `TableProps`, `TreeProps` |
| Locale interface | `ComponentNameLocale` | `TableLocale`, `TreeLocale` |
| Engine interface | `ComponentNameEngine` | `TableEngine`, `TreeEngine` |
| Engine state | `ComponentNameState` | `TableState`, `TreeState` |
| Фабрика engine | `createComponentName` | `createTable`, `createTree` |
| Хук | `useComponentName` | `useTable`, `useTree` |
| Константы | `UPPER_SNAKE_CASE` | `DEFAULT_COL_WIDTH`, `DEFAULT_INDENT` |

## Структура complex-компонента

Если компонент > 300 строк — разбивать на папку:

```
ComponentName/
├── index.ts           — реэкспорт (только public API)
├── types.ts           — все интерфейсы, константы, locale
├── ComponentName.tsx  — главный компонент (оркестратор)
├── SubPart.tsx        — подкомпоненты
├── helpers.ts         — чистые функции (если есть)
└── useComponentState.ts — state-логика (если нужна отдельно от хука)
```

## Обязательные props

Каждый компонент должен принимать:

```typescript
interface AnyComponentProps {
  className?: string           // кастомный CSS-класс
  style?: React.CSSProperties  // inline-стили
  unstyled?: boolean           // headless-режим (без CSS)
}
```

Complex-компоненты дополнительно:

```typescript
interface ComplexComponentProps {
  locale?: ComponentLocale     // локализация текстов
}
```

## Locale

Каждый complex-компонент имеет:

1. `ComponentLocale` interface — все строки опциональные
2. `DEFAULT_LOCALE` constant — дефолтные значения (английский)
3. Мерж в компоненте: `const t = useMemo(() => ({ ...DEFAULT_LOCALE, ...locale }), [locale])`

Никаких хардкоженных строк в JSX. Всё через `t.xxx`.

## Экспорт

### Из компонента (index.ts)

Экспортировать: компонент + все public типы.
Не экспортировать: внутренние подкомпоненты, хелперы, хуки состояния.

### Из пакета (react/src/index.ts)

```typescript
// Компонент
export { MyComponent } from './components/...'
// Типы (через type export)
export type { MyComponentProps, MyComponentLocale } from './components/...'
// Хук (если есть)
export { useMyEngine } from './hooks/...'
export type { UseMyEngineOptions, UseMyEngineReturn } from './hooks/...'
```

## Демо

Каждый компонент имеет демо-страницу в `examples/demo/src/demos/`.

Структура демо:
- Отдельная функция на каждую фичу (не один гигантский рендер)
- Каждая фича — заголовок `<h3>` + минимальный пример
- Подключение в `App.tsx`: import, menu item, pages map

## Git

- Ветка для фич: `feat/описание`
- Коммиты на русском или английском, без эмодзи
- Не коммитить `dist/`, `node_modules/`
