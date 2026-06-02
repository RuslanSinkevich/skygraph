import { tabsDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `tabsDocEn`, no extras.
 */
export const tabsDocRu: { [K in keyof typeof tabsDocEn]: string } = {
  pageTitle: 'Tabs',
  pageBadge: 'Навигация',
  crumbCategory: 'Навигация',
  crumbTabs: 'Tabs',
  pageLead: 'Переключение между связанными представлениями без ухода со страницы.',
  pageWhen1:
    'У одного ресурса несколько представлений с общим контекстом (детали / активность / настройки).',
  pageWhen2: 'Лёгкая навигация, при которой пользователь остаётся на том же экране.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Стандартные вкладки с тремя панелями.',
  demoLineTitle: 'Line',
  demoLineDesc: 'Полоса с подчёркиванием — type="line" для более плоского вида.',
  demoControlledTitle: 'Контролируемый',
  demoControlledDesc: 'Управляйте активным ключом снаружи (deep links, визарды).',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Три размера для разной плотности.',
  demoRichLabelsTitle: 'Богатые подписи',
  demoRichLabelsDesc: 'Бейджи, иконки и точки статуса прямо в подписи.',
  demoStatesTitle: 'Loading и disabled',
  demoStatesDesc: 'Per-item флаги управляют активацией.',
  demoTokensTitle: 'Кастомные стили табов',
  demoTokensDesc:
    'Три непохожих набора (сегментный pill, парящие карточки, анимированное градиент-подчёркивание) — обычный className на обёртке плюс CSS для потомков.',

  tableTabsApi: 'API Tabs',
  tableTabItem: 'TabItem',
  tableCssVars: 'CSS-переменные',

  cssHint:
    '`card` по умолчанию использует primary и токены поверхности; `line` тянет primary для подчёркивания и текстовые токены для подписей.',

  propItems: 'Определения вкладок',
  propActiveKey: 'Контролируемый активный ключ',
  propDefaultActiveKey: 'Начальный активный ключ (без контроля)',
  propType:
    'Визуальный стиль: `card` — вкладки в рамке, прикреплённые к панели; `line` — только индикатор-подчёркивание',
  propSize: 'Размер списка вкладок (наследуется от ConfigProvider)',
  propUnstyled: 'Отказаться от стилей SkyGraph',
  emitChange: 'Срабатывает после смены активной вкладки',

  itemKey: 'Уникальный идентификатор — для активного состояния и ARIA',
  itemLabel: 'Текст подписи вкладки в полосе вкладок',
  itemContent:
    'Тело панели для активной вкладки (string; для rich-контента используйте слот `#panel`)',
  itemDisabled: 'Затемнение и запрет активации',
  itemLoading: 'Показать спиннер, запретить активацию',

  cssPrimary: 'Подпись активной вкладки; подчёркивание (`line`) или акцент на `card`',
  cssPrimaryHover: 'Подпись неактивной вкладки при наведении',
  cssText: 'Текст тела панели',
  cssTextSecondary: 'Подпись неактивной вкладки',
  cssTextDisabled: 'Подпись отключённой вкладки',
  cssBorderSecondary:
    '`line`: нижняя линия nav; `card`: внешний контур + швы вкладок + верх панели',
  cssBg: '`card`: фон активной вкладки и панели',
  cssBgSecondary: '`card`: фон полосы неактивных вкладок',
  cssFontSize: 'Размер шрифта подписи (sm/lg-варианты перебивают)',
  cssPaddingSm: 'Вертикальные отступы вкладки',
  cssPaddingLg: 'Горизонтальные отступы вкладки',
  cssPaddingXs: 'Зазор между текстом подписи и спиннером загрузки',
  cssMarginMd: 'Пространство между списком вкладок и телом панели',
  cssSpinColor: 'Цвет индикатора загрузки',
}
