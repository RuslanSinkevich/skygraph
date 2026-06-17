import { switchDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `switchDocEn`, no extras.
 */
export const switchDocRu: { [K in keyof typeof switchDocEn]: string } = {
  pageTitle: 'Switch',
  pageLead:
    'Булев селектор, фиксирующий значение сразу. Сочетайте с подписью и — для медленных сетей — со состоянием `loading`.',
  pageWhen1:
    'Переключение одного состояния, которое срабатывает мгновенно (тёмная тема, уведомления, публикация).',
  pageWhen2: 'В строках настроек, где commit-on-click натуральнее, чем submit формы.',
  pageWhen3: 'Если значение отправляется позже в составе формы — берите Checkbox.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый on/off с живым выводом.',
  demoTextIconTitle: 'Текст и иконка',
  demoTextIconDesc: 'checkedChildren / unCheckedChildren рендерятся внутри трека.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'small для компактных тулбаров; default для форм.',
  demoStatesTitle: 'Состояния',
  demoStatesDesc: 'Disabled сохраняет состояние; loading блокирует взаимодействие.',
  demoAsyncTitle: 'Оптимистичный async-переключатель',
  demoAsyncDesc: 'Сначала перевернуть, показать спиннер, откатить при ошибке.',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc: "Используйте valuePropName='checked', чтобы привязать Switch к boolean-полю.",
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc: 'Оберни компонент в элемент с CSS-переменными — он перекрасится.',

  tableSwitchApi: 'API Switch',
  tableCssVars: 'CSS-переменные',

  propChecked: 'Управляемое состояние «включено»',
  propDefaultChecked: 'Начальное состояние «включено» в неуправляемом режиме',
  propOnChange: 'Срабатывает при переключении',
  propDisabled: 'Блокировать взаимодействие, оставив визуальное состояние',
  propLoading: 'Inline-спиннер и блокировка взаимодействия',
  propSize: 'Пресет размера (large сейчас рендерится как default)',
  propCheckedChildren: 'Содержимое внутри трека при on',
  propUnCheckedChildren: 'Содержимое внутри трека при off',
  propClassName: 'className обёртки',
  propStyle: 'Inline-стиль обёртки',
  propUnstyled: 'Убрать классы SkyGraph — оставить только role/aria',

  cssHint:
    'Switch использует только глобальные токены. Для ребрендинга — скоуп `--sg-color-primary` (on), `--sg-color-text-disabled` (off) и `--sg-color-white` (ручка) на родителе.',

  cssSgColorPrimary: 'Фон трека во включённом состоянии',
  cssSgColorTextDisabled: 'Фон трека в выключенном состоянии',
  cssSgColorWhite: 'Цвет ручки и внутренней подписи',
  cssSgShadowSm: 'Тень ручки',
  cssSgFontSizeSm: 'Размер шрифта внутренней подписи on/off',
  cssSgTransitionDuration: 'Длительность перехода ручки и фона',
  cssSgTransitionTiming: 'Кривая сглаживания ручки и фона',
}
