import { useState, useEffect, useMemo } from 'react'
import {
  AppShell,
  Footer,
  Header,
  ThemeSwitcher,
} from '@skygraph-examples/shared-react/layout'
import type { NavItem } from '@skygraph-examples/shared-react/layout'
import {
  DEMO_URL,
  GITHUB_URL,
  SHOWCASES_URL,
} from '@skygraph-examples/shared'

import { CrmApp } from './showcases/crm/CrmApp'
import { EcommerceApp } from './showcases/ecommerce/EcommerceApp'
import { HrPortalApp } from './showcases/hr-portal/HrPortalApp'
import { FileManagerApp } from './showcases/file-manager/FileManagerApp'
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
  category: 'data' | 'comms' | 'productivity' | 'design'
  component: ComponentLike
}

const showcases: ShowcaseDef[] = [
  {
    key: 'table-kitchen-sink',
    icon: '🍳',
    title: 'Table — Kitchen Sink',
    description:
      'Every table feature in one demo: sorting, filtering, grouping, tree data, virtual scroll, drag & drop, inline editing, export, print, keyboard navigation, aggregation, pinned rows, and more.',
    tags: [
      'Table',
      'Sort',
      'Filter',
      'Group',
      'Tree',
      'Virtual',
      'DnD',
      'Export',
      'Print',
      'Aggregate',
    ],
    category: 'data',
    component: TableKitchenSinkApp,
  },
  {
    key: 'dashboard',
    icon: '📈',
    title: 'Operations Dashboard',
    description:
      'Live KPI dashboard with widget grid + drill-down tables and a layout editor mode. Hover toolbars on charts, widget actions, right-click context.',
    tags: [
      'Dashboard',
      'DashboardEditor',
      'Widgets',
      'LineChart',
      'BarChart',
      'AreaChart',
      'PieChart',
      'Drill-down',
      'Print',
    ],
    category: 'data',
    component: DashboardApp,
  },
  {
    key: 'crm',
    icon: '👥',
    title: 'CRM Dashboard',
    description:
      'Contacts/deals tables, drag-and-drop pipeline, account hierarchy tree and a ResourceCalendar of deal deadlines with conflict overlay.',
    tags: ['Table', 'Kanban', 'Tree', 'ResourceCalendar', 'Drawer', 'Modal', 'Form', 'Timeline'],
    category: 'productivity',
    component: CrmApp,
  },
  {
    key: 'helpdesk',
    icon: '🎫',
    title: 'Help Desk Tickets',
    description:
      'Ticketing queue with status segmentation, queue view, conversation timeline, customer replies and ticket creation.',
    tags: ['Table', 'Drawer', 'Form', 'Timeline', 'Tag', 'Segmented', 'Popconfirm'],
    category: 'comms',
    component: HelpDeskApp,
  },
  {
    key: 'chat',
    icon: '💬',
    title: 'Team Messenger',
    description:
      'Channel + DM list, message bubbles with reactions and attachments, @-mentions composer and member drawer.',
    tags: ['List', 'Avatar', 'Mentions', 'Timeline', 'Drawer', 'Badge'],
    category: 'comms',
    component: ChatApp,
  },
  {
    key: 'inbox',
    icon: '📬',
    title: 'Email Inbox',
    description:
      'Threaded email client with folders, labels, bulk actions, full-thread reading drawer and compose modal.',
    tags: ['Folders', 'Threading', 'Drawer', 'Modal', 'Form', 'Tag', 'Badge'],
    category: 'comms',
    component: InboxApp,
  },
  {
    key: 'ecommerce',
    icon: '🛒',
    title: 'E-Commerce Admin',
    description:
      'Product gallery with grid/list views, image carousel, order management, customers, refunds.',
    tags: ['Gallery', 'Carousel', 'Modal', 'Drawer', 'Steps', 'Form'],
    category: 'productivity',
    component: EcommerceApp,
  },
  {
    key: 'hr-portal',
    icon: '🏢',
    title: 'HR Portal',
    description:
      'Employee directory, org tree, leave calendar, onboarding flow, performance reviews and team assignment.',
    tags: ['Tree', 'Table', 'Calendar', 'Steps', 'Transfer', 'Collapse'],
    category: 'productivity',
    component: HrPortalApp,
  },
  {
    key: 'file-manager',
    icon: '📁',
    title: 'File Manager',
    description:
      'Tree-driven file browser with grid/list views, breadcrumb, upload, preview drawer, share and rename modals.',
    tags: ['Tree', 'VirtualList', 'Breadcrumb', 'Upload', 'Drawer', 'Modal'],
    category: 'productivity',
    component: FileManagerApp,
  },
  {
    key: 'admin',
    icon: '🔐',
    title: 'Permissions & Roles',
    description:
      'Users, audit log, role transfer, API keys, sessions and system settings across one admin panel.',
    tags: ['Transfer', 'Table', 'Drawer', 'Collapse', 'Switch', 'Popconfirm', 'Tabs'],
    category: 'productivity',
    component: AdminApp,
  },
  {
    key: 'workflow-editor',
    icon: '🔀',
    title: 'Workflow Editor',
    description:
      'Visio-like flowchart built on GraphEngine — drag nodes, switch routing, add nodes/edges, inspect topology.',
    tags: ['Diagram', 'GraphEngine', 'Drag', 'Orthogonal', 'Inspector'],
    category: 'design',
    component: WorkflowEditorApp,
  },
  {
    key: 'forms',
    icon: '📝',
    title: 'Forms Playground',
    description:
      'All form controls in one place: validation, wizard, dynamic field arrays, real-world layouts.',
    tags: [
      'Form',
      'Field',
      'Wizard',
      'TagInput',
      'PinInput',
      'InlineEdit',
      'Validation',
    ],
    category: 'design',
    component: FormsApp,
  },
]

