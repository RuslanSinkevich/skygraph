import { colorPickerDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `colorPickerDocEn`,
 * no extras.
 */
export const colorPickerDocRu: { [K in keyof typeof colorPickerDocEn]: string } = {
  pageTitle: 'ColorPicker',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbColorPicker: 'ColorPicker',
  pageLead:
    'Popover-color-picker с hex/rgb-инпутом и опциональными группами пресетов. Поддерживает click/hover-триггеры и controlled open.',
  pageWhen1:
    'Дать пользователю выбрать брендовый цвет — пробросить результат прямо в `--sg-color-primary`.',
  pageWhen2: 'Design-tool-style взаимодействия, где swatch + popover чище, чем модалка.',
  pageWhen3: 'Опросы или конфиги, принимающие произвольный цвет, не палитру.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый hex с живым preview-swatch.',
  demoFormatsTitle: 'Format',
  demoFormatsDesc: 'Hex или rgb — лейбл триггера повторяет выбранный формат.',
  demoPresetsTitle: 'Пресеты',
  demoPresetsDesc: 'Группы swatch-пресетов под панелью для брендовых палитр.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Высота триггера + размер swatch масштабируются с size.',
  demoTriggerTitle: 'Триггер',
  demoTriggerDesc: 'Click — по умолчанию; hover удобен в тулбарах.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Триггер читаем, но не открывается.',
  demoThemeSwapTitle: 'Live theme swap',
  demoThemeSwapDesc:
    'Управлять `--sg-color-primary` из picker-а и видеть, как все компоненты перекрашиваются.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc:
    'Оберни компонент в элемент с CSS-переменными `--sg-*` — всё внутри перекрашивается. Без пропсов и провайдеров.',
  demoFloatingLabelTitle: 'Плавающий label',
  demoFloatingLabelDesc:
    'Плавающая подпись над триггером ColorPicker: цвет всегда задан, поэтому label держится сверху и подсвечивается при фокусе.',
  tableColorPickerApi: 'API ColorPicker',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'v-model — цвет в hex "#rrggbb" или "rgb(r, g, b)"',
  propValue: 'Совместимый псевдоним `modelValue`',
  propDefaultValue: 'Начальный цвет в неуправляемом режиме',
  propFormat: 'Формат вывода + payload',
  propPresets: 'Группированные swatch-пресеты',
  propShowText: 'Показывать форматированный текст рядом со swatch (только boolean в Vue)',
  propTrigger: 'Способ открытия панели',
  propOpen: 'Управляемое состояние открытия панели',
  propSize: 'Высота триггера + размер swatch',
  propDisabled: 'Заблокировать picker',
  propUnstyled: 'Убрать все классы SkyGraph (headless-режим)',
  emitUpdateModelValue: 'Эмитится с форматированной строкой (используется `v-model`)',
  emitChange: 'Зеркало `update:modelValue`',
  emitOpenChange: 'Эмитится при открытии/закрытии панели',

  cssHint:
    'У ColorPicker нет специфичных токенов — он собран из глобальных form-токенов (триггер) и surface-токенов (дропдаун). Для перестилизации — `:style="{ \'--sg-...\': ... }"` на обёртке.',

  cssSgColorBorder: 'Бордер триггера, swatch, инпута внутри панели',
  cssSgColorBorderSecondary: 'Бордер дропдауна + outline swatch',
  cssSgColorPrimary: 'Focus-ring на триггере и hex/rgb-инпуте',
  cssSgColorPrimaryHover: 'Hover-бордер триггера',
  cssSgColorPrimaryBg: 'Focus-glow + halo пресета на ховере',
  cssSgColorBgContainer: 'Фон триггера + фон hex-инпута',
  cssSgColorBgElevated: 'Фон панели дропдауна',
  cssSgColorText: 'Цвет текста триггера и инпута',
  cssSgColorTextSecondary: 'Лейбл форматированного значения (`show-text`)',
  cssSgColorTextTertiary: 'Лейбл группы пресетов',
  cssSgBorderRadius: 'Радиус бордера триггера',
  cssSgBorderRadiusSm: 'Радиус swatches, preview, hex-инпута',
  cssSgBorderRadiusLg: 'Радиус панели дропдауна',
  cssSgHeightSm: 'Высота триггера (size="small") + hex-инпута',
  cssSgHeightMd: 'Высота триггера (size="middle")',
  cssSgHeightLg: 'Высота триггера (size="large")',
  cssSgPaddingXs: 'Компактные зазоры swatch/пресета',
  cssSgPaddingSm: 'Внутренний зазор триггера + строки инпута',
  cssSgPaddingMd: 'Паддинг дропдауна',
  cssSgFontSize: 'Размер текста триггера',
  cssSgFontSizeSm: 'Hex-инпут + preset label + show-text',
  cssSgShadowLg: 'Тень дропдауна',
  cssSgTransitionDuration: 'Скорость focus/hover/preset transition',
  cssSgTransitionTiming: 'Общее easing',
  cssSgZDropdown: 'Слой stacking дропдауна',
}
