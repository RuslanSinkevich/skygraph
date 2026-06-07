import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import '@skygraph/styles'
import './app.css'
import './components/DemoTOC/demo-toc.css'
import '@skygraph-examples/shared-react/layout/styles.css'
import {
  AppShell,
  Footer,
  Header,
  LanguageSwitcher,
  Sidebar,
  ThemeSwitcher,
} from '@skygraph-examples/shared-react/layout'
import type {
  AppShellSection,
  NavItem,
  SidebarSection,
} from '@skygraph-examples/shared-react/layout'
import { GITHUB_URL } from '@skygraph-examples/shared'
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
import { GettingStartedPage } from './demos/GettingStartedPage'
import { ThemingPage } from './demos/ThemingPage'
import { CoreApiPage } from './demos/CoreApiPage'
import { StylingShowcasePage } from './demos/StylingShowcasePage'
import { DesignTokensPage } from './demos/DesignTokensPage'
import { ConfigProviderDemo } from './demos/ConfigProviderDemo'
import { ChartsDemo } from './demos/ChartsDemo'
import { DiagramDemo } from './demos/DiagramDemo'
import { DashboardDemo } from './demos/DashboardDemo'
import { GanttDemo } from './demos/GanttDemo'
import { EventTimelineDemo } from './demos/EventTimelineDemo'
import { ResourceCalendarDemo } from './demos/ResourceCalendarDemo'

import { Landing } from './pages/Landing/Landing'
import { Roadmap } from './pages/Roadmap/Roadmap'
import { About } from './pages/About/About'
import { BenchmarksPage } from './pages/Benchmarks/BenchmarksPage'
import { ShowcasesPage } from './pages/Showcases/ShowcasesPage'
import './pages/Benchmarks/benchmarks.css'

import { TableBenchmark } from './demos/benchmarks/TableBenchmark'
import { TreeBenchmark } from './demos/benchmarks/TreeBenchmark'
import { ChartBenchmark } from './demos/benchmarks/ChartBenchmark'

import { FrameworkSwitcher } from './components/FrameworkSwitcher'

import { useI18n, SUPPORTED_LOCALES } from './i18n'
import type { DemoDict, Locale } from './i18n'

// ---------------------------------------------------------------------------
// Component pages — same registry as before, just kept in one map.
// ---------------------------------------------------------------------------

const componentPages: Record<string, () => React.JSX.Element> = {
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
  'components/charts': ChartsDemo,
  'components/diagram': DiagramDemo,
  'components/dashboard': DashboardDemo,
  'components/gantt': GanttDemo,
  'components/event-timeline': EventTimelineDemo,
  'components/resource-calendar': ResourceCalendarDemo,
}

const guidePages: Record<string, () => React.JSX.Element> = {
  'guide/getting-started': GettingStartedPage,
  'guide/styling-showcase': StylingShowcasePage,
  'guide/theming': ThemingPage,
  'guide/design-tokens': DesignTokensPage,
  'guide/core-api': CoreApiPage,
  'guide/config-provider': ConfigProviderDemo,
}

// Legacy hash routes ("getting-started" without the "guide/" prefix) keep
// working by resolving through this lookup before falling back to Landing.
const LEGACY_GUIDE_KEYS: Record<string, string> = {
  'getting-started': 'guide/getting-started',
  'styling-showcase': 'guide/styling-showcase',
  theming: 'guide/theming',
  'design-tokens': 'guide/design-tokens',
  'core-api': 'guide/core-api',
  'config-provider': 'guide/config-provider',
  tokens: 'guide/design-tokens',
}

// ---------------------------------------------------------------------------
// Sidebars — components nav and guide nav. About / Roadmap / Landing
// render full-width (no sidebar).
// ---------------------------------------------------------------------------

