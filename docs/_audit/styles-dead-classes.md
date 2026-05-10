# SkyGraph styles — мёртвые `.sg-*` классы (audit)

> Сгенерировано T-React-Cleanup, Wave 2.
>
> Источник кандидатов — `pnpm audit:styles` (раздел «Только в CSS —
> возможно мёртвый код», 20 записей). Каждый кандидат проверен ручным
> `rg` по `packages/{react,vue}/src/`, `examples/**/src/`, `tests/**`,
> `packages/styles/`.

## Удалено

| Класс | Файл | Обоснование |
|---|---|---|
| `.sg-modal-body-loading` | `packages/styles/components/modal.css` | Не используется ни в одном TSX/Vue/тесте; присутствовал только в CSS как лишнее правило. |
| `.sg-dp-footer-link`, `.sg-dp-footer-link:hover` | `packages/styles/components/datepicker.css` | Не используется ни в одном TSX/Vue/тесте; правило кнопки футера, которая была удалена из DatePicker'a. |

## Оставлено как «зарезервировано» (не мёртвый код)

| Класс | Файл | Обоснование |
|---|---|---|
| `.sg-diagram-toolbar`, `.sg-diagram-minimap`, `.sg-diagram-controls` | `packages/styles/print.css` | Явный комментарий в `print.css`: «Стандартного minimap-классa у SkyGraph пока нет, но префикс зарезервирован — пусть пользователь добавит дочерний класс из этого списка». Это публичный print-extension contract. |

## Оставлено — на самом деле используется

Аудит-скрипт ошибся для следующих 15 классов (использует только
текстовые сравнения, не разбирает все TSX-конкатенации). Реальные
ссылки найдены в TSX/Vue/тестах:

- `.sg-no-print` — `__tests__/print.test.tsx`,
  `examples/demo/src/demos/print/DiagramPrint.demo.tsx`.
- `.sg-pagination-item-active` — `Pagination.tsx`, `Pagination.vue`.
- `.sg-tree-action-btn`, `.sg-tree-action-danger`,
  `.sg-tree-indent-branch`, `.sg-tree-indent-branch-last`,
  `.sg-tree-indent-line`, `.sg-tree-indent-line-hidden` —
  `Tree/TreeNodeRow.tsx`.
- `.sg-tree-switcher-arrow`, `.sg-tree-switcher-arrow-open`,
  `.sg-tree-switcher-open`, `.sg-tree-title`, `.sg-tree-title-selectable`
  — React + Vue `TreeNodeRow`.
- `.sg-dp-time-cell`, `.sg-dp-time-cell-active` — `DatePicker.tsx`.

## Скрипт-проверка

`scripts/check-dead-classes.mjs` — повторяемая ручная проверка по списку
кандидатов из `pnpm audit:styles`.
