<script setup lang="ts">
/**
 * Guide → Core API — Wave 3.4 port of
 * `examples/demo/src/demos/CoreApiPage.tsx`.
 *
 * Documentation page for the framework-agnostic core engine. Code
 * snippets are framework-neutral — `@skygraph/core` is the same import
 * for React, Vue and Angular surfaces.
 */
import { useI18n } from '../i18n'

const { t } = useI18n()

const CREATE_CORE = `import { createCore } from '@skygraph/core'

const core = createCore()
core.set('user.name', 'Ada')
core.subscribe('user.name', (v) => console.log(v))
core.batch(() => {
  core.set('user.email', 'ada@example.com')
  core.set('user.age', 36)
})`

const ENGINES = `import {
  createCore,
  createForm,
  createTable,
  createTree,
  createGraph,
  createVirtual,
} from '@skygraph/core'

const core = createCore()
const form  = createForm(core)
const table = createTable(core)
const tree  = createTree(core)
const graph = createGraph(core)
const virtual = createVirtual({ itemSize: 32, itemCount: 1000 })`

const TYPED_CORE = `import { createCore, createTypedCore } from '@skygraph/core'

interface State {
  user: { name: string; age: number }
}
const typed = createTypedCore<State>(createCore())
typed.set('user.name', 'Ada')   // ok
typed.set('user.bogus', 'x')    // ts error`

const MIDDLEWARE = `import { createCore, loggerMiddleware, freezeMiddleware } from '@skygraph/core'

const core = createCore()
core.use(loggerMiddleware())
core.use(freezeMiddleware())`

const GRAPH = `import { createCore, createGraph } from '@skygraph/core'

const core = createCore()
const graph = createGraph(core)
const a = graph.addNode({ outline: { kind: 'rect', w: 80, h: 40 } })
const b = graph.addNode({ outline: { kind: 'rect', w: 80, h: 40 }, transform: { x: 200, y: 0 } })
graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })

graph.subscribe(() => {
  console.log('graph changed:', graph.getState())
})`
</script>

<template>
  <section class="doc-page">
    <h1>{{ t.coreApi.title }}</h1>
    <p class="doc-lead">{{ t.coreApi.lead }}</p>

    <h2 id="create-core">{{ t.coreApi.sectionStore }}</h2>
    <p>{{ t.coreApi.sectionStoreLead }}</p>
    <pre class="doc-code"><code>{{ CREATE_CORE }}</code></pre>

    <h2 id="domain-engines">{{ t.coreApi.sectionEngines }}</h2>
    <p>{{ t.coreApi.sectionEnginesLead }}</p>
    <pre class="doc-code"><code>{{ ENGINES }}</code></pre>

    <h2 id="typed-core">{{ t.coreApi.sectionTyped }}</h2>
    <p>{{ t.coreApi.sectionTypedLead }}</p>
    <pre class="doc-code"><code>{{ TYPED_CORE }}</code></pre>

    <h2 id="middleware">{{ t.coreApi.sectionMiddleware }}</h2>
    <p>{{ t.coreApi.sectionMiddlewareLead }}</p>
    <pre class="doc-code"><code>{{ MIDDLEWARE }}</code></pre>

    <h2 id="graph">{{ t.coreApi.sectionGraph }}</h2>
    <p>{{ t.coreApi.sectionGraphLead }}</p>
    <pre class="doc-code"><code>{{ GRAPH }}</code></pre>
  </section>
</template>
