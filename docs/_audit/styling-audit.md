# SkyGraph — Styling Audit (auto)

> Сгенерировано `scripts/audit-styles.mjs`. Не редактировать руками — перегенерировать.

## 1. Токены

- tokens.css объявляет: **91** имён.
- Компонентные CSS используют «чужие» имена: **0**.

Все использованные `var(--sg-*)` объявлены. :white_check_mark:

## 2. Классы `.sg-*`

- В CSS определено классов: **894**.
- В DOM компонентов используется строк-классов: **759**.
- Совпадают (есть и в CSS, и в DOM): **652**.
- Только в CSS, runtime-генерируемые (Transition): **41** (исключены из dead-code).
- Только в CSS, **возможно мёртвый код**: **201**.
- Только в DOM (нет стилей): **107**.

<details><summary>Только в CSS — возможно мёртвый код</summary>

- `.sg-avatar-circle`
- `.sg-avatar-square`
- `.sg-badge-status-default`
- `.sg-badge-status-error`
- `.sg-badge-status-processing`
- `.sg-badge-status-success`
- `.sg-badge-status-warning`
- `.sg-button-dashed`
- `.sg-button-large`
- `.sg-button-link`
- `.sg-button-small`
- `.sg-button-text`
- `.sg-carousel-dots-left`
- `.sg-carousel-dots-top`
- `.sg-carousel-effect-fade`
- `.sg-carousel-effect-slide`
- `.sg-cascader-large`
- `.sg-cascader-option-check-active`
- `.sg-cascader-search-check-active`
- `.sg-cascader-small`
- `.sg-collapse-large`
- `.sg-collapse-middle`
- `.sg-collapse-small`
- `.sg-colorpicker-large`
- `.sg-colorpicker-middle`
- `.sg-colorpicker-small`
- `.sg-datepicker-large`
- `.sg-datepicker-range-active`
- `.sg-datepicker-range-part`
- `.sg-datepicker-small`
- `.sg-descriptions-middle`
- `.sg-descriptions-small`
- `.sg-diagram-node-ellipse`
- `.sg-diagram-node-path`
- `.sg-diagram-node-polygon`
- `.sg-diagram-node-rect`
- `.sg-dp-dropdown-bottomLeft`
- `.sg-dp-dropdown-bottomRight`
- `.sg-dp-dropdown-topLeft`
- `.sg-dp-dropdown-topRight`
- `.sg-dp-footer-link`
- `.sg-dp-time-cell`
- `.sg-dp-time-cell-active`
- `.sg-drawer-bottom`
- `.sg-drawer-left`
- `.sg-drawer-right`
- `.sg-drawer-top`
- `.sg-dropdown-bottom-left`
- `.sg-dropdown-bottom-right`
- `.sg-dropdown-bottomLeft`
- `.sg-dropdown-bottomRight`
- `.sg-dropdown-top-left`
- `.sg-dropdown-top-right`
- `.sg-dropdown-topLeft`
- `.sg-dropdown-topRight`
- `.sg-form-horizontal`
- `.sg-form-inline`
- `.sg-form-large`
- `.sg-form-small`
- `.sg-form-vertical`
- `.sg-inline-edit-view-large`
- `.sg-inline-edit-view-small`
- `.sg-input-group-large`
- `.sg-input-group-small`
- `.sg-input-large`
- `.sg-input-number-large`
- `.sg-input-number-small`
- `.sg-input-password-strength-medium`
- `.sg-input-password-strength-strong`
- `.sg-input-password-strength-very-strong`
- `.sg-input-password-strength-weak`
- `.sg-input-small`
- `.sg-list-grid-lg-1`
- `.sg-list-grid-lg-2`
- `.sg-list-grid-lg-3`
- `.sg-list-grid-lg-4`
- `.sg-list-grid-lg-6`
- `.sg-list-grid-md-1`
- `.sg-list-grid-md-2`
- `.sg-list-grid-md-3`
- `.sg-list-grid-md-4`
- `.sg-list-grid-md-6`
- `.sg-list-grid-sm-1`
- `.sg-list-grid-sm-2`
- `.sg-list-grid-sm-3`
- `.sg-list-grid-sm-4`
- `.sg-list-grid-xs-1`
- `.sg-list-grid-xs-2`
- `.sg-list-grid-xs-3`
- `.sg-list-large`
- `.sg-list-small`
- `.sg-mentions-dropdown-bottom`
- `.sg-mentions-dropdown-top`
- `.sg-mentions-large`
- `.sg-mentions-small`
- `.sg-menu-dark`
- `.sg-menu-horizontal`
- `.sg-menu-inline`
- `.sg-menu-vertical`
- `.sg-modal-body-loading`
- `.sg-notification-bottom-left`
- `.sg-notification-bottom-right`
- `.sg-notification-bottomLeft`
- `.sg-notification-bottomRight`
- `.sg-notification-error`
- `.sg-notification-info`
- `.sg-notification-success`
- `.sg-notification-top-left`
- `.sg-notification-top-right`
- `.sg-notification-topLeft`
- `.sg-notification-topRight`
- `.sg-notification-warning`
- `.sg-pagination-item-active`
- `.sg-pin-input-cell-large`
- `.sg-pin-input-cell-small`
- `.sg-pin-input-large`
- `.sg-pin-input-small`
- `.sg-popconfirm-bottom`
- `.sg-popconfirm-left`
- `.sg-popconfirm-right`
- `.sg-popconfirm-top`
- `.sg-progress-active`
- `.sg-progress-error`
- `.sg-progress-success`
- `.sg-radio-group-vertical`
- `.sg-search-input-large`
- `.sg-search-input-small`
- `.sg-segmented-large`
- `.sg-segmented-small`
- `.sg-select-large`
- `.sg-select-small`
- `.sg-select-trigger`
- `.sg-skeleton-avatar-circle`
- `.sg-skeleton-avatar-square`
- `.sg-spin-default`
- `.sg-spin-large`
- `.sg-spin-small`
- `.sg-steps-horizontal`
- `.sg-steps-item-error`
- `.sg-steps-item-finish`
- `.sg-steps-item-process`
- `.sg-steps-item-wait`
- `.sg-steps-small`
- `.sg-steps-vertical`
- `.sg-switch-small`
- `.sg-table-cell-fixed-left`
- `.sg-table-cell-fixed-right`
- `.sg-table-density-active`
- `.sg-table-density-option`
- `.sg-table-expand-btn`
- `.sg-table-expand-open`
- `.sg-table-filter-active`
- `.sg-table-filter-trigger`
- `.sg-table-large`
- `.sg-table-row-warning`
- `.sg-table-selection-action`
- `.sg-table-selection-action-danger`
- `.sg-table-small`
- `.sg-table-sort-arrows`
- `.sg-table-sort-asc`
- `.sg-table-sort-desc`
- `.sg-tag-default`
- `.sg-tag-error`
- `.sg-tag-input-large`
- `.sg-tag-input-small`
- `.sg-tag-processing`
- `.sg-tag-success`
- `.sg-tag-warning`
- `.sg-timeline-alternate`
- `.sg-timeline-item-left`
- `.sg-timeline-item-right`
- `.sg-timeline-left`
- `.sg-timeline-right`
- `.sg-timepicker-large`
- `.sg-timepicker-small`
- `.sg-tooltip-bottom`
- `.sg-tooltip-left`
- `.sg-tooltip-right`
- `.sg-tooltip-top`
- `.sg-tree-action-btn`
- `.sg-tree-action-danger`
- `.sg-tree-indent-branch`
- `.sg-tree-indent-branch-last`
- `.sg-tree-indent-line`
- `.sg-tree-indent-line-hidden`
- `.sg-tree-node-status-error`
- `.sg-tree-node-status-info`
- `.sg-tree-node-status-success`
- `.sg-tree-node-status-warning`
- `.sg-tree-status-error`
- `.sg-tree-status-info`
- `.sg-tree-status-success`
- `.sg-tree-status-warning`
- `.sg-tree-switcher-arrow`
- `.sg-tree-switcher-arrow-open`
- `.sg-tree-switcher-open`
- `.sg-tree-title`
- `.sg-tree-title-selectable`
- `.sg-treeselect-large`
- `.sg-treeselect-small`
- `.sg-upload-item-error`

