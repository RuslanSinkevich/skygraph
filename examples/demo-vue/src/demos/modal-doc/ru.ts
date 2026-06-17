import { modalDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `modalDocEn`, no extras.
 */
export const modalDocRu: { [K in keyof typeof modalDocEn]: string } = {
  pageTitle: 'Modal',
  pageBadge: 'Обратная связь',
  crumbCategory: 'Обратная связь',
  crumbModal: 'Modal',
  pageLead: 'Диалог с focus trap, закрытием по Escape и точечным переопределением токенов.',
  pageWhen1:
    'Когда пользователь должен выполнить короткое действие, не теряя контекст (создать, подтвердить, изменить).',
  pageWhen2: 'Когда нужно показать важные детали без перехода на другую страницу.',
  pageWhen3: 'Для лёгких подтверждений — <SgPopconfirm>. Для пошаговых сценариев — <SgDrawer>.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Заголовок, тело, две кнопки в футере (через слот `#footer`).',
  demoDefaultFooterTitle: 'Дефолтный футер (okHandler)',
  demoDefaultFooterDesc:
    'Передайте `okHandler` — SkyGraph сам отрендерит Cancel + OK с учётом локали. `confirmLoading` отключает Cancel и крутит OK.',
  demoAsyncTitle: 'Асинхронное подтверждение',
  demoAsyncDesc: 'Loading-футер и заблокированный Cancel пока выполняется задача.',
  demoWidthsTitle: 'Ширины',
  demoWidthsDesc: '`width` принимает пиксели или любую CSS-длину.',
  demoNoFooterTitle: 'Без футера',
  demoNoFooterDesc:
    'Установите `footer="none"`, чтобы убрать разделитель — read-only диалог только с кнопкой закрытия.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Оберни компонент в элемент с CSS-переменными `--sg-*` — всё внутри перекрашивается. Без пропсов и провайдеров.',
  tableModalApi: 'API Modal',
  tableCssVars: 'CSS-переменные',
  cssHint:
    'Modal управляет структурными отступами и цветами. Контент (Button, Form) подчиняется собственным токенам.',

  propOpen: 'Управляет видимостью',
  propTitle: 'Заголовок и accessible name',
  propFooter:
    "`'default'` (автоматический OK/Cancel при заданном `okHandler`) или `'none'` (убрать область). Кастомная разметка — через слот `#footer`.",
  propWidth: 'Ширина диалога (число = px, или любая CSS-длина)',
  propOkHandler: 'Колбэк дефолтной кнопки OK. Включает дефолтный футер.',
  propOkText: 'Подпись OK по умолчанию. Fallback — `locale.modal.okText` → "OK".',
  propCancelText: 'Подпись Cancel по умолчанию. Fallback — `locale.modal.cancelText` → "Cancel".',
  propOkType: 'Визуальный тип кнопки OK по умолчанию.',
  propConfirmLoading: 'Переводит OK в loading и отключает Cancel.',
  propUnstyled: 'Оставить семантику, убрать стили SkyGraph',
  emitClose: 'Эмитится при Escape, клике по маске или кнопке закрытия',
  emitOk: 'Эмитится при клике дефолтного OK (до вызова `okHandler`)',
  slotDefault: 'Содержимое тела',
  slotFooter: 'Кастомный футер — заменяет автоматическую пару OK/Cancel',

  cssZModal: 'Слой стека для маски и диалога',
  cssOverlay: 'Заливка backdrop — автоматически адаптируется к dark-теме',
  cssBgElevated: 'Фон диалога',
  cssBorderSecondary: 'Разделители header / footer',
  cssText: 'Текст заголовка и тела',
  cssTextTertiary: 'Иконка закрытия (× кнопка)',
  cssBgHover: 'Фон при ховере иконки закрытия',
  cssRadiusLg: 'Радиус углов диалога',
  cssRadiusSm: 'Радиус hit-area иконки закрытия',
  cssShadowLg: 'Тень диалога',
  cssPaddingLg: 'Padding header и body',
  cssPaddingMd: 'Вертикальный padding футера',
  cssPaddingSm: 'Зазор между кнопками футера',
  cssPaddingXl: 'Просторный padding для empty-state / центрированного layout',
  cssFontSizeLg: 'Размер шрифта заголовка',
  cssFontSizeXl: 'Размер шрифта иконки закрытия',
}
