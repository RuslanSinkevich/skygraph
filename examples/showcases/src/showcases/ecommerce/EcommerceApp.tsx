import { useState } from 'react'
import type { TabItem } from '@skygraph/react'
import { products, orders, customerList } from './data'
import { ShowcaseShell, StatsRow, money } from '../_shared'
import { ProductsTab } from './ProductsTab'
import { OrdersTab } from './OrdersTab'
import { CustomersTab } from './CustomersTab'
import { InventoryTab } from './InventoryTab'
import { AnalyticsTab } from './AnalyticsTab'

function EcommerceStats() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const pending = orders.filter(o => o.status === 'pending').length
  const activeProducts = products.filter(p => p.status === 'active').length
  const lowStock = products.filter(p => p.stock < 10).length
  const vip = customerList.filter(c => c.status === 'vip').length

  return (
    <StatsRow
      items={[
        { label: 'Total Revenue', value: money(totalRevenue, { compact: true }), sub: `${orders.length} orders` },
        { label: 'Pending Orders', value: pending, sub: 'needs processing' },
        { label: 'Active Products', value: activeProducts, sub: `of ${products.length} total` },
        { label: 'Low Stock', value: lowStock, subTone: lowStock > 0 ? 'error' : 'default', sub: 'below 10 units' },
        { label: 'VIP Customers', value: vip, sub: `of ${customerList.length} total` },
      ]}
    />
  )
}

export function EcommerceApp() {
  const [active, setActive] = useState('products')

  const tabs: TabItem[] = [
    { key: 'products', label: 'Products', children: <ProductsTab /> },
    { key: 'orders', label: 'Orders', children: <OrdersTab /> },
    { key: 'customers', label: 'Customers', children: <CustomersTab /> },
    { key: 'inventory', label: 'Inventory', children: <InventoryTab /> },
    { key: 'analytics', label: 'Analytics', children: <AnalyticsTab /> },
  ]

  return <ShowcaseShell header={<EcommerceStats />} tabs={tabs} activeKey={active} onChange={setActive} />
}
