/**
 * Roadmap-page styles — 1:1 port of `examples/demo-vue/src/pages/roadmap.css`.
 */
export const ROADMAP_STYLES = `
:host { display: block; }

.roadmap {
  display: flex;
  flex-direction: column;
  padding: 32px 0 64px;
}

.roadmap-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.roadmap-title {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0;
}

.roadmap-lead {
  font-size: 14px;
  line-height: 1.6;
  color: var(--sg-color-text-secondary);
  max-width: 720px;
}

.roadmap-stats {
  display: flex;
  gap: 12px;
  margin: 16px 0 32px;
  flex-wrap: wrap;
}

.roadmap-stat {
  padding: 8px 14px;
  border: 1px solid var(--sg-color-border);
  border-radius: 999px;
  font-size: 13px;
  color: var(--sg-color-text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--sg-color-bg);
}

.roadmap-stat-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
  display: inline-block;
}

.roadmap-stat--closed { color: var(--sg-color-success); }
.roadmap-stat--open { color: var(--sg-color-text-secondary); }
.roadmap-stat--total { color: var(--sg-color-primary); }

.roadmap-source {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 11px;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.roadmap-empty {
  padding: 64px 0;
  text-align: center;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
  font-size: 14px;
  border: 1px dashed var(--sg-color-border);
  border-radius: 12px;
}

.roadmap-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.roadmap-event {
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 14px;
  align-items: flex-start;
  padding: 16px 18px;
  border: 1px solid var(--sg-color-border);
  border-radius: 10px;
  background: var(--sg-color-bg);
}

.roadmap-marker {
  width: 12px;
  height: 12px;
  margin-top: 4px;
  border-radius: 999px;
  display: inline-block;
  border: 2px solid var(--sg-color-bg);
  outline: 1px solid var(--sg-color-border);
}

.roadmap-marker--closed {
  background: var(--sg-color-success);
  outline-color: var(--sg-color-success);
}

.roadmap-marker--open {
  background: var(--sg-color-bg);
  outline-color: var(--sg-color-text-secondary);
}

.roadmap-event-body-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.roadmap-event-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--sg-color-text);
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.roadmap-event-id {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 12px;
  font-weight: 500;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
  letter-spacing: 0.02em;
}

.roadmap-event-status {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 600;
}

.roadmap-event-status--closed {
  background: color-mix(in srgb, var(--sg-color-success) 12%, transparent);
  color: var(--sg-color-success);
}

.roadmap-event-status--open {
  background: color-mix(in srgb, var(--sg-color-primary) 12%, transparent);
  color: var(--sg-color-primary);
}

.roadmap-event-section {
  font-size: 11px;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 4px;
}

.roadmap-event-body {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--sg-color-text-secondary);
  white-space: pre-wrap;
}
`
