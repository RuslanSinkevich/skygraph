import { sliderDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `sliderDocEn`, no extras.
 */
export const sliderDocRu: { [K in keyof typeof sliderDocEn]: string } = {
  pageTitle: 'Slider',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbSlider: 'Slider',
  pageLead:
    'Горизонтальный числовой слайдер с полной поддержкой клавиатуры (стрелки уважают `step`). Эмитит `number`, всегда в пределах `[min, max]`.',
  pageWhen1: 'Выбор числа, где «примерно» — это нормально: громкость, яркость, прозрачность.',
  pageWhen2: 'Любая ограниченная настройка с визуальным "fill", помогающим почувствовать масштаб.',
  pageWhen3: 'В паре с `SgInputNumber`, когда важен точный ввод.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый слайдер через v-model с живым выводом.',
  demoMinMaxStepTitle: 'Min / Max / Step',
  demoMinMaxStepDesc: 'Кастомные диапазоны и шаги.',
  demoWithValueTitle: 'Slider + числовой инпут',
  demoWithValueDesc: 'Два контрола делят одно состояние.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Серый, без взаимодействия.',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc: 'Слайдер в `<SgField>` через scoped-слот.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Три скоупа на токенах Slider: зелёный бренд, тёмная поверхность и glass pick (заливка, ручка, рельс).',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'DOM и ARIA остаются; классы убраны.',

  tableSliderApi: 'API Slider',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Числовое значение через v-model',
  propValue: 'Совместимый псевдоним `modelValue`',
  propDefaultValue: 'Начальное значение в неуправляемом режиме',
  propMin: 'Нижняя граница',
  propMax: 'Верхняя граница',
  propStep: 'Шаг между допустимыми значениями (pointer + клавиатура)',
  propDisabled: 'Блокировать ввод pointer и клавиатуры',
  propUnstyled: 'Убрать классы SkyGraph (headless-режим)',
  emitUpdateModelValue: 'Эмитится при каждой фиксации значения (используется `v-model`)',
  emitChange: 'Зеркало `update:modelValue`',

  cssHint:
    'Корень растягивается через `width: 100%` и `--sg-slider-min-inline-size`. `--sg-color-primary` красит fill и бордер ручки; `--sg-color-border` — рельс.',

  cssSgSliderMinInlineSize:
    'Минимальная ширина (flex/grid); выводится из `--sg-font-size`, переопределяется свободно',
  cssSgColorPrimary: 'Цвет fill и бордера ручки',
  cssSgColorPrimaryBg: 'Цвет focus-ring ручки',
  cssSgColorBorder: 'Цвет рельса (track)',
  cssSgColorWhite: 'Цвет фона ручки',
  cssSgPaddingSm: 'Вертикальный паддинг над/под рельсом (кликабельная область)',
  cssSgTransitionDuration: 'Длительность анимации box-shadow ручки на ховере',
}
