import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'sg-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <h4 class="sidebar-title">General</h4>
      <ul class="sidebar-list">
        <li>
          <a
            routerLink="/components/button"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Button</a
          >
        </li>
      </ul>
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
        margin: 0 0 8px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--sg-demo-muted);
      }
      .sidebar-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .sidebar-list li {
        margin-bottom: 4px;
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
})
export class SidebarComponent {}
