import { useState } from 'react'
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
import { ThemeToggle } from './demos/ThemeToggle'

const menu = [
  { key: 'overview', label: 'Overview' },
  { key: 'button', label: 'Button' },
  { key: 'input', label: 'Input' },
  { key: 'select', label: 'Select' },
  { key: 'checkbox', label: 'Checkbox' },
  { key: 'radio', label: 'Radio' },
  { key: 'switch', label: 'Switch' },
  { key: 'slider', label: 'Slider', disabled: true },
  { key: 'tabs', label: 'Tabs' },
  { key: 'tooltip', label: 'Tooltip' },
  { key: 'dropdown', label: 'Dropdown' },
  { key: 'modal', label: 'Modal' },
  { key: 'drawer', label: 'Drawer' },
  { key: 'popconfirm', label: 'Popconfirm' },
  { key: 'notification', label: 'Notification' },
  { key: 'progress', label: 'Progress' },
  { key: 'spin', label: 'Spin' },
  { key: 'badge', label: 'Badge' },
  { key: 'tag', label: 'Tag' },
  { key: 'avatar', label: 'Avatar' },
  { key: 'breadcrumb', label: 'Breadcrumb' },
  { key: 'pagination', label: 'Pagination' },
  { key: 'form', label: 'Form' },
  { key: 'table', label: 'Table' },
  { key: 'tree', label: 'Tree' },
]

const pages: Record<string, () => JSX.Element> = {
  spin: SpinDemo,
  button: ButtonDemo,
  input: InputDemo,
  checkbox: CheckboxDemo,
  radio: RadioDemo,
  switch: SwitchDemo,
  select: SelectDemo,
  tabs: TabsDemo,
  tooltip: TooltipDemo,
  modal: ModalDemo,
  form: FormDemo,
  table: TableDemo,
  notification: NotificationDemo,
  drawer: DrawerDemo,
  popconfirm: PopconfirmDemo,
  badge: BadgeDemo,
  tag: TagDemo,
  avatar: AvatarDemo,
  breadcrumb: BreadcrumbDemo,
  pagination: PaginationDemo,
  dropdown: DropdownDemo,
  progress: ProgressDemo,
  tree: TreeDemo,
}

function Overview() {
  return (
    <section>
      <h2>SkyGraph Components</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Reactive UI component library built on SkyGraph core engine.
      </p>
      <div className="demo-overview-grid">
        {menu.filter(m => m.key !== 'overview' && !('disabled' in m)).map(m => (
          <div key={m.key} className="demo-overview-card">
            <strong>{m.label}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function App() {
  const [active, setActive] = useState('overview')
  const Page = active === 'overview' ? Overview : pages[active]

  return (
    <div className="demo-layout">
      <aside className="demo-sidebar">
        <div className="demo-logo">SkyGraph</div>
        <nav className="demo-nav">
          {menu.map(item => (
            <div
              key={item.key}
              className={[
                'demo-nav-item',
                active === item.key ? 'demo-nav-item-active' : '',
                'disabled' in item && item.disabled ? 'demo-nav-item-disabled' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => {
                if (!('disabled' in item && item.disabled)) setActive(item.key)
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>
        <div className="demo-sidebar-footer">
          <ThemeToggle />
        </div>
      </aside>
      <main className="demo-main">
        {Page && <Page />}
      </main>
    </div>
  )
}
