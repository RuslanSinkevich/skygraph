import { useMemo, useState } from 'react'
import { Tree, Breadcrumb, Tag, Progress, Empty } from '@skygraph/react'
import type { TreeNodeData } from '@skygraph/react'
import { contacts, deals } from './data'
import { money, statusColor, useAppLocale } from '../_shared'

export function HierarchyTab() {
  const lc = useAppLocale('crm')
  const h = lc.hierarchy
  const stageLabel = (s: string) => lc.stageLabel[s] ?? s

  const tree = useMemo<TreeNodeData[]>(() => {
    const byCompany = new Map<string, typeof contacts>()
    for (const c of contacts) {
      const list = byCompany.get(c.company) ?? []
      list.push(c)
      byCompany.set(c.company, list)
    }
    const companies: TreeNodeData[] = [...byCompany.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([company, list]) => ({
        key: `co:${company}`,
        title: `${company}`,
        children: list.map((c) => ({
          key: `ct:${c.id}`,
          title: `${c.name} — ${money(c.revenue, { compact: true })}`,
        })),
      }))
    return [
      {
        key: 'all',
        title: h.allAccounts(contacts.length, byCompany.size),
        children: companies,
      },
    ]
  }, [h])
  const [selected, setSelected] = useState<string>('all')

  const path = useMemo(() => {
    if (selected === 'all') return [h.breadcrumbRoot, h.breadcrumbAll]
    if (selected.startsWith('co:')) return [h.breadcrumbRoot, selected.slice(3)]
    if (selected.startsWith('ct:')) {
      const c = contacts.find((x) => x.id === selected.slice(3))
      return c ? [h.breadcrumbRoot, c.company, c.name] : [h.breadcrumbRoot]
    }
    return [h.breadcrumbRoot]
  }, [selected, h])

  const view = useMemo(() => {
    if (selected.startsWith('ct:')) {
      const id = selected.slice(3)
      const contact = contacts.find((c) => c.id === id) ?? null
      const dealsFor = deals.filter((d) => d.contactId === id)
      return { kind: 'contact' as const, contact, deals: dealsFor }
    }
    if (selected.startsWith('co:')) {
      const company = selected.slice(3)
      const cs = contacts.filter((c) => c.company === company)
      const ids = new Set(cs.map((c) => c.id))
      const dealsFor = deals.filter((d) => ids.has(d.contactId))
      return { kind: 'company' as const, company, contacts: cs, deals: dealsFor }
    }
    return { kind: 'all' as const, contacts, deals }
  }, [selected])

  const totalRevenue =
    view.kind === 'contact'
      ? (view.contact?.revenue ?? 0)
      : view.kind === 'company'
        ? view.contacts.reduce((s, c) => s + c.revenue, 0)
        : view.contacts.reduce((s, c) => s + c.revenue, 0)

  const dealValue =
    view.kind === 'contact'
      ? view.deals.reduce((s, d) => s + d.value, 0)
      : view.deals.reduce((s, d) => s + d.value, 0)

  const customers =
    view.kind === 'contact'
      ? view.contact?.status === 'customer'
        ? 1
        : 0
      : view.kind === 'company'
        ? view.contacts.filter((c) => c.status === 'customer').length
        : view.contacts.filter((c) => c.status === 'customer').length

  return (
    <div style={{ display: 'flex', gap: 16, minHeight: 480 }}>
      <div
        style={{
          width: 300,
          flexShrink: 0,
          borderRight: '1px solid var(--sg-color-border-secondary)',
          paddingRight: 12,
        }}
      >
        <Tree
          treeData={tree}
          defaultExpandAll
          selectedKeys={[selected]}
          onSelect={(keys) => {
            if (keys.length) setSelected(String(keys[0]))
          }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Breadcrumb items={path.map((title) => ({ title }))} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginTop: 16,
          }}
        >
          <KPI label={h.kpi.lifetime} value={money(totalRevenue, { compact: true })} />
          <KPI
            label={h.kpi.pipeline}
            value={money(dealValue, { compact: true })}
            sub={h.kpi.pipelineSub(view.deals.length)}
          />
          <KPI label={h.kpi.customers} value={String(customers)} />
        </div>

        <h4 style={{ marginTop: 24, marginBottom: 8 }}>{h.dealsHeading(view.deals.length)}</h4>
        {view.deals.length === 0 ? (
          <Empty description={h.noDeals} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {view.deals.slice(0, 12).map((d) => (
              <div
                key={d.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  border: '1px solid var(--sg-color-border-secondary)',
                  borderRadius: 6,
                }}
              >
                <Tag color={statusColor(d.stage)}>{stageLabel(d.stage)}</Tag>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{d.title}</span>
                <Progress percent={d.probability} showInfo={false} style={{ width: 80 }} />
                <span style={{ width: 84, textAlign: 'right', fontWeight: 600 }}>
                  {money(d.value, { compact: true })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function KPI({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div
      style={{
        border: '1px solid var(--sg-color-border-secondary)',
        borderRadius: 8,
        padding: '10px 14px',
        background: 'var(--sg-color-bg-container)',
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: 'var(--sg-color-text-secondary)',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>{value}</div>
      {sub && (
        <div style={{ fontSize: 11, color: 'var(--sg-color-text-secondary)', marginTop: 2 }}>
          {sub}
        </div>
      )}
    </div>
  )
}
