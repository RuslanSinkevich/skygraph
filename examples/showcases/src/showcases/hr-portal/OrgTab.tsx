import { Tree } from '@skygraph/react'
import { orgTree, employees } from './data'

export function OrgTab() {
  const departments = [...new Set(employees.map(e => e.department))]
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div style={{ flex: 1, border: '1px solid var(--sg-color-border-secondary)', borderRadius: 8, padding: 16 }}>
        <Tree treeData={orgTree} defaultExpandAll />
      </div>
      <div style={{ width: 280, flexShrink: 0 }}>
        <h4 style={{ marginBottom: 12 }}>Department Sizes</h4>
        {departments.map(d => {
          const count = employees.filter(e => e.department === d).length
          const pct = (count / employees.length) * 100
          return (
            <div key={d} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span>{d}</span>
                <span style={{ color: 'var(--sg-color-text-secondary)' }}>{count}</span>
              </div>
              <div style={{ height: 6, background: 'var(--sg-color-border-secondary)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: `hsl(${(d.charCodeAt(0) * 11) % 360}, 60%, 55%)`,
                }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
