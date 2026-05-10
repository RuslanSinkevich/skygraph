import { useState } from 'react'
import type { TabItem } from '@skygraph/react'
import { products, orders, customerList } from './data'
import { ShowcaseShell, StatsRow, money, useAppLocale } from '../_shared'
import { ProductsTab } from './ProductsTab'
import { OrdersTab } from './OrdersTab'
import { CustomersTab } from './CustomersTab'
import { InventoryTab } from './InventoryTab'
import { AnalyticsTab } from './AnalyticsTab'

function EcommerceStats() {
  const l = useAppLocale('ecommerce').stats
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const pending = orders.filter((o) => o.status === 'pending').length
  const activeProducts = products.filter((p) => p.status === 'active').length
  const lowStock = products.filter((p) => p.stock < 10).length
  const vip = customerList.filter((c) => c.status === 'vip').length

  return (
    <StatsRow
      items={[
        {
          label: l.revenue,
          value: money(totalRevenue, { compact: true }),
          sub: l.revenueSub(orders.length),
        },
        { label: l.pending, value: pending, sub: l.pendingSub },
        {
          label: l.activeProducts,
          value: activeProducts,
          sub: l.activeProductsSub(products.length),
        },
        {
          label: l.lowStock,
          value: lowStock,
          subTone: lowStock > 0 ? 'error' : 'default',
          sub: l.lowStockSub,
        },
        { label: l.vip, value: vip, sub: l.vipSub(customerList.length) },
      ]}
    />
  )
}

export function EcommerceApp() {
  const t = useAppLocale('ecommerce').tabs
  const [active, setActive] = useState('products')

  const tabs: TabItem[] = [
    { key: 'products', label: t.products, children: <ProductsTab /> },
    { key: 'orders', label: t.orders, children: <OrdersTab /> },
    { key: 'customers', label: t.customers, children: <CustomersTab /> },
    { key: 'inventory', label: t.inventory, children: <InventoryTab /> },
    { key: 'analytics', label: t.analytics, children: <AnalyticsTab /> },
  ]

  return (
    <ShowcaseShell
      header={<EcommerceStats />}
      tabs={tabs}
      activeKey={active}
      onChange={setActive}
    />
  )
}
