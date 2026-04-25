import { useState, useEffect, useMemo } from 'react'
import '../../../packages/react/styles/index.css'
import './app.css'

import { SpinDemo } from './demos/SpinDemo'
import { ButtonDemo } from './demos/ButtonDemo'
import { InputDemo } from './demos/InputDemo'
import { CheckboxDemo } from './demos/CheckboxDemo'
import { RadioDemo } from './demos/RadioDemo'
import { SwitchDemo } from './demos/SwitchDemo'
import { SelectDemo } from './demos/SelectDemo'
import { TabsDemo } from './demos/TabsDemo'
import { TooltipDemo } from './demos/TooltipDemo'
import { ModalDemo } from './demos/ModalDemo'
import { FormDemo } from './demos/FormDemo'
import { TableDemo } from './demos/TableDemo'
import { NotificationDemo } from './demos/NotificationDemo'
import { DrawerDemo } from './demos/DrawerDemo'
import { PopconfirmDemo } from './demos/PopconfirmDemo'
import { BadgeDemo } from './demos/BadgeDemo'
import { TagDemo } from './demos/TagDemo'
import { AvatarDemo } from './demos/AvatarDemo'
import { BreadcrumbDemo } from './demos/BreadcrumbDemo'
import { PaginationDemo } from './demos/PaginationDemo'
import { DropdownDemo } from './demos/DropdownDemo'
import { ProgressDemo } from './demos/ProgressDemo'
import { TreeDemo } from './demos/TreeDemo'
import { MenuDemo } from './demos/MenuDemo'
import { CollapseDemo } from './demos/CollapseDemo'
import { ColorPickerDemo } from './demos/ColorPickerDemo'
import { EmptyDemo } from './demos/EmptyDemo'
import { ResultDemo } from './demos/ResultDemo'
import { SkeletonDemo } from './demos/SkeletonDemo'
import { SegmentedDemo } from './demos/SegmentedDemo'
import { StepsDemo } from './demos/StepsDemo'
import { TimelineDemo } from './demos/TimelineDemo'
import { CarouselDemo } from './demos/CarouselDemo'
import { DescriptionsDemo } from './demos/DescriptionsDemo'
import { ListDemo } from './demos/ListDemo'
import { TransferDemo } from './demos/TransferDemo'
import { TreeSelectDemo } from './demos/TreeSelectDemo'
import { CascaderDemo } from './demos/CascaderDemo'
import { CalendarDemo } from './demos/CalendarDemo'
import { ThemeToggle } from './demos/ThemeToggle'
import { GettingStartedPage } from './demos/GettingStartedPage'
import { ThemingPage } from './demos/ThemingPage'
import { CoreApiPage } from './demos/CoreApiPage'
import { StylingShowcasePage } from './demos/StylingShowcasePage'

// ---------------------------------------------------------------------------

type MenuItem = { key: string; label: string; disabled?: boolean }
type MenuSection = { title: string; items: MenuItem[] }

