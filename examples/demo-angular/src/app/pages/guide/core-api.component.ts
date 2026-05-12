import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { I18nService } from '../../i18n'

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

/**
 * Guide → Core API — Angular port of `examples/demo-vue/src/guide/CoreApi.vue`.
 * Snippets are framework-neutral; `@skygraph/core` is the same import
 * for React, Vue and Angular surfaces.
 */
@Component({
  selector: 'sg-core-api-page',
  standalone: true,
  template: `
    <section class="doc-page">
      <h1>{{ i18n.t().coreApi.title }}</h1>
      <p class="doc-lead">{{ i18n.t().coreApi.lead }}</p>

      <h2 id="create-core">{{ i18n.t().coreApi.sectionStore }}</h2>
      <p>{{ i18n.t().coreApi.sectionStoreLead }}</p>
      <pre class="doc-code"><code>{{ createCore }}</code></pre>

      <h2 id="domain-engines">{{ i18n.t().coreApi.sectionEngines }}</h2>
      <p>{{ i18n.t().coreApi.sectionEnginesLead }}</p>
      <pre class="doc-code"><code>{{ engines }}</code></pre>

      <h2 id="typed-core">{{ i18n.t().coreApi.sectionTyped }}</h2>
      <p>{{ i18n.t().coreApi.sectionTypedLead }}</p>
      <pre class="doc-code"><code>{{ typedCore }}</code></pre>

      <h2 id="middleware">{{ i18n.t().coreApi.sectionMiddleware }}</h2>
      <p>{{ i18n.t().coreApi.sectionMiddlewareLead }}</p>
      <pre class="doc-code"><code>{{ middleware }}</code></pre>

      <h2 id="graph">{{ i18n.t().coreApi.sectionGraph }}</h2>
      <p>{{ i18n.t().coreApi.sectionGraphLead }}</p>
      <pre class="doc-code"><code>{{ graph }}</code></pre>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreApiPageComponent {
  protected readonly i18n = inject(I18nService)
  protected readonly createCore = CREATE_CORE
  protected readonly engines = ENGINES
  protected readonly typedCore = TYPED_CORE
  protected readonly middleware = MIDDLEWARE
  protected readonly graph = GRAPH
}
