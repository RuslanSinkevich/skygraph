/// <reference types="vite/client" />

/**
 * Build-time constants injected by `vite.config.ts` via `define`.
 *
 * `__SKYGRAPH_REACT_VERSION__` is read once at config evaluation from
 * `packages/skygraph-react/package.json` so the footer cannot drift from
 * the version that consumers would actually `npm install`.
 */
declare const __SKYGRAPH_REACT_VERSION__: string
