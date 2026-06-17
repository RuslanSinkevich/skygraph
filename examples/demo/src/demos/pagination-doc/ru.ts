import { paginationDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `paginationDocEn`, no extras.
 */
export const paginationDocRu: { [K in keyof typeof paginationDocEn]: string } = {
  pageTitle: 'Pagination',
  pageLead:
    'Постраничная навигация со сворачиванием в эллипсис, опциональным переключателем размера / быстрым переходом / лейблом «всего» и компактным simple-режимом.',
  pageWhen1: 'Длинные таблицы и списки — порог обычно от 50 строк.',
  pageWhen2: 'Постраничные ответы API, когда выгружать всё разом — слишком тяжело.',
  pageWhen3: 'Сетки результатов поиска, где номера страниц нужны в URL для deep-link.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Prev / next и нумерованные чипы.',
  demoManyPagesTitle: 'Много страниц',
  demoManyPagesDesc: 'Сворачивание в эллипсис при total > 7 страниц.',
  demoSimpleTitle: 'Simple',
  demoSimpleDesc: "Компактный 'current / total' с prev / next по краям.",
  demoShowTotalTitle: 'Show total',
  demoShowTotalDesc: "Boolean для 'Total N' либо функция для своего лейбла диапазона.",
  demoSizeChangerTitle: 'Size changer + quick jumper',
  demoSizeChangerDesc: 'Полный enterprise-набор: total, size и переход к странице.',
  demoDisabledTitle: 'Отключено',
  demoDisabledDesc: 'Затемнение и pointer-events: none, пока таблица грузится.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Оберни компонент в элемент с CSS-переменными — он перекрасится.',

  tablePaginationApi: 'API Pagination',
  tableCssVars: 'CSS-переменные',

  cssHint:
    'У Pagination нет приватных токенов — активный чип использует `--sg-color-primary`, остальные следуют палитре form-chip. Поднимите `--sg-border-radius` до 999px для pill-формы; перекрасьте `--sg-color-primary` для ребрендинга.',

  propCurrent: 'Текущая страница (с 1). Кламп в [1, totalPages]',
  propTotal: 'Общее число записей',
  propPageSize: 'Строк на странице',
  propOnChange: 'Срабатывает, когда пользователь выбирает другую страницу',
  propOnPageSizeChange: 'Срабатывает при выборе нового размера страницы',
  propShowTotal: 'Показать "Total N" (boolean) или своя функция (total, range) ⇒ ReactNode',
  propDisabled: 'Отключить все контролы',
  propSimple: 'Компактный режим "current / total", без нумерованных кнопок',
  propShowSizeChanger: 'Показать <select> для размера страницы',
  propPageSizeOptions: 'Опции в <select> переключателя размера',
  propShowQuickJumper: 'Показать инпут "Перейти на страницу"',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы sg-pagination-* (headless-режим)',

  cssBg: 'Фон чипа в покое',
  cssBorder: 'Граница чипа и disabled',
  cssText: 'Цвет текста чипа и simple-пагера',
  cssTextSecondary: 'Цвет лейбла "Total N"',
  cssTextDisabled: 'Цвет отключённого чипа и эллипсиса',
  cssPrimary: 'Граница при наведении и фон активного чипа',
  cssPrimaryHover: 'Фон активного чипа при наведении',
  cssWhite: 'Цвет текста активного чипа',
  cssHeightMd: 'Высота чипа и блока с эллипсисом',
  cssPaddingSm:
    'Горизонтальный отступ чипа, зазор simple-режима, перенос строк, отступ jumper/select',
  cssMarginXs: 'Зазор между контролами пагера',
  cssFontSizeSm: 'Текст total-лейбла, размера и quick jumper',
  cssBorderRadius: 'Скругление чипа',
  cssFontSize: 'Размер текста пагера',
  cssTransitionDuration: 'Переход чипа при наведении',
  cssTransitionTiming: 'Общая кривая сглаживания',
}
