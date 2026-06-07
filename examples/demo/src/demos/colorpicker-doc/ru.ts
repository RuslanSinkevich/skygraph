import { colorPickerDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `colorPickerDocEn`, no extras.
 */
export const colorPickerDocRu: { [K in keyof typeof colorPickerDocEn]: string } = {
  pageTitle: 'ColorPicker',
  pageLead:
    'Выбор цвета во всплывающей панели: квадрат насыщенности, полоса hue, поле hex/rgb и опциональные группы пресетов. Поддерживает триггеры click/hover и контролируемое состояние открытия.',
  pageWhen1: 'Дать пользователю выбрать брендовый цвет — результат сразу в --sg-color-primary.',
  pageWhen2: 'Интерфейсы дизайн-инструментов, где swatch + popover чище, чем модалка.',
  pageWhen3: 'Опросы и настройки, где принимается произвольный цвет, а не фиксированная палитра.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Контролируемое hex-значение, привязанное к живому swatch-превью.',
  demoFormatsTitle: 'Формат',
  demoFormatsDesc: 'Выбор между hex и rgb — подпись триггера повторяет формат.',
  demoPresetsTitle: 'Пресеты',
  demoPresetsDesc: 'Группы пресетов под панелью для брендовых палитр.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Высота триггера и swatch масштабируются через size.',
  demoTriggerTitle: 'Триггер',
  demoTriggerDesc: 'По умолчанию click; hover удобен в тулбарах.',
  demoDisabledTitle: 'Отключено',
  demoDisabledDesc: 'Триггер читаем, но не открывается.',
  demoThemeSwapTitle: 'Живая смена темы',
  demoThemeSwapDesc:
    'Берите --sg-color-primary из пикера и смотрите, как все компоненты мгновенно перекрашиваются.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc:
    'Три скоупа — зелёный бренд, тёмное поле, glass pick — перекрашивают один ColorPicker.',
  demoFloatingLabelTitle: 'Плавающий label',
  demoFloatingLabelDesc:
    'Плавающая подпись над триггером — остаётся как заголовок (цвет всегда задан) и подсвечивается при фокусе.',

  tableColorPickerApi: 'API ColorPicker',
  tableCssVars: 'CSS-переменные',

  propValue: 'Контролируемый цвет в hex "#rrggbb" или "rgb(r, g, b)"',
  propDefaultValue: 'Начальный цвет в неконтролируемом режиме',
  propOnChange: 'Срабатывает с отформатированной строкой цвета',
  propFormat: 'Формат отображения и payload onChange',
  propPresets: 'Группы пресетов swatches',
  propShowText: 'Показывать форматированный текст рядом со swatch или рендерить кастомный узел',
  propTrigger: 'Способ открытия панели',
  propOpen: 'Контролируемое состояние открытия панели',
  propOnOpenChange: 'Срабатывает при открытии/закрытии панели',
  propSize: 'Высота триггера и размер swatch',
  propDisabled: 'Заблокировать пикер',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать все классы SkyGraph (headless-режим)',

  cssHint:
    "У ColorPicker нет собственных токенов — он использует глобальные form-токены (триггер) и surface-токены (dropdown). Переопределяйте их на обёртке через inline style={{ '--sg-...': ... }}.",

  cssSgColorBorder: 'Граница триггера, swatch и input внутри панели',
  cssSgColorBorderSecondary: 'Граница dropdown + контур swatch',
  cssSgColorPrimary: 'Focus ring триггера и hex/rgb input',
  cssSgColorPrimaryHover: 'Граница триггера при наведении',
  cssSgColorPrimaryBg: 'Свечение фокуса + ореол hover на пресете',
  cssSgColorBgContainer: 'Фон триггера и hex input',
  cssSgColorBgElevated: 'Фон панели dropdown',
  cssSgColorText: 'Цвет текста триггера и input',
  cssSgColorTextSecondary: 'Подпись отформатированного значения (showText)',
  cssSgColorTextTertiary: 'Подпись группы пресетов',
  cssSgBorderRadius: 'Скругление триггера',
  cssSgBorderRadiusSm: 'Скругление swatches, превью, hex input',
  cssSgBorderRadiusLg: 'Скругление панели dropdown',
  cssSgHeightSm: 'Высота триггера (size="small") и hex input',
  cssSgHeightMd: 'Высота триггера (size="middle")',
  cssSgHeightLg: 'Высота триггера (size="large")',
  cssSgPaddingXs: 'Компактные зазоры между swatch и пресетами',
  cssSgPaddingSm: 'Внутренний зазор триггера + зазор строки input',
  cssSgPaddingMd: 'Отступы dropdown',
  cssSgFontSize: 'Размер текста триггера',
  cssSgFontSizeSm: 'Hex input + подпись пресета + showText',
  cssSgShadowLg: 'Тень dropdown',
  cssSgTransitionDuration: 'Скорость перехода focus/hover/preset',
  cssSgTransitionTiming: 'Общая кривая сглаживания',
  cssSgZDropdown: 'Слой стека dropdown',
}
