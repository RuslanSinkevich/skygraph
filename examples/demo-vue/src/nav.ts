import type { DemoDict } from './i18n'

export interface SidebarItem {
  label: string
  to: string
}

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}

export function buildComponentsSidebar(t: DemoDict): SidebarSection[] {
  return [
    {
      title: t.menuSections.dataEntry,
      items: [
        { label: 'Input', to: '/components/input' },
        { label: 'InputNumber', to: '/components/inputnumber' },
        { label: 'Textarea', to: '/components/textarea' },
        { label: 'Select', to: '/components/select' },
        { label: 'Checkbox', to: '/components/checkbox' },
        { label: 'Radio', to: '/components/radio' },
        { label: 'Switch', to: '/components/switch' },
        { label: 'Slider', to: '/components/slider' },
        { label: 'DatePicker', to: '/components/datepicker' },
      ],
    },
    {
      title: t.menuSections.dataDisplay,
      items: [
        { label: 'Badge', to: '/components/badge' },
        { label: 'Tag', to: '/components/tag' },
        { label: 'Avatar', to: '/components/avatar' },
      ],
    },
    {
      title: t.menuSections.feedback,
      items: [
        { label: 'Modal', to: '/components/modal' },
        { label: 'Drawer', to: '/components/drawer' },
        { label: 'Tooltip', to: '/components/tooltip' },
        { label: 'Progress', to: '/components/progress' },
        { label: 'Spin', to: '/components/spin' },
        { label: 'Skeleton', to: '/components/skeleton' },
      ],
    },
    {
      title: t.menuSections.navigation,
      items: [
        { label: 'Tabs', to: '/components/tabs' },
        { label: 'Menu', to: '/components/menu' },
        { label: 'Pagination', to: '/components/pagination' },
      ],
    },
    {
      title: t.menuSections.form,
      items: [
        { label: 'Button', to: '/components/button' },
      ],
    },
  ]
}
