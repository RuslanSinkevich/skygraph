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

### Complex-компоненты

| Компонент | Статус | Файлы | Фичи |
|---|---|---|---|
| Form | ✅ | Form.tsx | Обёртка FormEngine |
| Field | ✅ | Field.tsx | Привязка к полю формы |
| FormList | ✅ | FormList.tsx | Динамические списки полей |
| SubmitButton | ✅ | SubmitButton.tsx | Кнопка с isSubmitting |
| Table | ✅ | Table/ (7 файлов) | Сортировка, фильтры (menu/search/custom), column groups, row/col span, tree data, drag columns, resize, editable cells, selection, expandable, sticky, summary, virtual scroll, pagination, locale |
| Tree | ✅ | Tree/ (4 файла) | Checkable (cascade + strict), selectable (multiple), draggable, async loading, showLine, showIcon, switcherIcon, directory mode, blockNode, virtual scroll, fieldNames, locale |

### UI-компоненты (28 шт.)

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

### Стили

- `tokens.css` — дизайн-токены ✅
- Светлая тема ✅
- Тёмная тема ✅
- CSS для каждого компонента ✅

---

## Demo-приложение

Vite + React. Страница на каждый компонент с интерактивными примерами.

25 демо-страниц (включая Tree и Table).

---

## Что ещё не сделано (потенциальные компоненты)

### Высокий приоритет

| Компонент | Тип | Нужен engine в core? |
|---|---|---|
| List | complex | Да (или переиспользовать TableEngine) |
| Menu | ui | Нет |
| Collapse / Accordion | ui | Нет |

### Средний приоритет

| Компонент | Тип | Описание |
|---|---|---|
| Transfer | complex | Два списка с перемещением |
| TreeSelect | complex | Select + Tree |
| Cascader | complex | Каскадный выбор |
| Steps | ui | Пошаговый визард |
| Timeline | ui | Временная шкала |

### Низкий приоритет

| Компонент | Тип | Описание |
|---|---|---|
| Calendar | complex | Полноценный календарь |
| Carousel | ui | Карусель |
| Skeleton | ui | Скелетон-загрузка |
| Empty | ui | Пустое состояние |
| Result | ui | Страница результата |
| Segmented | ui | Сегментированный переключатель |
| ColorPicker | ui | Выбор цвета |
| Descriptions | ui | Key-value описание |

---

## Известные проблемы

| Файл | Проблема | Критичность |
|---|---|---|
| `Notification.tsx` | `useCallback` unused import | Низкая |
| `useField.ts` | `onFieldBlur` не существует на FormEngine | Средняя — нужно добавить в FormEngine или убрать вызов |
| TreeEngine | Нет unit-тестов | Средняя |
