import type { ResultDocStrings } from './en'

export const resultDocRu: ResultDocStrings = {
  pageTitle: 'Result',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbResult: 'Result',
  pageLead:
    'Полностраничная карточка-исход после долгой операции, ошибочного запроса или 404 / 403 / 500.',
  pageWhen1: 'После многошагового submit или асинхронной операции.',
  pageWhen2: 'Empty / error состояние роута — нужен sign-in, нет страницы, упал сервер.',
  pageWhen3: 'Экраны подтверждения с основными recovery / next-step CTA.',

  demoSuccessTitle: 'Success',
  demoSuccessDesc: 'Галочка + зелёная заливка, основная CTA в `#extra`.',
  demoErrorTitle: 'Error',
  demoErrorDesc: 'Красный крест, две CTA (повтор + эскалация).',
  demoInfoWarningTitle: 'Info & warning',
  demoInfoWarningDesc: '`info` (нейтральный) и `warning` (янтарный) варианты.',
  demoHttpTitle: 'HTTP-ошибки',
  demoHttpDesc: 'Встроенный numeric artwork для 404 / 403 / 500.',
  demoCustomIconTitle: 'Своя иконка',
  demoCustomIconDesc:
    'Заменяем дефолтный artwork через слот `#icon` (emoji / SVG / компонент).',
  demoWithContentTitle: 'С контентом',
  demoWithContentDesc: 'Default-слот рендерится в мягкой панели под `#extra`.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Локально переопределяем success / primary / surface токены.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc:
    '`unstyled` сохраняет `role="status"` + aria-live, убирает все классы.',

  tableResultApi: 'API Result',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'У Result нет собственных токенов. Переопределяй глобальные цвета (success / error / warning / primary) и `--sg-color-bg-secondary` (панель с контентом) для ребрендинга.',

  propStatus: 'Тип исхода — задаёт дефолтную иконку и оттенок',
  propTitle: 'Основной заголовок',
  propSubTitle: 'Дополнительный пояснительный текст',
  propUnstyled:
    'Снять sg-result-* классы (сохранить семантику + aria-live)',
  propIconSlot: 'Слот `#icon` для кастомного artwork',
  propExtraSlot: 'Слот `#extra` для основных CTA (под sub-title)',
  propDefaultSlot: 'Default-слот — вторичная панель с контентом под `#extra`',

  cssSuccess: 'Цвет иконки status="success"',
  cssError: 'Цвет иконки status="error"',
  cssInfo: 'Цвет иконки status="info" (использует primary)',
  cssWarning: 'Цвет иконки status="warning"',
  cssBgSecondary: 'Фон опциональной content-панели',
  cssText: 'Цвет заголовка',
  cssTextSecondary: 'Цвет sub-title',
  cssBorderRadius: 'Радиус скругления внешней рамки (если обёрнут)',
  cssFontSizeXl: 'Размер шрифта заголовка',
  cssFontSize: 'Размер шрифта sub-title',
}
