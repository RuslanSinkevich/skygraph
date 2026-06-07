import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  Button,
  Empty,
  Diagram,
  useGraph,
  notification,
  NotificationContainer,
} from '@skygraph/react'
import type { GraphNode, Outline } from '@skygraph/core'
import {
  PEOPLE,
  DEPT_ORDER,
  DEPT_COLOR,
  NODE_W,
  NODE_H,
  computeLayout,
  childrenOf,
  personById,
  subtreeCount,
  MANAGER_IDS,
} from './data'
import { useAppLocale } from '../_shared'

const RECT_OUTLINE: Outline = { kind: 'rect', w: NODE_W, h: NODE_H }

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

/** Manager ids that are NOT a root — used by "Collapse all". */
const COLLAPSIBLE_IDS = MANAGER_IDS.filter((id) => personById(id)?.managerId != null)

export function OrgChartApp() {
  const l = useAppLocale('orgChart')
  const { graph, state } = useGraph()
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(() => new Set())
  const [selected, setSelected] = useState<string | null>(null)

  const layout = useMemo(() => computeLayout(collapsed), [collapsed])

  // Rebuild the engine whenever the visible set changes. The diagram's own
  // pan/zoom view state is independent of graph commits, so collapsing a
  // branch never jolts the canvas.
  useEffect(() => {
    graph.clear()
    for (const n of layout.nodes) {
      graph.addNode({ id: n.id, transform: { x: n.x, y: n.y }, outline: RECT_OUTLINE })
    }
    for (const e of layout.edges) {
      graph.addEdge({
        id: e.id,
        from: { node: e.from, anchor: { s: 0.5 } },
        to: { node: e.to, anchor: { s: 0.5 } },
        routing: 'orthogonal',
      })
    }
    const visible = new Set(layout.nodes.map((n) => n.id))
    setSelected((prev) => (prev && visible.has(prev) ? prev : null))
  }, [layout, graph])

  const deptCounts = useMemo(() => {
    const counts = {} as Record<(typeof DEPT_ORDER)[number], number>
    for (const d of DEPT_ORDER) counts[d] = 0
    for (const p of PEOPLE) counts[p.dept] += 1
    return counts
  }, [])

  const toggleCollapse = useCallback(
    (id: string) => {
      setCollapsed((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
          notification.info(l.toasts.expanded(personById(id)?.name ?? id))
        } else {
          next.add(id)
          notification.info(l.toasts.collapsed(personById(id)?.name ?? id))
        }
        return next
      })
    },
    [l],
  )

  const expandAll = useCallback(() => {
    setCollapsed(new Set())
    notification.success(l.toasts.expandedAll)
  }, [l])

  const collapseAll = useCallback(() => {
    setCollapsed(new Set(COLLAPSIBLE_IDS))
    notification.info(l.toasts.collapsedAll)
  }, [l])

  const renderNode = useCallback(
    (node: GraphNode) => {
      const p = personById(String(node.id))
      if (!p) return null
      const kids = childrenOf(p.id)
      const isActive = selected === p.id
      const isCollapsed = collapsed.has(p.id)
      return (
        <div
          className={`oc-node oc-node--${p.dept}${isActive ? ' oc-node--active' : ''}`}
          style={{ ['--oc-accent' as keyof CSSProperties]: DEPT_COLOR[p.dept] } as CSSProperties}
          onClick={(e) => {
            e.stopPropagation()
            setSelected(p.id)
          }}
        >
          <span className="oc-node-avatar">{initials(p.name)}</span>
          <span className="oc-node-body">
            <span className="oc-node-name">{p.name}</span>
            <span className="oc-node-title">{p.title}</span>
          </span>
          {kids.length > 0 && (
            <button
              type="button"
              className={`oc-node-toggle${isCollapsed ? ' oc-node-toggle--collapsed' : ''}`}
              title={l.inspector.focus}
              onClick={(e) => {
                e.stopPropagation()
                toggleCollapse(p.id)
              }}
            >
              {isCollapsed ? l.reportsBadge(kids.length) : '−'}
            </button>
          )}
        </div>
      )
    },
    [selected, collapsed, toggleCollapse, l],
  )

  const selectedPerson = selected ? personById(selected) : undefined
  const selectedManager = selectedPerson?.managerId
    ? personById(selectedPerson.managerId)
    : undefined

  return (
    <div className="oc-shell">
      <NotificationContainer />

      <aside className="oc-side">
        <h4 className="oc-side-title">{l.sidebar.title}</h4>
        <p className="oc-side-hint">{l.sidebar.hint}</p>

        <h4 className="oc-side-title" style={{ marginTop: 18 }}>
          {l.sidebar.legendTitle}
        </h4>
        <ul className="oc-legend">
          {DEPT_ORDER.map((d) => (
            <li key={d} className="oc-legend-row">
              <span className="oc-legend-dot" style={{ background: DEPT_COLOR[d] }} />
              <span className="oc-legend-name">{l.dept[d]}</span>
              <span className="oc-legend-count">{deptCounts[d]}</span>
            </li>
          ))}
        </ul>

        <h4 className="oc-side-title" style={{ marginTop: 18 }}>
          {l.sidebar.statsTitle}
        </h4>
        <div className="oc-stats">
          <div>
            <strong>{PEOPLE.length}</strong> {l.sidebar.peopleLabel}
          </div>
          <div>
            <strong>{layout.nodes.length}</strong> {l.sidebar.visibleLabel}
          </div>
          <div>
            <strong>{layout.depth}</strong> {l.sidebar.depthLabel}
          </div>
        </div>
      </aside>

      <section className="oc-canvas-shell">
        <div className="sc-toolbar">
          <span className="oc-toolbar-hint">{l.toolbar.hint}</span>
          <div className="sc-toolbar-spacer" />
          <Button size="small" onClick={collapseAll}>
            {l.toolbar.collapseAll}
          </Button>
          <Button size="small" type="primary" onClick={expandAll}>
            {l.toolbar.expandAll}
          </Button>
        </div>

        <div className="oc-canvas">
          <Diagram
            graph={graph}
            state={state}
            width="100%"
            height="100%"
            panable
            zoomable
            edgeArrows={false}
            renderNode={renderNode}
          />
        </div>
      </section>

      <aside className="oc-inspector">
        <h4 className="oc-side-title">{l.inspector.title}</h4>
        {!selectedPerson ? (
          <Empty description={l.inspector.empty} />
        ) : (
          <>
            <div className="oc-card-head">
              <span
                className="oc-card-avatar"
                style={{ background: DEPT_COLOR[selectedPerson.dept] }}
              >
                {initials(selectedPerson.name)}
              </span>
              <div>
                <div className="oc-card-name">{selectedPerson.name}</div>
                <div className="oc-card-title">{selectedPerson.title}</div>
              </div>
            </div>

            <div className="oc-row">
              <span className="oc-row-label">{l.inspector.department}</span>
              <span className="oc-dept-tag" style={{ background: DEPT_COLOR[selectedPerson.dept] }}>
                {l.dept[selectedPerson.dept]}
              </span>
            </div>
            <div className="oc-row">
              <span className="oc-row-label">{l.inspector.manager}</span>
              <span>{selectedManager ? selectedManager.name : l.inspector.noManager}</span>
            </div>
            <div className="oc-row">
              <span className="oc-row-label">{l.inspector.directReports}</span>
              <code>{childrenOf(selectedPerson.id).length}</code>
            </div>
            <div className="oc-row">
              <span className="oc-row-label">{l.inspector.totalReports}</span>
              <code>{subtreeCount(selectedPerson.id)}</code>
            </div>
            <div className="oc-row">
              <span className="oc-row-label">{l.inspector.email}</span>
              <a className="oc-email" href={`mailto:${selectedPerson.email}`}>
                {selectedPerson.email}
              </a>
            </div>

            {childrenOf(selectedPerson.id).length > 0 && (
              <div className="oc-inspector-section">
                <Button
                  size="small"
                  style={{ width: '100%' }}
                  onClick={() => toggleCollapse(selectedPerson.id)}
                >
                  {l.inspector.focus}
                </Button>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  )
}
