import type { HubLocale } from '../types/hub'

export const hubLocaleRu: HubLocale = {
  languageSwitcher: 'Язык',
  hubTitle: 'Витрины SkyGraph',
  hubLead:
    'Мини-приложения на @skygraph/react с тестовыми данными и настоящими компонентами. Фильтр по категориям или поиск.',
  searchPlaceholder: 'Поиск по названию, описанию или тегу…',
  noMatches: 'Ничего не подошло под фильтры.',
  back: '← К списку витрин',
  shell: {
    navDocs: '← Документация',
    navShowcases: 'Витрины',
    navComponents: 'Компоненты',
    navGuide: 'Руководство',
    navBenchmarks: 'Бенчмарки',
    navRoadmap: 'Changelog',
    navAbout: 'О проекте',
    footerCopyright: '© 2026 контрибьюторы SkyGraph',
    footerShowcases: {
      title: 'Витрины',
      allDemos: 'Все демо',
      sourceOnGithub: 'Исходники на GitHub',
    },
    footerDocumentation: {
      title: 'Документация',
      demoSite: 'Сайт демо',
      components: 'Компоненты',
      guide: 'Руководство',
    },
    footerCommunity: {
      title: 'Сообщество',
      github: 'GitHub',
      issues: 'Issues',
    },
    footerProject: {
      title: 'Проект',
      changelog: 'Changelog',
      license: 'Лицензия',
    },
  },
  categories: {
    all: 'Все',
    data: 'Данные и таблицы',
    comms: 'Коммуникации',
    productivity: 'Продуктивность и админка',
    design: 'Дизайн и формы',
  },
  cards: {
    'table-kitchen-sink': {
      title: 'Таблица — полный набор',
      description:
        'Все возможности Table: сортировка, фильтры, группировка, дерево, виртуализация, drag-and-drop, инлайн-редактирование, экспорт, печать, клавиатура, агрегации, закрепление строк и другое.',
    },
    dashboard: {
      title: 'Операционный дашборд',
      description:
        'Живые KPI: сетка виджетов, drill-down таблицы и режим редактора раскладки. Тулбары на чартах, действия по виджетам, контекстное меню.',
    },
    crm: {
      title: 'CRM',
      description:
        'Таблицы контактов и сделок, канбан-воронка, дерево иерархии аккаунтов и ResourceCalendar дедлайнов с подсветкой конфликтов.',
    },
    helpdesk: {
      title: 'Хелпдеск — тикеты',
      description:
        'Очередь тикетов, сегменты по статусу, таймлайн переписки, ответы клиентов и создание тикета.',
    },
    chat: {
      title: 'Корпоративный мессенджер',
      description:
        'Каналы и ЛС, сообщения с реакциями и вложениями, поле ввода с @-упоминаниями и drawer участников.',
    },
    inbox: {
      title: 'Почтовый инбокс',
      description:
        'Поток писем с папками и метками, массовые действия, чтение треда в drawer и модалка составления.',
    },
    ecommerce: {
      title: 'Админка e-commerce',
      description:
        'Галерея товаров (сетка/список), карусель изображений, заказы, клиенты, возвраты.',
    },
    'hr-portal': {
      title: 'HR-портал',
      description:
        'Каталог сотрудников, орг-дерево, календарь отпусков, онбординг, ревью и назначение в команды.',
    },
    'file-manager': {
      title: 'Файловый менеджер',
      description:
        'Дерево каталогов, вид сетка/список, хлебные крошки, загрузка, drawer предпросмотра, модалки «поделиться» и переименования.',
    },
    admin: {
      title: 'Права и роли',
      description:
        'Пользователи, журнал аудита, перенос ролей, API-ключи, сессии и системные настройки в одной панели.',
    },
    'project-tracker': {
      title: 'Центр реагирования SOC',
      description:
        'Операционная консоль безопасности: Table инцидентов, Tree инфраструктуры, Timeline реагирования, Collapse playbooks и Drawer деталей.',
    },
    forms: {
      title: 'Песочница форм',
      description:
        'Все контролы формы: валидация, мастер, динамические массивы полей, реальные раскладки.',
    },
  },
}
