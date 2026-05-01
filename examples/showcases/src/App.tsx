import { useState, useEffect, useMemo } from 'react'
import { CrmApp } from './showcases/crm/CrmApp'
import { EcommerceApp } from './showcases/ecommerce/EcommerceApp'
import { ProjectTrackerApp } from './showcases/project-tracker/ProjectTrackerApp'
import { HrPortalApp } from './showcases/hr-portal/HrPortalApp'
import { FileManagerApp } from './showcases/file-manager/FileManagerApp'
import { AnalyticsApp } from './showcases/analytics/AnalyticsApp'
import { AdminApp } from './showcases/admin/AdminApp'
import { FormsApp } from './showcases/forms/FormsApp'
import { TableKitchenSinkApp } from './showcases/table-kitchen-sink/TableKitchenSinkApp'
import { WorkflowEditorApp } from './showcases/workflow-editor/WorkflowEditorApp'
import { DashboardApp } from './showcases/dashboard'
import { ChatApp } from './showcases/chat'
import { HelpDeskApp } from './showcases/helpdesk'
import { InboxApp } from './showcases/inbox'

type ComponentLike = () => React.ReactElement | null

interface ShowcaseDef {
  key: string
  icon: string
  title: string
  description: string
  tags: string[]
  category: 'data' | 'comms' | 'productivity' | 'admin' | 'design'
  component: ComponentLike
}

const showcases: ShowcaseDef[] = [
  {
    key: 'table-kitchen-sink',
    icon: '🍳',
    title: 'Table — Kitchen Sink',
    description: 'Every table feature in one demo: sorting, filtering, grouping, tree data, virtual scroll, drag & drop, inline editing, export, print, keyboard navigation, aggregation, pinned rows, and more.',
    tags: ['Table', 'Sort', 'Filter', 'Group', 'Tree', 'Virtual', 'DnD', 'Export', 'Print', 'Aggregate'],
    category: 'data',
    component: TableKitchenSinkApp,
  },
  {
    key: 'dashboard',
    icon: '📈',
    title: 'Operations Dashboard',
    description: 'Live KPI dashboard with widget grid, mixed charts (line/bar/area/pie), service health and activity feed.',
    tags: ['Dashboard', 'Widgets', 'LineChart', 'BarChart', 'AreaChart', 'PieChart', 'RangePicker', 'StatsRow', 'Progress'],
    category: 'data',
    component: DashboardApp,
  },
  {
    key: 'analytics',
    icon: '📊',
    title: 'Analytics Workbench',
    description: 'Drill into KPI tables, channels, products and alerts. Period segmented controls and chart drill-downs.',
    tags: ['Tabs', 'Charts', 'Table', 'Drawer', 'Segmented', 'Progress'],
    category: 'data',
    component: AnalyticsApp,
  },
  {
    key: 'crm',
    icon: '👥',
    title: 'CRM Dashboard',
    description: 'Contacts table + drag-and-drop deal pipeline + activity timeline. Bulk actions and contact drawer.',
    tags: ['Table', 'Kanban', 'Timeline', 'Drawer', 'Modal', 'Form', 'Avatar'],
    category: 'productivity',
    component: CrmApp,
  },
  {
    key: 'project-tracker',
    icon: '📋',
    title: 'Project Tracker',
    description: 'Tasks list, drag-and-drop sprint board, project hierarchy and calendar of deadlines.',
    tags: ['Table', 'Kanban', 'Tree', 'Calendar', 'DatePicker', 'Form'],
    category: 'productivity',
    component: ProjectTrackerApp,
  },
  {
    key: 'helpdesk',
    icon: '🎫',
    title: 'Help Desk Tickets',
    description: 'Ticketing queue with status segmentation, queue view, conversation timeline, customer replies and ticket creation.',
    tags: ['Table', 'Drawer', 'Form', 'Timeline', 'Tag', 'Segmented', 'Popconfirm'],
    category: 'comms',
    component: HelpDeskApp,
  },
  {
    key: 'chat',
    icon: '💬',
    title: 'Team Messenger',
    description: 'Channel + DM list, message bubbles with reactions and attachments, @-mentions composer and member drawer.',
    tags: ['List', 'Avatar', 'Mentions', 'Timeline', 'Drawer', 'Badge'],
    category: 'comms',
    component: ChatApp,
  },
  {
    key: 'inbox',
    icon: '📬',
    title: 'Email Inbox',
    description: 'Threaded email client with folders, labels, bulk actions, full-thread reading drawer and compose modal.',
    tags: ['Folders', 'Threading', 'Drawer', 'Modal', 'Form', 'Tag', 'Badge'],
    category: 'comms',
    component: InboxApp,
  },
  {
    key: 'ecommerce',
    icon: '🛒',
    title: 'E-Commerce Admin',
    description: 'Product gallery with grid/list views, image carousel, order management, customers, refunds.',
    tags: ['Gallery', 'Carousel', 'Modal', 'Drawer', 'Steps', 'Form'],
    category: 'productivity',
    component: EcommerceApp,
  },
  {
    key: 'hr-portal',
    icon: '🏢',
    title: 'HR Portal',
    description: 'Employee directory, org tree, leave calendar, onboarding flow, performance reviews and team assignment.',
    tags: ['Tree', 'Table', 'Calendar', 'Steps', 'Transfer', 'Collapse'],
    category: 'productivity',
    component: HrPortalApp,
  },
  {
    key: 'file-manager',
    icon: '📁',
    title: 'File Manager',
    description: 'Tree-driven file browser with grid/list views, breadcrumb, upload, preview drawer, share and rename modals.',
    tags: ['Tree', 'VirtualList', 'Breadcrumb', 'Upload', 'Drawer', 'Modal'],
    category: 'productivity',
    component: FileManagerApp,
  },
  {
    key: 'admin',
    icon: '🔐',
    title: 'Permissions & Roles',
    description: 'Users, audit log, role transfer, API keys, sessions and system settings across one admin panel.',
    tags: ['Transfer', 'Table', 'Drawer', 'Collapse', 'Switch', 'Popconfirm', 'Tabs'],
    category: 'admin',
    component: AdminApp,
  },
  {
    key: 'workflow-editor',
    icon: '🔀',
    title: 'Workflow Editor',
    description: 'Visio-like flowchart built on GraphEngine — drag nodes, switch routing, add nodes/edges, inspect topology.',
    tags: ['Diagram', 'GraphEngine', 'Drag', 'Orthogonal', 'Inspector'],
    category: 'design',
    component: WorkflowEditorApp,
  },
  {
    key: 'forms',
    icon: '📝',
    title: 'Forms Playground',
    description: 'All form controls in one place: validation, wizard, dynamic field arrays, real-world layouts.',
    tags: ['Form', 'Field', 'Wizard', 'TagInput', 'PinInput', 'InlineEdit', 'Validation'],
    category: 'design',
    component: FormsApp,
  },
]

