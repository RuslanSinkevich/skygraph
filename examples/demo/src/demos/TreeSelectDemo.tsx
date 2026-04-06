import { useState } from 'react'
import { TreeSelect } from '../../../../packages/react/src/components/complex/TreeSelect'

const treeData = [
  {
    key: 'company',
    title: 'Company',
    children: [
      { key: 'eng', title: 'Engineering', children: [{ key: 'fe', title: 'Frontend' }, { key: 'be', title: 'Backend' }] },
      { key: 'design', title: 'Design', children: [{ key: 'ux', title: 'UX' }, { key: 'ui', title: 'UI' }] },
    ],
  },
  {
    key: 'archive',
    title: 'Archive',
    children: [{ key: '2024', title: '2024' }, { key: '2023', title: '2023' }],
  },
]

export function TreeSelectDemo() {
  const [multi, setMulti] = useState<(string | number)[]>(['fe', 'ux'])
  const [checked, setChecked] = useState<(string | number)[]>(['fe', 'be'])

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h2>TreeSelect</h2>

      <section>
        <h3>Basic</h3>
        <TreeSelect
          style={{ minWidth: 260 }}
          treeData={treeData}
          placeholder="Pick a node"
          treeDefaultExpandAll
          defaultValue="fe"
        />
      </section>

      <section>
        <h3>Multiple</h3>
        <TreeSelect
          style={{ minWidth: 320 }}
          treeData={treeData}
          multiple
          value={multi}
          onChange={(v) => setMulti(Array.isArray(v) ? v : [v])}
          treeDefaultExpandAll
          placeholder="Select several"
        />
      </section>

      <section>
        <h3>Checkable</h3>
        <TreeSelect
          style={{ minWidth: 320 }}
          treeData={treeData}
          treeCheckable
          value={checked}
          onChange={(v) => setChecked(Array.isArray(v) ? v : [v])}
          treeDefaultExpandAll
          placeholder="Check nodes"
        />
      </section>

      <section>
        <h3>Search</h3>
        <TreeSelect
          style={{ minWidth: 280 }}
          treeData={treeData}
          showSearch
          treeDefaultExpandAll
          placeholder="Type to filter"
        />
      </section>

      <section>
        <h3>Tree line</h3>
        <TreeSelect
          style={{ minWidth: 280 }}
          treeData={treeData}
          treeLine
          treeDefaultExpandAll
          defaultValue="ux"
          placeholder="Structured tree"
        />
      </section>
    </section>
  )
}
