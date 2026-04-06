# Быстрый старт

## Структура монорепозитория

```
skygraph/
├── packages/
│   ├── core/          ← @skygraph/core — реактивный движок (0 зависимостей)
│   └── react/         ← @skygraph/react — React-компоненты + хуки
├── examples/
│   └── demo/          ← Vite-приложение с демками всех компонентов
├── docs/              ← Эта документация
├── ARCHITECTURE.md    ← Конституция архитектуры (не менять)
├── PLAN.md            ← Первоначальный план
└── tsconfig.base.json
```

## Установка и запуск

```bash
# Из корня skygraph/
npm install

# Собрать core (обязательно перед react, т.к. react зависит от dist)
cd packages/core
npm run build

# Запустить демо-приложение
cd examples/demo
npm run dev
```

## Сборка пакетов

### Core

```bash
cd packages/core
npm run build      # tsup → dist/ (esm + cjs + d.ts)
npm test           # vitest
```

После любых изменений в core **обязательно** пересобрать:
```bash
npm run build
```
Иначе react-пакет не увидит новые экспорты (он импортирует из `dist/`).

### React

```bash
cd packages/react
npx tsc --noEmit   # проверка типов (нет отдельной сборки, используется напрямую)
```

### Demo

```bash
cd examples/demo
npm run dev         # Vite dev server
npx tsc --noEmit   # проверка типов
```

## Рабочий цикл

1. Вносишь изменения в `packages/core/src/` → `npm run build` в core
2. Вносишь изменения в `packages/react/src/` → проверяешь `npx tsc --noEmit`
3. Добавляешь демо в `examples/demo/src/demos/` → проверяешь `npx tsc --noEmit`
4. Смотришь результат в браузере через `npm run dev`

## Проверка что ничего не сломал

```bash
# Из packages/core
npm test

# Из packages/react
npx tsc --noEmit

# Из examples/demo
npx tsc --noEmit
```

Известные pre-existing ошибки (не трогать):
- `Notification.tsx` — `useCallback` unused
- `useField.ts` — `onFieldBlur` не существует на FormEngine