</details>

<details><summary>Только в CSS — runtime-генерируемые (не мёртвый код)</summary>

- `.sg-collapse-enter-active`
- `.sg-collapse-enter-from`
- `.sg-collapse-enter-to`
- `.sg-collapse-leave-active`
- `.sg-collapse-leave-from`
- `.sg-collapse-leave-to`
- `.sg-fade-enter-active`
- `.sg-fade-enter-to`
- `.sg-fade-leave-active`
- `.sg-fade-leave-from`
- `.sg-fade-leave-to`
- `.sg-slide-down-enter-active`
- `.sg-slide-down-enter-from`
- `.sg-slide-down-enter-to`
- `.sg-slide-down-leave-active`
- `.sg-slide-down-leave-from`
- `.sg-slide-down-leave-to`
- `.sg-slide-left-enter-active`
- `.sg-slide-left-enter-from`
- `.sg-slide-left-enter-to`
- `.sg-slide-left-leave-active`
- `.sg-slide-left-leave-from`
- `.sg-slide-left-leave-to`
- `.sg-slide-right-enter-active`
- `.sg-slide-right-enter-from`
- `.sg-slide-right-enter-to`
- `.sg-slide-right-leave-active`
- `.sg-slide-right-leave-from`
- `.sg-slide-right-leave-to`
- `.sg-slide-up-enter-active`
- `.sg-slide-up-enter-from`
- `.sg-slide-up-enter-to`
- `.sg-slide-up-leave-active`
- `.sg-slide-up-leave-from`
- `.sg-slide-up-leave-to`
- `.sg-zoom-enter-active`
- `.sg-zoom-enter-from`
- `.sg-zoom-enter-to`
- `.sg-zoom-leave-active`
- `.sg-zoom-leave-from`
- `.sg-zoom-leave-to`

