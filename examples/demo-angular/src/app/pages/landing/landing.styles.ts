/**
 * Landing-page styles — deliberate 1:1 port of
 * `examples/demo-vue/src/pages/landing.css`. Kept as an inline string
 * so the page component doesn't need a sibling .css file (Angular's
 * styleUrls would also work, but inline keeps the page self-contained
 * for the lazy chunk).
 */
export const LANDING_STYLES = `
:host { display: block; }

.dv-landing-hero {
  padding: 56px 0 32px;
  border-bottom: 1px solid var(--sg-color-border);
  margin-bottom: 32px;
}

.dv-landing-hero h1 {
  margin: 0 0 12px;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.dv-landing-tagline {
  margin: 0 0 12px;
  font-size: 18px;
  color: var(--sg-color-text);
  max-width: 640px;
  line-height: 1.4;
}

.dv-landing-sub {
  margin: 0 0 28px;
  font-size: 14px;
  color: var(--sg-color-text-secondary);
  max-width: 640px;
  line-height: 1.6;
}

.dv-landing-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.dv-landing-cta-primary,
.dv-landing-cta-secondary {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;
  border: 1px solid transparent;
}

.dv-landing-cta-primary {
  background: var(--sg-color-primary);
  color: var(--sg-color-white, #fff);
}

.dv-landing-cta-primary:hover {
  background: var(--sg-color-primary-hover, var(--sg-color-primary));
}

.dv-landing-cta-secondary {
  border-color: var(--sg-color-border);
  color: var(--sg-color-text);
  background: var(--sg-color-bg);
}

.dv-landing-cta-secondary:hover {
  border-color: var(--sg-color-primary);
  color: var(--sg-color-primary);
}

.dv-landing-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 36px 0;
}

.dv-landing-stat {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  border: 1px solid var(--sg-color-border);
  border-radius: 12px;
  background: var(--sg-color-bg);
}

.dv-landing-stat-num {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--sg-color-text);
  font-variant-numeric: tabular-nums;
}

.dv-landing-stat-label {
  font-size: 12px;
  color: var(--sg-color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.dv-landing-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 32px;
}

.dv-landing-feature {
  padding: 22px;
  border: 1px solid var(--sg-color-border-secondary, var(--sg-color-border));
  border-radius: 12px;
  background: var(--sg-color-bg);
  transition: border-color 0.18s ease;
}

.dv-landing-feature:hover {
  border-color: color-mix(
    in srgb,
    var(--sg-color-primary) 50%,
    var(--sg-color-border-secondary, var(--sg-color-border)) 50%
  );
}

.dv-landing-feature h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
}

.dv-landing-feature p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--sg-color-text-secondary);
}

.dv-landing-install {
  margin-top: 56px;
}

.dv-landing-section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 6px;
}

.dv-landing-section-sub {
  margin: 0 0 18px;
  color: var(--sg-color-text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.dv-landing-install-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.dv-landing-install-card {
  border: 1px solid var(--sg-color-border-secondary, var(--sg-color-border));
  border-radius: 12px;
  background: var(--sg-color-bg-secondary);
  overflow: hidden;
}

.dv-landing-install-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px dashed var(--sg-color-border-secondary, var(--sg-color-border));
  background: var(--sg-color-bg);
}

.dv-landing-install-card-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--sg-color-text);
}

.dv-landing-install-copy {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 4px;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
}

.dv-landing-install-copy:hover {
  color: var(--sg-color-primary);
  background: var(--sg-color-bg-hover, var(--sg-color-bg-secondary));
}

.dv-landing-install-code {
  margin: 0;
  padding: 16px 18px;
  font-size: 12.5px;
  line-height: 1.6;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  color: var(--sg-color-text);
  white-space: pre;
  overflow-x: auto;
}

@media (max-width: 880px) {
  .dv-landing-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .dv-landing-install-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .dv-landing-stats {
    grid-template-columns: 1fr;
  }
  .dv-landing-features {
    grid-template-columns: 1fr;
  }
}
`
