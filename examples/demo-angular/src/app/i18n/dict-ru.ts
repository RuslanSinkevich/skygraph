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
    statComponents: 'стилизованных UI-компонентов',
    statComponentsValue: 'Много',
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
      'SkyGraph — TypeScript-first реактивная UI-библиотека: path-based ядро, шесть предметных движков и множество стилизованных компонентов на чистых CSS-переменных без рантайма.',
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
    skycodeTag: 'IDE',
    gitborTitle: 'GitBor',
    gitborDesc:
      'Кроссплатформенный десктопный Git-клиент на Electron — визуальный граф коммитов, интерактивный rebase, защита данных.',
    gitborTag: 'Git-клиент',
    skygraphTitle: 'SkyGraph',
    skygraphDesc: 'Эта библиотека — multi-framework UI на общем headless-ядре.',
    skygraphTag: 'UI-библиотека — вы здесь',
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
    cardComponentsDesc: 'Готовые компоненты: Button, Input, Table, Tree и многое другое.',
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
    lead: 'Чистый TypeScript-рантайм, на котором стоят все компоненты SkyGraph. В 95% случаев напрямую к нему обращаться не нужно — но если нужно (общее состояние между фреймворками, свои движки, код вне компонентов) — это та самая поверхность API.',
    whyTitle: 'Зачем нужно отдельное ядро',
    whyP1:
      'Большинство UI-библиотек намертво прибивают state к одному фреймворку. SkyGraph делает наоборот: реактивный store, движки форм, таблиц, графов — никто из них не импортирует React, Vue или Angular. Это просто TypeScript-классы.',
    whyP2:
      'Именно поэтому одинаковые компоненты ведут себя идентично во всех трёх фреймворках, а SSR, воркеры и тесты могут пользоваться теми же движками без затаскивания UI-фреймворка.',
    mentalTitle: 'Ментальная модель — три слоя',
    mentalP1:
      'Всё в SkyGraph построено на трёх слоях. На любом из них можно остановиться, если этого хватает.',
    mentalLayer1:
      'Store — единый реактивный key/value по строковым путям (`user.name`, `form.fields.email`).',
    mentalLayer2:
      'Предметные движки — внешние API для конкретной задачи (Form / Table / Tree / Virtual / Graph), каждый живёт в своём namespace в Store.',
    mentalLayer3:
      'Биндинги фреймворков — `@skygraph/react`, `@skygraph/vue`, `@skygraph/angular` превращают обновления Store в нативный re-render.',
    sectionStore: 'Store — реактивный key/value по путям',
    sectionStoreLead:
      'Нижний слой. Одно централизованное дерево состояния, точечные подписки по конкретному пути, транзакционные коммиты, батч-уведомления и computed с детектом циклов.',
    sectionStoreP2:
      '`set` пишет по пути, `subscribe` слушает ровно один путь (никаких лишних рендеров), `batch` собирает несколько записей в одно уведомление — удобно когда меняешь сразу пачку связанных полей.',
    sectionEngines: 'Предметные движки — Form, Table, Tree, Virtual, Graph',
    sectionEnginesLead:
      'Пять высокоуровневых движков поверх Store. Каждый владеет namespace `$<name>.` и даёт сфокусированный API. Бери их, когда ручные `get` / `set` означали бы заново написать валидацию формы или виртуализацию.',
    engineFormLabel: 'FormEngine',
    engineFormDesc:
      'Реестр полей, асинхронная валидация, отслеживание dirty / touched, submit-pipeline.',
    engineTableLabel: 'TableEngine',
    engineTableDesc:
      'Сортировка, фильтрация, пагинация, выбор строк, ресайз колонок — для любой формы данных.',
    engineTreeLabel: 'TreeEngine',
    engineTreeDesc: 'Иерархический выбор, expand / collapse, ленивая загрузка детей.',
    engineVirtualLabel: 'VirtualEngine',
    engineVirtualDesc:
      'Окно с фиксированной / переменной высотой для списков и таблиц на тысячи строк.',
    engineGraphLabel: 'GraphEngine',
    engineGraphDesc: 'Узлы, рёбра и якоря для диаграмм и node-based редакторов.',
    sectionTyped: 'TypedCore — типобезопасные пути',
    sectionTypedLead:
      'Оберни runtime Core в generic `TypedCore<T>` — и компилятор будет автокомплитить каждый путь и валить опечатки. Без рантайм-нагрузки.',
    sectionTypedP2:
      'Имеет смысл, когда store вырастает за пределы пары путей или когда над ним работает команда. И записи, и `subscribe` становятся проверяемыми типами.',
    sectionMiddleware: 'Pipeline middleware',
    sectionMiddlewareLead:
      'Сквозная логика — логирование, freeze, персистентность, валидация — подключается между записями и уведомлениями. Порядок задаётся явно, свои middleware пишутся за минуту.',
    sectionMiddlewareP2:
      'Готовые средства в комплекте: `loggerMiddleware()` пишет лог каждой записи, `freezeMiddleware()` делает state read-only в dev, persistence и validation лежат рядом.',
    sectionGraph: 'GraphEngine — диаграммы подробнее',
    sectionGraphLead:
      'Самодостаточный движок для диаграмм и node-редакторов: узлы с outline / transform / parent / anchorPolicy, рёбра со стабильными anchor ID, инкрементальные кэши якорей и AABB.',
    sectionGraphP2:
      'Подпишись один раз — получишь snapshot при любом изменении графа. Именно этот snapshot потребляют React / Vue / Angular Graph-компоненты.',
    whenTitle: 'Когда лезть в Core напрямую',
    when1:
      'Нужно общее состояние между фреймворками (React-островок в Vue-хосте или Angular-shell с React-виджетами).',
    when2: 'Движок нужен в воркере, в тестах или на сервере — там UI-фреймворк избыточен.',
    when3:
      'Пишешь свой компонент SkyGraph и хочешь, чтобы он играл с `subscribe` / `batch` / TypedCore.',
    when4:
      'Нужен централизованный audit trail, слой персистентности или freeze в dev — middleware-pipeline это и есть нужный хук.',
    nextTitle: 'Куда идти дальше',
    nextLead:
      'Большинство приложений напрямую к Core не обращаются — берут компоненты `@skygraph/react`, `@skygraph/vue` или `@skygraph/angular`, которые уже умеют с ним разговаривать. За биндингами — в «Быстрый старт»; за рантайм-конфигурацией (size / locale / direction) — в «ConfigProvider»; за темизацией — в «Дизайн-токены» и «Стилизацию».',
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
    bannerTitle: '⛔ ЗАГЛУШКА — НЕ ТРОГАТЬ ЭТУ СТРАНИЦУ',
    bannerBody:
      'Это намеренная заглушка Angular: пункт меню есть, контента здесь нет. Полная версия — в React- и Vue-демо. Не портируйте, не рефакторите и не «доделывайте» этот файл без явной задачи.',
    seeReactDocs: 'Полный текст — в React-эталоне →',
    stylingShowcaseTitle: 'Стилизация',
    stylingShowcaseLead:
      'Только заглушка. Палитра, семантика, бренд, тёмная тема — смотрите React- или Vue-демо.',
    designTokensTitle: 'Дизайн-токены',
    designTokensLead:
      'Только заглушка. Поисковый индекс токенов — в React/Vue; ниже ссылка на CSS как запасной вариант.',
    designTokensDescription:
      'Токены в одном CSS-файле (без привязки к фреймворку). Angular-страница намеренно не дублирует explorer.',
    designTokensTokensLine:
      'один CSS-файл со всеми палитрами + семантическими + компонентными токенами.',
  },

  designTokens: {
    title: 'Дизайн-токены',
    lead: 'Поисковый индекс всех публичных --sg-* переменных. Токены — это контракт темизации: переопределите одну переменную в :root, на враппере или на отдельном компоненте — и UI перекрасится без правок в коде компонентов.',
    searchPlaceholder: 'Поиск по имени, значению или описанию…',
    searchAriaLabel: 'Поиск дизайн-токенов',
    summaryGlobal: 'глобальных токенов',
    summaryComponentsLeft: 'компонентных переменных в',
    summaryComponentsRight: 'группах',
    globalHeading: 'Глобальные токены',
    globalLead:
      'Палитра, семантические цвета, типографика и размеры. Переопределите на :root — поменяете весь интерфейс.',
    perComponentHeading: 'Компонентные токены',
    perComponentLead:
      'Локальные переменные каждого компонента — точечные настройки без правок CSS. Группируются по компоненту.',
    overrideHeading: 'Как переопределять',
    overrideAppWide: 'Глобально на :root — действует на всё приложение:',
    overrideSubtree: 'Локально на поддереве через style — действует только на ветку DOM:',
    colVariable: 'Переменная',
    colDefault: 'По умолчанию',
    colDescription: 'Описание',
  },

  stylingShowcase: {
    pageTitle: 'Стилизация',
    pageLead:
      'Галерея стилевых рецептов SkyGraph: палитра, семантические токены, scope-овая брендовая тема, тёмный scope, компонентные токены. Все примеры используют только CSS-переменные — никакого runtime CSS-in-JS.',
    when1: 'Нужно перекрасить весь UI под брендовые цвета — переопределите семантические токены.',
    when2: 'Нужна тёмная тема на части страницы — поставьте data-sg-theme="dark" на враппер.',
    when3:
      'Нужно подкрутить один компонент — используйте компонентные токены (--sg-btn-*, --sg-input-*, …).',
    swatchSemanticBadge: 'тема',
    recipePaletteTitle: 'Палитра',
    recipePaletteDesc:
      'Стабильные шкалы цветов 1–10 для blue / gray / red / green / orange. На них опираются все семантические токены.',
    recipeSemanticTitle: 'Семантические токены',
    recipeSemanticDesc:
      'Поверхности, текст, бренд, состояния success / error / warning. Переключаются вместе с data-sg-theme="dark|light".',
    recipeScopedBrandTitle: 'Брендовый scope',
    recipeScopedBrandDesc:
      'Переопределите --sg-color-primary и --sg-border-radius на враппере — компоненты внутри перекрасятся без правок.',
    recipeScopedBrandHeading: 'Розовый бренд + скруглённые углы',
    recipeDarkTitle: 'Тёмный scope',
    recipeDarkDesc:
      'Один атрибут data-sg-theme="dark" — и все вложенные компоненты переключаются на тёмную палитру.',
    recipeBtnTokensTitle: 'Компонентные токены — Button',
    recipeBtnTokensDesc:
      'Скрутите --sg-btn-radius / --sg-btn-height / --sg-btn-padding на враппере — получите pill-кнопки. Только для скоупа.',
    recipeInputTokensTitle: 'Компонентные токены — Input',
    recipeInputTokensDesc:
      '--sg-input-height и --sg-input-radius меняют форму инпутов локально. Select подхватит те же токены.',
  },
  frameworkSwitcher: {
    label: 'Фреймворк',
    comingSoonTitle: 'Скоро',
  },
}
