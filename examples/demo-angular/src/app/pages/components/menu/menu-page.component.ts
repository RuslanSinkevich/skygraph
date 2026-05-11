import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgMenuComponent, type SgMenuItem } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-menu-page',
  standalone: true,
  imports: [SgMenuComponent],
  template: `
    <h1>Menu</h1>
    <p class="lead">
      Vertical, horizontal, and inline navigation menu with selectable rows, submenus (inline mode),
      groups, and dividers.
    </p>

    <section class="demo-section">
      <h3>Vertical</h3>
      <ul sg-menu mode="vertical" [items]="basic" [(selectedKeys)]="vKeys"></ul>
      <p class="meta">Selected: {{ vKeys().join(', ') || '—' }}</p>
    </section>

    <section class="demo-section">
      <h3>Horizontal</h3>
      <ul sg-menu mode="horizontal" [items]="basic" [(selectedKeys)]="hKeys"></ul>
    </section>

    <section class="demo-section">
      <h3>Inline submenu</h3>
      <ul sg-menu mode="inline" [items]="nested" [(selectedKeys)]="iKeys" [(openKeys)]="iOpen"></ul>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
  readonly basic: SgMenuItem[] = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'docs', label: 'Docs', icon: '📚' },
    { key: 'about', label: 'About', icon: 'ℹ' },
    { key: 'd1', type: 'divider', label: '' },
    { key: 'logout', label: 'Logout', danger: true },
  ]
  readonly nested: SgMenuItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    {
      key: 'settings',
      label: 'Settings',
      icon: '⚙',
      children: [
        { key: 'profile', label: 'Profile' },
        { key: 'security', label: 'Security' },
        { key: 'billing', label: 'Billing', disabled: true },
      ],
    },
  ]
  readonly vKeys = signal<string[]>(['home'])
  readonly hKeys = signal<string[]>(['docs'])
  readonly iKeys = signal<string[]>(['profile'])
  readonly iOpen = signal<string[]>(['settings'])
}
