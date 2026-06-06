/**
 * Thin re-export from the shared workspace package so the React demo,
 * the Vue demo and the Angular demo all consume the same token
 * registry. The single source of truth now lives in
 * `examples/_shared/src/tokens/tokens-data.ts`.
 */
export {
  globalTokens,
  componentTokenGroups,
  categoryLabels,
  categoryOrder,
} from '@skygraph-examples/shared/tokens'
export type {
  TokenCategory,
  TokenDef,
  ComponentTokenDef,
  ComponentTokenGroup,
} from '@skygraph-examples/shared/tokens'
