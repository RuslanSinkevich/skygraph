import { modalDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `modalDocEn`, no extras.
 */
export const modalDocRu: { [K in keyof typeof modalDocEn]: string } = {
  pageTitle: 'Modal',
  pageBadge: 'Обратная связь',
  crumbFeedback: 'Обратная связь',
  crumbModal: 'Modal',
  pageLead: 'Диалог с focus trap, закрытием по Escape и переоформлением через скоуп токенов.',
  pageWhen1:
    'Когда нужно завершить короткое действие, не теряя контекст (создать, подтвердить, изменить).',
  pageWhen2: 'Когда нужно показать важные детали без перехода на другую страницу.',
  pageWhen3: 'Для лёгких подтверждений — `<Popconfirm>`. Для пошаговых сценариев — `<Drawer>`.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Заголовок, body, подвал из двух кнопок.',
  demoDefaultFooterTitle: 'Дефолтный подвал (onOk)',
  demoDefaultFooterDesc:
    'Не передавайте `footer` и задайте `onOk` — SkyGraph отрисует Cancel + OK с локалью. `confirmLoading` блокирует Cancel и крутит OK.',
  demoAsyncTitle: 'Асинхронное подтверждение',
  demoAsyncDesc: 'Подвал в loading + защищённый Cancel пока выполняется задача.',
  demoWidthsTitle: 'Ширины',
  demoWidthsDesc: '`width` принимает пиксели или любую CSS-длину.',
  demoNoFooterTitle: 'Без подвала',
  demoNoFooterDesc:
    'Передайте `footer={null}`, чтобы убрать разделитель — read-only диалог только с кнопкой закрытия.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Скоуп `--sg-color-primary` + `--sg-border-radius-lg` для переоформления одного modal.',

  tableModalApi: 'API Modal',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'Modal открывает структурные отступы и цвета. Контент (Buttons, Forms) тянет свои токены.',

  propOpen: 'Управление видимостью',
  propOnClose: 'Вызывается на Escape, клик по подложке или кнопку закрытия',
  propTitle: 'Опциональный заголовок + accessible name',
  propFooter:
    'Переопределить подвал. Пропустите для дефолтных OK/Cancel при заданном `onOk`. Передайте `null` чтобы убрать подвал полностью.',
  propOnOk: 'Вызывается на дефолтный OK. Включает дефолтный подвал, если `footer` не передан.',
  propOkText: 'Подпись дефолтного OK. По умолчанию из `locale.modal.okText` → «OK».',
  propCancelText:
    'Подпись дефолтного Cancel. По умолчанию из `locale.modal.cancelText` → «Cancel».',
  propOkType: 'Визуальный тип дефолтной кнопки OK.',
  propConfirmLoading: 'Переводит OK в loading и блокирует Cancel.',
  propChildren: 'Содержимое body',
  propWidth: 'Ширина диалога (число = px или любая CSS-длина)',
  propClassName: 'Дополнительный class на корне диалога',
  propUnstyled: 'Сохранить семантику, убрать стили SkyGraph',

  cssZModal: 'Слой стекинга подложки + диалога',
  cssOverlay: 'Заливка подложки — для тёмной темы подбирается автоматически',
  cssBgElevated: 'Фон диалога',
  cssBorderSecondary: 'Разделители шапки / подвала',
  cssText: 'Цвет заголовка + body',
  cssTextTertiary: 'Цвет иконки закрытия (× )',
  cssBgHover: 'Фон иконки закрытия при наведении',
  cssRadiusLg: 'Скругление углов диалога',
  cssRadiusSm: 'Скругление hit-area иконки закрытия',
  cssShadowLg: 'Тень диалога',
  cssPaddingLg: 'Отступы шапки + body',
  cssPaddingMd: 'Вертикальные отступы подвала',
  cssPaddingSm: 'Зазор между кнопками подвала',
  cssPaddingXl: 'Просторные отступы для пустых состояний и центрированной раскладки',
  cssFontSizeLg: 'Размер шрифта заголовка',
  cssFontSizeXl: 'Размер иконки закрытия',
}
