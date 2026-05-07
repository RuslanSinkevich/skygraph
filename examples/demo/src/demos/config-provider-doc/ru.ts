import { configProviderDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `configProviderDocEn`, no extras.
 */
export const configProviderDocRu: { [K in keyof typeof configProviderDocEn]: string } = {
  pageTitle: 'ConfigProvider',
  pageLead:
    'Корневая конфигурация для вложенных компонентов Skygraph. Задаёт `size`, `disabled`, `bordered` и `locale` по умолчанию — без проброса props через каждый уровень.',
  pageWhen1: 'Применить единый `size` (или отключить всё) на уровне страницы или диалога.',
  pageWhen2: 'Поставить локаль один раз в корне приложения вместо отдельных компонентов.',
  pageWhen3: 'Вкладывать провайдеры — для скоупа дефолтов на форму, drawer или фичефлаг.',

  demoSizeTitle: 'Size',
  demoSizeDesc:
    'Один провайдер пробрасывает `size` всем потомкам. Input, Button, Select, Switch, Checkbox и другие читают его через `useConfig()`.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc:
    'Перевести всё поддерево в read-only одной строкой — удобно для preview-панелей, неактивных табов и UI с правами.',
  demoNestedTitle: 'Вложенные провайдеры + явные props',
  demoNestedDesc: 'Внутренние провайдеры shallow-перебивают внешние. Per-компонентные props всегда побеждают.',
  demoBorderedTitle: 'Bordered (Table)',
  demoBorderedDesc:
    '`bordered` сегодня поддерживает Table — задание этого на провайдере выравнивает все таблицы без правки экземпляров.',
  demoLocaleTitle: 'Пресеты локали (en_US / ru_RU)',
  demoLocaleDesc:
    'Переключите провайдер между встроенными `en_US` и `ru_RU` — Empty, Pagination, Popconfirm, Upload и SchemaForm подменят строки. Отдельные ключи перебиваются своим `SgLocale`.',
  demoThemeTitle: 'Скоуп темы и поведения',
  demoThemeDesc:
    '`ConfigProvider` владеет поведением (size / disabled / locale). CSS-токены — визуалом. Объедините на одной обёртке для самодостаточных микро-тем.',
  demoHookTitle: 'Хук useConfig()',
  demoHookDesc:
    'Свои компоненты могут читать слитую конфигурацию так же, как встроенные. Удобно для сторонних контролов, желающих следовать тому же контракту size / disabled.',

  tableProviderApi: 'API ConfigProvider',
  tableLocaleShape: 'Форма SgLocale',
  tablePresets: 'Пресеты локали',
  tableHooks: 'Хуки',

  propSize: 'Дефолтный `size` для потомков. Per-компонентные props всё равно побеждают.',
  propDisabled:
    'Отключает каждый дочерний контрол, читающий контекст (Input, Button, Select, Switch, Checkbox и т.д.).',
  propBordered:
    'Дефолтный флаг bordered. Сейчас потребляется Table; остальные компоненты держат свои дефолты.',
  propLocale:
    'Shallow-merge с локалью родителя. Потребляется Empty, Pagination, Popconfirm, Upload, маркерами полей Form, submit SchemaForm, Transfer и Calendar. Доступные пресеты: `en_US`, `ru_RU`.',
  propChildren: 'Поддерево, читающее слитую конфигурацию через `useConfig()`.',

  localeTable:
    'Строки Table (пустое состояние, сброс/подтверждение фильтра, плейсхолдер поиска, индикаторы сортировки, форматтеры количества строк, действия колонок).',
  localePagination: 'Лейблы Pagination — префикс total, лейбл размера страницы, инпут перехода.',
  localeDataGrid: 'Текст пустого состояния DataGrid и лейбл "Select all".',
  localeModal: 'Лейблы кнопок OK / Cancel в Modal.',
  localePopconfirm: 'Лейблы кнопок OK / Cancel в Popconfirm.',
  localeEmpty: 'Описание Empty по умолчанию.',
  localeForm: 'Маркеры required / optional и лейблы кнопок submit/reset.',
  localeUpload: 'Триггер Upload, удаление, превью и тексты ошибок.',
  localeTransfer: 'Заголовки списков Transfer, плейсхолдер поиска, пустое содержимое, лейблы единиц.',
  localeCalendar: 'Названия месяцев / дней недели и лейбл кнопки "Today".',

  hookUseConfig:
    'Возвращает слитый SgConfig от ближайшего предка ConfigProvider. Компоненты используют его для разрешения `size` / `disabled` / `locale`.',
  hookUseConfigWithDefaults:
    'Разрешает эффективные `size` и `disabled`: props → context → defaults. Возвращает исходные props плюс `resolvedSize` и `resolvedDisabled`.',

  presetEnUs: 'Пресет локали English (US). Покрывает все компоненты, потребляющие locale.',
  presetRuRu: 'Пресет локали Russian (RU). Покрывает все компоненты, потребляющие locale.',
}
