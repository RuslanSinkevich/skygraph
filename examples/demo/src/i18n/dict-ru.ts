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

  theming: {
    title: 'Темизация',
    lead:
      'SkyGraph использует трёхслойную систему CSS-переменных. Переопределите любой слой, чтобы создать свою тему — без шага сборки и без рантайма JS.',
    threeLayersHeading: 'Три слоя',
    colLayer: 'Слой',
    colPrefix: 'Префикс',
    colPurpose: 'Назначение',
    layerPalette: 'Палитра',
    layerPalettePurpose: 'Сырые цвета: blue-500, gray-100 и т.п.',
    layerSemantic: 'Семантика',
    layerSemanticPurpose: 'По смыслу: primary, success, error, bg, text',
    layerComponent: 'Компоненты',
    layerComponentPurpose: 'Токены под каждый компонент для тонкой настройки',
    layersFooter:
      'Палитра питает семантические токены, те — компонентные. Переопределяйте на любом слое — нижестоящие наследуют автоматически.',
    darkModeHeading: 'Тёмная тема',
    darkModeLead: 'Переключайте тёмную тему одним атрибутом на корневом элементе:',
    darkModeNote:
      'SkyGraph поставляет светлую и тёмную палитры. Семантический слой ссылается на палитру, поэтому тёмная тема меняет весь вид без JS-нагрузки.',
    customThemeHeading: 'Своя тема',
    customThemeLead: 'Переопределите основной цвет, задав семантические переменные в своём CSS:',
    customThemeFooter:
      'Все компоненты, которые ссылаются на --sg-color-primary, подхватят новый цвет — кнопки, ссылки, активные состояния, focus ring и т.д.',
    perComponentHeading: 'Точечная настройка по компонентам',
    perComponentLead: 'Каждый компонент даёт свои CSS-переменные для прицельных переопределений:',
    slotsHeading: 'Стилизация через слоты (classNames / styles)',
    slotsLead:
      'У сложных компонентов есть именованные слоты для каждого DOM-узла — без глубоких селекторов. Используйте classNames для классов и styles для inline-стилей. Имена слотов и соответствующие стабильные DOM-классы входят в публичный стилевой контракт.',
    headlessHeading: 'Headless-режим',
    headlessLead:
      'Нужен полный контроль над стилями? Передайте unstyled в любой компонент — все CSS SkyGraph отключатся. Реактивное поведение и доступность остаются. Подключайте свои классы:',
    headlessFooter:
      'Headless работает по отдельному компоненту — мешайте styled и unstyled в одном приложении свободно.',
  },

  coreApi: {
    title: 'API ядра',
    lead: 'Чистый TS реактивный рантайм + предметные движки. Никакой зависимости от React в ядре; React-слой — тонкий адаптер.',
    sectionStore: 'Store — реактивный key/value по путям',
    sectionStoreLead:
      'Централизованное состояние, точечные подписки по путям, транзакционные коммиты, батч-уведомления, computed с детектом циклов.',
    sectionEngines: 'Предметные движки',
    sectionEnginesLead:
      'FormEngine, TableEngine, TreeEngine, VirtualEngine, GraphEngine — каждый владеет namespace `$<name>.` в Store и даёт сфокусированный API для своей предметной области.',
    sectionTyped: 'TypedCore — типобезопасные пути',
    sectionTypedLead:
      'Оберните runtime Core в generic TypedCore<T> для автокомплита и TS-проверки путей без рантайм-нагрузки.',
    sectionMiddleware: 'Pipeline middleware',
    sectionMiddlewareLead:
      'Подключайте logger / freeze / persistence / validation между записями и уведомлениями. Настраивайте порядок и пишите свои.',
    sectionGraph: 'GraphEngine — диаграммы',
    sectionGraphLead:
      'Узлы (outline / transform / parent / anchorPolicy), рёбра (стабильные anchor ID), инкрементальные якоря и AABB, подписки на snapshot для React.',
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
