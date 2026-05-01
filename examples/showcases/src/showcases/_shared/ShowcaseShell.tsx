import type { ReactNode } from 'react'
import { Tabs, NotificationContainer } from '@skygraph/react'
import type { TabItem } from '@skygraph/react'

/**
 * Shared layout: notification host + optional KPI row + tabs.
 * Removes duplicated `<div className="sc-content"><NotificationContainer />…<Tabs/>` boilerplate
 * from CRM, Analytics, Admin, HR Portal, ProjectTracker, Ecommerce.
 */

export interface ShowcaseShellProps {
  /** KPI/banner area shown above tabs. */
  header?: ReactNode
  /** Tab definitions. */
  tabs: TabItem[]
  /** Controlled active tab. */
  activeKey: string
  onChange: (key: string) => void
  /** Disable wrapping `.sc-content` if you want full-width layouts. */
  noPadding?: boolean
}

export function ShowcaseShell({ header, tabs, activeKey, onChange, noPadding }: ShowcaseShellProps) {
  return (
    <div className={noPadding ? 'sc-content sc-content-flush' : 'sc-content'} style={{ flex: 1 }}>
      <NotificationContainer />
      {header}
      <Tabs items={tabs} activeKey={activeKey} onChange={onChange} />
    </div>
  )
}
