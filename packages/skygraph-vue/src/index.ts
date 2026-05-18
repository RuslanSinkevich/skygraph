// Side-effect import: pulls the shared CSS into the consumer's bundle so
// `npm install skygraph-vue` is the only step required to render styled
// components. Re-exports below mirror the entire public API of
// `@skygraph/vue`, so existing imports from `@skygraph/vue` keep working
// unchanged.
import '@skygraph/styles'

export * from '@skygraph/vue'
