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

/**
 * Guide → Core API — Angular port.
 *
 * Reworked: previously this was a wall of code snippets with one-line
 * leads ("for machines, not people"). The new structure frames Core
 * as "the runtime under every framework binding", explains why it
 * exists, walks through the three-layer mental model, then dives
 * into each layer with prose + a focused code example.
 */
@Component({
  selector: 'sg-core-api-page',
  standalone: true,
  template: `
    <section class="doc-page">
      <header class="doc-header">
        <h1 class="doc-component-title">{{ c().title }}</h1>
        <p class="doc-lead">{{ c().lead }}</p>
      </header>

      <h2 id="why">{{ c().whyTitle }}</h2>
      <p>{{ c().whyP1 }}</p>
      <p>{{ c().whyP2 }}</p>

      <h2 id="mental-model">{{ c().mentalTitle }}</h2>
      <p>{{ c().mentalP1 }}</p>
      <ol class="doc-ordered-list">
        <li>{{ c().mentalLayer1 }}</li>
        <li>{{ c().mentalLayer2 }}</li>
        <li>{{ c().mentalLayer3 }}</li>
      </ol>

      <h2 id="create-core">{{ c().sectionStore }}</h2>
      <p>{{ c().sectionStoreLead }}</p>
      <pre class="doc-code"><code>{{ createCore }}</code></pre>
      <p>{{ c().sectionStoreP2 }}</p>

      <h2 id="domain-engines">{{ c().sectionEngines }}</h2>
      <p>{{ c().sectionEnginesLead }}</p>
      <ul class="doc-bullet-list">
        <li>
          <strong>{{ c().engineFormLabel }}</strong> — {{ c().engineFormDesc }}
        </li>
        <li>
          <strong>{{ c().engineTableLabel }}</strong> — {{ c().engineTableDesc }}
        </li>
        <li>
          <strong>{{ c().engineTreeLabel }}</strong> — {{ c().engineTreeDesc }}
        </li>
        <li>
          <strong>{{ c().engineVirtualLabel }}</strong> — {{ c().engineVirtualDesc }}
        </li>
        <li>
          <strong>{{ c().engineGraphLabel }}</strong> — {{ c().engineGraphDesc }}
        </li>
      </ul>
      <pre class="doc-code"><code>{{ engines }}</code></pre>

      <h2 id="typed-core">{{ c().sectionTyped }}</h2>
      <p>{{ c().sectionTypedLead }}</p>
      <pre class="doc-code"><code>{{ typedCore }}</code></pre>
      <p>{{ c().sectionTypedP2 }}</p>

      <h2 id="middleware">{{ c().sectionMiddleware }}</h2>
      <p>{{ c().sectionMiddlewareLead }}</p>
      <pre class="doc-code"><code>{{ middleware }}</code></pre>
      <p>{{ c().sectionMiddlewareP2 }}</p>

      <h2 id="graph">{{ c().sectionGraph }}</h2>
      <p>{{ c().sectionGraphLead }}</p>
      <pre class="doc-code"><code>{{ graph }}</code></pre>
      <p>{{ c().sectionGraphP2 }}</p>

      <h2 id="when">{{ c().whenTitle }}</h2>
      <ul class="doc-bullet-list">
        <li>{{ c().when1 }}</li>
        <li>{{ c().when2 }}</li>
        <li>{{ c().when3 }}</li>
        <li>{{ c().when4 }}</li>
      </ul>

      <h2 id="next">{{ c().nextTitle }}</h2>
      <p>{{ c().nextLead }}</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreApiPageComponent {
  private readonly i18n = inject(I18nService)
  protected readonly c = () => this.i18n.t().coreApi

  protected readonly createCore = CREATE_CORE
  protected readonly engines = ENGINES
  protected readonly typedCore = TYPED_CORE
  protected readonly middleware = MIDDLEWARE
  protected readonly graph = GRAPH
}
