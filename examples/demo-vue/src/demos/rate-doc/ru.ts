import { rateDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `rateDocEn`, no extras.
 */
export const rateDocRu: { [K in keyof typeof rateDocEn]: string } = {
  pageTitle: 'Rate',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbRate: 'Rate',
  pageLead:
    'Star-rating с hover-превью, опциональными half-step и любым глифом в качестве символа. Клик по уже выбранной звезде сбрасывает оценку в 0.',
  pageWhen1: 'Сбор быстрых эмоциональных оценок: ревью, опросы, продукты.',
  pageWhen2: 'Read-only "social proof" рядом с автором или местом.',
  pageWhen3: 'Везде, где slider кажется тяжелее, чем «выбрать дискретное 1–5».',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый 5-star rating, клик для сброса.',
  demoAllowHalfTitle: 'Half-steps',
  demoAllowHalfDesc: '`allow-half` использует позицию указателя для выбора N − 0.5 vs N.',
  demoCountTitle: 'Кастомный count',
  demoCountDesc: '3 — для эмоций, 10 — для NPS-подобных шкал.',
  demoCustomCharacterTitle: 'Кастомный символ',
  demoCustomCharacterDesc:
    'Vue принимает строку (emoji или глиф). React поддерживает любой node — у Vue только строка.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc: 'Read-only режим.',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc: 'Валидатор «оценка обязательна».',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc:
    'Три скоупа на токенах Rate: зелёный бренд, тёмная поверхность и glass pick (`--sg-color-star` + рамка).',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'ARIA остаётся; оформление за вами.',

  tableRateApi: 'API Rate',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Числовой rating через v-model',
  propValue: 'Совместимый псевдоним `modelValue`',
  propDefaultValue: 'Начальный rating в неуправляемом режиме',
  propCount: 'Количество символов рейтинга',
  propAllowHalf: 'Включить 0.5-шаг (клик по левой половине звезды)',
  propCharacter: 'Кастомный символ каждой звезды (строка)',
  propDisabled: 'Заблокировать контрол (read-only)',
  propUnstyled: 'Убрать классы SkyGraph (headless-режим)',
  emitUpdateModelValue: 'Эмитится с новым rating (используется `v-model`)',
  emitChange: 'Зеркало `update:modelValue`',

  cssHint:
    'Цвет заполнения: `--sg-color-star`. Пустой: `--sg-color-border` плюс `--sg-rate-symbol-empty-opacity` (нужен, если `character` — цветной emoji). Размер: `--sg-font-size-xl`.',

  cssSgColorStar: 'Цвет заполненной / половинной звезды',
  cssSgColorBorder: 'Цвет пустой звезды',
  cssSgRateSymbolEmptyOpacity:
    'Неактивные символы притушены, чтобы цветной emoji всё ещё читался как пустой/полный (для монохрома можно ставить 1)',
  cssSgFontSizeXl: 'Размер каждого символа рейтинга',
  cssSgPaddingXs: 'Зазор между звёздами',
  cssSgTransitionDuration: 'Длительность анимации цвета и scale на ховере',
}
