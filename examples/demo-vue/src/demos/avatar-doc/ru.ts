import type { avatarDocEn } from './en'

/**
 * Russian copy. TypeScript enforces: every key from `avatarDocEn`, no extras.
 */
export const avatarDocRu: { [K in keyof typeof avatarDocEn]: string } = {
  pageTitle: 'Avatar',
  pageBadge: 'Отображение данных',
  crumbDataDisplay: 'Отображение данных',
  crumbAvatar: 'Аватар',
  pageLead:
    'Аватар на основе изображения, иконки или текста. Три предустановленных размера и формы circle / square. Деградирует мягко: фото → иконка → инициалы.',
  pageWhen1: 'Изображение профиля в меню или шапке.',
  pageWhen2:
    'Компактный список «кто участвует» на карточке: стек с аватарами и счётчик переполнения.',
  pageWhen3: 'Запасной чип с инициалами, когда фото нет, а имя есть.',

  demoSizesTitle: 'Размеры',
  demoSizesDesc: 'Предустановленные токены и любое значение в px.',
  demoShapesTitle: 'Формы',
  demoShapesDesc: 'Круг или скруглённый квадрат.',
  demoFallbackTitle: 'Порядок fallback',
  demoFallbackDesc: 'src → icon → children.',
  demoColoredTitle: 'Цветные инициалы',
  demoColoredDesc: 'Хэш имени → палитра, детерминированный оттенок.',
  demoGroupTitle: 'Группа аватаров',
  demoGroupDesc: 'Стек аватаров со слотом +N для переполнения.',
  demoWithBadgeTitle: 'С Badge',
  demoWithBadgeDesc: 'Оберните аватар в Badge для статуса присутствия или счётчика.',
  demoTokensTitle: 'Переопределение токенов',
  demoTokensDesc:
    'Три скоупа на токенах Avatar: зелёный бренд, тёмная поверхность и glass pick (форма + fallback-фон).',
  demoUnstyledTitle: 'Без стилей',
  demoUnstyledDesc: 'Уберите все классы sg-avatar — рисуете сами.',

  tableAvatarApi: 'API Avatar',
  tableCssVars: 'CSS-переменные',

  propSrc: 'URL изображения (фото-аватар)',
  propAlt: 'Alt-текст для изображения',
  propAriaLabel: 'Доступное имя, когда нет видимого текста',
  propSize: 'Предустановленный токен размера или явное число в px',
  propShape: 'Круг или скруглённый квадрат',
  propIcon: 'Иконка, показывается при отсутствии src (Vue: слот #icon)',
  propChildren: 'Инициалы / текстовый fallback при отсутствии src и icon (Vue: default-слот)',
  propUnstyled: 'Убрать классы sg-avatar-* (headless-режим)',

  cssHint:
    'У Avatar нет собственных токенов. Фон fallback — `--sg-color-text-disabled`, радиус для квадрата — `--sg-border-radius`, текст — `--sg-color-white`. Для разовой подмены цвета — inline `:style="{ background, color }"`.',

  cssSgColorTextDisabled: 'Фон fallback, когда нет src / icon / children',
  cssSgColorWhite: 'Цвет содержимого на тонированном фоне',
  cssSgBorderRadius: 'Скругление углов при `shape="square"`',
  cssSgColorBgContainer: 'Рекомендованный цвет границы при стекинге аватаров в группе',
}