function buildComponentsSidebar(t: DemoDict): SidebarSection[] {
  return [
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
        { key: 'components/resource-calendar', label: 'ResourceCalendar' },
        { key: 'components/gantt', label: 'Gantt' },
        { key: 'components/event-timeline', label: 'EventTimeline' },
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

function buildGuideSidebar(t: DemoDict): SidebarSection[] {
  return [
    {
      title: t.menuSections.guide,
      items: [
        { key: 'guide/getting-started', label: t.menuItems.gettingStarted },
        { key: 'guide/styling-showcase', label: t.menuItems.stylingShowcase },
        { key: 'guide/theming', label: t.menuItems.theming },
        { key: 'guide/design-tokens', label: t.menuItems.designTokens },
        { key: 'guide/core-api', label: t.menuItems.coreApi },
        { key: 'guide/config-provider', label: t.menuItems.configProvider },
      ],
    },
  ]
}

// ---------------------------------------------------------------------------
// Hash routing.
// ---------------------------------------------------------------------------

function getHashRoute(): string {
  // The DemoTOC encodes a section anchor as `~<section-id>` because the
  // app already owns the leading hash for routing. Strip that suffix
  // before resolving the route so the route never depends on which
  // demo block is active.
  const raw = window.location.hash.replace(/^#\/?/, '')
  const h = raw.split('~')[0]
  if (!h) return 'landing'
  if (h === 'overview') return 'landing'
  // The "Changelog" entry in the header used to live at `/roadmap`. Keep the
  // old URL working so external links don't 404 — internally everything is
  // routed by `'changelog'` now.
  if (h === 'roadmap') return 'changelog'
  if (LEGACY_GUIDE_KEYS[h]) return LEGACY_GUIDE_KEYS[h]
  return h
}

function navigate(key: string) {
  if (key === 'landing') {
    window.location.hash = ''
    return
  }
  window.location.hash = '#/' + key
}

function sectionForRoute(route: string): AppShellSection {
  if (route === 'landing') return 'landing'
  if (route === 'changelog') return 'changelog'
  if (route === 'about') return 'about'
  if (route === 'benchmarks' || route.startsWith('benchmarks/')) return null
  if (route === 'showcases' || route.startsWith('showcases/')) return null
  if (route.startsWith('components/')) return 'components'
  if (route.startsWith('guide/')) return 'guide'
  if (route === 'tokens') return 'tokens'
  return null
}

// ---------------------------------------------------------------------------

export default function App() {
  const { t, locale, setLocale } = useI18n()
  const [route, setRoute] = useState(getHashRoute)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const onHash = () => {
      setRoute(getHashRoute())
      setSearch('')
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const section = sectionForRoute(route)

  const navItems = useMemo<NavItem[]>(
    () => [
      { key: 'components', label: t.header.navComponents, href: '#/components/button' },
      { key: 'guide', label: t.header.navGuide, href: '#/guide/getting-started' },
      { key: 'showcases', label: t.header.navShowcases, href: '#/showcases' },
      { key: 'benchmarks', label: t.header.navBenchmarks, href: '#/benchmarks' },
      { key: 'changelog', label: t.header.navRoadmap, href: '#/changelog' },
      { key: 'about', label: t.header.navAbout, href: '#/about' },
    ],
    [t],
  )

  const componentsSidebar = useMemo(() => buildComponentsSidebar(t), [t])
  const guideSidebar = useMemo(() => buildGuideSidebar(t), [t])

  const sidebarSections =
    section === 'components' ? componentsSidebar : section === 'guide' ? guideSidebar : null

  const filteredSidebar = useMemo(() => {
    if (!sidebarSections) return null
    const q = search.trim().toLowerCase()
    if (!q) return sidebarSections
    return sidebarSections
      .map((s) => ({
        ...s,
        items: s.items.filter((i) => i.label.toLowerCase().includes(q)),
      }))
      .filter((s) => s.items.length > 0)
  }, [sidebarSections, search])

  const sidebarNode = filteredSidebar && (
    <Sidebar
      sections={filteredSidebar}
      active={route}
      onSelect={navigate}
      emptyLabel={t.search.noMatches}
    />
  )

  const showSearch = section === 'components' || section === 'guide'

  const header = (
    <Header
      brand="SkyGraph"
      items={navItems}
      active={
        route === 'benchmarks' || route.startsWith('benchmarks/')
          ? 'benchmarks'
          : route === 'showcases' || route.startsWith('showcases/')
            ? 'showcases'
            : section
      }
      onBrandClick={() => navigate('landing')}
      onSelect={(key) => {
        const item = navItems.find((it) => it.key === key)
        if (!item || item.external) return
        if (item.href?.startsWith('#/')) {
          navigate(item.href.slice(2))
        }
      }}
      searchValue={showSearch ? search : undefined}
      onSearchChange={showSearch ? setSearch : undefined}
      searchPlaceholder={t.search.placeholder}
      searchAriaLabel={t.search.ariaLabel}
      burgerAriaLabel={t.header.burgerAria}
      extras={
        <>
          <FrameworkSwitcher active="react" />
          <LanguageSwitcher
            options={SUPPORTED_LOCALES.map((code) => ({
              code,
              label: code.toUpperCase(),
              fullName: code === 'en' ? t.language.en : t.language.ru,
            }))}
            active={locale}
            onChange={(code) => setLocale(code as Locale)}
            groupLabel={t.language.switcherLabel}
          />
          <ThemeSwitcher ariaLabel={t.header.themeAria} />
        </>
      }
    />
  )

  const footer = (
    <Footer
      onSelect={(href) => {
        if (href.startsWith('#/')) navigate(href.slice(2))
      }}
      copyright={t.footer.copyright}
      version={`v${__SKYGRAPH_REACT_VERSION__}`}
      columns={[
        {
          title: t.footer.columnDocs,
          links: [
            { label: t.footer.linkGettingStarted, href: '#/guide/getting-started' },
            { label: t.footer.linkComponents, href: '#/components/button' },
            { label: t.footer.linkTheming, href: '#/guide/theming' },
            { label: t.footer.linkCoreApi, href: '#/guide/core-api' },
          ],
        },
        {
          title: t.footer.columnResources,
          links: [
            {
              label: t.footer.linkChangelog,
              href: `${GITHUB_URL}/blob/master/CHANGELOG.md`,
              external: true,
            },
            { label: t.footer.linkShowcases, href: '#/showcases' },
            {
              label: t.footer.linkArchitecture,
              href: `${GITHUB_URL}/blob/master/ARCHITECTURE.md`,
              external: true,
            },
            {
              label: t.footer.linkContributing,
              href: `${GITHUB_URL}/blob/master/CONTRIBUTING.md`,
              external: true,
            },
          ],
        },
        {
          title: t.footer.columnCommunity,
          links: [
            { label: t.footer.linkGithub, href: GITHUB_URL, external: true },
            {
              label: t.footer.linkIssues,
              href: `${GITHUB_URL}/issues`,
              external: true,
            },
          ],
        },
        {
          title: t.footer.columnProject,
          links: [
            { label: t.footer.linkAbout, href: '#/about' },
            { label: t.footer.linkRoadmap, href: '#/changelog' },
            {
              label: t.footer.linkLicense,
              href: `${GITHUB_URL}/blob/master/LICENSE`,
              external: true,
            },
          ],
        },
      ]}
    />
  )

  const Page = renderPage(route)

  return (
    <>
      <AppShell section={section} header={header} sidebar={sidebarNode} footer={footer}>
        <Page onNavigate={navigate} route={route} />
      </AppShell>
      <NotificationContainer placement="topRight" />
      <NotificationContainer placement="topLeft" />
      <NotificationContainer placement="bottomRight" />
    </>
  )
}

type PageProps = { onNavigate: (key: string) => void; route: string }

function renderPage(route: string): (props: PageProps) => React.JSX.Element {
  if (route === 'landing') return (p) => <Landing onNavigate={p.onNavigate} />
  if (route === 'changelog') return () => <Roadmap />
  if (route === 'about') return () => <About />
  if (route === 'benchmarks') return () => <BenchmarksPage />
  if (route === 'benchmarks/table') {
    return (p) => (
      <SingleBenchmarkPageTr kind="table" onBack={() => p.onNavigate('benchmarks')}>
        <TableBenchmark />
      </SingleBenchmarkPageTr>
    )
  }
  if (route === 'benchmarks/tree') {
    return (p) => (
      <SingleBenchmarkPageTr kind="tree" onBack={() => p.onNavigate('benchmarks')}>
        <TreeBenchmark />
      </SingleBenchmarkPageTr>
    )
  }
  if (route === 'benchmarks/chart') {
    return (p) => (
      <SingleBenchmarkPageTr kind="chart" onBack={() => p.onNavigate('benchmarks')}>
        <ChartBenchmark />
      </SingleBenchmarkPageTr>
    )
  }
  if (route === 'showcases' || route.startsWith('showcases/')) {
    return (p) => <ShowcasesPage route={p.route} onNavigate={p.onNavigate} />
  }
  const componentPage = componentPages[route]
  if (componentPage) return () => componentPage()
  const guidePage = guidePages[route]
  if (guidePage) return () => guidePage()
  return (p) => <Landing onNavigate={p.onNavigate} />
}

interface SingleBenchmarkPageTrProps {
  kind: 'table' | 'tree' | 'chart'
  onBack: () => void
  children: React.ReactNode
}

// `SingleBenchmarkPageTr` is a thin translation wrapper around the original
// `SingleBenchmarkPage` markup. We call `useI18n` here so each detail route
// composes its title/subtitle/back button from the active locale instead of
// the previously hardcoded English literals (see TODO-cycle.md).
function SingleBenchmarkPageTr({ kind, onBack, children }: SingleBenchmarkPageTrProps) {
  const { t } = useI18n()
  const d = t.benchmarkDetail
  const title = kind === 'table' ? d.tableTitle : kind === 'tree' ? d.treeTitle : d.chartTitle
  const subtitle =
    kind === 'table' ? d.tableSubtitle : kind === 'tree' ? d.treeSubtitle : d.chartSubtitle
  return (
    <div className="bench-page">
      <header className="bench-header">
        <button
          type="button"
          className="bench-btn"
          onClick={onBack}
          style={{ alignSelf: 'flex-start' }}
        >
          {d.backToAll}
        </button>
        <h1 className="bench-title">{title}</h1>
        <p className="bench-lead">{subtitle}</p>
      </header>
      <div className="bench-body">{children}</div>
    </div>
  )
}
