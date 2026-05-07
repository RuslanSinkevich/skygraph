import { rateDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `rateDocEn`, no extras.
 */
export const rateDocRu: { [K in keyof typeof rateDocEn]: string } = {
  pageTitle: 'Rate',
  pageLead:
    'Оценка звёздами с hover-превью, опциональными полушагами и любым ReactNode в качестве символа. Клик по уже выбранному значению сбрасывает рейтинг в 0.',
  pageWhen1: 'Быстрый сбор настроения в отзывах, опросах, к товарам.',
  pageWhen2: 'Read-only «социальное доказательство» рядом с автором или местом.',
  pageWhen3: 'Везде, где slider тяжелее, чем «выбрать дискретные 1–5».',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Контролируемый рейтинг 5 звёзд, клик для сброса.',
  demoAllowHalfTitle: 'Полушаги',
  demoAllowHalfDesc: 'allowHalf использует положение курсора: N − 0.5 vs N.',
  demoCountTitle: 'Кастомное число звёзд',
  demoCountDesc: '3 — для настроения, 10 — для NPS-шкал.',
  demoCustomCharacterTitle: 'Кастомный символ',
  demoCustomCharacterDesc:
    'Подойдёт любой ReactNode — эмодзи, SVG, иконка. Цветные эмодзи игнорируют CSS `color`; неактивные слоты используют opacity.',
  demoDisabledTitle: 'Отключено',
  demoDisabledDesc: 'Режим read-only отображения.',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc: 'Валидатор «обязательная оценка».',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc: 'Меняйте --sg-color-star для ребрендинга или --sg-font-size-xl для звёзд побольше.',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'ARIA сохраняется; рисуйте сами.',

  tableRateApi: 'API Rate',
  tableCssVars: 'CSS-переменные',

  propValue: 'Контролируемое значение рейтинга',
  propDefaultValue: 'Начальное значение в неконтролируемом режиме',
  propCount: 'Количество символов рейтинга',
  propAllowHalf: 'Включить шаг 0.5 (клик по левой половине звезды)',
  propCharacter: 'Кастомный символ звезды (ReactNode)',
  propOnChange: 'Срабатывает со следующим значением рейтинга',
  propDisabled: 'Заблокировать контрол (read-only)',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы SkyGraph (headless-режим)',

  cssHint:
    'Цвет заполненной звезды: `--sg-color-star`. Пустой: `--sg-color-border` + `--sg-rate-symbol-empty-opacity` (нужно для цветных эмодзи). Размер: `--sg-font-size-xl`.',

  cssSgColorStar: 'Цвет заливки выбранной/половинной звезды',
  cssSgColorBorder: 'Цвет пустой звезды',
  cssSgRateSymbolEmptyOpacity:
    'Неактивные символы приглушены, чтобы цветные эмодзи читались как «пустые» (для моно-глифов можно поставить 1)',
  cssSgFontSizeXl: 'Размер каждого символа рейтинга',
  cssSgPaddingXs: 'Зазор между звёздами',
  cssSgTransitionDuration: 'Длительность перехода цвета и масштаба при hover',
}
