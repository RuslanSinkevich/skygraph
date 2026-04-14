import { useState, useEffect } from 'react'
import { CrmApp } from './showcases/crm/CrmApp'
import { EcommerceApp } from './showcases/ecommerce/EcommerceApp'
import { ProjectTrackerApp } from './showcases/project-tracker/ProjectTrackerApp'
import { HrPortalApp } from './showcases/hr-portal/HrPortalApp'
import { FileManagerApp } from './showcases/file-manager/FileManagerApp'
import { AnalyticsApp } from './showcases/analytics/AnalyticsApp'

const showcases = [
  {
    key: 'crm',
    icon: '👥',
    title: 'CRM Dashboard',
    description: 'Customer management with contacts table, deal pipeline, activity timeline and client cards.',
    tags: ['Table', 'Drawer', 'Form', 'Tag', 'Badge', 'Timeline', 'Avatar', 'Tabs', 'Progress'],
    component: CrmApp,
  },
  {
    key: 'ecommerce',
    icon: '🛒',
    title: 'E-Commerce Admin',
    description: 'Product catalog with inline editing, order management, category tree and order status tracking.',
    tags: ['DataGrid', 'Table', 'Cascader', 'Steps', 'Upload', 'Descriptions', 'InputNumber', 'Modal'],
    component: EcommerceApp,
  },
  {
    key: 'project-tracker',
    icon: '📋',
    title: 'Project Tracker',
    description: 'Task management with project hierarchy, sprint board, calendar deadlines and team overview.',
    tags: ['Table', 'Tree', 'Calendar', 'Form', 'DatePicker', 'Tag', 'Progress', 'Breadcrumb', 'Dropdown'],
    component: ProjectTrackerApp,
  },
  {
    key: 'hr-portal',
    icon: '🏢',
    title: 'HR Portal',
    description: 'Employee directory, org tree, leave calendar, onboarding form and team assignment.',
    tags: ['Tree', 'Table', 'SchemaForm', 'Calendar', 'RangePicker', 'Transfer', 'Collapse', 'Segmented'],
    component: HrPortalApp,
  },
  {
    key: 'file-manager',
    icon: '📁',
    title: 'File Manager',
    description: 'File browser with folder tree, virtual scrolling, upload, breadcrumb navigation and context menus.',
    tags: ['Tree', 'VirtualList', 'Breadcrumb', 'Upload', 'Modal', 'Popconfirm', 'Menu', 'Empty', 'Skeleton'],
    component: FileManagerApp,
  },
  {
    key: 'analytics',
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Business metrics with summary tables, date range filters, KPI cards and report views.',
    tags: ['Table', 'DatePicker', 'RangePicker', 'Segmented', 'Descriptions', 'Tabs', 'Progress', 'Result'],
    component: AnalyticsApp,
  },
]

function getRoute(): string {
  return window.location.hash.replace(/^#\/?/, '') || ''
}

function Hub({ onNavigate }: { onNavigate: (key: string) => void }) {
  return (
    <div className="hub">
      <h1>SkyGraph Showcases</h1>
      <p className="hub-sub">
        Real-world mini-apps built with @skygraph/react — fake data, real components.
      </p>
      <div className="hub-grid">
        {showcases.map(s => (
          <div key={s.key} className="hub-card" onClick={() => onNavigate(s.key)}>
            <div className="hub-card-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <div className="hub-card-tags">
              {s.tags.map(t => (
                <span key={t} className="hub-card-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (key: string) => {
    window.location.hash = key ? '#/' + key : '#'
  }

  const showcase = showcases.find(s => s.key === route)
  if (!showcase) return <Hub onNavigate={navigate} />

  const Comp = showcase.component
  return (
    <div className="showcase-shell">
      <div className="showcase-topbar">
        <button className="showcase-back" onClick={() => navigate('')}>
          ← Back
        </button>
        <span className="showcase-topbar-title">{showcase.icon} {showcase.title}</span>
      </div>
      <div className="showcase-body">
        <Comp />
      </div>
    </div>
  )
}
