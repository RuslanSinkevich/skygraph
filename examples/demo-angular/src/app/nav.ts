import type { SidebarSection } from './shared/layout'
import type { DemoDict } from './i18n'

/**
 * Components sidebar — same structure as `examples/demo-vue/src/nav.ts`
 * and `examples/demo/src/App.tsx#buildComponentsSidebar`. Only entries
 * whose Angular page actually exists in `src/app/pages/components/` are
 * listed; new component pages append entries here.
 *
 * The `key` mirrors the React/Vue route key (without leading `/`) so
 * the future cross-framework smoke test compares all three demos by
 * key.
 */
export function buildComponentsSidebar(t: DemoDict): SidebarSection[] {
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
        { key: 'components/textarea', label: 'Textarea' },
        { key: 'components/inputpassword', label: 'InputPassword' },
        { key: 'components/searchinput', label: 'SearchInput' },
        { key: 'components/pininput', label: 'PinInput' },
        { key: 'components/taginput', label: 'TagInput' },
        { key: 'components/mentions', label: 'Mentions' },
        { key: 'components/inlineedit', label: 'InlineEdit' },
        { key: 'components/inputgroup', label: 'InputGroup' },
        { key: 'components/select', label: 'Select' },
        { key: 'components/autocomplete', label: 'AutoComplete' },
        { key: 'components/cascader', label: 'Cascader' },
        { key: 'components/treeselect', label: 'TreeSelect' },
        { key: 'components/checkbox', label: 'Checkbox' },
        { key: 'components/radio', label: 'Radio' },
        { key: 'components/switch', label: 'Switch' },
        { key: 'components/slider', label: 'Slider' },
        { key: 'components/rate', label: 'Rate' },
        { key: 'components/colorpicker', label: 'ColorPicker' },
        { key: 'components/datepicker', label: 'DatePicker' },
        { key: 'components/timepicker', label: 'TimePicker' },
        { key: 'components/calendar', label: 'Calendar' },
        { key: 'components/upload', label: 'Upload' },
        { key: 'components/transfer', label: 'Transfer' },
      ],
    },
    {
      title: t.menuSections.dataDisplay,
      items: [
        { key: 'components/badge', label: 'Badge' },
        { key: 'components/tag', label: 'Tag' },
        { key: 'components/avatar', label: 'Avatar' },
        { key: 'components/tooltip', label: 'Tooltip' },
        { key: 'components/timeline', label: 'Timeline' },
        { key: 'components/descriptions', label: 'Descriptions' },
        { key: 'components/collapse', label: 'Collapse' },
        { key: 'components/carousel', label: 'Carousel' },
        { key: 'components/list', label: 'List' },
        { key: 'components/tree', label: 'Tree' },
      ],
    },
    {
      title: t.menuSections.feedback,
      items: [
        { key: 'components/modal', label: 'Modal' },
        { key: 'components/drawer', label: 'Drawer' },
        { key: 'components/popconfirm', label: 'Popconfirm' },
        { key: 'components/notification', label: 'Notification' },
        { key: 'components/progress', label: 'Progress' },
        { key: 'components/skeleton', label: 'Skeleton' },
        { key: 'components/result', label: 'Result' },
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

/**
 * Guide sidebar — same six entries as React / Vue.
 */
export function buildGuideSidebar(t: DemoDict): SidebarSection[] {
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

/** Map sidebar `key` ↔ router path. Sidebar keys mirror React-demo (`components/button`); router paths are absolute. */
export function keyToRoute(key: string): string {
  return '/' + key
}

/** Strip leading `/` so a router path can be matched against a sidebar `active` key. */
export function routeToKey(path: string): string {
  return path.replace(/^\//, '')
}

/** Top-level section for a router path. Drives `<sg-app-shell [section]>` and the sidebar visibility. */
export function sectionForRoute(path: string): import('./shared/layout').AppShellSection {
  if (path === '/' || path === '') return 'landing'
  if (path === '/changelog' || path === '/roadmap') return 'changelog'
  if (path === '/about') return 'about'
  if (path.startsWith('/components/')) return 'components'
  if (path.startsWith('/guide/')) return 'guide'
  return null
}
