<script setup lang="ts">
/**
 * Guide → Core API (`/guide/core-api`) — Vue port.
 *
 * Reworked: previously this was a wall of code snippets with one-line
 * leads. The new structure frames Core as "the runtime under every
 * framework binding", explains why it exists, walks through the
 * three-layer mental model, then dives into each layer with prose +
 * a focused code example.
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
const form    = createForm(core)
const table   = createTable(core)
const tree    = createTree(core)
const graph   = createGraph(core)
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
const b = graph.addNode({
  outline: { kind: 'rect', w: 80, h: 40 },
  transform: { x: 200, y: 0 },
})
graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })

graph.subscribe(() => {
  console.log('graph changed:', graph.getState())
})`
</script>

<template>
  <section class="doc-page">
    <header class="doc-header">
      <h1 class="doc-component-title">{{ t.coreApi.title }}</h1>
      <p class="doc-lead">{{ t.coreApi.lead }}</p>
    </header>

    <h2 id="why">{{ t.coreApi.whyTitle }}</h2>
    <p>{{ t.coreApi.whyP1 }}</p>
    <p>{{ t.coreApi.whyP2 }}</p>

    <h2 id="mental-model">{{ t.coreApi.mentalTitle }}</h2>
    <p>{{ t.coreApi.mentalP1 }}</p>
    <ol class="doc-ordered-list">
      <li>{{ t.coreApi.mentalLayer1 }}</li>
      <li>{{ t.coreApi.mentalLayer2 }}</li>
      <li>{{ t.coreApi.mentalLayer3 }}</li>
    </ol>

    <h2 id="create-core">{{ t.coreApi.sectionStore }}</h2>
    <p>{{ t.coreApi.sectionStoreLead }}</p>
    <pre class="doc-code"><code>{{ CREATE_CORE }}</code></pre>
    <p>{{ t.coreApi.sectionStoreP2 }}</p>

    <h2 id="domain-engines">{{ t.coreApi.sectionEngines }}</h2>
    <p>{{ t.coreApi.sectionEnginesLead }}</p>
    <ul class="doc-bullet-list">
      <li>
        <strong>{{ t.coreApi.engineFormLabel }}</strong> — {{ t.coreApi.engineFormDesc }}
      </li>
      <li>
        <strong>{{ t.coreApi.engineTableLabel }}</strong> — {{ t.coreApi.engineTableDesc }}
      </li>
      <li>
        <strong>{{ t.coreApi.engineTreeLabel }}</strong> — {{ t.coreApi.engineTreeDesc }}
      </li>
      <li>
        <strong>{{ t.coreApi.engineVirtualLabel }}</strong> — {{ t.coreApi.engineVirtualDesc }}
      </li>
      <li>
        <strong>{{ t.coreApi.engineGraphLabel }}</strong> — {{ t.coreApi.engineGraphDesc }}
      </li>
    </ul>
    <pre class="doc-code"><code>{{ ENGINES }}</code></pre>

    <h2 id="typed-core">{{ t.coreApi.sectionTyped }}</h2>
    <p>{{ t.coreApi.sectionTypedLead }}</p>
    <pre class="doc-code"><code>{{ TYPED_CORE }}</code></pre>
    <p>{{ t.coreApi.sectionTypedP2 }}</p>

    <h2 id="middleware">{{ t.coreApi.sectionMiddleware }}</h2>
    <p>{{ t.coreApi.sectionMiddlewareLead }}</p>
    <pre class="doc-code"><code>{{ MIDDLEWARE }}</code></pre>
    <p>{{ t.coreApi.sectionMiddlewareP2 }}</p>

    <h2 id="graph">{{ t.coreApi.sectionGraph }}</h2>
    <p>{{ t.coreApi.sectionGraphLead }}</p>
    <pre class="doc-code"><code>{{ GRAPH }}</code></pre>
    <p>{{ t.coreApi.sectionGraphP2 }}</p>

    <h2 id="when">{{ t.coreApi.whenTitle }}</h2>
    <ul class="doc-bullet-list">
      <li>{{ t.coreApi.when1 }}</li>
      <li>{{ t.coreApi.when2 }}</li>
      <li>{{ t.coreApi.when3 }}</li>
      <li>{{ t.coreApi.when4 }}</li>
    </ul>

    <h2 id="next">{{ t.coreApi.nextTitle }}</h2>
    <p>{{ t.coreApi.nextLead }}</p>
  </section>
</template>
