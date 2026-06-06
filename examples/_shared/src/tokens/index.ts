/**
 * Registry of SkyGraph CSS custom properties — exposed via the shared
 * package so React, Vue and Angular demos can render the same
 * `#/guide/design-tokens` page from one source of truth.
 *
 * History: this data used to live in `examples/demo/src/tokens/`. It
 * was lifted into `_shared` when the Vue and Angular guide pages were
 * promoted from "see the React docs" stubs to real searchable indices.
 */
export { globalTokens, componentTokenGroups, categoryLabels, categoryOrder } from './tokens-data'
export type { TokenCategory, TokenDef, ComponentTokenDef, ComponentTokenGroup } from './tokens-data'
