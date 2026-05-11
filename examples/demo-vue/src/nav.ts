import type { SidebarSection } from '@skygraph-examples/shared-vue/layout'
import type { DemoDict } from './i18n'

/**
 * Components sidebar — grouped by category, mirrors React-demo
 * `examples/demo/src/App.tsx#buildComponentsSidebar`. Only entries whose
 * Vue page actually exists in `src/pages/` are listed; T-VueDemo-Pages
 * appends additional groups/items as new pages land.
 *
 * The `key` mirrors the React-demo route key (without the leading `/`),
 * so the future smoke parity script can compare both demos by key.
 */
export function buildComponentsSidebar(t: DemoDict): SidebarSection[] {
  return [
    {
      title: t.menuSections.general,
      items: [
        { key: 'components/button', label: 'Button' },
        { key: 'components/spin', label: 'Spin' },
        { key: 'components/configprovider', label: 'ConfigProvider' },
      ],
    },
    {
      title: t.menuSections.dataEntry,
      items: [
        { key: 'components/input', label: 'Input' },
        { key: 'components/inputnumber', label: 'InputNumber' },
        { key: 'components/textarea', label: 'Textarea' },
        { key: 'components/select', label: 'Select' },
        { key: 'components/autocomplete', label: 'AutoComplete' },
        { key: 'components/treeselect', label: 'TreeSelect' },
        { key: 'components/cascader', label: 'Cascader' },
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
        { key: 'components/form', label: 'Form' },
        { key: 'components/schema-form-editor', label: 'SchemaFormEditor' },
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
 * Guide sidebar — mirrors `examples/demo/src/App.tsx#buildGuideSidebar`.
 *
 * Six entries 1:1 with the React reference. Sidebar keys (`guide/...`)
 * mirror router paths so the existing `routeToKey` / `keyToRoute` helpers
 * work unchanged. Wave 3.4 stub pages are listed alongside the full ports
 * so the future React-parity smoke test can compare both demos by key.
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

/**
 * Map sidebar `key` → router path. Sidebar keys mirror the React-demo
 * (`components/button`); router paths are absolute (`/components/button`).
 */
export function keyToRoute(key: string): string {
  return '/' + key
}

/**
 * Inverse of `keyToRoute` — strips the leading slash so a router path
 * can be matched against the sidebar `active` prop.
 */
export function routeToKey(path: string): string {
  return path.replace(/^\//, '')
}
