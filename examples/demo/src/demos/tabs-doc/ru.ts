import { tabsDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `tabsDocEn`, no extras.
 */
export const tabsDocRu: { [K in keyof typeof tabsDocEn]: string } = {
  pageTitle: 'Tabs',
  pageLead: 'Переключение между связанными представлениями без ухода со страницы.',
  pageWhen1:
    'У одного ресурса несколько представлений с общим контекстом (детали / активность / настройки).',
  pageWhen2: 'Лёгкая навигация, при которой пользователь остаётся на том же экране.',
  pageWhen3: 'Для пошаговых сценариев используйте <Steps> — Tabs не подразумевает порядок.',

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
  demoTokensDesc: 'Оберни компонент в элемент с CSS-переменными — он перекрасится.',

  tableTabsApi: 'API Tabs',
  tableTabItem: 'TabItem',
  tableCssVars: 'CSS-переменные',

  cssHint:
    '`card` по умолчанию использует primary и токены поверхности; `line` тянет primary для подчёркивания и текстовые токены для подписей.',

  propItems: 'Определения вкладок',
  propActiveKey: 'Контролируемый активный ключ',
  propDefaultActiveKey: 'Начальный активный ключ (без контроля)',
  propOnChange: 'Срабатывает после смены активной вкладки пользователем',
  propType:
    'Визуальный стиль: `card` — вкладки в рамке, прикреплённые к панели; `line` — только индикатор-подчёркивание',
  propSize: 'Размер списка вкладок (наследуется от ConfigProvider)',
  propClassName: 'Дополнительный class на корне',
  propStyle: 'Inline-стиль на корне',
  propUnstyled: 'Отказаться от стилей SkyGraph',

  itemKey: 'Уникальный идентификатор — для активного состояния и ARIA',
  itemLabel: 'Подпись вкладки (ReactNode — допустимы иконки, бейджи)',
  itemChildren: 'Тело панели, показываемое при активной вкладке',
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
