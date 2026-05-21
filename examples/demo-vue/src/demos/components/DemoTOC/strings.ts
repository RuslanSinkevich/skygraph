import { useDemoStrings } from '../../../i18n'

/**
 * Local i18n for the page-level table-of-contents.
 *
 * Mirrors the React TOC's `strings.ts` byte-for-byte: keeping the panel
 * self-contained means a future demo copy/paste brings its translations
 * along, no global dict edit required.
 */
export const DEMO_TOC_STRINGS = {
  en: {
    onThisPage: 'On this page',
    backToTop: 'Back to top',
    ariaLabel: 'Page table of contents',
    editOnGitHub: 'Edit on GitHub',
  },
  ru: {
    onThisPage: 'На этой странице',
    backToTop: 'К началу',
    ariaLabel: 'Содержание страницы',
    editOnGitHub: 'Изменить на GitHub',
  },
} as const

export function useDemoTOCStrings() {
  return useDemoStrings(DEMO_TOC_STRINGS)
}
