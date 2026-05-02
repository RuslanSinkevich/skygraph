# SkyGraph — Предварительный план (ARCHIVED)

> ⚠ **Этот файл — исторический.**
>
> Изначальный план разработки SkyGraph до начала кодинга. Сохранён для контекста архитектурных решений и эволюции проекта.
>
> **Текущая архитектурная конституция:** [`ARCHITECTURE.md`](./ARCHITECTURE.md).
> **Финальное состояние:** [`AUDIT-POST.md`](./AUDIT-POST.md).
> **Открытые хвосты:** [`TODO.md`](./TODO.md).

---

> SkyGraph — конструктор реактивной логики UI, где состояние и зависимости описываются как граф.

---

## Что это

Два пакета:

| Пакет | Назначение | Зависимости |
|---|---|---|
| `@skygraph/core` | Reactive runtime + engines (form, table и т.д.) | Ноль |
| `@skygraph/react` | React-адаптер: хуки для сложных компонентов + простые UI-компоненты (Spin, Button и т.д.) | `@skygraph/core`, `react` (peer) |

Адаптеры для Vue, Angular — потом, контрибьюторы.

---

## Архитектура

```
@skygraph/core                          @skygraph/react
┌─────────────────────────┐             ┌──────────────────────────┐
│  runtime/               │             │  hooks/                  │
│    Store (path-based)   │             │    useField()            │
│    SubscriptionEngine   │             │    useForm()             │
│    Transaction          │             │    useComputed()         │
│    Batch                │             │                          │
│    Scheduler            │             │  components/             │
│    ComputedEngine       │             │    Form, Field           │  ← используют core
│                         │             │    Spin, Button, Modal   │  ← чистый UI, без core
│  engines/               │             │                          │
│    form/                │◄────────────│  (импортирует engines)   │
│    table/ (потом)       │             │                          │
│    validation/          │             └──────────────────────────┘
└─────────────────────────┘
```

### Ключевые разделения внутри core

