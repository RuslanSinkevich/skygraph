import { sliderDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `sliderDocEn`, no extras.
 */
export const sliderDocRu: { [K in keyof typeof sliderDocEn]: string } = {
  pageTitle: 'Slider',
  pageLead:
    'Горизонтальный числовой слайдер с полной клавиатурной поддержкой (стрелки уважают `step`). Возвращает `number` всегда в пределах `[min, max]`.',
  pageWhen1:
    'Выбор числа, где приблизительное значение нормально: громкость, яркость, прозрачность.',
  pageWhen2: 'Любая ограниченная настройка с визуальной заливкой, помогающей почувствовать шкалу.',
  pageWhen3: 'В паре с `InputNumber`, когда важен точный ввод.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый слайдер с живым выводом.',
  demoMinMaxStepTitle: 'Min / Max / Step',
  demoMinMaxStepDesc: 'Кастомные диапазоны и шаги.',
  demoWithValueTitle: 'Slider + числовой input',
  demoWithValueDesc: 'Два контрола делят одно состояние.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Серый, без взаимодействия.',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc: 'Slider подключён через `<Field>`.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Скоуп глобальных токенов на обёртке для ребрендинга.',

  tableSliderApi: 'API Slider',
  tableCssVars: 'CSS-переменные',

  propValue: 'Управляемое числовое значение',
  propDefaultValue: 'Начальное значение в неуправляемом режиме',
  propMin: 'Нижняя граница',
  propMax: 'Верхняя граница',
  propStep: 'Шаг между валидными значениями (мышь + клавиатура)',
  propOnChange: 'Срабатывает на каждое зафиксированное изменение',
  propDisabled: 'Блокировать ввод мышью и клавиатурой',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы SkyGraph (headless-режим)',

  cssHint:
    'Корень растягивается через `width: 100%` и `--sg-slider-min-inline-size`. `--sg-color-primary` красит заливку и границу ручки; `--sg-color-border` — рельс.',

  cssSgSliderMinInlineSize:
    'Минимальная ширина (flex/grid); берётся из `--sg-font-size`, переопределяйте свободно',
  cssSgColorPrimary: 'Цвет заливки и границы ручки',
  cssSgColorPrimaryBg: 'Цвет focus ring ручки',
  cssSgColorBorder: 'Цвет рельса (track)',
  cssSgColorWhite: 'Цвет фона ручки',
  cssSgPaddingSm: 'Вертикальные отступы над/под рельсом (кликабельная зона)',
  cssSgTransitionDuration: 'Переход box-shadow ручки при наведении',
}
