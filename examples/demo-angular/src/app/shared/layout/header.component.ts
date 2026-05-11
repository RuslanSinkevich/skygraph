import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'sg-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="app-header">
      <a class="brand" routerLink="/">SkyGraph <span class="brand-suffix">/ Angular</span></a>
      <nav class="nav">
        <a routerLink="/" class="nav-link">Home</a>
        <a routerLink="/components/button" class="nav-link">Button</a>
        <a
          href="https://github.com/skygraph/skygraph"
          target="_blank"
          rel="noopener"
          class="nav-link"
          >GitHub</a
        >
      </nav>
    </header>
  `,
  styles: [
    `
      .app-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 32px;
        background: var(--sg-demo-card);
        border-bottom: 1px solid var(--sg-demo-border);
        position: sticky;
        top: 0;
        z-index: 10;
      }
      .brand {
        font-weight: 700;
        font-size: 18px;
        color: var(--sg-demo-text);
      }
      .brand-suffix {
        font-weight: 400;
        font-size: 14px;
        color: var(--sg-demo-muted);
        margin-left: 4px;
      }
      .nav {
        display: flex;
        gap: 18px;
      }
      .nav-link {
        font-size: 14px;
        color: var(--sg-demo-text);
      }
    `,
  ],
})
export class HeaderComponent {}
