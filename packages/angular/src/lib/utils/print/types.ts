/**
 * Параметры печати для {@link printElement}.
 *
 * 1:1 порт `packages/react/src/utils/print/types.ts` — нужен, чтобы
 * Angular-консьюмер мог опереться на тот же контракт.
 */
export interface PrintOptions {
  /** Заголовок popup-окна (используется как имя файла в "Save as PDF"). */
  fileName?: string
  /** Ориентация страницы. @default 'portrait' */
  orientation?: 'portrait' | 'landscape'
  /** CSS-значение для `@page { size }`. @default 'A4' */
  pageSize?: 'A4' | 'A3' | 'A5' | 'Letter' | 'Legal' | string
  /** Множитель `transform: scale(...)` на корневом контейнере. @default 1 */
  scale?: number
  /** Поля страницы (`@page { margin }`). @default '1cm' */
  margins?: string
  /** Дополнительный CSS, инжектируемый поверх стилей SkyGraph. */
  customStyles?: string
  /** Не вызывать `window.print()` автоматически. @default false */
  skipPrint?: boolean
  /** Не закрывать popup после печати. @default false */
  keepOpen?: boolean
}

/**
 * Возможные значения опции `printable` на компонентах с поддержкой
 * `print()` (резерв — Wave 5+ когда Angular получит Table / Charts / Diagram).
 */
export type PrintableProp = boolean | { fileName?: string }
