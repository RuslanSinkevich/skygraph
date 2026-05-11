import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

interface SidebarLink {
  path: string
  label: string
}
interface SidebarSection {
  title: string
  items: SidebarLink[]
}

/**
 * Components sidebar — mirrors `examples/demo-vue/src/nav.ts`
 * `buildComponentsSidebar`. Lists only components that have a real
 * Angular page in `src/app/pages/components/`. Wave 4.2 ships A-D
 * batches; later waves append entries.
 */
@Component({
  selector: 'sg-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      @for (section of sections; track section.title) {
        <h4 class="sidebar-title">{{ section.title }}</h4>
        <ul class="sidebar-list">
          @for (item of section.items; track item.path) {
            <li>
              <a
                [routerLink]="item.path"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >{{ item.label }}</a
              >
            </li>
          }
        </ul>
      }
    </aside>
  `,
  styles: [
    `
      .sidebar {
        padding: 24px 16px;
        border-right: 1px solid var(--sg-demo-border);
        background: var(--sg-demo-card);
      }
      .sidebar-title {
        margin: 16px 0 8px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--sg-demo-muted);
      }
      .sidebar-title:first-child {
        margin-top: 0;
      }
      .sidebar-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .sidebar-list li {
        margin-bottom: 2px;
      }
      .sidebar-list a {
        display: block;
        padding: 6px 10px;
        border-radius: 6px;
        color: var(--sg-demo-text);
        font-size: 14px;
      }
      .sidebar-list a.active {
        background: rgba(37, 99, 235, 0.1);
        color: var(--sg-demo-accent);
      }
      .sidebar-list a:hover {
        text-decoration: none;
        background: rgba(0, 0, 0, 0.04);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly sections: SidebarSection[] = [
    {
      title: 'General',
      items: [
        { path: '/components/button', label: 'Button' },
        { path: '/components/spin', label: 'Spin' },
      ],
    },
    {
      title: 'Data Entry',
      items: [
        { path: '/components/input', label: 'Input' },
        { path: '/components/inputnumber', label: 'InputNumber' },
        { path: '/components/textarea', label: 'Textarea' },
        { path: '/components/inputpassword', label: 'InputPassword' },
        { path: '/components/searchinput', label: 'SearchInput' },
        { path: '/components/pininput', label: 'PinInput' },
        { path: '/components/taginput', label: 'TagInput' },
        { path: '/components/mentions', label: 'Mentions' },
        { path: '/components/inlineedit', label: 'InlineEdit' },
        { path: '/components/inputgroup', label: 'InputGroup' },
        { path: '/components/select', label: 'Select' },
        { path: '/components/autocomplete', label: 'AutoComplete' },
        { path: '/components/cascader', label: 'Cascader' },
        { path: '/components/treeselect', label: 'TreeSelect' },
        { path: '/components/checkbox', label: 'Checkbox' },
        { path: '/components/radio', label: 'Radio' },
        { path: '/components/switch', label: 'Switch' },
        { path: '/components/slider', label: 'Slider' },
        { path: '/components/rate', label: 'Rate' },
        { path: '/components/colorpicker', label: 'ColorPicker' },
        { path: '/components/datepicker', label: 'DatePicker' },
        { path: '/components/timepicker', label: 'TimePicker' },
        { path: '/components/calendar', label: 'Calendar' },
        { path: '/components/upload', label: 'Upload' },
        { path: '/components/transfer', label: 'Transfer' },
      ],
    },
    {
      title: 'Data Display',
      items: [
        { path: '/components/badge', label: 'Badge' },
        { path: '/components/tag', label: 'Tag' },
        { path: '/components/avatar', label: 'Avatar' },
        { path: '/components/tooltip', label: 'Tooltip' },
        { path: '/components/timeline', label: 'Timeline' },
        { path: '/components/descriptions', label: 'Descriptions' },
        { path: '/components/collapse', label: 'Collapse' },
        { path: '/components/carousel', label: 'Carousel' },
        { path: '/components/list', label: 'List' },
        { path: '/components/tree', label: 'Tree' },
      ],
    },
    {
      title: 'Feedback',
      items: [
        { path: '/components/modal', label: 'Modal' },
        { path: '/components/drawer', label: 'Drawer' },
        { path: '/components/popconfirm', label: 'Popconfirm' },
        { path: '/components/notification', label: 'Notification' },
        { path: '/components/progress', label: 'Progress' },
        { path: '/components/skeleton', label: 'Skeleton' },
        { path: '/components/result', label: 'Result' },
        { path: '/components/empty', label: 'Empty' },
      ],
    },
    {
      title: 'Navigation',
      items: [
        { path: '/components/tabs', label: 'Tabs' },
        { path: '/components/menu', label: 'Menu' },
        { path: '/components/breadcrumb', label: 'Breadcrumb' },
        { path: '/components/dropdown', label: 'Dropdown' },
        { path: '/components/pagination', label: 'Pagination' },
        { path: '/components/steps', label: 'Steps' },
        { path: '/components/segmented', label: 'Segmented' },
      ],
    },
  ]
}
