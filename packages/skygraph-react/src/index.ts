// Side-effect import: pulls the shared CSS into the consumer's bundle so
// `npm install skygraph-react` is the only step required to render styled
// components. Re-exports below mirror the entire public API of
// `@skygraph/react`, so existing imports from `@skygraph/react` keep
// working unchanged.
import '@skygraph/styles'

export * from '@skygraph/react'
