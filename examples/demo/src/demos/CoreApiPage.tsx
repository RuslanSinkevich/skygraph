import { useI18n } from '../i18n'

export function CoreApiPage() {
  const { t } = useI18n()
  const c = t.coreApi

  return (
    <section className="doc-page">
      <h1>{c.title}</h1>
      <p className="doc-lead">{c.lead}</p>

      <h2 id="create-core">{c.sectionStore}</h2>
      <p>{c.sectionStoreLead}</p>
      <pre className="doc-code"><code>{`import { createCore } from '@skygraph/core'

const core = createCore()
core.set('user.name', 'Ada')
core.subscribe('user.name', (v) => console.log(v))
core.batch(() => {
  core.set('user.email', 'ada@example.com')
  core.set('user.age', 36)
})`}</code></pre>

      <h2 id="domain-engines">{c.sectionEngines}</h2>
      <p>{c.sectionEnginesLead}</p>
      <pre className="doc-code"><code>{`import {
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
const virtual = createVirtual({ itemSize: 32, itemCount: 1000 })`}</code></pre>

      <h2 id="typed-core">{c.sectionTyped}</h2>
      <p>{c.sectionTypedLead}</p>
      <pre className="doc-code"><code>{`import { createCore, createTypedCore } from '@skygraph/core'

interface State {
  user: { name: string; age: number }
}
const typed = createTypedCore<State>(createCore())
typed.set('user.name', 'Ada')   // ok
typed.set('user.bogus', 'x')    // ts error`}</code></pre>

      <h2 id="middleware">{c.sectionMiddleware}</h2>
      <p>{c.sectionMiddlewareLead}</p>
      <pre className="doc-code"><code>{`import { createCore, loggerMiddleware, freezeMiddleware } from '@skygraph/core'

const core = createCore()
core.use(loggerMiddleware())
core.use(freezeMiddleware())`}</code></pre>

      <h2 id="graph">{c.sectionGraph}</h2>
      <p>{c.sectionGraphLead}</p>
      <pre className="doc-code"><code>{`import { createCore, createGraph } from '@skygraph/core'

const core = createCore()
const graph = createGraph(core)
const a = graph.addNode({ outline: { kind: 'rect', w: 80, h: 40 } })
const b = graph.addNode({ outline: { kind: 'rect', w: 80, h: 40 }, transform: { x: 200, y: 0 } })
graph.addEdge({ from: { node: a, anchor: 'ne' }, to: { node: b, anchor: 'nw' } })

graph.subscribe(() => {
  console.log('graph changed:', graph.getState())
})`}</code></pre>
    </section>
  )
}
