import type { textareaDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `textareaDocEn`, no extras.
 */
export const textareaDocRu: { [K in keyof typeof textareaDocEn]: string } = {
  pageTitle: 'Textarea',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbTextarea: 'Textarea',
  pageLead: 'Многострочное поле с rows, maxLength и счётчиком символов.',
  pageWhen1: 'Длинный текст — комментарии, заметки, описания.',
  pageWhen2: 'Когда нужен жёсткий лимит длины и видимый счётчик.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Двусторонний биндинг через v-model.',
  demoRowsTitle: 'Строки',
  demoRowsDesc: 'Количество видимых строк.',
  demoCountTitle: 'Со счётчиком',
  demoCountDesc: 'maxLength + showCount показывают живой счётчик символов.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Три размера.',

  tableTextareaApi: 'API Textarea',

  propModelValue: 'Значение для v-model',
  propValue: 'Алиас для `modelValue`',
  propDefaultValue: 'Начальное значение в неуправляемом режиме',
  propPlaceholder: 'Placeholder при пустом значении',
  propRows: 'Количество видимых строк',
  propMaxLength: 'Жёсткий лимит символов (применяется)',
  propShowCount: 'Показать счётчик `length / maxLength` под полем',
  propSize: 'Пресет размера',
  propDisabled: 'Блокировать взаимодействие',
  propUnstyled: 'Убрать классы SkyGraph (headless-режим)',
  emitUpdateModelValue: 'Срабатывает с новой строкой на каждое нажатие',
  emitChange: 'Дубликат `update:modelValue`',
  emitFocus: 'Срабатывает при получении фокуса',
  emitBlur: 'Срабатывает при потере фокуса',
}
