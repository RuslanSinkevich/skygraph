import { useState } from 'react'
import { Tabs, NotificationContainer } from '@skygraph/react'
import type { TabItem } from '@skygraph/react'
import { BasicTab } from './BasicTab'
import { ValidationTab } from './ValidationTab'
import { LayoutsTab } from './LayoutsTab'
import { DynamicTab } from './DynamicTab'
import { SchemaTab } from './SchemaTab'
import { formsStyles } from './styles'

export function FormsApp() {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs: TabItem[] = [
    { key: 'basic', label: 'Basic', children: <BasicTab /> },
    { key: 'validation', label: 'Validation', children: <ValidationTab /> },
    { key: 'layouts', label: 'Layouts', children: <LayoutsTab /> },
    { key: 'dynamic', label: 'Dynamic', children: <DynamicTab /> },
    { key: 'schema', label: 'Schema (Wizard)', children: <SchemaTab /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <style>{formsStyles}</style>
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}
