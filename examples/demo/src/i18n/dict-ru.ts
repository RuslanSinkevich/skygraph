import type { DemoDict } from './types'

export const ru: DemoDict = {
  app: {
    appTitle: 'SkyGraph',
    tagline: 'Реактивная UI-библиотека',
    heroSub:
      'Headless-ядро реактивности + 50+ стилизованных компонентов. TypeScript-first. Zero runtime CSS-in-JS.',
    componentsBadgeSuffix: '+ компонентов',
  },

  search: {
    placeholder: 'Поиск компонентов…',
    ariaLabel: 'Поиск компонентов',
    noMatches: 'Ничего не найдено.',
  },

  features: {
    reactiveCoreTitle: 'Реактивное ядро',
    reactiveCoreDesc:
      'Точечные подписки. Батчинг обновлений. Без каскадных ререндеров.',
    componentsTitle: 'Компоненты',
    componentsDesc:
      'Формы, таблицы, деревья, модалки, пикеры — готовы к продакшену.',
    zeroRuntimeTitle: 'CSS без рантайма',
    zeroRuntimeDesc:
      'Только CSS-переменные. Тёмная тема — один атрибут. Никакого styled-components.',
  },

  overview: {
    browseHeading: 'Обзор компонентов',
  },

  topbar: {
    stylingShowcase: 'Витрина стилей',
    theming: 'Темизация',
    gettingStarted: 'Быстрый старт',
    github: 'GitHub',
  },

  menuSections: {
    guide: 'Руководство',
    general: 'Общие',
    dataEntry: 'Ввод данных',
    dataDisplay: 'Отображение данных',
    feedback: 'Обратная связь',
    navigation: 'Навигация',
  },

  menuItems: {
    overview: 'Обзор',
    gettingStarted: 'Быстрый старт',
    stylingShowcase: 'Витрина стилей',
    theming: 'Темизация',
    designTokens: 'Дизайн-токены',
    coreApi: 'API ядра',
    configProvider: 'ConfigProvider',
  },

  language: {
    switcherLabel: 'Язык',
    en: 'English',
    ru: 'Русский',
  },

  propsTable: {
    titleApi: 'API',
    colProperty: 'Свойство',
    colDescription: 'Описание',
    colType: 'Тип',
    colDefault: 'По умолчанию',
    requiredLabel: 'обязательное',
  },

  cssVarsTable: {
    title: 'CSS-переменные',
    colVariable: 'Переменная',
    colDefault: 'По умолчанию',
    colDescription: 'Описание',
  },

  demoBox: {
    toolbarLabel: 'Действия демо',
    showCode: 'Показать код',
    hideCode: 'Скрыть код',
    showCodeAria: 'Показать код',
    hideCodeAria: 'Скрыть код',
    copyCode: 'Скопировать код',
    copy: 'Копировать',
    copied: 'Скопировано',
    copiedToast: 'Скопировано!',
  },

  componentDoc: {
    whenToUse: 'Когда использовать',
    examples: 'Примеры',
  },

  gettingStarted: {
    title: 'Быстрый старт',
    lead: 'Начните работу со SkyGraph меньше чем за 5 минут.',
    installation: 'Установка',
    installLeadNpm: 'Установите ядро и React-биндинги:',
    installLeadPnpm: 'Или через pnpm:',
    importStyles: 'Подключение стилей',
    importStylesLead:
      'SkyGraph поставляет тему по умолчанию через CSS. Подключите её один раз в корне приложения:',
    importStylesNote1:
      'Это даст полную дизайн-систему — палитру, отступы, типографику и компонентные токены. Любую переменную можно переопределить (см. ',
    importStylesNote2Theming: 'Темизация',
    basicForm: 'Простая форма',
    basicFormLead:
      'Реактивное ядро SkyGraph даёт формы из коробки — валидация, зависимости и динамические поля без шаблонного кода:',
    individualComponents: 'Использование отдельных компонентов',
    individualComponentsLead:
      'Каждый компонент работает самостоятельно — без провайдера или контекста:',
    whatsNext: 'Что дальше',
    cardThemingTitle: 'Темизация',
    cardThemingDesc: 'CSS-переменные, тёмная тема, свои палитры',
    cardCoreApiTitle: 'API ядра',
    cardCoreApiDesc: 'createCore, createForm, createTable, createTree, createGraph',
    cardComponentsTitle: 'Компоненты',
    cardComponentsDesc: 'Более 65 готовых UI-компонентов',
  },
}