const menu: MenuSection[] = [
  {
    title: 'Guide',
    items: [
      { key: 'overview', label: 'Overview' },
      { key: 'getting-started', label: 'Getting Started' },
      { key: 'styling-showcase', label: 'Styling Showcase' },
      { key: 'theming', label: 'Theming' },
      { key: 'core-api', label: 'Core API' },
    ],
  },
  {
    title: 'General',
    items: [
      { key: 'components/button', label: 'Button' },
      { key: 'components/spin', label: 'Spin' },
    ],
  },
  {
    title: 'Data Entry',
    items: [
      { key: 'components/input', label: 'Input' },
      { key: 'components/select', label: 'Select' },
      { key: 'components/checkbox', label: 'Checkbox' },
      { key: 'components/radio', label: 'Radio' },
      { key: 'components/switch', label: 'Switch' },
      { key: 'components/slider', label: 'Slider', disabled: true },
      { key: 'components/colorpicker', label: 'ColorPicker' },
      { key: 'components/cascader', label: 'Cascader' },
      { key: 'components/treeselect', label: 'TreeSelect' },
      { key: 'components/transfer', label: 'Transfer' },
      { key: 'components/calendar', label: 'Calendar' },
      { key: 'components/form', label: 'Form' },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { key: 'components/table', label: 'Table' },
      { key: 'components/tree', label: 'Tree' },
      { key: 'components/list', label: 'List' },
      { key: 'components/descriptions', label: 'Descriptions' },
      { key: 'components/collapse', label: 'Collapse' },
      { key: 'components/carousel', label: 'Carousel' },
      { key: 'components/badge', label: 'Badge' },
      { key: 'components/tag', label: 'Tag' },
      { key: 'components/avatar', label: 'Avatar' },
      { key: 'components/tooltip', label: 'Tooltip' },
      { key: 'components/timeline', label: 'Timeline' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { key: 'components/modal', label: 'Modal' },
      { key: 'components/drawer', label: 'Drawer' },
      { key: 'components/notification', label: 'Notification' },
      { key: 'components/popconfirm', label: 'Popconfirm' },
      { key: 'components/progress', label: 'Progress' },
      { key: 'components/result', label: 'Result' },
      { key: 'components/skeleton', label: 'Skeleton' },
      { key: 'components/empty', label: 'Empty' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { key: 'components/tabs', label: 'Tabs' },
      { key: 'components/menu', label: 'Menu' },
      { key: 'components/breadcrumb', label: 'Breadcrumb' },
      { key: 'components/dropdown', label: 'Dropdown' },
      { key: 'components/pagination', label: 'Pagination' },
      { key: 'components/steps', label: 'Steps' },
      { key: 'components/segmented', label: 'Segmented' },
    ],
  },
]

const pages: Record<string, () => JSX.Element> = {
  'components/spin': SpinDemo,
  'components/button': ButtonDemo,
  'components/input': InputDemo,
  'components/checkbox': CheckboxDemo,
  'components/radio': RadioDemo,
  'components/switch': SwitchDemo,
  'components/select': SelectDemo,
  'components/tabs': TabsDemo,
  'components/tooltip': TooltipDemo,
  'components/modal': ModalDemo,
  'components/form': FormDemo,
  'components/table': TableDemo,
  'components/notification': NotificationDemo,
  'components/drawer': DrawerDemo,
  'components/popconfirm': PopconfirmDemo,
  'components/badge': BadgeDemo,
  'components/tag': TagDemo,
  'components/avatar': AvatarDemo,
  'components/breadcrumb': BreadcrumbDemo,
  'components/pagination': PaginationDemo,
  'components/dropdown': DropdownDemo,
  'components/progress': ProgressDemo,
  'components/tree': TreeDemo,
  'components/treeselect': TreeSelectDemo,
  'components/cascader': CascaderDemo,
  'components/list': ListDemo,
  'components/transfer': TransferDemo,
  'components/calendar': CalendarDemo,
  'components/menu': MenuDemo,
  'components/collapse': CollapseDemo,
  'components/colorpicker': ColorPickerDemo,
  'components/empty': EmptyDemo,
  'components/result': ResultDemo,
  'components/skeleton': SkeletonDemo,
  'components/segmented': SegmentedDemo,
  'components/steps': StepsDemo,
  'components/timeline': TimelineDemo,
  'components/carousel': CarouselDemo,
  'components/descriptions': DescriptionsDemo,
  'getting-started': GettingStartedPage,
  'styling-showcase': StylingShowcasePage,
  'theming': ThemingPage,
  'core-api': CoreApiPage,
}

// ---------------------------------------------------------------------------

function getHashRoute(): string {
  const h = window.location.hash.replace(/^#\/?/, '')
  return h || 'overview'
}

function navigate(key: string) {
  window.location.hash = '#/' + key
}

// ---------------------------------------------------------------------------

const COMPONENT_COUNT = Object.keys(pages).filter(k => k.startsWith('components/')).length

function Overview() {
  return (
    <section className="doc-page">
      <div className="doc-hero">
        <h1>SkyGraph</h1>
        <p className="doc-hero-tagline">Reactive UI Library</p>
        <p className="doc-hero-sub">
          Headless reactive core + 50+ styled components.
          TypeScript-first. Zero runtime CSS-in-JS.
        </p>
        <pre className="doc-code doc-hero-install"><code>npm install @skygraph/core @skygraph/react</code></pre>
      </div>

      <div className="doc-features">
        <div className="doc-feature-card">
          <div className="doc-feature-icon">⚡</div>
          <strong>Reactive Core</strong>
          <span>
            Fine-grained subscriptions. Batch updates. No re-render waterfalls.
          </span>
        </div>
        <div className="doc-feature-card">
          <div className="doc-feature-icon">🧩</div>
          <strong>{COMPONENT_COUNT}+ Components</strong>
          <span>
            Forms, tables, trees, modals, pickers — production-ready out of the box.
          </span>
        </div>
        <div className="doc-feature-card">
          <div className="doc-feature-icon">🎨</div>
          <strong>Zero Runtime CSS</strong>
          <span>
            Pure CSS variables. Dark mode in one attribute. No styled-components.
          </span>
        </div>
      </div>

      <h2>Browse Components</h2>
      <div className="demo-overview-grid">
        {menu
          .filter(s => s.title !== 'Guide')
          .map(section => (
            section.items
              .filter(m => !m.disabled)
              .map(m => (
                <div
                  key={m.key}
                  className="demo-overview-card"
                  onClick={() => navigate(m.key)}
                >
                  <strong>{m.label}</strong>
                  <span className="demo-overview-card-section">{section.title}</span>
                </div>
              ))
          ))}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------

export default function App() {
  const [route, setRoute] = useState(getHashRoute)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onHash = () => setRoute(getHashRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const Page = useMemo(() => {
    if (route === 'overview') return Overview
    return pages[route] ?? Overview
  }, [route])

  const filteredMenu = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return menu
    return menu
      .map(s => ({
        ...s,
        items: s.items.filter(i => i.label.toLowerCase().includes(q)),
      }))
      .filter(s => s.items.length > 0)
  }, [query])

  return (
    <div className="demo-layout">
      <aside className="demo-sidebar">
        <div
          className="demo-logo"
          onClick={() => navigate('overview')}
          style={{ cursor: 'pointer' }}
        >
          <span className="demo-logo-dot" />
          SkyGraph
        </div>
        <div className="demo-search">
          <input
            placeholder="Search components…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search components"
          />
        </div>
        <nav className="demo-nav">
          {filteredMenu.length === 0 && (
            <div style={{ padding: '16px 20px', fontSize: 12, opacity: 0.6 }}>
              No matches.
            </div>
          )}
          {filteredMenu.map(section => (
            <div key={section.title} className="demo-nav-section">
              <div className="demo-nav-section-title">{section.title}</div>
              {section.items.map(item => (
                <div
                  key={item.key}
                  className={[
                    'demo-nav-item',
                    route === item.key ? 'demo-nav-item-active' : '',
                    item.disabled ? 'demo-nav-item-disabled' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => {
                    if (!item.disabled) navigate(item.key)
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </nav>
        <div className="demo-sidebar-footer">
          <ThemeToggle />
          <span style={{ fontSize: 11, color: 'var(--sg-color-text-tertiary)' }}>
            v0.3
          </span>
        </div>
      </aside>
      <main className="demo-main">
        <div className="demo-topbar">
          <a href="#/styling-showcase" onClick={(e) => { e.preventDefault(); navigate('styling-showcase') }}>
            Styling Showcase
          </a>
          <a href="#/theming" onClick={(e) => { e.preventDefault(); navigate('theming') }}>
            Theming
          </a>
          <a href="#/getting-started" onClick={(e) => { e.preventDefault(); navigate('getting-started') }}>
            Getting Started
          </a>
          <a
            href="https://github.com/skygraph/skygraph"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          <span style={{ flex: 1 }} />
          <ThemeToggle />
        </div>
        <Page />
      </main>
    </div>
  )
}
