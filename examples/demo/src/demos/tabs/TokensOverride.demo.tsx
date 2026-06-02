import { Tabs } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

/**
 * Three distinct tab strips. The Tabs component is unchanged — each
 * look adds a className to the wrapper and overrides nav / tab paint
 * via descendant selectors. `--sg-color-primary` is also re-scoped so
 * the underline / active label match the new palette.
 */
const STRINGS = {
  en: {
    pillLabel: 'Segmented · pill',
    cardLabel: 'Floating cards',
    glassLabel: 'Underline · gradient',
    tab1: 'Overview',
    tab2: 'Activity',
    tab3: 'Settings',
    panel1: 'High-level summary of the resource.',
    panel2: 'Recent events and audit log.',
    panel3: 'Configuration options.',
  },
  ru: {
    pillLabel: 'Сегмент · pill',
    cardLabel: 'Парящие карточки',
    glassLabel: 'Подчёркивание · градиент',
    tab1: 'Обзор',
    tab2: 'Активность',
    tab3: 'Настройки',
    panel1: 'Краткая сводка по объекту.',
    panel2: 'Недавние события и журнал.',
    panel3: 'Параметры и опции.',
  },
} as const

const SHEET = `
/* ── Pill (segmented control) ─────────────────────────────────────── */
.demo-tabs-pill .sg-tabs-nav {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  margin: 0 0 14px;
  background: #f1f5f9;
  border-radius: 999px;
  border: none;
}
.demo-tabs-pill .sg-tabs-tab {
  border: none;
  background: transparent;
  border-radius: 999px;
  padding: 8px 18px;
  font-weight: 600;
  color: #475569;
  margin: 0;
}
.demo-tabs-pill .sg-tabs-tab:hover {
  color: #1e293b;
  background: rgba(255, 255, 255, 0.6);
}
.demo-tabs-pill .sg-tabs-tab-active,
.demo-tabs-pill .sg-tabs-tab-active:hover {
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  box-shadow: 0 6px 16px -4px rgba(99, 102, 241, 0.55);
}

/* ── Floating cards ───────────────────────────────────────────────── */
.demo-tabs-cards.sg-tabs-card {
  border: none;
  background: transparent;
  border-radius: 16px;
  overflow: visible;
}
.demo-tabs-cards .sg-tabs-nav {
  background: transparent;
  padding: 0;
  gap: 8px;
  border: none;
}
.demo-tabs-cards .sg-tabs-tab {
  margin: 0;
  padding: 12px 18px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: #475569;
  font-weight: 600;
  box-shadow: 0 2px 6px -2px rgba(15, 23, 42, 0.08);
  transition:
    transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 200ms ease,
    color 180ms ease,
    border-color 180ms ease;
}
.demo-tabs-cards .sg-tabs-tab:hover {
  color: #0f172a;
  background: #ffffff;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 8px 18px -6px rgba(15, 23, 42, 0.18);
}
.demo-tabs-cards .sg-tabs-tab-active,
.demo-tabs-cards .sg-tabs-tab-active:hover {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-color: #f59e0b;
  color: #92400e;
  transform: translateY(-2px);
  box-shadow: 0 10px 22px -6px rgba(245, 158, 11, 0.45);
}
.demo-tabs-cards .sg-tabs-content {
  margin-top: 14px;
  padding: 18px 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 8px 24px -10px rgba(15, 23, 42, 0.12);
}

/* ── Underline with animated gradient bar ─────────────────────────── */
.demo-tabs-glass.sg-tabs-line .sg-tabs-nav {
  border-bottom-color: rgba(15, 23, 42, 0.08);
  gap: 6px;
}
.demo-tabs-glass.sg-tabs-line .sg-tabs-tab {
  position: relative;
  padding: 10px 18px;
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid transparent;
}
.demo-tabs-glass.sg-tabs-line .sg-tabs-tab::after {
  content: '';
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: -1px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #f43f5e, #8b5cf6, #06b6d4);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
.demo-tabs-glass.sg-tabs-line .sg-tabs-tab:hover {
  color: #0f172a;
}
.demo-tabs-glass.sg-tabs-line .sg-tabs-tab-active {
  color: #0f172a;
  border-bottom-color: transparent;
}
.demo-tabs-glass.sg-tabs-line .sg-tabs-tab-active::after {
  transform: scaleX(1);
}
`

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--sg-color-text-tertiary)',
  display: 'block',
  marginBottom: 10,
}

export function TokensOverrideTabs() {
  const t = useDemoStrings(STRINGS)
  const items = [
    { key: '1', label: t.tab1, children: <p>{t.panel1}</p> },
    { key: '2', label: t.tab2, children: <p>{t.panel2}</p> },
    { key: '3', label: t.tab3, children: <p>{t.panel3}</p> },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <style>{SHEET}</style>

      <div>
        <span style={labelStyle}>{t.pillLabel}</span>
        <Tabs type="line" items={items} className="demo-tabs-pill" />
      </div>

      <div>
        <span style={labelStyle}>{t.cardLabel}</span>
        <Tabs type="card" items={items} className="demo-tabs-cards" />
      </div>

      <div>
        <span style={labelStyle}>{t.glassLabel}</span>
        <Tabs type="line" items={items} className="demo-tabs-glass" />
      </div>
    </div>
  )
}
