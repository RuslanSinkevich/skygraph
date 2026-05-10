import { uploadDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `uploadDocEn`, no extras.
 */
export const uploadDocRu: { [K in keyof typeof uploadDocEn]: string } = {
  pageTitle: 'Upload',
  pageBadge: 'data-entry',
  crumbCategory: 'Data Entry',
  crumbUpload: 'Upload',

  pageLead:
    'Скрытый нативный file-input со swappable-триггером, drag-режимом и управляемым списком. Сетевой слой — за вами через `custom-request`.',
  pageWhen1:
    'Когда нужен выбор файлов в форме; пайплайн загрузки/прогресса прокидываете через `custom-request`.',
  pageWhen2:
    'Когда встроенного списка (uploading / done / error / `percent`) хватает для UX-обратки.',
  pageWhen3: 'Когда нужен брендированный триггер — `SgUpload` принимает любой элемент через дефолтный slot.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc:
    'Симуляция загрузки `uploading → done` через `custom-request`.',
  demoMultipleTitle: 'Multiple',
  demoMultipleDesc: 'Можно выбрать несколько файлов, лимит через `max-count`.',
  demoAcceptTitle: 'Фильтр accept',
  demoAcceptDesc:
    'Ограничиваем нативный picker по MIME-типам или расширениям.',
  demoCustomTriggerTitle: 'Свой триггер',
  demoCustomTriggerDesc:
    'Дефолтный slot заменяет кнопку — брендированная карточка, dashed-плитка и т.п.',
  demoWithProgressTitle: 'С прогресс-баром',
  demoWithProgressDesc:
    'Используем `custom-request` + `percent` на каждом файле, чтобы запитать внешний `SgProgress`.',
  demoErrorStateTitle: 'Состояние ошибки',
  demoErrorStateDesc:
    'Failed-строки красятся в error-тему и получают кнопку remove; uploading-строки показывают inline `percent`.',
  demoDisabledTitle: 'Disabled',
  demoDisabledDesc:
    'Полностью блокирует триггер. В Vue нет `loading`-prop — React-вариант со спиннером дропнут.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc: 'Скоуп глобальных токенов на обёртке для перекраски списка.',
  demoUnstyledTitle: 'Unstyled',
  demoUnstyledDesc: 'Только семантика — рисуйте своим CSS.',

  tableUploadApi: 'API Upload',
  tableUploadFile: 'UploadFile',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Привязка списка через v-model (Vue-идиома)',
  propFileList: 'Совместимый алиас для `modelValue`',
  propDefaultFileList: 'Начальный список в неуправляемом режиме',
  propAccept: 'Прокидывается в скрытый `<input type="file" accept>`',
  propMultiple: 'Множественный выбор за один dialog',
  propDrag: 'Drop-зона вместо кнопки-триггера',
  propListType: 'Layout для отображения списка',
  propShowUploadList: 'Показывать встроенный список',
  propMaxCount: 'Лимит общей длины списка после multiple-pick',
  propMaxSize: 'Скипать файлы крупнее N байт',
  propBeforeUpload:
    'Pre-upload хук (вернуть `false` / `Promise<false>`, чтобы пропустить файл)',
  propCustomRequest:
    'Свой транспорт — `{ file, onProgress, onSuccess, onError }`',
  propDisabled: 'Полностью блокирует триггер',
  propUnstyled: 'Снять SkyGraph-обёртку — только семантика',
  emitUpdateModelValue:
    'Срабатывает при любом изменении списка (v-model)',
  emitChange: 'Зеркало `update:modelValue` — на каждое изменение списка',
  emitRemove: 'Срабатывает при клике × на строке',

  fileUid: 'Стабильный уникальный id (для v-for ключей и remove-колбэков)',
  fileName: 'Имя файла для отображения',
  fileSize: 'Размер файла в байтах',
  fileStatus: 'Вариант статуса строки',
  filePercent: 'Прогресс 0-100 — рендерится inline рядом с именем',
  fileType: 'MIME-тип, прокинутый из выбранного `File`',
  fileUrl: 'Опциональный preview-URL (для layouts `picture` / `picture-card`)',
  fileError: 'Свободные данные ошибки при `status === "error"`',
  fileRaw: 'Оригинальная ссылка на `File` (для `custom-request`)',

  cssHint:
    'У Upload нет `--sg-upload-*` токенов — он полностью управляется глобальной палитрой и spacing-ом. Переопределяйте их на обёртке для перекраски экземпляра.',

  cssSgColorBorderSecondary: 'Граница строки файла',
  cssSgColorText: 'Цвет имени файла (done/uploading)',
  cssSgColorTextTertiary: 'Цвет кнопки remove (×)',
  cssSgColorError: 'Граница error-строки, цвет текста и hover у ×',
  cssSgBorderRadiusSm: 'Радиус строки файла',
  cssSgFontSize: 'Размер шрифта кнопки remove',
  cssSgFontSizeSm: 'Размер шрифта имени файла',
  cssSgMarginSm: 'Зазор между триггером и списком',
  cssSgMarginXs: 'Зазор между строками списка',
  cssSgPaddingXs: 'Вертикальный padding строки + внутренний gap',
  cssSgPaddingSm: 'Горизонтальный padding строки',
}
