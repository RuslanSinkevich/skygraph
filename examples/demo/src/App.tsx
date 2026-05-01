import type React from 'react'
import { useState, useEffect, useMemo } from 'react'
import '../../../packages/react/styles/index.css'
import './app.css'
import { NotificationContainer } from '@skygraph/react'

import { SpinDemo } from './demos/SpinDemo'
import { ButtonDemo } from './demos/ButtonDemo'
import { InputDemo } from './demos/InputDemo'
import { InputNumberDemo } from './demos/InputNumberDemo'
import { SliderDemo } from './demos/SliderDemo'
import { RateDemo } from './demos/RateDemo'
import { CheckboxDemo } from './demos/CheckboxDemo'
import { RadioDemo } from './demos/RadioDemo'
import { SwitchDemo } from './demos/SwitchDemo'
import { SelectDemo } from './demos/SelectDemo'
import { AutoCompleteDemo } from './demos/AutoCompleteDemo'
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
import { DatePickerDemo } from './demos/DatePickerDemo'
import { TimePickerDemo } from './demos/TimePickerDemo'
import { UploadDemo } from './demos/UploadDemo'
import { ThemeToggle } from './demos/ThemeToggle'
import { GettingStartedPage } from './demos/GettingStartedPage'
import { ThemingPage } from './demos/ThemingPage'
import { CoreApiPage } from './demos/CoreApiPage'
import { StylingShowcasePage } from './demos/StylingShowcasePage'
import { DesignTokensPage } from './demos/DesignTokensPage'
import { ConfigProviderDemo } from './demos/ConfigProviderDemo'
import { DiagramDemo } from './demos/DiagramDemo'
import { ChartsDemo } from './demos/ChartsDemo'
import { DashboardDemo } from './demos/DashboardDemo'

import { useI18n, LanguageSwitch } from './i18n'
import type { DemoDict } from './i18n'

// ---------------------------------------------------------------------------

type MenuItem = { key: string; label: string; disabled?: boolean }
type MenuSection = { title: string; items: MenuItem[] }

/**
 * Build the sidebar menu for the current locale.
 *
 * Component names ("Button", "Input", "Modal", ...) are technical terms and
 * stay the same in both languages — only group titles and Guide entries are
 * localized.
 */
