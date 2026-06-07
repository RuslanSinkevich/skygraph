/**
 * Hub strings for SkyGraph showcases (standalone app + embedded in React demo).
 * Tags stay English — they are technical keywords.
 *
 * The `apps` sub-tree carries the in-app strings for every showcase. Only
 * `en` and `ru` are required (T-Showcases-I18n scope; zh/de/fr/es belong to
 * the SgLocale namespace owned by T-Docs-Locales).
 *
 * Public surface (preserved bit-for-bit from the previous monolithic
 * `showcasesLocale.ts`): `ShowcasesLocale`, `ShowcaseCategoryKey`,
 * `showcasesLocaleEn`, `showcasesLocaleRu`. Per-app locales and per-app
 * dictionaries live in `./types/*` and `./apps/*` and are not re-exported
 * from the package root.
 */
export type { ShowcasesLocale, ShowcaseCategoryKey } from './types'
export { showcasesLocaleEn } from './en'
export { showcasesLocaleRu } from './ru'
