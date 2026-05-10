import type { ConfigProviderDocStrings } from './en'

/**
 * Russian translations for the ConfigProvider doc page.
 * Keys must match `configProviderDocEn` exactly.
 */
export const configProviderDocRu: ConfigProviderDocStrings = {
  pageTitle: 'ConfigProvider',
  pageBadge: 'Feedback',
  crumbCategory: 'Feedback',
  crumbConfigProvider: 'ConfigProvider',
  pageLead:
    'Корневая конфигурация для вложенных компонентов Skygraph. Задаёт `size`, `disabled`, `bordered`, `locale` без проброса props через каждый уровень.',
  pageWhen1:
    'Применить единый `size` (или общий `disabled`) на всю страницу либо диалог.',
  pageWhen2:
    'Раздать строки локали один раз на корне приложения, а не в каждом компоненте.',
  pageWhen3:
    'Вкладывать провайдеры, чтобы скоупить дефолты на форму, drawer или конкретный feature flag.',

  demoSizeTitle: 'Size',
  demoSizeDesc:
    'Один провайдер пробрасывает `size` всем вложенным контролам. Input, Button, Select, Switch, Checkbox и др. читают его через `useConfig()`.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc:
    'Превратить целое поддерево в read-only за одну строку — удобно для preview-панелей, неактивных вкладок или UI с ролевой моделью.',
  demoNestedTitle: 'Вложенные провайдеры + явные props',
  demoNestedDesc:
    'Внутренний провайдер mелко перекрывает внешний. Явные props компонента всегда побеждают.',
  demoBorderedTitle: 'Bordered (Table)',
  demoBorderedDesc:
    '`bordered` сегодня вычитывает только Table — централизованный провайдер выравнивает все таблицы без правки каждого инстанса.',
  demoLocaleTitle: 'Пресеты локали (en_US / ru_RU)',
  demoLocaleDesc:
    'Переключайте провайдер между встроенными `en_US` и `ru_RU` — Empty, Pagination, Popconfirm и другие меняют тексты. Конкретные ключи переопределяются собственным `SgLocale`.',
  demoThemeTitle: 'Тема + поведение в одном scope',
  demoThemeDesc:
    '`SgConfigProvider` управляет поведением (size / disabled / locale). За визуал отвечают CSS-токены. Совмещайте их на одной обёртке для самодостаточных микро-тем.',
  demoHookTitle: 'Composable `useConfig()`',
  demoHookDesc:
    'Кастомные компоненты читают итоговый конфиг так же, как встроенные. Полезно для сторонних контролов, которые хотят следовать одному контракту size / disabled.',

  tableProviderApi: 'API ConfigProvider',
  tableLocaleShape: 'Структура SgLocale',
  tablePresets: 'Пресеты локали',
  tableHooks: 'Composables',

  propSize:
    'Дефолтный `size` для потомков. Явные props компонента всё равно побеждают.',
  propDisabled:
    'Отключает все вложенные контролы, читающие контекст (Input, Button, Select, Switch, Checkbox и т.д.).',
  propBordered:
    'Дефолтный bordered. Сейчас читается только Table; остальные оставляют свои дефолты.',
  propLocale:
    'Mелко мерджится в локаль родителя. Используется Empty, Pagination, Popconfirm, Upload, маркерами Form, кнопкой submit SchemaForm, Transfer и Calendar. Доступные пресеты: `en_US`, `ru_RU`.',
  slotDefault: 'Поддерево, читающее итоговый конфиг через `useConfig()`.',

  localeTable:
    'Строки Table (empty, фильтры reset/confirm, плейсхолдер поиска, индикаторы сортировки, форматтеры количества строк, действия колонок).',
  localePagination: 'Подписи Pagination — префикс total, label page-size, поле jump.',
  localeDataGrid: 'Empty-текст и подпись «Select all» у DataGrid.',
  localeModal: 'Подписи кнопок OK / Cancel в Modal.',
  localePopconfirm: 'Подписи кнопок OK / Cancel в Popconfirm.',
  localeEmpty: 'Дефолтное описание Empty.',
  localeForm: 'Маркеры Required / optional + подписи кнопок submit/reset.',
  localeUpload: 'Тексты триггера, удаления, превью и ошибок Upload.',
  localeTransfer:
    'Заголовки списков Transfer, плейсхолдер поиска, empty-контент, подписи единиц.',
  localeCalendar: 'Названия месяцев / дней недели и кнопка «Today».',

  hookUseConfig:
    'Возвращает итоговый `SgConfig` из ближайшего `SgConfigProvider`. Компоненты используют его, чтобы зарезолвить `size` / `disabled` / `locale`.',
  hookUseConfigWithDefaults:
    'Резолвит итоговые `size` и `disabled` из props → context → defaults. Возвращает исходные props плюс `resolvedSize` и `resolvedDisabled`.',

  presetEnUs: 'Пресет английской (US) локали. Покрывает все компоненты, читающие локаль.',
  presetRuRu: 'Пресет русской (RU) локали. Покрывает все компоненты, читающие локаль.',
}
