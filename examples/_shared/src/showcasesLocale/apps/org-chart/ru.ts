import type { OrgChartLocale } from '../../types/org-chart'

export const orgChartLocaleRu: OrgChartLocale = {
  sidebar: {
    title: 'Структура',
    hint: 'Прокрутка — панорама, Ctrl + прокрутка — зум. Клик по карточке — детали, бейдж — свернуть ветку.',
    legendTitle: 'Отделы',
    statsTitle: 'Статистика',
    peopleLabel: 'сотрудников',
    visibleLabel: 'видимо',
    depthLabel: 'уровней',
  },
  dept: {
    exec: 'Руководство',
    eng: 'Инженеры',
    product: 'Продукт',
    design: 'Дизайн',
    sales: 'Продажи',
    marketing: 'Маркетинг',
  },
  toolbar: {
    expandAll: 'Развернуть всё',
    collapseAll: 'Свернуть всё',
    hint: 'Авто-раскладка орг-структуры · GraphEngine',
  },
  reportsBadge: (n) => `+${n}`,
  inspector: {
    title: 'Детали',
    empty: 'Выберите сотрудника на схеме',
    role: 'Должность',
    department: 'Отдел',
    manager: 'Руководитель',
    noManager: '— (вершина)',
    directReports: 'Прямые подчинённые',
    totalReports: 'Всего в команде',
    email: 'Почта',
    focus: 'Свернуть/развернуть',
  },
  toasts: {
    expandedAll: 'Развёрнута вся структура',
    collapsedAll: 'Свёрнуто до верхнего уровня',
    expanded: (name) => `Развёрнута команда: ${name}`,
    collapsed: (name) => `Свёрнута команда: ${name}`,
  },
}
