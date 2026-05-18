import type { DemoDict } from './types'

export const ru: DemoDict = {
  app: {
    appTitle: 'SkyGraph Vue',
    tagline: 'Реактивные примитивы и 27 компонентов для Vue 3',
    heroSub:
      'Композаблы и компоненты на @skygraph/core и @skygraph/styles. Тот же DOM-контракт, те же CSS-классы, идиоматичный Vue API.',
  },
  search: {
    placeholder: 'Поиск компонентов',
    ariaLabel: 'Поиск компонентов',
    noMatches: 'Совпадений нет',
  },
  menuSections: {
    general: 'Базовые',
    dataEntry: 'Ввод данных',
    dataDisplay: 'Отображение данных',
    feedback: 'Обратная связь',
    navigation: 'Навигация',
    form: 'Формы',
    visualization: 'Визуализация',
    guide: 'Руководство',
  },
  menuItems: {
    gettingStarted: 'Быстрый старт',
    stylingShowcase: 'Стилизация',
    theming: 'Темизация',
    designTokens: 'Дизайн-токены',
    coreApi: 'API ядра',
    configProvider: 'ConfigProvider',
  },
  header: {
    navComponents: 'Компоненты',
    navHome: 'Главная',
    navGuide: 'Руководство',
    navShowcases: 'Кейсы',
    navRoadmap: 'Roadmap',
    navAbout: 'О проекте',
    navGithub: 'GitHub',
    themeAria: 'Переключить тему',
    languageAria: 'Сменить язык',
    burgerAria: 'Открыть навигацию',
  },
  footer: {
    copyright: '© 2026 контрибьюторы SkyGraph',
    columnDocs: 'Документация',
    columnResources: 'Ресурсы',
    columnCommunity: 'Сообщество',
    columnProject: 'Проект',
    linkGettingStarted: 'Быстрый старт',
    linkComponents: 'Компоненты',
    linkTheming: 'Темизация',
    linkCoreApi: 'API ядра',
    linkChangelog: 'Changelog',
    linkArchitecture: 'Архитектура',
    linkContributing: 'Контрибьютинг',
    linkGithub: 'GitHub',
    linkIssues: 'Сообщить о проблеме',
    linkAbout: 'О проекте',
    linkRoadmap: 'Roadmap',
    linkLicense: 'Лицензия',
  },
  language: {
    switcherLabel: 'Язык',
    en: 'English',
    ru: 'Русский',
  },
  componentDoc: {
    examples: 'Примеры',
    whenToUse: 'Когда использовать',
    propsTitle: 'API',
    showCode: 'Показать код',
    hideCode: 'Скрыть код',
    copy: 'Копировать',
    copied: 'Скопировано',
  },
  propsTable: {
    titleApi: 'API',
    colProperty: 'Свойство',
    colDescription: 'Описание',
    colType: 'Тип',
    colDefault: 'По умолчанию',
    requiredLabel: 'обязательное',
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
  cssVarsTable: {
    title: 'CSS-переменные',
    colVariable: 'Переменная',
    colDefault: 'По умолчанию',
    colDescription: 'Описание',
  },
  landing: {
    heroTitle: 'Готовый набор UI для Vue 3',
    heroSub:
      'SkyGraph — multi-framework UI-библиотека для React и Vue. 78+ компонентов, 12 готовых приложений, светлая и тёмная темы — всё на едином ядре.',
    ctaPrimary: 'Посмотреть приложения',
    ctaSecondary: 'Открыть компоненты',
    heroImageAlt: 'Скриншот демо CRM в светлой теме',

    highlightsTitle: 'Что внутри',
    highlight1Title: '78+ компонентов',
    highlight1Desc:
      'Формы, таблицы, деревья, календари, графики, диаграммы, дашборды. Готовы к проекту.',
    highlight2Title: '12 готовых приложений',
    highlight2Desc:
      'Настоящий CRM, дашборды, редактор процессов, kitchen-sink таблица — с полным исходным кодом.',
    highlight3Title: 'Светлая и тёмная темы',
    highlight3Desc:
      'Темы из коробки. Переключение одним атрибутом, цвета меняются через CSS-переменные.',
    highlight4Title: 'Open source · MIT',
    highlight4Desc:
      'Свободное использование в коммерческих и личных проектах. Открытый код, без телеметрии и vendor lock-in.',

    showcasesTitle: 'Готовые приложения',
    showcasesSub:
      'Реальные интерфейсы, собранные целиком из компонентов SkyGraph — фейковые данные, рабочий UI.',
    showcasesLink: 'Смотреть все приложения →',
    showcaseCrmTitle: 'CRM',
    showcaseCrmDesc:
      'Контакты, сделочный pipeline, лента активности. Drag-and-drop, inline-редактирование.',
    showcaseDashboardTitle: 'Дашборд операций',
    showcaseDashboardDesc:
      'Живой KPI-grid, разные графики, фильтры и drill-down, настраиваемая раскладка.',
    showcaseWorkflowTitle: 'Редактор процессов',
    showcaseWorkflowDesc:
      'Visio-подобные блок-схемы: множественный выбор, lasso, undo/redo, orthogonal routing.',
    showcaseTableTitle: 'Таблица — всё включено',
    showcaseTableDesc:
      'Сортировка, фильтры, группировка, virtual scroll, экспорт и печать на миллионе строк.',

    spotsTitle: 'Сделано для настоящих интерфейсов',
    spotThemingTitle: 'Тема в один клик',
    spotThemingDesc:
      'Каждый компонент читает цвета из CSS-переменных. Тема переключается одним атрибутом, токены легко переопределить под бренд.',
    spotChartsTitle: 'Графики и диаграммы',
    spotChartsDesc:
      'Responsive SVG-графики, интерактивные блок-схемы, настраиваемые tooltip и легенды. Экспорт в SVG/PNG и печать — встроены.',
    spotFormsTitle: 'Формы с валидацией',
    spotFormsDesc:
      'Типизированные формы, валидация по полю, зависимые поля, условные строки. Работает с любым источником данных.',

    installTitle: 'Установка',
    installLead: 'Для разработчиков — два пакета, один импорт стилей.',
    installLearnMore: 'Подробнее в Getting Started →',

    footerCtaTitle: 'Хотите попробовать?',
    footerCtaBody: 'Откройте живые демо-приложения или сразу переходите в каталог компонентов.',
    footerCtaButton: 'Посмотреть приложения',
    footerDevHint: 'Для разработчиков: Getting Started · Архитектура · Лицензия (MIT)',
  },

  roadmap: {
    title: 'Roadmap',
    lead: 'Живой срез TODO.md. Закрытые пункты помечены раундом, в котором приехали; открытые — кандидаты в ближайшие стримы.',
    statClosed: 'закрыто',
    statOpen: 'открыто',
    statTotal: 'всего',
    sourceLabel: 'Источник: TODO.md',
    emptyLabel: 'Список пуст.',
  },

  about: {
    title: 'О проекте',
    lead1:
      'SkyGraph — TypeScript-first реактивная UI-библиотека: path-based ядро, шесть предметных движков и 78+ стилизованных компонентов на чистых CSS-переменных без рантайма.',
    lead2:
      'Это UI-фундамент платформы Sky: один и тот же компонентный контракт поставляется через адаптеры для React и Vue — одинаковый DOM и CSS.',
    lead3:
      'Никакого styled-components, никакого CSS-in-JS рантайма, никаких проприетарных шагов сборки — только стандарты: TypeScript, CSS-переменные, нативные DOM-события.',
    versionLabel: 'Версия',
    licenseLabel: 'Лицензия',
    licenseValue: 'MIT',
    architectureLink: 'Архитектура →',
    skyPlatformTitle: 'Pet-проекты автора',
    skyPlatformLead:
      'Три независимых pet-проекта Руслана Синкевича — developer tools на разных стеках.',
    skycodeTitle: 'Skycode',
    skycodeDesc:
      'Форк VS Code со встроенным AI-ассистентом — агент, 40+ провайдеров моделей, inline diff.',
    gitborTitle: 'GitBor',
    gitborDesc:
      'Кроссплатформенный десктопный Git-клиент на Electron — визуальный граф коммитов, интерактивный rebase, защита данных.',
    skygraphTitle: 'SkyGraph',
    skygraphDesc: 'Эта библиотека — multi-framework UI на общем headless-ядре.',
    multiFrameworkTitle: 'Multi-framework',
    multiFrameworkLead: 'Ядро и стилевой контракт фреймворк-независимы. Готовые адаптеры:',
    multiFrameworkReact:
      'React — hooks, ConfigProvider, 47 UI-примитивов + 17 сложных компонентов на том же ядре.',
    multiFrameworkVue:
      'Vue 3 — биндинги Composition API, 52 SFC-примитива + 14 сложных — то же ядро, те же `.sg-*` классы.',
  },

  gettingStarted: {
    title: 'Быстрый старт',
    lead: 'Установите SkyGraph, импортируйте стили один раз — и можно собирать реактивные Vue 3 компоненты. Тот же DOM-контракт, что у React-адаптера, и идиоматичный Composition API.',
    installation: 'Установка',
    installLeadNpm: 'Установите ядро и Vue-адаптер через npm:',
    installLeadPnpm: 'Или через pnpm:',
    importStyles: 'Импорт стилей',
    importStylesLead:
      'Импортируйте готовый стайлшит один раз в точке входа приложения (например, main.ts):',
    importStylesNote1:
      'Все компоненты выдают CSS-переменные, которые можно переопределить в любой области (',
    importStylesNote2Theming: 'см. Темизацию',
    basicForm: 'Простая форма',
    basicFormLead: 'Соберите типизированную форму со встроенной валидацией и обработчиком submit:',
    individualComponents: 'Отдельные компоненты',
    individualComponentsLead: 'Или используйте стилизованные компоненты по отдельности:',
    whatsNext: 'Что дальше',
    cardThemingTitle: 'Темизация',
    cardThemingDesc:
      'Переопределите CSS-переменные, чтобы перекрасить всё приложение или одну ветку.',
    cardCoreApiTitle: 'API ядра',
    cardCoreApiDesc: 'Управляйте формами, таблицами и деревьями через path-based реактивный store.',
    cardComponentsTitle: 'Все компоненты',
    cardComponentsDesc: '50+ готовых компонентов: Button, Input, Table, Tree и многое другое.',
  },

  theming: {
    title: 'Темизация',
    lead: 'SkyGraph использует трёхуровневую систему CSS-переменных. Переопределите любой уровень — получите свою тему. Без шагов сборки и без runtime-затрат.',
    threeLayersHeading: 'Три уровня',
    colLayer: 'Уровень',
    colPrefix: 'Префикс',
    colPurpose: 'Назначение',
    layerPalette: 'Палитра',
    layerPalettePurpose: 'Стабильные шкалы цветов (blue-1…blue-10, gray, red, green, orange).',
    layerSemantic: 'Семантика',
    layerSemanticPurpose:
      'Токены поверхностей, текста, primary, success / error / warning. Переключаются через data-sg-theme.',
    layerComponent: 'Компонентный',
    layerComponentPurpose:
      'Точечные переопределения по компонентам — высота Button, радиус Input, паддинги Table…',
    layersFooter:
      'Меняйте на самом глубоком уровне, который подходит: палитру — чтобы перекрасить всё, семантический токен — чтобы сменить бренд, компонентный — чтобы подкрутить один виджет.',
    darkModeHeading: 'Тёмная тема',
    darkModeLead: 'Переключайте всё приложение между светлой и тёмной темой одним атрибутом:',
    darkModeNote: 'Подключите к свитчу, сохраняйте в localStorage — и всё:',
    customThemeHeading: 'Своя тема',
    customThemeLead:
      'Переопределите семантические токены, чтобы выкатить брендовую тему без пересборки компонентов:',
    customThemeFooter:
      'Токены каскадируются — primary-кнопки, focus-кольца, бейджи и индикаторы сортировки таблиц подхватят новый цвет автоматически.',
    perComponentHeading: 'Компонентные токены',
    perComponentLead:
      'У каждого компонента свои токены. Переопределяйте глобально (брендовое изменение) или ограничивайте поддеревом:',
    slotsHeading: 'Слоты',
    slotsLead:
      'Для глубокой кастомизации каждый сложный компонент даёт classNames на каждый слот — строки таблицы, элементы списка, заголовок модалки — без форка компонента:',
    headlessHeading: 'Headless-режим',
    headlessLead: 'Передайте `unstyled`, чтобы убрать .sg-* классы и принести свой CSS:',
    headlessFooter:
      'Поведение, доступность и реактивность сохраняются. Стиль — на 100% ваш. Удобно для полностью кастомного дизайна с надёжным ядром.',
  },

  coreApi: {
    title: 'API ядра',
    lead: 'Фреймворк-независимый движок, на котором работают все адаптеры SkyGraph. Path-based реактивный store с пакетными обновлениями, типизированными биндингами и движками для форм, таблиц, деревьев и графов.',
    sectionStore: 'createCore — реактивный store',
    sectionStoreLead:
      'Path-based реактивный store. Set, subscribe, batch — точечная реактивность без каскадных рендеров.',
    sectionEngines: 'Предметные движки',
    sectionEnginesLead:
      'Специализированные движки поверх ядра: формы, таблицы, деревья, графы и виртуализация.',
    sectionTyped: 'Типизированное ядро',
    sectionTypedLead:
      'Оберните core в типизированный прокси, чтобы получить автокомплит и compile-time проверки на каждом set/get/subscribe.',
    sectionMiddleware: 'Middleware',
    sectionMiddlewareLead:
      'Подключайте логирование, freeze, devtools или свой middleware к store через core.use().',
    sectionGraph: 'Graph-движок',
    sectionGraphLead:
      'Реактивный граф с топологией: узлы, рёбра, порты, якоря. Используется в Diagram, Dashboard и в роутинге.',
  },

  guideStub: {
    seeReactDocs: 'Полный текст — в React-эталоне →',
    stylingShowcaseTitle: 'Стилизация',
    stylingShowcaseLead:
      'Галерея всех стилевых рецептов SkyGraph — палитра, семантические и компонентные токены, slot-переопределения, условные строки, тёмные scope-ы, headless-модалки. Vue-порт в работе.',
    designTokensTitle: 'Дизайн-токены',
    designTokensLead:
      'Поисковый индекс всех публичных --sg-* переменных. Vue-порт в работе — React-эталон содержит полный каталог токенов.',
    configProviderTitle: 'ConfigProvider',
    configProviderLead:
      'Скоупит дефолты size / disabled / locale / bordered на поддерево. Демо компонента доступно в разделе Компоненты → ConfigProvider.',
  },

  frameworkSwitcher: {
    label: 'Фреймворк',
    comingSoonTitle: 'Скоро',
  },
}
