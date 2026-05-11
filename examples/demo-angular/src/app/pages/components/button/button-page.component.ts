import { Component, signal } from '@angular/core'
import { SgButtonComponent } from '@skygraph/angular'

@Component({
  selector: 'sg-button-page',
  standalone: true,
  imports: [SgButtonComponent],
  templateUrl: './button-page.component.html',
  styles: [
    `
      :host {
        display: block;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 28px;
      }
      .lead {
        margin: 0 0 28px;
        color: var(--sg-demo-muted);
        max-width: 640px;
        line-height: 1.55;
      }
      .demo-section {
        background: var(--sg-demo-card);
        border: 1px solid var(--sg-demo-border);
        border-radius: 10px;
        padding: 18px 20px;
        margin-bottom: 18px;
      }
      .demo-section h3 {
        margin: 0 0 12px;
        font-size: 16px;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }
      .row + .row {
        margin-top: 10px;
      }
      .block-row > button {
        display: block;
        width: 100%;
        margin-top: 10px;
      }
      .click-counter {
        font-size: 13px;
        color: var(--sg-demo-muted);
        margin-left: 10px;
      }
    `,
  ],
})
export class ButtonPageComponent {
  readonly clicks = signal(0)

  inc(): void {
    this.clicks.update((n) => n + 1)
  }
}
