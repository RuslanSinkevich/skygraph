import { useState } from 'react'
import { Segmented, NotificationContainer } from '@skygraph/react'
import { sharedTableStyles } from './common'
import { BasicTab } from './BasicTab'
import { SortingFilteringTab } from './SortingFilteringTab'
import { EditingTab } from './EditingTab'
import { VirtualTab } from './VirtualTab'
import { PinnedTab } from './PinnedTab'
import { GroupedTab } from './GroupedTab'

const TABS = [
  { key: 'basic', label: 'Basic', component: BasicTab },
  { key: 'sort-filter', label: 'Sorting & Filtering', component: SortingFilteringTab },
  { key: 'editing', label: 'Editing & DnD', component: EditingTab },
  { key: 'virtual', label: 'Virtual Scroll', component: VirtualTab },
  { key: 'pinned', label: 'Pinned Rows', component: PinnedTab },
  { key: 'grouped', label: 'Grouped & Tree', component: GroupedTab },
] as const

type TabKey = typeof TABS[number]['key']

export function TableKitchenSinkApp() {
  const [activeTab, setActiveTab] = useState<TabKey>('basic')
  const Active = TABS.find(t => t.key === activeTab)?.component ?? BasicTab

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <NotificationContainer />
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 18 }}>Table — Kitchen Sink</h2>
        <p style={{ margin: 0, color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
          Every Table feature in one place: multi-sort, filtering, grouping, tree data, virtual scroll,
          drag &amp; drop (rows + columns), inline editing, export (CSV/JSON), print, fullscreen,
          density toggle, keyboard navigation, cell spanning, column pinning, column visibility,
          aggregation, pinned rows, selection summary, context menus and locale.
        </p>
      </div>
      <Segmented
        value={activeTab}
        onChange={(v) => setActiveTab(v as TabKey)}
        options={TABS.map((t) => ({ label: t.label, value: t.key }))}
      />
      <div style={{ marginTop: 16, flex: 1 }}>
        <Active />
      </div>
      <style>{sharedTableStyles}</style>
    </div>
  )
}
