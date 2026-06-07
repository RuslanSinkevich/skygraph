import type { tagDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `tagDocEn`, no extras.
 */
export const tagDocRu: { [K in keyof typeof tagDocEn]: string } = {
  pageTitle: 'Tag',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbTag: 'Тег',
  pageLead:
    'Inline-капсула для лейблов, статусов и фильтров. Пять семантических пресетов мапятся на палитровые токены; любая другая строка трактуется как сырой CSS-цвет.',
  pageWhen1: 'Подпись строк категорией или тегом.',
  pageWhen2: 'Компактная капсула статуса рядом с заголовком.',
  pageWhen3: 'Удаляемый набор фильтров над таблицей или результатами поиска.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Нейтральный пресет по умолчанию.',
  demoPresetsTitle: 'Семантические пресеты',
  demoPresetsDesc: 'Пять строк резолвятся в палитровые токены.',
  demoCustomColorTitle: 'Пользовательский цвет',
  demoCustomColorDesc: 'Любая другая строка передаётся как сырой CSS — hex, rgb, hsl, named.',
  demoBorderlessTitle: 'Без границы',
  demoBorderlessDesc: 'Сохраняет тон, убирает границу.',
  demoClosableTitle: 'Закрываемый',
  demoClosableDesc: 'Добавляет кнопку ×; удаление — на вас.',
  demoWithIconTitle: 'С иконкой',
  demoWithIconDesc: 'Default-слот принимает любую разметку — иконка + текст это просто template.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Три скоупа на токенах Tag: зелёный бренд, тёмная поверхность и glass pick (палитра пресетов + радиус).',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Уберите все классы sg-tag-* — рисуете сами.',

  tableTagApi: 'API Tag',
  tableCssVars: 'CSS-переменные',

  propColor:
    'Один из пяти пресетов или любой сырой CSS-цвет. Только `default` / `success` / `error` / `warning` / `processing` мапятся на палитровые токены — всё остальное применяется inline как background + border.',
  propClosable: 'Добавляет кнопку × рядом с лейблом',
  propOnClose: 'Срабатывает при клике × (удаление управляете вы)',
  propBordered: 'Рисовать 1px-границу',
  propChildren: 'Содержимое тега (текст, иконка + текст, что угодно) — Vue: default-слот',
  propUnstyled: 'Убрать все классы sg-tag-* — рисуете сами',

  cssHint:
    'У Tag нет собственных токенов — он собирается из глобальной палитры и токенов отступов. Для полностью круглых pill — задайте `--sg-border-radius-sm: 999px` на обёртке. Для своей палитры пресета — переопределите `--sg-color-<preset>` и `--sg-color-<preset>-bg`.',

  cssSgColorBgSecondary: 'Фон default-пресета',
  cssSgColorBorder: 'Граница default-пресета',
  cssSgColorText: 'Текст default-пресета + «нейтральный» лейбл',
  cssSgColorSuccess: 'Цвет текста + границы пресета success',
  cssSgColorSuccessBg: 'Фон пресета success',
  cssSgColorError: 'Цвет текста + границы пресета error',
  cssSgColorErrorBg: 'Фон пресета error',
  cssSgColorWarning: 'Цвет текста + границы пресета warning',
  cssSgColorWarningBg: 'Фон пресета warning',
  cssSgColorPrimary: 'Цвет текста + границы пресета processing',
  cssSgColorPrimaryBg: 'Фон пресета processing',
  cssSgFontSizeSm: 'Размер текста тега',
  cssSgPaddingSm: 'Горизонтальные отступы',
  cssSgBorderRadiusSm: 'Скругление углов (увеличьте до 999px для pill)',
  cssSgTransitionDuration: 'Скорость перехода цвета + hover',
  cssSgTransitionTiming: 'Общая кривая сглаживания',
}
