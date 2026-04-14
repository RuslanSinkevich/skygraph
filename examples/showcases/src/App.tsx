import { useState, useEffect } from 'react'
import { CrmApp } from './showcases/crm/CrmApp'
import { EcommerceApp } from './showcases/ecommerce/EcommerceApp'
import { ProjectTrackerApp } from './showcases/project-tracker/ProjectTrackerApp'
import { HrPortalApp } from './showcases/hr-portal/HrPortalApp'
import { FileManagerApp } from './showcases/file-manager/FileManagerApp'
import { AnalyticsApp } from './showcases/analytics/AnalyticsApp'
import { AdminApp } from './showcases/admin/AdminApp'
import { FormsApp } from './showcases/forms/FormsApp'
import { TableKitchenSinkApp } from './showcases/table-kitchen-sink/TableKitchenSinkApp'

const showcases = [
  {
    key: 'table-kitchen-sink',
    icon: '🍳',
    title: 'Table — Kitchen Sink',
    description: 'Every table feature in one demo: sorting, filtering, grouping, tree data, virtual scroll, drag & drop, inline editing, export, print, keyboard navigation, aggregation, pinned rows, and more.',
    tags: ['Table', 'Sort', 'Filter', 'Group', 'Tree', 'Virtual', 'DnD', 'Export', 'Print', 'Aggregate'],
    component: TableKitchenSinkApp,
  },
  {
    key: 'crm',
    icon: '👥',
    title: 'CRM Dashboard',
    description: 'Customer management with contacts table, deal pipeline, activity timeline, modals and bulk actions.',
    tags: ['Table', 'Drawer', 'Modal', 'Form', 'Tag', 'Timeline', 'Avatar', 'Tabs', 'Popconfirm', 'Dropdown'],
    component: CrmApp,
  },
  {
    key: 'ecommerce',
    icon: '🛒',
    title: 'E-Commerce Admin',
    description: 'Product catalog with inline editing, order management, customers, refunds and product modals.',
    tags: ['Table', 'Modal', 'Drawer', 'Cascader', 'Steps', 'Form', 'Descriptions', 'Popconfirm', 'Dropdown'],
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
    description: 'Business metrics with summary tables, date range filters, KPI cards, alerts and report views.',
    tags: ['Table', 'Segmented', 'Descriptions', 'Tabs', 'Progress', 'Result', 'Modal', 'Drawer', 'Form', 'Rate'],
    component: AnalyticsApp,
  },
  {
    key: 'admin',
    icon: '🔐',
    title: 'Admin Panel',
    description: 'User management with roles & permissions, audit log, access control and system settings.',
    tags: ['Table', 'Modal', 'Drawer', 'Form', 'Transfer', 'Collapse', 'Switch', 'Popconfirm', 'Dropdown'],
    component: AdminApp,
  },
  {
    key: 'forms',
    icon: '📝',
    title: 'Forms Playground',
    description: 'Complete forms showcase: all controls, validation, multi-step wizard, dynamic fields, layouts and real-world mockups.',
    tags: ['Form', 'Field', 'InputPassword', 'SearchInput', 'TagInput', 'PinInput', 'InlineEdit', 'InputGroup', 'Validation', 'Wizard'],
    component: FormsApp,
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
