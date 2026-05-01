import { useState } from 'react'
import { Result, Button, notification } from '@skygraph/react'
import type { TabItem } from '@skygraph/react'
import { ShowcaseShell } from '../_shared'
import { OverviewTab } from './OverviewTab'
import { ChartsTab } from './ChartsTab'
import { ChannelsTab } from './ChannelsTab'
import { ProductsTab } from './ProductsTab'
import { AlertsTab } from './AlertsTab'

function ReportsEmpty() {
  return (
    <Result
      status="info"
      title="No Custom Reports Yet"
      subTitle="Create custom reports to track specific metrics that matter to your business."
      extra={
        <Button type="primary" onClick={() => notification.info('Create report wizard (mock)')}>
          Create Report
        </Button>
      }
    />
  )
}

export function AnalyticsApp() {
  const [active, setActive] = useState('overview')

  const tabs: TabItem[] = [
    { key: 'overview', label: 'Overview', children: <OverviewTab /> },
    { key: 'charts', label: 'Charts', children: <ChartsTab /> },
    { key: 'channels', label: 'Channels', children: <ChannelsTab /> },
    { key: 'products', label: 'Top Products', children: <ProductsTab /> },
    { key: 'alerts', label: 'Alerts', children: <AlertsTab /> },
    { key: 'reports', label: 'Custom Reports', children: <ReportsEmpty /> },
  ]

  return <ShowcaseShell tabs={tabs} activeKey={active} onChange={setActive} />
}
