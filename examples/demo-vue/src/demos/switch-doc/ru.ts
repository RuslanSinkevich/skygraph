import { switchDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `switchDocEn`, no extras.
 */
export const switchDocRu: { [K in keyof typeof switchDocEn]: string } = {
  pageTitle: 'Switch',
  pageBadge: 'Ввод данных',
  crumbCategory: 'Ввод данных',
  crumbSwitch: 'Switch',
  pageLead:
    'Бинарный переключатель, фиксирует значение моментально. Сочетайте с подписью и — для медленных сетей — с pending-состоянием через `disabled`.',
  pageWhen1:
    'Переключение одного состояния, действующего сразу (тёмная тема, уведомления, статус публикации).',
  pageWhen2: 'Inline в строках настроек, где commit-on-click удобнее, чем submit формы.',
  pageWhen3: 'Используйте Checkbox, если значение отправляется позже как часть формы.',

  demoBasicTitle: 'Базовый',
  demoBasicDesc: 'Управляемый on/off через v-model с живым выводом.',
  demoTextIconTitle: 'Текст и иконка',
  demoTextIconDesc: 'Слоты `#checkedChildren` / `#unCheckedChildren` рендерятся внутри трека.',
  demoSizesTitle: 'Размеры',
  demoSizesDesc: '`small` для компактных тулбаров; default для форм.',
  demoStatesTitle: 'Disabled-состояния',
  demoStatesDesc:
    '`disabled` сохраняет визуальное состояние, но блокирует клики. Vue пока не имеет loading.',
  demoAsyncTitle: 'Оптимистичный async-toggle',
  demoAsyncDesc:
    'Переключаем сразу, блокируем клики через `disabled`, показываем прогресс в боковой подписи, откатываем при ошибке.',
  demoInFormTitle: 'Внутри Form',
  demoInFormDesc:
    'Обернуть в `<SgField>` и пробросить `:model-value` / `@update:model-value` из слота.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Три скоупа на токенах Switch: зелёный бренд, тёмная поверхность и glass pick (трек в обоих состояниях).',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Только семантика — оформляете сами.',

  tableSwitchApi: 'API Switch',
  tableCssVars: 'CSS-переменные',

  propModelValue: 'Boolean через v-model',
  propChecked: 'Совместимый псевдоним `modelValue`',
  propDefaultChecked: 'Начальное состояние в неуправляемом режиме',
  propDisabled: 'Блокировать взаимодействие, сохранив визуал',
  propSize: 'Пресет размера (`large` сейчас рендерится как default)',
  propUnstyled: 'Убрать классы SkyGraph — оставить только role/aria',
  emitUpdateModelValue: 'Эмитится с новым boolean (используется `v-model`)',
  emitChange: 'Зеркало `update:modelValue`',
  slotCheckedChildren: 'Содержимое трека в положении on',
  slotUnCheckedChildren: 'Содержимое трека в положении off',

  cssHint:
    'Switch использует только глобальные токены. Для перекраски — скоуп `--sg-color-primary` (on), `--sg-color-text-disabled` (off), `--sg-color-white` (thumb) на родителе.',

  cssSgColorPrimary: 'Цвет трека в положении on',
  cssSgColorTextDisabled: 'Цвет трека в положении off',
  cssSgColorWhite: 'Цвет ползунка (thumb) и внутренней подписи',
  cssSgShadowSm: 'Тень ползунка',
  cssSgFontSizeSm: 'Размер шрифта внутренней on/off-подписи',
  cssSgTransitionDuration: 'Длительность анимации ползунка и фона',
  cssSgTransitionTiming: 'Easing анимации ползунка и фона',
}