const CATEGORIES: Array<{ key: ShowcaseDef['category'] | 'all'; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'data', label: 'Data & Tables' },
  { key: 'comms', label: 'Communication' },
  { key: 'productivity', label: 'Productivity & Admin' },
  { key: 'design', label: 'Design & Forms' },
]

function getRoute(): string {
  return window.location.hash.replace(/^#\/?/, '') || ''
}

function Hub({ onNavigate }: { onNavigate: (key: string) => void }) {
  const [category, setCategory] = useState<ShowcaseDef['category'] | 'all'>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return showcases.filter((s) => {
      if (category !== 'all' && s.category !== category) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [category, query])

  return (
    <div className="hub">
      <h1>SkyGraph Showcases</h1>
      <p className="hub-sub">
        Real-world mini-apps built with @skygraph/react — fake data, real
        components. {showcases.length} demos across {CATEGORIES.length - 1}{' '}
        categories.
      </p>

      <div className="hub-controls">
        <input
          className="hub-search"
          placeholder="Search demos by name, description or tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="hub-cats">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`hub-cat${category === c.key ? ' hub-cat--active' : ''}`}
              onClick={() => setCategory(c.key)}
            >
              {c.label}
              <span className="hub-cat-count">
                {c.key === 'all'
                  ? showcases.length
                  : showcases.filter((s) => s.category === c.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="hub-empty">No demos match your filters.</div>
      ) : (
        <div className="hub-grid">
          {filtered.map((s) => (
            <button
              key={s.key}
              className="hub-card"
              onClick={() => onNavigate(s.key)}
              type="button"
            >
              <div className="hub-card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="hub-card-tags">
                {s.tags.map((t) => (
                  <span key={t} className="hub-card-tag">
                    {t}
                  </span>
                ))}
              </div>
            </button>
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
    window.scrollTo({ top: 0 })
  }

  const showcase = showcases.find((s) => s.key === route)
  const navItems = useMemo<NavItem[]>(
    () => [
      { key: 'docs', label: '← Docs', href: DEMO_URL, external: true },
      { key: 'showcases', label: 'Showcases', href: '#' },
      { key: 'github', label: 'GitHub', href: GITHUB_URL, external: true },
    ],
    [],
  )

  const header = (
    <Header
      brand="SkyGraph"
      items={navItems}
      active={showcase ? null : 'showcases'}
      onBrandClick={() => navigate('')}
      onSelect={(key) => {
        if (key === 'showcases') navigate('')
      }}
      extras={<ThemeSwitcher />}
    />
  )

  const footer = (
    <Footer
      copyright="© 2026 SkyGraph contributors"
      version="v0.5.0"
      onSelect={(href) => {
        if (href === DEMO_URL) {
          window.location.href = DEMO_URL
        }
      }}
      columns={[
        {
          title: 'Showcases',
          links: [
            { label: 'All demos', href: '#' },
            { label: 'Source on GitHub', href: SHOWCASES_URL, external: true },
          ],
        },
        {
          title: 'Documentation',
          links: [
            { label: 'Demo site', href: DEMO_URL, external: true },
            { label: 'Components', href: `${DEMO_URL}#/components/button`, external: true },
            { label: 'Guide', href: `${DEMO_URL}#/guide/getting-started`, external: true },
          ],
        },
        {
          title: 'Community',
          links: [
            { label: 'GitHub', href: GITHUB_URL, external: true },
            { label: 'Issues', href: `${GITHUB_URL}/issues`, external: true },
          ],
        },
        {
          title: 'Project',
          links: [
            { label: 'Changelog', href: `${GITHUB_URL}/blob/master/CHANGELOG.md`, external: true },
            { label: 'License', href: `${GITHUB_URL}/blob/master/LICENSE`, external: true },
          ],
        },
      ]}
      extras={<ThemeSwitcher />}
    />
  )

  if (!showcase) {
    return (
      <AppShell section="showcases" header={header} footer={footer}>
        <Hub onNavigate={navigate} />
      </AppShell>
    )
  }

  const Comp = showcase.component
  return (
    <AppShell section={null} header={header} footer={null} flush>
      <div className="showcase-shell">
        <div className="showcase-topbar">
          <button
            type="button"
            className="showcase-back"
            onClick={() => navigate('')}
          >
            ← Back to hub
          </button>
          <span className="showcase-topbar-title">
            {showcase.icon} {showcase.title}
          </span>
        </div>
        <div className="showcase-body">
          <Comp />
        </div>
      </div>
    </AppShell>
  )
}
