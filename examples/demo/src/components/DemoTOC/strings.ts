import { useDemoStrings } from '../../i18n'

/**
 * Local i18n for the page-level table-of-contents.
 *
 * Lives next to the panel rather than in the global DemoDict because the
 * TOC is opt-in (only mounted on /components/* pages) and we want to
 * keep it self-contained — copying the folder into another demo brings
 * its translations along, no global dict edit required.
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