const CATEGORIES: Array<{ key: ShowcaseDef['category'] | 'all'; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'data', label: 'Data & Tables' },
  { key: 'comms', label: 'Communication' },
  { key: 'productivity', label: 'Productivity' },
  { key: 'admin', label: 'Admin' },
  { key: 'design', label: 'Design & Forms' },
]

function getRoute(): string {
  return window.location.hash.replace(/^#\/?/, '') || ''
}

function Hub({ onNavigate }: { onNavigate: (key: string) => void }) {
  const [category, setCategory] = useState<ShowcaseDef['category'] | 'all'>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return showcases.filter(s => {
      if (category !== 'all' && s.category !== category) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      )
    })
  }, [category, query])

  return (
    <div className="hub">
      <h1>SkyGraph Showcases</h1>
      <p className="hub-sub">
        Real-world mini-apps built with @skygraph/react — fake data, real components. {showcases.length} demos across {CATEGORIES.length - 1} categories.
      </p>

      <div className="hub-controls">
        <input
          className="hub-search"
          placeholder="Search demos by name, description or tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="hub-cats">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              className={`hub-cat${category === c.key ? ' hub-cat--active' : ''}`}
              onClick={() => setCategory(c.key)}
            >
              {c.label}
              <span className="hub-cat-count">
                {c.key === 'all' ? showcases.length : showcases.filter(s => s.category === c.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="hub-empty">No demos match your filters.</div>
      ) : (
        <div className="hub-grid">
          {filtered.map(s => (
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
      )}
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
