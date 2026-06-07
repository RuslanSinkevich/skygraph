import { uploadDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `uploadDocEn`, no extras.
 */
export const uploadDocRu: { [K in keyof typeof uploadDocEn]: string } = {
  pageTitle: 'Upload',
  pageLead:
    'Скрытый нативный file input со сменным триггером и опциональным контролируемым списком файлов. Без сетевого слоя — транспорт ваш.',
  pageWhen1: 'Когда нужен выбор файлов внутри формы; парьте со своей логикой загрузки/прогресса.',
  pageWhen2: 'Когда встроенного списка (uploading / done / error) хватает для UX-фидбека.',
  pageWhen3: 'Когда нужен брендовый триггер — Upload принимает любой ReactNode как children.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Имитация загрузки с переходом uploading → done.',
  demoMultipleTitle: 'Несколько файлов',
  demoMultipleDesc: 'Выбор нескольких файлов сразу, лимит через maxCount.',
  demoAcceptTitle: 'Фильтр accept',
  demoAcceptDesc: 'Ограничить нативный picker конкретными MIME-типами или расширениями.',
  demoCustomTriggerTitle: 'Кастомный триггер',
  demoCustomTriggerDesc: 'Замените дефолтную кнопку на брендовую карточку или drop zone.',
  demoWithProgressTitle: 'С progress bar',
  demoWithProgressDesc: 'Показ Progress параллельно со встроенными точками.',
  demoErrorStateTitle: 'Состояние ошибки',
  demoErrorStateDesc: 'Неуспешные строки получают error-тему и кнопку удаления.',
  demoDisabledTitle: 'Отключено / loading',
  demoDisabledDesc: 'Заблокировать триггер или подменить на loading-состояние.',
  demoTokensOverrideTitle: 'Переопределение токенов',
  demoTokensOverrideDesc: 'Скоуп глобальных токенов на обёртке для переоформления списка.',

  tableUploadApi: 'API Upload',
  tableUploadFile: 'UploadFile',
  tableCssVars: 'CSS-переменные',

  propAccept: 'Передаётся в скрытый <input type="file" accept>',
  propMultiple: 'Разрешить выбор нескольких файлов за диалог',
  propFileList: 'Контролируемый список файлов под триггером',
  propMaxCount: 'Сколько новых файлов пропускать в onUpload',
  propOnUpload: 'Вызывается с нативными File после выбора в picker',
  propOnRemove: 'Вызывается при клике × у элемента списка',
  propDisabled: 'Полностью заблокировать триггер',
  propLoading: 'Отрисовать дефолтный триггер в состоянии загрузки',
  propChildren: 'Кастомный триггер (по умолчанию primary-кнопка «Upload»)',
  propClassName: 'className корневой обёртки',
  propStyle: 'Inline-стиль корневой обёртки',
  propUnstyled: 'Убрать классы SkyGraph — оставить только семантику',

  fileUid: 'Стабильный уникальный id (для key + callbacks удаления)',
  fileName: 'Отображаемое имя файла',
  fileSize: 'Размер файла в байтах',
  fileStatus: 'Вариант статуса строки',

  cssHint:
    'У Upload нет собственных --sg-upload-* токенов — он полностью управляется глобальной палитрой/spacing. Переопределяйте их на обёртке для перекраски одного экземпляра.',

  cssSgColorBorderSecondary: 'Граница строки файла',
  cssSgColorText: 'Цвет имени файла (done/uploading)',
  cssSgColorTextTertiary: 'Цвет кнопки удаления (×)',
  cssSgColorError: 'Граница строки ошибки, текст и hover-состояние ×',
  cssSgBorderRadiusSm: 'Радиус строки файла',
  cssSgFontSize: 'Размер шрифта кнопки удаления',
  cssSgFontSizeSm: 'Размер шрифта имени файла',
  cssSgMarginSm: 'Зазор между триггером и списком',
  cssSgMarginXs: 'Зазор между строками списка',
  cssSgPaddingXs: 'Вертикальные отступы строки + внутренний зазор',
  cssSgPaddingSm: 'Горизонтальные отступы строки',
  cssSgSpinColor: 'Цвет инлайн-спиннера загрузки',
}