function buildMenu(t: DemoDict): MenuSection[] {
  return [
    {
      title: t.menuSections.guide,
      items: [
        { key: 'overview', label: t.menuItems.overview },
        { key: 'getting-started', label: t.menuItems.gettingStarted },
        { key: 'styling-showcase', label: t.menuItems.stylingShowcase },
        { key: 'theming', label: t.menuItems.theming },
        { key: 'design-tokens', label: t.menuItems.designTokens },
        { key: 'core-api', label: t.menuItems.coreApi },
        { key: 'config-provider', label: t.menuItems.configProvider },
      ],
    },
    {
      title: t.menuSections.general,
      items: [
        { key: 'components/button', label: 'Button' },
        { key: 'components/spin', label: 'Spin' },
      ],
    },
    {
      title: t.menuSections.dataEntry,
      items: [
        { key: 'components/input', label: 'Input' },
        { key: 'components/inputnumber', label: 'InputNumber' },
        { key: 'components/select', label: 'Select' },
        { key: 'components/autocomplete', label: 'AutoComplete' },
        { key: 'components/checkbox', label: 'Checkbox' },
        { key: 'components/radio', label: 'Radio' },
        { key: 'components/switch', label: 'Switch' },
        { key: 'components/slider', label: 'Slider' },
        { key: 'components/rate', label: 'Rate' },
        { key: 'components/colorpicker', label: 'ColorPicker' },
        { key: 'components/datepicker', label: 'DatePicker' },
        { key: 'components/timepicker', label: 'TimePicker' },
        { key: 'components/upload', label: 'Upload' },
        { key: 'components/cascader', label: 'Cascader' },
        { key: 'components/treeselect', label: 'TreeSelect' },
        { key: 'components/transfer', label: 'Transfer' },
        { key: 'components/calendar', label: 'Calendar' },
        { key: 'components/form', label: 'Form' },
      ],
    },
    {
      title: t.menuSections.dataDisplay,
      items: [
        { key: 'components/table', label: 'Table' },
        { key: 'components/tree', label: 'Tree' },
        { key: 'components/list', label: 'List' },
        { key: 'components/diagram', label: 'Diagram' },
        { key: 'components/charts', label: 'Charts' },
        { key: 'components/dashboard', label: 'Dashboard' },
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
      title: t.menuSections.feedback,
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
      title: t.menuSections.navigation,
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
}

const pages: Record<string, () => React.JSX.Element> = {
  'components/spin': SpinDemo,
  'components/button': ButtonDemo,
  'components/input': InputDemo,
  'components/inputnumber': InputNumberDemo,
  'components/slider': SliderDemo,
  'components/rate': RateDemo,
  'components/checkbox': CheckboxDemo,
  'components/radio': RadioDemo,
  'components/switch': SwitchDemo,
  'components/select': SelectDemo,
  'components/autocomplete': AutoCompleteDemo,
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
  'components/datepicker': DatePickerDemo,
  'components/timepicker': TimePickerDemo,
  'components/upload': UploadDemo,
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
  'components/diagram': DiagramDemo,
  'components/charts': ChartsDemo,
  'components/dashboard': DashboardDemo,
  'getting-started': GettingStartedPage,
  'styling-showcase': StylingShowcasePage,
  'theming': ThemingPage,
  'design-tokens': DesignTokensPage,
  'core-api': CoreApiPage,
  'config-provider': ConfigProviderDemo,
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
  const { t } = useI18n()
  const menu = useMemo(() => buildMenu(t), [t])

  return (
    <section className="doc-page">
      <div className="doc-hero">
        <h1>{t.app.appTitle}</h1>
        <p className="doc-hero-tagline">{t.app.tagline}</p>
        <p className="doc-hero-sub">{t.app.heroSub}</p>
        <pre className="doc-code doc-hero-install"><code>npm install @skygraph/core @skygraph/react</code></pre>
      </div>

      <div className="doc-features">
        <div className="doc-feature-card">
          <div className="doc-feature-icon">⚡</div>
          <strong>{t.features.reactiveCoreTitle}</strong>
          <span>{t.features.reactiveCoreDesc}</span>
        </div>
        <div className="doc-feature-card">
          <div className="doc-feature-icon">🧩</div>
          <strong>{COMPONENT_COUNT}{t.app.componentsBadgeSuffix}</strong>
          <span>{t.features.componentsDesc}</span>
        </div>
        <div className="doc-feature-card">
          <div className="doc-feature-icon">🎨</div>
          <strong>{t.features.zeroRuntimeTitle}</strong>
          <span>{t.features.zeroRuntimeDesc}</span>
        </div>
      </div>

      <h2>{t.overview.browseHeading}</h2>
      <div className="demo-overview-grid">
        {menu
          .filter(s => s.title !== t.menuSections.guide)
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
  const { t } = useI18n()
  const [route, setRoute] = useState(getHashRoute)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onHash = () => setRoute(getHashRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const menu = useMemo(() => buildMenu(t), [t])

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
  }, [query, menu])

  return (
    <div className="demo-layout">
      <aside className="demo-sidebar">
        <div
          className="demo-logo"
          onClick={() => navigate('overview')}
          style={{ cursor: 'pointer' }}
        >
          <span className="demo-logo-dot" />
          {t.app.appTitle}
        </div>
        <div className="demo-search">
          <input
            placeholder={t.search.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t.search.ariaLabel}
          />
        </div>
        <nav className="demo-nav">
          {filteredMenu.length === 0 && (
            <div style={{ padding: '16px 20px', fontSize: 12, opacity: 0.6 }}>
              {t.search.noMatches}
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
          <LanguageSwitch />
          <span style={{ fontSize: 11, color: 'var(--sg-color-text-tertiary)' }}>
            v0.3
          </span>
        </div>
      </aside>
      <main className="demo-main">
        <div className="demo-topbar">
          <a href="#/styling-showcase" onClick={(e) => { e.preventDefault(); navigate('styling-showcase') }}>
            {t.topbar.stylingShowcase}
          </a>
          <a href="#/theming" onClick={(e) => { e.preventDefault(); navigate('theming') }}>
            {t.topbar.theming}
          </a>
          <a href="#/getting-started" onClick={(e) => { e.preventDefault(); navigate('getting-started') }}>
            {t.topbar.gettingStarted}
          </a>
          <a
            href="https://github.com/skygraph/skygraph"
            target="_blank"
            rel="noreferrer noopener"
          >
            {t.topbar.github}
          </a>
          <span style={{ flex: 1 }} />
          <ThemeToggle />
        </div>
        <Page />
      </main>
      <NotificationContainer placement="topRight" />
      <NotificationContainer placement="topLeft" />
      <NotificationContainer placement="bottomRight" />
    </div>
  )
}
