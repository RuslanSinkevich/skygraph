import type { DemoDict } from './types'

export const ru: DemoDict = {
  app: {
    appTitle: 'SkyGraph Angular',
    tagline: 'Standalone-компоненты и signals поверх @skygraph/core',
    heroSub:
      'Angular-адаптер для @skygraph/core и @skygraph/styles. Тот же DOM-контракт, те же CSS-классы, идиоматичный Angular API — standalone-компоненты, signals, новый control flow.',
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
    navRoadmap: 'Changelog',
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
    linkRoadmap: 'Changelog',
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
    title: 'SkyGraph',
    lead: 'Фреймворк-агностичная UI-библиотека с Angular-адаптером — standalone-компоненты, signals и новый control flow поверх @skygraph/core.',
    heroInstall: 'npm install @skygraph/core @skygraph/angular @skygraph/styles',
    statComponents: 'компонентов',
    statComposables: 'standalone',
    statTests: 'тестов',
    statEngines: 'движков',
    statRuntimeCss: 'Run-time CSS',
    statRuntimeCssValue: '0 kB',
    ctaPrimary: 'Открыть компоненты',
    ctaSecondary: 'Исходники',
    featureReactiveTitle: 'Реактивное ядро',
    featureReactiveDesc:
      'Единый store-engine с адаптерами form / table / tree / graph. Один движок для React и Vue.',
    featureZeroRuntimeTitle: 'Zero-runtime CSS',
    featureZeroRuntimeDesc:
      'Вся стилизация в @skygraph/styles. Никакого CSS-in-JS и runtime-затрат, темизация через CSS-переменные.',
    featureA11yTitle: 'Доступность из коробки',
    featureA11yDesc:
      'Roving tabindex, list navigation, focus trap и корректная ARIA-разметка во всех примитивах.',
    featureMultiTitle: 'Тот же DOM, тот же CSS',
    featureMultiDesc:
      'Angular-компоненты выдают ровно те же .sg-* классы, что и React-адаптер — темы и шоукейсы работают везде.',
    featureStandaloneTitle: 'Standalone + signals',
    featureStandaloneDesc:
      'Все компоненты standalone, OnPush, signal-инпуты. Без NgModule. Везде новый control flow @if / @for.',
    featureEnginesTitle: 'Domain-движки',
    featureEnginesDesc:
      'Движки форм, таблиц, деревьев, графа и виртуализации поверх core-store. Используются через useTable / useTree / useGraph.',
    quickInstallTitle: 'Быстрая установка',
    quickInstallDesc:
      'Добавьте @skygraph/angular и @skygraph/styles, импортируйте стили один раз и подключите provideSgConfig() при бутстрапе.',
    quickInstallSub: 'Два пакета, один стилевой файл — без лишней настройки.',
    quickInstallCopy: 'Копировать',
    quickInstallCopied: 'Скопировано',
    quickInstallNpmTitle: 'npm',
    quickInstallMinimalTitle: 'main.ts',
    quickInstallMinimalSub: 'Поднимаем provideSgConfig() в корне приложения.',
  },
  roadmap: {
    title: 'Changelog',
    lead: 'Каждая выпущенная версия и что в неё вошло.',
    emptyLabel: 'Релизов пока нет.',
    viewOnGithub: 'Открыть CHANGELOG.md на GitHub →',
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
    lead: 'Установите SkyGraph, импортируйте стили один раз, подключите provideSgConfig() при бутстрапе — и можно собирать standalone-компоненты Angular. Тот же DOM-контракт, что у React-адаптера, и идиоматичный Angular API.',
    installation: 'Установка',
    installLeadNpm: 'Установите ядро и Angular-адаптер через npm:',
    installLeadPnpm: 'Или через pnpm:',
    importStyles: 'Импорт стилей',
    importStylesLead:
      'Импортируйте готовый стайлшит один раз в точке входа приложения (например, styles.css):',
    importStylesNote1:
      'Все компоненты выдают CSS-переменные, которые можно переопределить в любой области (',
    importStylesNote2Theming: 'см. Темизацию',
    basicForm: 'Простая форма',
    basicFormLead:
      'Соберите standalone-компоненты — Reactive Forms работают, потому что Sg*-компоненты реализуют ControlValueAccessor где это уместно:',
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
  configProvider: {
    title: 'ConfigProvider',
    lead: 'Скоупит дефолты size / disabled / locale / bordered на всё приложение или на поддерево. В Angular это делается через DI: `provideSgConfig()` на уровне приложения либо `<sg-config-provider>` для вложенных переопределений.',
    sectionBasic: 'Базовая конфигурация',
    sectionBasicLead: 'Задайте глобальные дефолты при бутстрапе через `provideSgConfig()`:',
    sectionRuntime: 'Обновления в рантайме',
    sectionRuntimeLead:
      'Используйте `SgConfigService.update()`, чтобы менять конфигурацию в рантайме — все Sg*-компоненты подхватят изменения реактивно:',
    sectionRead: 'Чтение активного конфига',
    sectionReadLead:
      'Инжектируйте `SgConfigService`, чтобы читать или реагировать на текущую конфигурацию:',
    sectionWrapper: 'Переопределение поддерева',
    sectionWrapperLead:
      'Используйте `<sg-config-provider>` чтобы переопределить конфигурацию только для поддерева:',
    wrapperNote:
      'Совет: в Angular предпочтительнее `provideSgConfig()` на уровне route-providers, а не компонент-обёртка. Компонент существует для тестов, демо и постепенной миграции.',
  },
  guideStub: {
    seeReactDocs: 'Полный текст — в React-эталоне →',
    stylingShowcaseTitle: 'Стилизация',
    stylingShowcaseLead:
      'Галерея всех стилевых рецептов SkyGraph — палитра, семантические и компонентные токены, slot-переопределения, условные строки, тёмные scope-ы, headless-модалки. Angular-порт в работе.',
    designTokensTitle: 'Дизайн-токены',
    designTokensLead:
      'Поисковый индекс всех публичных --sg-* переменных. Angular-порт в работе — React-эталон содержит полный каталог токенов.',
    designTokensDescription:
      'Пока что токены можно посмотреть прямо в исходнике — они лежат в одном CSS-файле и не зависят от фреймворка:',
    designTokensTokensLine:
      'один CSS-файл со всеми палитрами + семантическими + компонентными токенами.',
  },
  frameworkSwitcher: {
    label: 'Фреймворк',
    comingSoonTitle: 'Скоро',
  },
}
