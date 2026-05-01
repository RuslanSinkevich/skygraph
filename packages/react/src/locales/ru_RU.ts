import type { SgLocale } from '../types/locale'

/**
 * Russian (RU) locale preset for {@link ConfigProvider}.
 */
export const ru_RU: SgLocale = {
  empty: {
    description: 'Нет данных',
  },
  pagination: {
    totalPrefix: 'Всего',
    itemsPerPage: '/ стр.',
    jump: 'Перейти',
    page: 'стр.',
  },
  popconfirm: {
    okText: 'Да',
    cancelText: 'Нет',
  },
  modal: {
    okText: 'OK',
    cancelText: 'Отмена',
  },
  form: {
    required: '*',
    optional: '(необязательно)',
    submitText: 'Отправить',
    resetText: 'Сбросить',
  },
  upload: {
    uploadText: 'Загрузить',
    removeFile: 'Удалить файл',
    uploadError: 'Ошибка загрузки',
    previewFile: 'Просмотр',
  },
  transfer: {
    titles: ['Источник', 'Цель'],
    searchPlaceholder: 'Поиск',
    itemUnit: 'элемент',
    itemsUnit: 'элементов',
    notFoundContent: 'Ничего не найдено',
    selectAll: 'Выбрать все',
    deselectAll: 'Снять выделение',
  },
  calendar: {
    monthNames: [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ],
    dayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня',
    now: 'Сейчас',
    week: 'Нед',
  },
}