**runtime/** — универсальный движок. Не знает про формы, таблицы, UI.

**engines/** — предметная логика (form, table). Использует runtime через internal API. Не знает про React.

### Ключевые разделения внутри react

**hooks/** — мост между engines и React. Подписки, ререндеры.

**components/** — два типа:
- Сложные (Form, Field) — подключены к core через hooks
- Простые (Spin, Button, Modal, Input) — чистый React, без core. Живут рядом для удобства.

---

## Архитектурные принципы

1. **Runtime ничего не знает** — не знает про формы, таблицы, UI, типы пользователя
2. **Engines используют runtime** — FormEngine вызывает `store.set()`, `store.subscribe()`
3. **Типы — внешний слой** — runtime работает с `unknown`, типизация навешивается обёрткой
4. **Granular subscriptions** — подписка на конкретный path, не на весь store
5. **Транзакционная консистентность** — нет "полуобновлённого" состояния
6. **UI не хранит state** — UI подписывается, рендерит, отправляет изменения
7. **Простые компоненты — просто компоненты** — не всё нужно пропускать через граф

---

## Структура

```
skygraph/
├── packages/
│   ├── core/
│   │   ├── src/
│   │   │   ├── runtime/
│   │   │   │   ├── Store.ts              # path → node, get/set
│   │   │   │   ├── Node.ts               # { id, value, version, dirty }
│   │   │   │   ├── SubscriptionEngine.ts  # per-path listeners
│   │   │   │   ├── Transaction.ts         # stage → resolve → commit → notify
│   │   │   │   ├── Batch.ts              # N writes → 1 notify
│   │   │   │   ├── Scheduler.ts          # micro/macro/render queues
│   │   │   │   ├── ComputedEngine.ts     # граф зависимостей + пересчёт
│   │   │   │   ├── CycleDetector.ts      # DFS cycle prevention
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── engines/
│   │   │   │   ├── form/
│   │   │   │   │   ├── FormEngine.ts      # register/setValue/validate/submit
│   │   │   │   │   ├── FieldModel.ts      # valueNode + metaNode
│   │   │   │   │   ├── MetaStore.ts       # touched/dirty/error/validating
│   │   │   │   │   ├── ValidationEngine.ts # sync + async + debounce + AbortController
│   │   │   │   │   ├── FieldDeps.ts       # depends(target, deps[])
│   │   │   │   │   └── index.ts
│   │   │   │   └── (table/ — потом)
│   │   │   │
│   │   │   ├── Core.ts                   # фасад
│   │   │   └── index.ts                  # export { Core, createCore, createForm, ... }
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── react/
│       ├── src/
│       │   ├── hooks/
│       │   │   ├── useField.ts            # подписка на value + meta
│       │   │   ├── useForm.ts             # isDirty/isValid/isSubmitting
│       │   │   └── useComputed.ts         # подписка на computed node
│       │   │
│       │   ├── components/
│       │   │   ├── complex/               # используют core
│       │   │   │   ├── Form.tsx           # context provider
│       │   │   │   ├── Field.tsx          # <Field name="..." />
│       │   │   │   └── SubmitButton.tsx
│       │   │   │
│       │   │   └── ui/                    # чистый React, без core
│       │   │       ├── Spin.tsx
│       │   │       ├── Button.tsx
│       │   │       ├── Input.tsx
│       │   │       ├── Modal.tsx
│       │   │       └── (добавляются по мере нужды)
│       │   │
│       │   └── index.ts
│       │
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                # pnpm workspaces
├── tsconfig.base.json
└── PLAN.md
```

---

## Как выглядит для конечного пользователя

### Установка

```bash
npm install @skygraph/core @skygraph/react
```

### Простая форма

```tsx
import { Form, Field, SubmitButton } from '@skygraph/react'

function App() {
  return (
    <Form
      defaultValues={{ username: '', email: '' }}
      onSubmit={async ({ values }) => {
        await saveUser(values)
      }}
    >
      <Field name="username" label="Имя" required />
      <Field name="email" label="Email" rules={[{ type: 'email' }]} />
      <SubmitButton>Отправить</SubmitButton>
    </Form>
  )
}
```

### Форма с зависимыми полями

```tsx
<Form defaultValues={{ price: 0, qty: 0, total: 0 }}>
  <Field name="price" label="Цена" />
  <Field name="qty" label="Количество" />
  <Field name="total" label="Итого" computed={['price', 'qty']} compute={(p, q) => p * q} disabled />
</Form>
```

### Spin как в AntD

```tsx
import { Spin } from '@skygraph/react'

<Spin spinning={loading} tip="Загрузка..." size="large">
  <div>Контент</div>
</Spin>
```

### Форма со спиннером

```tsx
import { Form, Field, Spin, SubmitButton } from '@skygraph/react'

function App() {
  const [loading, setLoading] = useState(false)

  return (
    <Spin spinning={loading}>
      <Form
        defaultValues={{ name: '' }}
        onSubmit={async ({ values }) => {
          setLoading(true)
          await save(values)
          setLoading(false)
        }}
      >
        <Field name="name" label="Имя" />
        <SubmitButton>Сохранить</SubmitButton>
      </Form>
    </Spin>
  )
}
```

Один импорт, всё из `@skygraph/react`. Сложные компоненты работают через core, простые — просто рендерят.

---

## API-контракты

### Core runtime

```typescript
interface Core {
  get(path: string): unknown
  set(path: string, value: unknown): void
  subscribe(path: string, cb: (value: unknown) => void): () => void
  batch(fn: () => void): void
  transaction(fn: () => void): void
  computed(target: string, deps: string[], fn: (...values: unknown[]) => unknown): void
}
```

### FormEngine (внутри core)

```typescript
interface FormEngine {
  register(name: string, options?: FieldOptions): void
  unregister(name: string): void
  setValue(name: string, value: unknown): void
  getValue(name: string): unknown
  getFieldState(name: string): FieldMeta
  getFormState(): FormState
  addRule(name: string, rule: Rule): void
  depends(target: string, deps: string[]): void
  validate(name?: string): Promise<ValidationResult>
  submit(handler: (values: Record<string, unknown>) => Promise<void>): Promise<void>
  reset(values?: Record<string, unknown>): void
}

interface FieldMeta {
  touched: boolean
  dirty: boolean
  error: string | null
  validating: boolean
}

interface FormState {
  isDirty: boolean
  isValid: boolean
  isSubmitting: boolean
  isValidating: boolean
}

type Rule = (value: unknown) => string | null | Promise<string | null>
```

### React hooks

```typescript
function useField(name: string): {
  value: unknown
  error: string | null
  touched: boolean
  dirty: boolean
  onChange: (value: unknown) => void
  onBlur: () => void
}

function useForm(): {
  isDirty: boolean
  isValid: boolean
  isSubmitting: boolean
  submit: () => Promise<void>
  reset: () => void
}
```

---

## Pipeline изменения

```
User input
    ↓
React onChange → form.setValue("user.name", "Ruslan")
    ↓
FormEngine:
  core.transaction(() => {
    core.set("user.name", "Ruslan")
    core.set("$meta.user.name.dirty", true)
  })
  scheduler.enqueue(validate("user.name"))
    ↓
Core.transaction:
  1. STAGE     — запись в staging area
  2. RESOLVE   — value !== prevValue? drop если нет
  3. PROPAGATE — обход графа зависимостей (computed)
  4. COMMIT    — node.value = new, node.version++
  5. NOTIFY    — только подписчики "user.name" и "$meta.user.name.dirty"
    ↓
React useField("user.name"):
  подписан на "user.name" + "$meta.user.name.*"
  setState → ререндер ТОЛЬКО этого Field
    ↓
Остальные 999 полей — не тронуты
```

---

## Отличия от TanStack

| | TanStack Form | SkyGraph |
|---|---|---|
| Пакеты | form-core + react-form + vue-form + ... | 2 пакета: core + react |
| Store | setState + subscribe на всё | Path-based, granular subscriptions |
| Граф зависимостей | Нет (`onChangeListenTo` руками) | Computed с cycle detection |
| Типы | 22 generic-параметра в классах | Ядро на unknown, типы — обёртка |
| Транзакции | batch (простой) | Transaction pipeline |
| Единое ядро | form-core и table-core раздельны | Один core, engines внутри |
| Простые компоненты | Нет (headless only) | Spin, Button, Modal в react-пакете |

---

## Стилевая система

### Проблема AntD
- v4: Less-переменные → сломано в v5
- v5: CSS-in-JS tokens → рантайм, дупликация, SSR-проблемы
- v6: CSS Variables → но всё ещё завязано на ConfigProvider
- Кастомизация = война с `!important` и проприетарными tokens
- Переиспользовать стили в другом фреймворке невозможно

### Подход SkyGraph: 3 уровня

```
Уровень 1 — Design tokens (CSS Variables)
  Переиспользуемые между фреймворками.
  Один файл tokens.css — цвета, размеры, отступы, радиусы.
  Не привязан ни к React, ни к компонентам.

Уровень 2 — Компонентные стили (CSS файлы)
  Каждый компонент = отдельный .css файл.
  Использует только tokens через var(--sg-*).
  Можно подключать по одному.

Уровень 3 — Тема (переопределение tokens)
  Меняешь CSS Variables → меняется всё.
  Без JS-рантайма, без ConfigProvider.
```

### Структура стилей

```
@skygraph/react/
  styles/
    tokens.css              # :root { --sg-color-primary: ... }
    reset.css               # минимальный сброс
    index.css               # импортирует всё
    components/
      button.css
      input.css
      spin.css
      form.css
      field.css
      modal.css
    themes/
      default.css           # дефолтная тема (подключается автоматически)
      dark.css              # тёмная тема (опционально)
```

### Tokens (CSS Variables)

```css
/* tokens.css */
:root {
  /* Цвета */
  --sg-color-primary: #1677ff;
  --sg-color-primary-hover: #4096ff;
  --sg-color-success: #52c41a;
  --sg-color-warning: #faad14;
  --sg-color-error: #ff4d4f;
  --sg-color-text: rgba(0, 0, 0, 0.88);
  --sg-color-text-secondary: rgba(0, 0, 0, 0.65);
  --sg-color-border: #d9d9d9;
  --sg-color-bg: #ffffff;
  --sg-color-bg-secondary: #fafafa;

  /* Размеры */
  --sg-font-size-sm: 12px;
  --sg-font-size: 14px;
  --sg-font-size-lg: 16px;
  --sg-height-sm: 24px;
  --sg-height-md: 32px;
  --sg-height-lg: 40px;
  --sg-border-radius: 6px;

  /* Отступы */
  --sg-padding-xs: 4px;
  --sg-padding-sm: 8px;
  --sg-padding-md: 12px;
  --sg-padding-lg: 16px;
  --sg-padding-xl: 24px;

  /* Тени */
  --sg-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  /* Анимации */
  --sg-transition-duration: 0.2s;
}
```

### Использование

```tsx
// Вариант 1: Всё из коробки (дефолтная тема)
import '@skygraph/react/styles'
import { Form, Field, Button, Spin } from '@skygraph/react'

