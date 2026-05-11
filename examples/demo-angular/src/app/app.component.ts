import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './shared/layout/header.component'
import { SidebarComponent } from './shared/layout/sidebar.component'

@Component({
  selector: 'sg-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <sg-header></sg-header>
    <div class="app-shell">
      <sg-sidebar></sg-sidebar>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .app-shell {
        display: grid;
        grid-template-columns: 220px 1fr;
        flex: 1;
      }
      .app-main {
        padding: 24px 32px 48px;
        max-width: 1100px;
        width: 100%;
      }
      @media (max-width: 720px) {
        .app-shell {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AppComponent {}
