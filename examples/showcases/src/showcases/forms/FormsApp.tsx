import { useState } from 'react'
import { Tabs, NotificationContainer } from '@skygraph/react'
import type { TabItem } from '@skygraph/react'
import { BasicTab } from './BasicTab'
import { ValidationTab } from './ValidationTab'
import { LayoutsTab } from './LayoutsTab'
import { DynamicTab } from './DynamicTab'
import { SchemaTab } from './SchemaTab'
import { formsStyles } from './styles'
import { useAppLocale } from '../_shared'

export function FormsApp() {
  const l = useAppLocale('forms')
  const [activeTab, setActiveTab] = useState('basic')

  const tabs: TabItem[] = [
    { key: 'basic', label: l.tabs.basic, children: <BasicTab /> },
    { key: 'validation', label: l.tabs.validation, children: <ValidationTab /> },
    { key: 'layouts', label: l.tabs.layouts, children: <LayoutsTab /> },
    { key: 'dynamic', label: l.tabs.dynamic, children: <DynamicTab /> },
    { key: 'schema', label: l.tabs.schema, children: <SchemaTab /> },
  ]

  return (
    <div className="sc-content" style={{ flex: 1 }}>
      <NotificationContainer />
      <style>{formsStyles}</style>
      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  )
}