// Вариант 2: Кастомная тема — переопределяешь tokens
import '@skygraph/react/styles'
import './my-theme.css'   // :root { --sg-color-primary: #7c3aed; }

// Вариант 3: Тёмная тема
import '@skygraph/react/styles'
import '@skygraph/react/styles/themes/dark.css'

// Вариант 4: Headless — только логика, без стилей
import { Form, Field } from '@skygraph/react'
// стили не импортируешь, рисуешь сам

// Вариант 5: Только нужные компоненты
import '@skygraph/react/styles/tokens.css'
import '@skygraph/react/styles/components/button.css'
import '@skygraph/react/styles/components/form.css'
```

### Переиспользуемость

```
tokens.css  →  работает везде: React, Vue, Angular, ванильный HTML
button.css  →  .sg-button — обычные CSS классы, не привязаны к JSX
form.css    →  .sg-form, .sg-field — тоже обычные классы
```

Кто-то делает `@skygraph/vue` → подключает те же `tokens.css` и `components/*.css`.
Стили одинаковые, адаптер другой.

### Принципы

1. **Без CSS-in-JS** — никакого рантайма, только статические CSS файлы
2. **Без !important** — специфичность через один класс `.sg-*`
3. **Без вложенности** — flat CSS, легко переопределить
4. **Tokens = контракт** — меняешь `--sg-color-primary` → меняется везде
5. **Tree-shakeable** — можно импортировать стили по компонентам
6. **Фреймворк-агностичные** — CSS не зависит от React

---

## Порядок разработки

### Phase 1 — Core runtime
- [ ] Node model (id, value, version, dirty)
- [ ] Store (path → node, get/set)
- [ ] SubscriptionEngine (per-path listeners, unsubscribe)
- [ ] Batch (collect writes → 1 notify)
- [ ] Transaction (stage → resolve → commit → notify)
- [ ] Базовые тесты

### Phase 2 — Computed
- [ ] ComputedEngine (target, deps[], fn)
- [ ] Граф зависимостей
- [ ] Cycle detection (DFS)
- [ ] Dirty propagation (только по графу, не полный обход)
- [ ] Тесты

### Phase 3 — Scheduler
- [ ] Micro queue (sync)
- [ ] Macro queue (async effects)
- [ ] Render queue (batched UI notify)

### Phase 4 — FormEngine
- [ ] FieldModel (valueNode + metaNode)
- [ ] register / unregister
- [ ] setValue pipeline
- [ ] getFieldState / getFormState
- [ ] Тесты

### Phase 5 — Validation
- [ ] Sync validation
- [ ] Async validation + AbortController
- [ ] Validation modes (onChange debounced, onBlur, onSubmit)
- [ ] Field dependencies (form.depends)
- [ ] Computed form state (isDirty, isValid)

### Phase 6 — React adapter
- [ ] useField, useForm, useComputed hooks
- [ ] Form, Field, SubmitButton components
- [ ] Простые UI: Spin, Button, Input, Modal
- [ ] Тесты

### Phase 7 — Стили
- [ ] tokens.css (CSS Variables)
- [ ] reset.css
- [ ] Компонентные стили: button.css, input.css, form.css, field.css, spin.css, modal.css
- [ ] Дефолтная тема (default.css)
- [ ] Тёмная тема (dark.css)
- [ ] Проверка: стили работают без React (чистый HTML + tokens.css)

### Phase 8 — Оптимизация
- [ ] Lazy node creation
- [ ] GC для orphan nodes
- [ ] Benchmark: 1000 полей, 10k полей

---

## Стек

- **TypeScript** — язык (чистый, без зависимостей в core)
- **pnpm workspaces** — monorepo
- **tsup** — сборка (ESM + CJS + .d.ts)
- **vitest** — тесты
- **React 18+** — только для @skygraph/react

---

## Риски

| Риск | Где | Митигация |
|---|---|---|
| Утечки памяти | subscribe без unsubscribe | Lifecycle guard, тесты |
| Лаги | Нет batch / нет scheduler | Batch обязателен с Phase 1 |
| Циклы в computed | Граф зависимостей | CycleDetector (DFS) |
| Core раздувается | Engines внутри core | Чёткие границы runtime/engines, tree-shaking |
| Async race conditions | Валидация | AbortController |
