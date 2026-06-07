import type { DemoDict } from './types'
import { showcasesLocaleRu } from '@skygraph-examples/shared'

export const ru: DemoDict = {
  app: {
    appTitle: 'SkyGraph',
    tagline: 'Реактивная UI-библиотека',
    heroSub:
      'Headless-ядро реактивности и множество стилизованных компонентов. TypeScript-first. Zero runtime CSS-in-JS.',
    componentsBadgeSuffix: 'Компоненты',
  },

  search: {
    placeholder: 'Поиск компонентов…',
    ariaLabel: 'Поиск компонентов',
    noMatches: 'Ничего не найдено.',
  },

  features: {
    reactiveCoreTitle: 'Реактивное ядро',
    reactiveCoreDesc: 'Точечные подписки. Батчинг обновлений. Без каскадных ререндеров.',
    componentsTitle: 'Компоненты',
    componentsDesc: 'Формы, таблицы, деревья, модалки, пикеры — готовы к продакшену.',
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
    lead: 'SkyGraph использует трёхслойную систему CSS-переменных. Переопределите любой слой, чтобы создать свою тему — без шага сборки и без рантайма JS.',
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

  designTokens: {
    title: 'Дизайн-токены',
    lead: 'Каждый визуал SkyGraph управляется CSS-переменной. Переопределите токен на `:root` для изменений на уровне всего приложения, на обёртке — для поддерева, или на одном инстансе компонента.',
    searchPlaceholder: 'Поиск токенов (например, radius, primary, shadow, table)…',
    searchAriaLabel: 'Поиск токенов',
    summaryGlobal: 'глобальных токенов',
    summaryComponentsLeft: 'компонентных токенов на',
    summaryComponentsRight: 'компонентов',
    globalHeading: 'Глобальные токены',
    globalLead: 'Семантические токены меняются с темой. Токены палитры — фиксированы.',
    perComponentHeading: 'Токены компонентов',
    perComponentLead:
      'Эти переменные объявляются конкретным компонентом — самый чистый путь перекрасить именно его.',
    overrideHeading: 'Примеры переопределений',
    overrideAppWide: 'Глобальная смена бренда:',
    overrideSubtree: 'Переопределение по поддереву (одна страница / карточка):',
    colVariable: 'Переменная',
    colDefault: 'По умолчанию',
    colDescription: 'Описание',
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
    cardComponentsDesc: 'Каталог готовых UI-компонентов',
  },

  header: {
    navComponents: 'Компоненты',
    navShowcases: 'Кейсы',
    navGuide: 'Руководство',
    navBenchmarks: 'Бенчмарки',
    navRoadmap: 'Changelog',
    navAbout: 'О проекте',
    navGithub: 'GitHub',
    burgerAria: 'Открыть навигацию',
    themeAria: 'Переключить тему',
  },

  benchmarkDetail: {
    backToAll: '← Все бенчмарки',
    tableTitle: 'Бенчмарк таблицы',
    tableSubtitle: 'SkyGraph <Table> против antd <Table virtual>',
    treeTitle: 'Бенчмарк дерева',
    treeSubtitle: 'SkyGraph <Tree> против antd <Tree height>',
    chartTitle: 'Бенчмарк графика',
    chartSubtitle: 'SkyGraph <BarChart> против recharts <BarChart>',
  },

  showcases: showcasesLocaleRu,

  footer: {
    columnDocs: 'Документация',
    columnResources: 'Ресурсы',
    columnCommunity: 'Сообщество',
    columnProject: 'Проект',
    linkGettingStarted: 'Быстрый старт',
    linkComponents: 'Компоненты',
    linkTheming: 'Темизация',
    linkCoreApi: 'API ядра',
    linkChangelog: 'Changelog',
    linkShowcases: 'Кейсы',
    linkArchitecture: 'Архитектура',
    linkContributing: 'Контрибьютинг',
    linkGithub: 'GitHub',
    linkIssues: 'Сообщить о проблеме',
    linkAbout: 'О проекте',
    linkRoadmap: 'Changelog',
    linkLicense: 'Лицензия',
    copyright: '© 2026 контрибьюторы SkyGraph',
  },

  landing: {
    heroTitle: 'Готовый набор UI для веб-приложений',
    heroSub:
      'SkyGraph — multi-framework UI-библиотека для React и Vue. Множество стилизованных компонентов, готовые приложения, светлая и тёмная темы — всё на едином ядре.',
    ctaPrimary: 'Посмотреть приложения',
    ctaSecondary: 'Открыть компоненты',
    heroImageAlt: 'Скриншот демо CRM в светлой теме',

    highlightsTitle: 'Что внутри',
    highlight1Title: 'Стилизованные компоненты',
    highlight1Desc:
      'Формы, таблицы, деревья, календари, графики, диаграммы, дашборды. Готовы к проекту.',
    highlight2Title: '12 готовых приложений',
    highlight2Desc:
      'Настоящий CRM, дашборды, орг-структура, kitchen-sink таблица — с полным исходным кодом.',
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
    showcaseOrgChartTitle: 'Организационная структура',
    showcaseOrgChartDesc:
      'Орг-схема с авто-раскладкой дерева, панорамой, зумом и сворачиванием веток.',
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
    installLead: 'Для разработчиков — три пакета, один импорт стилей.',
    installLearnMore: 'Подробнее в Getting Started →',

    footerCtaTitle: 'Хотите попробовать?',
    footerCtaBody: 'Откройте живые демо-приложения или сразу переходите в каталог компонентов.',
    footerCtaButton: 'Посмотреть приложения',
    footerDevHint: 'Для разработчиков: Getting Started · Архитектура · Лицензия (MIT)',
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
      'React — hooks, ConfigProvider, множество стилизованных компонентов на том же общем ядре.',
    multiFrameworkVue:
      'Vue 3 — Composition API, множество стилизованных компонентов — то же ядро, те же `.sg-*` классы.',
  },

  benchmarks: {
    pageTitle: 'Бенчмарки рантайма SkyGraph',
    pageLead1:
      'Попарное сравнение с распространёнными React-библиотеками на тех же данных и во вкладке браузера. Без микробенчмарков: в каждом тесте монтируется реальное дерево компонентов, замер через',
    pageLead2: '+',
    pageLead3: ', медиана нескольких прогонов после отброшенного разогрева.',
    disclaimerHonestTitle: 'Честная подача.',
    disclaimerHonestBody:
      'Если SkyGraph медленнее — в таблице именно это. Методику не подкручиваем ради победы.',
    disclaimerBrowserTitle: 'Только браузер.',
    disclaimerBrowserBody: 'Δ heap показываем только если доступен performance.memory (Chromium).',
    disclaimerTriggerTitle: 'Только по кнопке.',
    disclaimerTriggerBeforeRun: 'Бенчмарки не стартуют сами. На каждой вкладке нажмите кнопку «',
    disclaimerTriggerAfterRun: '».',
    runWord: 'Запуск',
    tabTableLabel: 'Таблица · 100k строк',
    tabTableSubtitle: 'Монтирование + FPS скролла + Δ heap',
    tabTableVs: 'против antd <Table virtual>',
    tabFormLabel: 'Форма · 100 полей',
    tabFormSubtitle: 'Монтирование + смена значения + байты submit',
    tabFormVs: 'против react-hook-form + обычные <input>',
    tabChartLabel: 'LineChart · 1k×60',
    tabChartSubtitle: 'Медиана кадра + средний FPS',
    tabChartVs: 'против recharts <LineChart>',
    howToReadTitle: 'Как читать цифры',
    howToRead1Strong: 'Медиана, не среднее.',
    howToRead1Rest: 'GC и простои main thread дают выбросы. Для UX важна медиана N прогонов.',
    howToRead2Strong: 'Один набор данных, один DOM-хост.',
    howToRead2Rest:
      'Каждый вариант рендерится в отсоединённый корень; между прогонами размонтируем, чтобы отпустить узлы.',
    howToRead3Strong: 'Один поток.',
    howToRead3Rest: 'Без Web Workers и RSC. Обе библиотеки — как в обычном приложении.',
    howToRead4Strong: 'Монтирование через ',
    howToRead4BeforeCode: '.',
    howToRead4AfterCode:
      ' Оба варианта коммитят синхронно — в замере реальная вёрстка, а не отложенное расписание React 19.',
    run: 'Запуск',
    stop: 'Стоп',
    runningEllipsis: 'Выполняется…',
    done: 'Готово',
    stopped: 'Остановлено',
    warmingUp: 'Разогрев…',
    generatingDataset: 'Генерация набора данных…',
    runningWithLabel: 'Запуск: {label}…',
    errorWithMessage: 'Ошибка: {message}',
    pressRunEmpty: 'Нажмите «Запуск», чтобы получить цифры.',
    variantColumn: 'Вариант',
    methodStrong: 'Метод.',
    livePreview: 'Живой превью',
    livePreviewFields: 'Живой превью ({count} полей)',
    rows: 'Строк',
    library: 'Библиотека',
    tick: 'Тик',
    heapNa: 'н/д',
    colMedianMount: 'Медиана монтирования',
    colScrollFps: 'FPS скролла',
    colHeapDelta: 'Heap Δ',
    colMinMount: 'Мин. монтирование',
    colMaxMount: 'Макс. монтирование',
    colMedianFrame: 'Медиана кадра',
    colAvgFps: 'Средний FPS',
    colMount: 'Монтирование',
    colMinFrame: 'Мин. кадр',
    colMaxFrame: 'Макс. кадр',
    colPerChange: 'На изменение',
    colSubmitBytes: 'Байт submit',
    labelSkyTable: 'SkyGraph <Table> (React)',
    labelSkyVueTable: 'SkyGraph <SgTable> (Vue)',
    labelAntdTable: 'antd <Table virtual>',
    labelSkyForm: 'SkyGraph <Form> + <Field>',
    labelRhfForm: 'react-hook-form + обычный <input>',
    labelSkyChart: 'SkyGraph <LineChart>',
    labelRechartsChart: 'recharts <LineChart>',
    tableRunIdle: 'Запуск · {rows} × 4',
    formRunIdle: 'Запуск · {fields} × 6',
    chartRunIdle: 'Запуск · {points} × {updates} × 4',
    tableMethod:
      '{rows} строк, 7 колонок, виртуализированный контейнер 480px по высоте. Вариант монтируется в отсоединённый хост одним flushSync; время монтирования — до двух кадров отрисовки. Затем скроллер крутится {frames} кадров по {pxPerFrame}px/кадр, из среднего времени кадра считается FPS. Разогрев отбрасываем, в таблице медиана 3 замеров. Δ heap только в Chromium, где есть performance.memory.',
    formMethod:
      '{fields} текстовых полей монтируются одним flushSync; время до двух кадров. Потом меняем {changes} полей через API библиотеки (FormEngine.setValue / react-hook-form setValue) и усредняем время на изменение. Submit bytes — размер JSON.stringify(values). Разогрев отбрасываем; медиана 5 прогонов.',
    chartMethod:
      'Линейный график с двумя сериями по {points} точек монтируется, затем {updates} раз перерисовывается новыми данными через flushSync. Усредняем время кадра на обновлениях и переводим в FPS. Анимации выключены, маркеры точек выключены — только layout путей и согласование. Разогрев отбрасываем; медиана 3 прогонов.',
    fieldLabel: 'Подпись {n}',
    fieldPlaceholder: 'Подсказка {n}',
    employeePrefix: 'Сотрудник ',
    colId: 'ID',
    colName: 'Имя',
    colDepartment: 'Отдел',
    colRole: 'Роль',
    colSalary: 'Оклад',
    colStatus: 'Статус',
    colHired: 'Найм',
    chartVisits: 'Визиты',
    chartOrders: 'Заказы',
    previewSkyReact: 'SkyGraph (React)',
    previewSkyVue: 'SkyGraph (Vue)',
    previewAntdBrand: 'antd',
  },
}
