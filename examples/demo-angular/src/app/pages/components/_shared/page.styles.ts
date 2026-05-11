/**
 * Common page-level styles for every component demo page in
 * `examples/demo-angular/src/app/pages/components/<name>/`. Kept here so
 * the per-page styles list stays a one-liner without duplicating the
 * whole layout chunk in every component file.
 */
export const PAGE_STYLES = `
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
  .col {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  code {
    font-family: 'JetBrains Mono', SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.92em;
    background: rgba(15, 23, 42, 0.06);
    padding: 2px 5px;
    border-radius: 4px;
  }
  .meta {
    color: var(--sg-demo-muted);
    font-size: 13px;
  }
`
