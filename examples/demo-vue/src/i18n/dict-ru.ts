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
    dataEntry: 'Ввод данных',
    dataDisplay: 'Отображение данных',
    feedback: 'Обратная связь',
    navigation: 'Навигация',
    form: 'Формы',
    visualization: 'Визуализация',
  },
  header: {
    navComponents: 'Компоненты',
    navHome: 'Главная',
    themeAria: 'Переключить тему',
    languageAria: 'Сменить язык',
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
    colProperty: 'Свойство',
    colDescription: 'Описание',
    colType: 'Тип',
    colDefault: 'По умолчанию',
    requiredLabel: 'обязательно',
  },
  landing: {
    title: 'SkyGraph для Vue',
    lead:
      'Фреймворк-агностичная UI-библиотека с Vue 3 адаптером. Композаблы для форм, таблиц, деревьев и графов плюс 27 готовых компонентов.',
    statComponents: 'компонентов',
    statComposables: 'композаблов',
    statTests: 'тестов',
    ctaPrimary: 'Открыть компоненты',
    ctaSecondary: 'Исходники',
    featureReactiveTitle: 'Реактивное ядро',
    featureReactiveDesc:
      'Единый store-engine с адаптерами form / table / tree / graph. Один движок для React, Vue и Angular.',
    featureZeroRuntimeTitle: 'Zero-runtime CSS',
    featureZeroRuntimeDesc:
      'Вся стилизация в @skygraph/styles. Никакого CSS-in-JS и runtime-затрат, темизация через CSS-переменные.',
    featureA11yTitle: 'Доступность из коробки',
    featureA11yDesc:
      'Roving tabindex, list navigation, focus trap и корректная ARIA-разметка во всех примитивах.',
    featureMultiTitle: 'Тот же DOM, тот же CSS',
    featureMultiDesc:
      'Vue-компоненты выдают ровно те же .sg-* классы, что и React-адаптер — темы и шоукейсы работают везде.',
  },
}
