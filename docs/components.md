# Компоненты — руководство по разработке

## Два типа компонентов

### UI-компоненты (`components/ui/`)

Чистый React. Не импортируют `@skygraph/core`. Один файл на компонент.

Примеры: Button, Input, Modal, Checkbox, Select, Tabs, Tooltip, ...

### Complex-компоненты (`components/complex/`)

Используют core через хуки. Если > 300 строк — разбивать на папку.

Примеры: Form, Table, Tree, TreeSelect, Transfer, Calendar, List, Cascader, DataGrid, AutoField, SchemaForm, FormList, FormProvider, VirtualList, **Diagram** (визуальный слой `GraphEngine`).

## Как добавить UI-компонент

### 1. Создать файл

```
packages/react/src/components/ui/MyComponent.tsx
```

### 2. Структура файла

```typescript
import React from 'react'

export interface MyComponentProps {
  // props
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean    // обязательно! позволяет отключить стили
}

export function MyComponent({
  className,
  style,
  unstyled,
  ...rest
}: MyComponentProps) {

  if (unstyled) {
    return <div className={className} style={style}>...</div>
  }

  const cls = [
    'sg-mycomponent',
    // условные классы
    className,
  ].filter(Boolean).join(' ')

  return <div className={cls} style={style}>...</div>
}
```

### 3. Добавить стили

```
packages/react/styles/components/mycomponent.css
```

Правила:
- Префикс `.sg-` для всех классов
- Использовать токены из `tokens.css` (цвета, размеры, отступы)
- Поддерживать dark тему через CSS-переменные

### 4. Подключить стили

В `styles/index.css` добавить:
```css
@import './components/mycomponent.css';
```

### 5. Экспортировать

В `packages/react/src/index.ts`:
```typescript
export { MyComponent } from './components/ui/MyComponent'
export type { MyComponentProps } from './components/ui/MyComponent'
```

### 6. Добавить демо

Создать `examples/demo/src/demos/MyComponentDemo.tsx` и подключить в `App.tsx`.

## Как добавить Complex-компонент

### 1. Создать engine в core (если нужен)

См. [Core Engine](./core-engine.md).

### 2. Создать хук-мост

```
packages/react/src/hooks/useMyEngine.ts
```

Паттерн (копировать с `useTable.ts` или `useTree.ts`):

```typescript
import { useState, useCallback, useMemo } from 'react'
import { createCore, createMyEngine } from '@skygraph/core'
import type { Core, MyEngine, MyEngineState } from '@skygraph/core'

export interface UseMyEngineOptions { /* ... */ }

export interface UseMyEngineReturn {
  core: Core
  engine: MyEngine
  state: MyEngineState
  // методы-обёртки, которые вызывают engine + refresh()
  refresh: () => void
}

export function useMyEngine(options?: UseMyEngineOptions): UseMyEngineReturn {
  const [{ core, engine }] = useState(() => {
    const c = createCore()
    const e = createMyEngine(c, options)
    return { core: c, engine: e }
  })

  const [state, setState] = useState(() => engine.getState())

  const refresh = useCallback(() => {
    setState(engine.getState())
  }, [engine])

  // обёртки для каждого метода engine:
  const doSomething = useCallback(() => {
    engine.doSomething()
    refresh()
  }, [engine, refresh])

  return useMemo(() => ({
    core, engine, state, doSomething, refresh,
  }), [core, engine, state, doSomething, refresh])
}
```

### 3. Создать папку компонента

```
packages/react/src/components/complex/MyComponent/
├── types.ts           — интерфейсы пропсов, локаль, константы
├── MyComponent.tsx    — главный компонент (оркестратор)
├── SubComponent.tsx   — подкомпоненты (если нужны)
└── index.ts           — реэкспорт
```

### 4. types.ts

```typescript
import type React from 'react'
import type { SomeType } from '@skygraph/core'

export type { SomeType }

export interface MyComponentLocale {
  emptyText?: React.ReactNode
  // ...
}

export const DEFAULT_LOCALE: Required<MyComponentLocale> = {
  emptyText: 'Нет данных',
}

export interface MyComponentProps {
  // данные
  // callbacks
  // display
  locale?: MyComponentLocale
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}
```

### 5. index.ts

```typescript
export { MyComponent } from './MyComponent'
export type { MyComponentProps, MyComponentLocale } from './types'
```

### 6. Обновить react/src/index.ts

Добавить экспорт компонента, типов и хука.

### 7. Пересобрать core (если менялся)

```bash
cd packages/core && npm run build
```

### 8. Проверить

```bash
cd packages/react && npx tsc --noEmit
cd examples/demo && npx tsc --noEmit
```

## Обязательные свойства каждого компонента

| Prop | Тип | Зачем |
|---|---|---|
| `className` | `string` | Кастомный CSS-класс |
| `style` | `CSSProperties` | Inline-стили |
| `unstyled` | `boolean` | Рендер без CSS-классов (для полной кастомизации) |
| `locale` | `*Locale` | Локализация текстов (для complex) |

## Паттерн `unstyled`

Каждый компонент должен поддерживать `unstyled` режим — рендерит минимальный HTML с ARIA-атрибутами, но без CSS-классов. Позволяет использовать компонент как headless.
