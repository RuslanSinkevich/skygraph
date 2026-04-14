export function CoreApiPage() {
  return (
    <section className="doc-page">
      <h1>Core API</h1>
      <p className="doc-lead">
        The <code>@skygraph/core</code> package provides four factory functions.
        Each returns a reactive engine that can be used standalone or plugged into
        React via <code>@skygraph/react</code>.
      </p>

      {/* ---- createCore ---- */}
      <h2 id="create-core">createCore()</h2>
      <p>
        Low-level reactive state container. Foundation for all other engines.
      </p>
      <table className="doc-table">
        <thead>
          <tr><th>Method</th><th>Signature</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>get</code></td><td><code>(path: string) =&gt; T</code></td><td>Read value at path</td></tr>
          <tr><td><code>set</code></td><td><code>(path: string, value: T) =&gt; void</code></td><td>Write value at path</td></tr>
          <tr><td><code>subscribe</code></td><td><code>(path: string, cb: Fn) =&gt; Unsubscribe</code></td><td>Watch a path for changes</td></tr>
          <tr><td><code>batch</code></td><td><code>(fn: () =&gt; void) =&gt; void</code></td><td>Batch multiple updates into one notification</td></tr>
          <tr><td><code>getState</code></td><td><code>() =&gt; Record&lt;string, T&gt;</code></td><td>Snapshot of entire state</td></tr>
        </tbody>
      </table>
      <pre className="doc-code"><code>{`import { createCore } from '@skygraph/core'

const core = createCore({ count: 0, name: '' })

core.subscribe('count', (val) => console.log('count:', val))
core.set('count', 1)       // logs "count: 1"
core.get('count')           // 1`}</code></pre>

      {/* ---- createForm ---- */}
      <h2 id="create-form">createForm()</h2>
      <p>
        Form engine with validation, field dependencies, and dynamic field lists.
      </p>
      <table className="doc-table">
        <thead>
          <tr><th>Method</th><th>Signature</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>getFieldValue</code></td><td><code>(name: string) =&gt; T</code></td><td>Get current field value</td></tr>
          <tr><td><code>setFieldsValue</code></td><td><code>(values: Partial) =&gt; void</code></td><td>Set multiple fields at once</td></tr>
          <tr><td><code>validate</code></td><td><code>() =&gt; Promise&lt;ValidationResult&gt;</code></td><td>Run all rules, return errors</td></tr>
          <tr><td><code>reset</code></td><td><code>() =&gt; void</code></td><td>Reset to default values</td></tr>
          <tr><td><code>submit</code></td><td><code>() =&gt; Promise&lt;void&gt;</code></td><td>Validate then call onSubmit</td></tr>
        </tbody>
      </table>
      <pre className="doc-code"><code>{`import { createForm } from '@skygraph/core'

const form = createForm({
  defaultValues: { email: '', password: '' },
  rules: {
    email: [{ required: true }, { type: 'email' }],
    password: [{ required: true }, { min: 6 }],
  },
})

await form.validate()
// { valid: false, errors: { email: '...', password: '...' } }`}</code></pre>

      {/* ---- createTable ---- */}
      <h2 id="create-table">createTable()</h2>
      <p>
        Table engine — sorting, filtering, pagination, row selection.
      </p>
      <table className="doc-table">
        <thead>
          <tr><th>Method</th><th>Signature</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>setData</code></td><td><code>(rows: T[]) =&gt; void</code></td><td>Load data</td></tr>
          <tr><td><code>sort</code></td><td><code>(col: string, dir: SortDirection) =&gt; void</code></td><td>Sort by column</td></tr>
          <tr><td><code>filter</code></td><td><code>(col: string, fn: FilterFn) =&gt; void</code></td><td>Apply column filter</td></tr>
          <tr><td><code>setPage</code></td><td><code>(page: number) =&gt; void</code></td><td>Navigate to page</td></tr>
          <tr><td><code>getRows</code></td><td><code>() =&gt; T[]</code></td><td>Get visible (sorted/filtered/paged) rows</td></tr>
          <tr><td><code>selectRow</code></td><td><code>(id: RowId) =&gt; void</code></td><td>Toggle row selection</td></tr>
        </tbody>
      </table>
      <pre className="doc-code"><code>{`import { createTable } from '@skygraph/core'

const table = createTable({
  data: users,
  pageSize: 10,
  columns: ['name', 'email', 'role'],
})

table.sort('name', 'asc')
table.filter('role', (val) => val === 'admin')
const rows = table.getRows()`}</code></pre>

      {/* ---- createTree ---- */}
      <h2 id="create-tree">createTree()</h2>
      <p>
        Tree engine — expand/collapse, check, search, drag-and-drop state.
      </p>
      <table className="doc-table">
        <thead>
          <tr><th>Method</th><th>Signature</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>expand</code></td><td><code>(key: TreeKey) =&gt; void</code></td><td>Expand a node</td></tr>
          <tr><td><code>collapse</code></td><td><code>(key: TreeKey) =&gt; void</code></td><td>Collapse a node</td></tr>
          <tr><td><code>check</code></td><td><code>(key: TreeKey) =&gt; void</code></td><td>Toggle checkbox</td></tr>
          <tr><td><code>expandAll</code></td><td><code>() =&gt; void</code></td><td>Expand entire tree</td></tr>
          <tr><td><code>filter</code></td><td><code>(query: string) =&gt; void</code></td><td>Filter nodes by text</td></tr>
          <tr><td><code>getChecked</code></td><td><code>() =&gt; TreeKey[]</code></td><td>Get checked keys</td></tr>
        </tbody>
      </table>
      <pre className="doc-code"><code>{`import { createTree } from '@skygraph/core'

const tree = createTree({
  data: [
    { key: '1', title: 'Documents', children: [
      { key: '1-1', title: 'Resume.pdf' },
      { key: '1-2', title: 'Cover.docx' },
    ]},
    { key: '2', title: 'Photos', children: [] },
  ],
})

tree.expandAll()
tree.check('1-1')
tree.getChecked() // ['1-1']`}</code></pre>
    </section>
  )
}
