import { useState } from 'react'
import { Segmented, NotificationContainer } from '@skygraph/react'
import { sharedTableStyles } from './common'
import { useAppLocale } from '../_shared'
import { BasicTab } from './BasicTab'
import { SortingFilteringTab } from './SortingFilteringTab'
import { EditingTab } from './EditingTab'
import { VirtualTab } from './VirtualTab'
import { PinnedTab } from './PinnedTab'
import { GroupedTab } from './GroupedTab'

const TABS = [
  { key: 'basic', component: BasicTab },
  { key: 'sort-filter', component: SortingFilteringTab },
  { key: 'editing', component: EditingTab },
  { key: 'virtual', component: VirtualTab },
  { key: 'pinned', component: PinnedTab },
  { key: 'grouped', component: GroupedTab },
] as const

type TabKey = (typeof TABS)[number]['key']

export function TableKitchenSinkApp() {
  const l = useAppLocale('tableKitchenSink')
  const labelFor = (key: TabKey): string => {
    if (key === 'basic') return l.tabs.basic
    if (key === 'sort-filter') return l.tabs.sortFilter
    if (key === 'editing') return l.tabs.editing
    if (key === 'virtual') return l.tabs.virtual
    if (key === 'pinned') return l.tabs.pinned
    return l.tabs.grouped
  }
  const [activeTab, setActiveTab] = useState<TabKey>('basic')
  const Active = TABS.find((t) => t.key === activeTab)?.component ?? BasicTab

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <NotificationContainer />
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 18 }}>{l.appTitle}</h2>
        <p style={{ margin: 0, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
          {l.appLead}
        </p>
      </div>
      <Segmented
        value={activeTab}
        onChange={(v) => setActiveTab(v as TabKey)}
        options={TABS.map((t) => ({ label: labelFor(t.key), value: t.key }))}
      />
      <div style={{ marginTop: 16, flex: 1 }}>
        <Active />
      </div>
      <style>{sharedTableStyles}</style>
    </div>
  )
}
