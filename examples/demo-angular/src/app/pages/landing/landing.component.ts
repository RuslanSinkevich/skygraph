import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { SgButtonComponent } from '@skygraph/angular'

@Component({
  selector: 'sg-landing-page',
  standalone: true,
  imports: [RouterLink, SgButtonComponent],
  template: `
    <section class="hero">
      <p class="eyebrow">Wave 4.1 — Foundation</p>
      <h1>SkyGraph for Angular</h1>
      <p class="lead">
        Third-party adapter that pairs with <code>&#64;skygraph/core</code> and
        <code>&#64;skygraph/styles</code>. Same components, same CSS class set, Angular bindings.
      </p>
      <div class="cta">
        <a routerLink="/components/button">
          <button sg-button type="primary" size="large">Open Button page</button>
        </a>
        <a href="https://github.com/skygraph/skygraph" target="_blank" rel="noopener">
          <button sg-button type="default" size="large">View on GitHub</button>
        </a>
      </div>
    </section>

    <section class="cards">
      <article class="card">
        <h3>provideSgConfig</h3>
        <p>
          App-level config token, mirroring React's <code>&lt;ConfigProvider&gt;</code>. Use it from
          <code>bootstrapApplication()</code> or any route's <code>providers</code>.
        </p>
      </article>
      <article class="card">
        <h3>Standalone-only</h3>
        <p>
          Angular 21, control flow <code>&#64;if</code> / <code>&#64;for</code>, signals where it
          makes sense — no NgModules.
        </p>
      </article>
      <article class="card">
        <h3>DOM 1:1 with React</h3>
        <p>
          Components use attribute selectors (<code>button[sg-button]</code>) so the rendered DOM is
          byte-identical to the React adapter — the shared CSS just works.
        </p>
      </article>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .hero {
        padding: 48px 0 32px;
        border-bottom: 1px solid var(--sg-demo-border);
        margin-bottom: 32px;
      }
      .eyebrow {
        margin: 0;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--sg-demo-accent);
      }
      h1 {
        margin: 6px 0 12px;
        font-size: 40px;
        line-height: 1.1;
      }
      .lead {
        margin: 0 0 24px;
        max-width: 640px;
        color: var(--sg-demo-muted);
        font-size: 16px;
        line-height: 1.55;
      }
      .cta {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
      }
      .card {
        background: var(--sg-demo-card);
        border: 1px solid var(--sg-demo-border);
        border-radius: 10px;
        padding: 18px 20px;
      }
      .card h3 {
        margin: 0 0 8px;
        font-size: 16px;
      }
      .card p {
        margin: 0;
        font-size: 14px;
        color: var(--sg-demo-muted);
        line-height: 1.5;
      }
      code {
        font-family:
          'JetBrains Mono', SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
        font-size: 0.92em;
        background: rgba(15, 23, 42, 0.06);
        padding: 2px 5px;
        border-radius: 4px;
      }
    `,
  ],
})
export class LandingComponent {}