</details>

<details><summary>Только в DOM</summary>

- `sg-autofield`
- `sg-calendar-cell-events`
- `sg-calendar-cell-focused`
- `sg-calendar-cell-in-range`
- `sg-calendar-cell-multi-selected`
- `sg-calendar-cell-range-end`
- `sg-calendar-cell-range-start`
- `sg-calendar-clear-btn`
- `sg-calendar-event-dot`
- `sg-calendar-event-more`
- `sg-calendar-multiple`
- `sg-calendar-range`
- `sg-calendar-selection-count`
- `sg-calendar-week-header`
- `sg-calendar-week-number`
- `sg-cascader-multiple`
- `sg-cascader-option-loading`
- `sg-chart-area`
- `sg-chart-pie`
- `sg-collapse-panel-active`
- `sg-context-menu`
- `sg-context-menu-divider`
- `sg-context-menu-icon`
- `sg-context-menu-item`
- `sg-datagrid--loading`
- `sg-datagrid--striped`
- `sg-datagrid-body`
- `sg-datagrid-context-menu`
- `sg-datagrid-context-menu-divider`
- `sg-datagrid-context-menu-item`
- `sg-datagrid-context-menu-item--danger`
- `sg-datagrid-context-menu-item--disabled`
- `sg-datagrid-header-cell--asc`
- `sg-datagrid-header-cell--desc`
- `sg-datagrid-header-cell--drag-over`
- `sg-datagrid-loading`
- `sg-datagrid-row--even`
- `sg-datagrid-row--hoverable`
- `sg-datagrid-row--odd`
- `sg-datagrid-row--selected`
- `sg-datagrid-row-number-cell`
- `sg-datagrid-selection-cell`
- `sg-datagrid-summary`
- `sg-datagrid-summary-cell`
- `sg-datagrid-summary-row`
- `sg-datepicker-loading`
- `sg-dp-dropdown-range`
- `sg-dp-now-btn`
- `sg-dp-today-btn`
- `sg-dropdown-item-focused`
- `sg-fade`
- `sg-field-control-wrap`
- `sg-field-feedback`
- `sg-field-feedback-error`
- `sg-field-feedback-icon`
- `sg-field-feedback-success`
- `sg-field-feedback-warning`
- `sg-field-has-warning`
- `sg-field-horizontal`
- `sg-field-label-wrap`
- `sg-field-warning`
- `sg-input-number-minus`
- `sg-input-number-plus`
- `sg-list-drag-handle`
- `sg-list-draggable`
- `sg-list-item-dragging`
- `sg-list-item-drop-target`
- `sg-list-item-hoverable`
- `sg-list-item-selectable`
- `sg-list-item-selected`
- `sg-list-selectable`
- `sg-list-virtual-container`
- `sg-menu-submenu`
- `sg-menu-submenu-open`
- `sg-pagination-next`
- `sg-pagination-prev`
- `sg-progress`
- `sg-radio-checked`
- `sg-search-input-loading`
- `sg-segmented-item-label`
- `sg-select-option-focused`
- `sg-skeleton-with-avatar`
- `sg-slide-down`
- `sg-slide-left`
- `sg-slide-right`
- `sg-slide-up`
- `sg-table-footer-row`
- `sg-table-group-row`
- `sg-table-header-row`
- `sg-table-striped`
- `sg-table-summary-row`
- `sg-table-virtual-body`
- `sg-timepicker-range`
- `sg-transfer-list-count`
- `sg-transfer-list-footer`
- `sg-transfer-list-item-drag-handle`
- `sg-transfer-list-item-dragging`
- `sg-transfer-list-item-drop-target`
- `sg-transfer-operation`
- `sg-tree-node-block`
- `sg-tree-node-directory`
- `sg-tree-node-expanded`
- `sg-tree-node-leaf`
- `sg-tree-node-show-line`
- `sg-treeselect-multiple`
- `sg-upload-loading`
- `sg-zoom`

</details>

## 3. «Магические» цвета

- hex-значений в компонентных CSS: **8** уникальных.

| Цвет | Файлы |
|---|---|
| `#00f` | `packages/react/styles/components/colorpicker.css` |
| `#0f0` | `packages/react/styles/components/colorpicker.css` |
| `#0ff` | `packages/react/styles/components/colorpicker.css` |
| `#f00` | `packages/react/styles/components/colorpicker.css` |
| `#f0f` | `packages/react/styles/components/colorpicker.css` |
| `#ff0` | `packages/react/styles/components/colorpicker.css` |
| `#ff4d4f` | `packages/react/styles/components/form.css` |
| `#fff` | `packages/react/styles/components/avatar.css`<br>`packages/react/styles/components/badge.css`<br>`packages/react/styles/components/colorpicker.css`<br>`packages/react/styles/components/menu.css`<br>`packages/react/styles/components/pagination.css`<br>`packages/react/styles/components/steps.css` |

