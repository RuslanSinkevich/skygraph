# Текущее состояние проекта

> Обновлено: 2026-04-06

## Core (`@skygraph/core`)

### Runtime — готов

| Модуль | Статус |
|---|---|
| Store (path-based) | ✅ Готов |
| SubscriptionEngine | ✅ Готов |
| Transaction | ✅ Готов |
| Batch | ✅ Готов |
| ComputedEngine | ✅ Готов |
| Scheduler | ✅ Готов |
| TypedCore | ✅ Готов |

### Engines

| Engine | Статус | Фичи |
|---|---|---|
| FormEngine | ✅ Готов | Поля, валидация (sync/async), rules, dirty/touched, FormList |
| TableEngine | ✅ Готов | Строки, сортировка, фильтры (column + custom fn), пагинация |
| TreeEngine | ✅ Готов | Expand, check (cascade + strict), select, drag & drop, async load, filter, flat list |

### Тесты

- `core.test.ts` — runtime
- `form.test.ts` — FormEngine
- `table.test.ts` — TableEngine
- `benchmark.test.ts` — производительность
- `typed.test.ts` — TypedCore
- ❌ Нет тестов для TreeEngine

---

## React (`@skygraph/react`)

### Хуки

| Хук | Статус | Связан с |
|---|---|---|
| useForm | ✅ | FormEngine |
| useField | ✅ | FormEngine |
| useWatch | ✅ | FormEngine |
| useComputed | ✅ | ComputedEngine |
| useTable | ✅ | TableEngine |
| useTree | ✅ | TreeEngine |

### Complex-компоненты (11 шт.)

| Компонент | Статус | Файлы | Фичи |
|---|---|---|---|
| Form | ✅ | Form.tsx | Обёртка FormEngine |
| Field | ✅ | Field.tsx | Привязка к полю формы |
| FormList | ✅ | FormList.tsx | Динамические списки полей |
| SubmitButton | ✅ | SubmitButton.tsx | Кнопка с isSubmitting |
| Table | ✅ | Table/ (7 файлов) | Сортировка, фильтры (menu/search/custom), column groups, row/col span, tree data, drag columns, resize, editable cells, selection, expandable, sticky, summary, virtual scroll, pagination, locale |
| Tree | ✅ | Tree/ (4 файла) | Checkable (cascade + strict), selectable (multiple), draggable, async loading, showLine, showIcon, switcherIcon, directory mode, blockNode, virtual scroll, fieldNames, locale |
| List | ✅ | List/ (3 файла) | Pagination, grid layout, loading, header/footer, split, List.Item, List.Item.Meta |
| Transfer | ✅ | Transfer/ (4 файла) | Два списка, checkbox selection, move buttons, search/filter, select all, oneWay, pagination |
| TreeSelect | ✅ | TreeSelect/ (3 файла) | Select + Tree dropdown, checkable, showCheckedStrategy, search, multiple, tags, maxTagCount |
| Cascader | ✅ | Cascader/ (3 файла) | Multi-column dropdown, hover/click expand, search, changeOnSelect, loadData, multiple |
| Calendar | ✅ | Calendar/ (3 файла) | Month/year view, navigation, cellRender, disabledDate, fullscreen/mini, headerRender |

### UI-компоненты (39 шт.)

| Компонент | Статус | Компонент | Статус |
|---|---|---|---|
| Button | ✅ | Spin | ✅ |
| Input | ✅ | Textarea | ✅ |
| InputNumber | ✅ | Select | ✅ |
| Checkbox | ✅ | RadioGroup | ✅ |
| Switch | ✅ | Slider | ✅ |
| DatePicker | ✅ | TimePicker | ✅ |
| AutoComplete | ✅ | Rate | ✅ |
| Upload | ✅ | Tabs | ✅ |
| Modal | ✅ | Drawer | ✅ |
| Tooltip | ✅ | Popconfirm | ✅ |
| Dropdown | ✅ | Notification | ✅ |
| Badge | ✅ | Tag | ✅ |
| Avatar | ✅ | Breadcrumb | ✅ |
| Pagination | ✅ | Progress | ✅ |
| Menu | ✅ | Collapse | ✅ |
| ColorPicker | ✅ | Empty | ✅ |
| Result | ✅ | Skeleton | ✅ |
| Segmented | ✅ | Steps | ✅ |
| Timeline | ✅ | Carousel | ✅ |
| Descriptions | ✅ | | |

### Стили

- `tokens.css` — дизайн-токены ✅
- Светлая тема ✅
- Тёмная тема ✅
- CSS для каждого компонента (53 файла) ✅

---

## Demo-приложение

Vite + React. Страница на каждый компонент с интерактивными примерами.

41 демо-страница (включая все новые компоненты).

---

## Итого

| Категория | Количество |
|---|---|
| Core engines | 3 |
| React hooks | 6 |
| Complex-компоненты | 11 |
| UI-компоненты | 39 |
| **Всего компонентов** | **50** |
| CSS-файлов стилей | 53 |
| Демо-страниц | 41 |

---

## Известные проблемы

| Файл | Проблема | Критичность |
|---|---|---|
| `Notification.tsx` | `useCallback` unused import | Низкая |
| `useField.ts` | `onFieldBlur` не существует на FormEngine | Средняя — нужно добавить в FormEngine или убрать вызов |
| TreeEngine | Нет unit-тестов | Средняя |
