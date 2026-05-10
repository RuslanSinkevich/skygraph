import { useMemo, useState } from 'react'
import { Segmented, Tag, Progress, BarChart, LineChart, PieChart } from '@skygraph/react'
import { products, orders, customerList } from './data'
import { money, num, percent, useAppLocale } from '../_shared'
import { emojiForProduct } from './common'

type Period = '7d' | '30d' | '90d' | 'all'

function withinPeriod(dateStr: string, period: Period): boolean {
  if (period === 'all') return true
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
  const d = new Date(dateStr).getTime()
  return Date.now() - d <= days * 86400000
}

export function AnalyticsTab() {
  const a = useAppLocale('ecommerce').analytics
  const [period, setPeriod] = useState<Period>('30d')

  const filteredOrders = useMemo(
    () => orders.filter((o) => o.status !== 'cancelled' && withinPeriod(o.date, period)),
    [period],
  )

  const stats = useMemo(() => {
    const revenue = filteredOrders.reduce((s, o) => s + o.total, 0)
    const items = filteredOrders.reduce((s, o) => s + o.items.length, 0)
    const aov = filteredOrders.length ? revenue / filteredOrders.length : 0
    const inventory = products.reduce((s, p) => s + p.cost * p.stock, 0)
    return {
      revenue,
      orders: filteredOrders.length,
      items,
      aov,
      inventory,
      vipShare: customerList.length
        ? (customerList.filter((c) => c.status === 'vip').length / customerList.length) * 100
        : 0,
    }
  }, [filteredOrders])

  const dailySeries = useMemo(() => {
    const buckets = new Map<string, number>()
    for (const o of filteredOrders) {
      buckets.set(o.date, (buckets.get(o.date) ?? 0) + o.total)
    }
    const sorted = [...buckets.entries()].sort((a, b) => a[0].localeCompare(b[0])).slice(-14)
    return {
      categories: sorted.map(([d]) => d.slice(5)),
      values: sorted.map(([, v]) => Math.round(v)),
    }
  }, [filteredOrders])

  const topProducts = useMemo(
    () => [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 8),
    [],
  )

  const categorySplit = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of products) {
      map.set(p.category, (map.get(p.category) ?? 0) + p.revenue)
    }
    return [...map.entries()].map(([label, value]) => ({
      id: label,
      label,
      value: Math.round(value),
    }))
  }, [])

  const statusSplit = useMemo(() => {
    const map = new Map<string, number>()
    for (const o of orders) {
      map.set(o.status, (map.get(o.status) ?? 0) + 1)
    }
    return [...map.entries()].map(([label, value]) => ({ id: label, label, value }))
  }, [])

  return (
    <>
      <div className="ana-toolbar">
        <Segmented
          value={period}
          onChange={(v) => setPeriod(v as Period)}
          options={[
            { label: a.periods.d7, value: '7d' },
            { label: a.periods.d30, value: '30d' },
            { label: a.periods.d90, value: '90d' },
            { label: a.periods.all, value: 'all' },
          ]}
        />
      </div>

      <div className="ana-stats">
        <div className="ana-stat">
          <div className="ana-stat-label">{a.stats.revenue}</div>
          <div className="ana-stat-value">{money(stats.revenue, { compact: true })}</div>
          <div className="ana-stat-sub">{a.stats.ordersSub(stats.orders)}</div>
        </div>
        <div className="ana-stat">
          <div className="ana-stat-label">{a.stats.aov}</div>
          <div className="ana-stat-value">{money(stats.aov)}</div>
          <div className="ana-stat-sub">{a.stats.itemsSub(num(stats.items))}</div>
        </div>
        <div className="ana-stat">
          <div className="ana-stat-label">{a.stats.inventoryValue}</div>
          <div className="ana-stat-value">{money(stats.inventory, { compact: true })}</div>
          <div className="ana-stat-sub">{a.stats.inventorySub(products.length)}</div>
        </div>
        <div className="ana-stat">
          <div className="ana-stat-label">{a.stats.vipShare}</div>
          <div className="ana-stat-value">{percent(stats.vipShare)}</div>
          <div className="ana-stat-sub">{a.stats.vipSub}</div>
        </div>
      </div>

      <div className="ana-grid">
        <div className="ana-card" style={{ gridColumn: 'span 2' }}>
          <div className="ana-card-title">{a.cards.revenueTrend}</div>
          {dailySeries.categories.length > 0 ? (
            <LineChart
              categories={dailySeries.categories}
              series={[{ id: 'revenue', label: a.stats.revenue, values: dailySeries.values }]}
              height={220}
              legend
              yAxis={{ tickCount: 4 }}
              actions
              crosshair
              animate
              fileName="ecommerce-revenue"
            />
          ) : (
            <div className="ana-empty">{a.cards.noData}</div>
          )}
        </div>

        <div className="ana-card">
          <div className="ana-card-title">{a.cards.ordersByStatus}</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
            <PieChart
              data={statusSplit}
              height={180}
              outerRadius={70}
              innerRadius={32}
              actions
              animate
              fileName="ecommerce-orders-status"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {statusSplit.map((s) => (
                <div
                  key={s.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}
                >
                  <Tag color="default" style={{ margin: 0 }}>
                    {s.label}
                  </Tag>
                  <span>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ana-card">
          <div className="ana-card-title">{a.cards.revenueByCategory}</div>
          <BarChart
            categories={categorySplit.map((c) => c.label)}
            series={[
              { id: 'revenue', label: a.stats.revenue, values: categorySplit.map((c) => c.value) },
            ]}
            height={220}
            legend
            yAxis={{ tickCount: 4 }}
            actions
            animate
            fileName="ecommerce-revenue-by-category"
          />
        </div>

        <div className="ana-card" style={{ gridColumn: 'span 2' }}>
          <div className="ana-card-title">{a.cards.topProducts}</div>
          <div className="ana-list">
            {topProducts.map((p) => {
              const max = topProducts[0].revenue || 1
              const pct = Math.round((p.revenue / max) * 100)
              return (
                <div key={p.id} className="ana-list-row">
                  <span style={{ fontSize: 22 }}>{emojiForProduct(p.name, p.category)}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="ana-list-name">{p.name}</div>
                    <div className="ana-list-meta">
                      {p.brand} · {num(p.sold)} {a.soldSuffix} · ⭐ {p.rating}
                    </div>
                    <Progress percent={pct} size="small" showInfo={false} />
                  </div>
                  <div style={{ textAlign: 'right', minWidth: 100 }}>
                    <div style={{ fontWeight: 600 }}>{money(p.revenue, { compact: true })}</div>
                    <Tag color={p.margin > 50 ? 'success' : 'warning'} style={{ fontSize: 10 }}>
                      {percent(p.margin)} {a.marginSuffix}
                    </Tag>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{analyticsStyles}</style>
    </>
  )
}

const analyticsStyles = `
.ana-toolbar { margin-bottom: 16px; }
.ana-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.ana-stat {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius);
  padding: 12px 14px;
  background: var(--sg-color-bg-container);
}
.ana-stat-label { font-size: 12px; color: var(--sg-color-text-secondary); margin-bottom: 4px; }
.ana-stat-value { font-size: 22px; font-weight: 600; }
.ana-stat-sub { font-size: 11px; color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary)); margin-top: 4px; }

.ana-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.ana-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius-lg);
  padding: 16px;
  background: var(--sg-color-bg-container);
}
.ana-card-title { font-weight: 600; margin-bottom: 12px; font-size: 13px; }
.ana-empty {
  height: 220px; display: flex; align-items: center; justify-content: center;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
}

.ana-list { display: flex; flex-direction: column; gap: 10px; }
.ana-list-row {
  display: flex; align-items: center; gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--sg-color-border-secondary);
}
.ana-list-row:last-child { border-bottom: none; }
.ana-list-name { font-weight: 500; font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ana-list-meta { font-size: 11px; color: var(--sg-color-text-secondary); margin-bottom: 4px; }
`
