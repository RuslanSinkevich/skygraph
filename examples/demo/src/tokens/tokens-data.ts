/**
 * Registry of SkyGraph CSS custom properties.
 *
 * This is the single source of truth for the /tokens page and the per-
 * component `CSS Variables` tables. When a new token is added to
 * `packages/styles/**`, add a line here so it stays discoverable.
 *
 * Categories:
 *   • `global`    — base palette + semantic tokens, theme-driven
 *   • `component` — locally declared on a component selector, intended as
 *                   a public override API
 */

export type TokenCategory =
  | 'palette'
  | 'color'
  | 'background'
  | 'text'
  | 'border'
  | 'sizing'
  | 'typography'
  | 'spacing'
  | 'radius'
  | 'shadow'
  | 'motion'
  | 'zindex'

export interface TokenDef {
  name: string
  default: string
  description: string
  category: TokenCategory
}

export interface ComponentTokenDef {
  name: string
  default: string
  description: string
}

export interface ComponentTokenGroup {
  component: string
  slug: string
  vars: ComponentTokenDef[]
}

export const globalTokens: TokenDef[] = [
  // ── Palette ──────────────────────────────────────────────────────
  { name: 'sg-blue-6', default: '#1677ff', description: 'Brand primary blue', category: 'palette' },
  { name: 'sg-gray-5', default: '#d9d9d9', description: 'Default border base', category: 'palette' },
  { name: 'sg-gray-6', default: '#bfbfbf', description: 'Disabled border', category: 'palette' },
  { name: 'sg-red-5',  default: '#ff4d4f', description: 'Error / danger', category: 'palette' },
  { name: 'sg-green-6', default: '#52c41a', description: 'Success', category: 'palette' },
  { name: 'sg-orange-5', default: '#faad14', description: 'Warning', category: 'palette' },

  // ── Semantic: color / primary / state ───────────────────────────
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Brand primary', category: 'color' },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: 'Primary on hover', category: 'color' },
  { name: 'sg-color-primary-active', default: 'var(--sg-blue-7)', description: 'Primary on active/press', category: 'color' },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: 'Subtle primary tint', category: 'color' },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: 'Error foreground', category: 'color' },
  { name: 'sg-color-error-bg', default: 'var(--sg-red-1)', description: 'Error tint background', category: 'color' },
  { name: 'sg-color-success', default: 'var(--sg-green-6)', description: 'Success foreground', category: 'color' },
  { name: 'sg-color-success-bg', default: 'var(--sg-green-1)', description: 'Success tint background', category: 'color' },
  { name: 'sg-color-warning', default: 'var(--sg-orange-5)', description: 'Warning foreground', category: 'color' },
  { name: 'sg-color-warning-bg', default: 'var(--sg-orange-1)', description: 'Warning tint background', category: 'color' },

  // ── Semantic: background ────────────────────────────────────────
  { name: 'sg-color-bg', default: 'var(--sg-gray-1)', description: 'Primary surface (page / card)', category: 'background' },
  { name: 'sg-color-bg-secondary', default: 'var(--sg-gray-2)', description: 'Muted surface (sidebars, chips)', category: 'background' },
  { name: 'sg-color-bg-elevated', default: 'var(--sg-gray-1)', description: 'Popovers / dropdowns / modals', category: 'background' },
  { name: 'sg-color-bg-container', default: 'var(--sg-gray-1)', description: 'Form controls background', category: 'background' },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: 'Hover surface', category: 'background' },
  { name: 'sg-color-bg-disabled', default: 'var(--sg-gray-3)', description: 'Disabled surface', category: 'background' },

  // ── Semantic: text ──────────────────────────────────────────────
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Default text', category: 'text' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Less prominent text', category: 'text' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Supplementary / help text', category: 'text' },
  { name: 'sg-color-text-quaternary', default: 'rgba(0, 0, 0, 0.25)', description: 'Very low-emphasis text / icons', category: 'text' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled text', category: 'text' },
  { name: 'sg-color-text-placeholder', default: 'rgba(0, 0, 0, 0.25)', description: 'Input placeholder', category: 'text' },

  // ── Semantic: border ────────────────────────────────────────────
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: 'Primary border', category: 'border' },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'Subtler divider', category: 'border' },

  // ── Typography ──────────────────────────────────────────────────
  { name: 'sg-font-size', default: '14px', description: 'Base font size', category: 'typography' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Small font size', category: 'typography' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Large font size', category: 'typography' },
  { name: 'sg-font-size-xl', default: '20px', description: 'Extra large / titles', category: 'typography' },
  { name: 'sg-line-height', default: '1.5714', description: 'Base line height', category: 'typography' },

  // ── Sizing: control heights ─────────────────────────────────────
  { name: 'sg-height-sm', default: '24px', description: 'Small control height', category: 'sizing' },
  { name: 'sg-height-md', default: '32px', description: 'Default control height', category: 'sizing' },
  { name: 'sg-height-lg', default: '40px', description: 'Large control height', category: 'sizing' },

  // ── Radius ──────────────────────────────────────────────────────
  { name: 'sg-border-radius-sm', default: '4px', description: 'Small radius (tags, badges)', category: 'radius' },
  { name: 'sg-border-radius', default: '6px', description: 'Default radius (buttons, inputs)', category: 'radius' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Large radius (cards, modals)', category: 'radius' },

  // ── Spacing ─────────────────────────────────────────────────────
  { name: 'sg-padding-xs', default: '4px', description: 'Tiny internal padding', category: 'spacing' },
  { name: 'sg-padding-sm', default: '8px', description: 'Small internal padding', category: 'spacing' },
  { name: 'sg-padding-md', default: '12px', description: 'Default internal padding', category: 'spacing' },
  { name: 'sg-padding-lg', default: '16px', description: 'Large internal padding', category: 'spacing' },
  { name: 'sg-padding-xl', default: '24px', description: 'Extra large padding', category: 'spacing' },
  { name: 'sg-margin-xs', default: '4px', description: 'Tiny external margin', category: 'spacing' },
  { name: 'sg-margin-sm', default: '8px', description: 'Small external margin', category: 'spacing' },
  { name: 'sg-margin-md', default: '16px', description: 'Default external margin', category: 'spacing' },
  { name: 'sg-margin-lg', default: '24px', description: 'Large external margin', category: 'spacing' },

  // ── Shadow ──────────────────────────────────────────────────────
  { name: 'sg-shadow-sm', default: '0 1px 2px rgba(0, 0, 0, 0.04)', description: 'Small shadow (subtle lift)', category: 'shadow' },
  { name: 'sg-shadow', default: '0 2px 8px rgba(0, 0, 0, 0.08)', description: 'Default shadow (popovers)', category: 'shadow' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0, 0, 0, 0.12)', description: 'Large shadow (modals, drawers)', category: 'shadow' },

  // ── Motion ──────────────────────────────────────────────────────
  { name: 'sg-transition-duration', default: '0.2s', description: 'Default animation duration', category: 'motion' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Default easing', category: 'motion' },

  // ── Z-index ─────────────────────────────────────────────────────
  { name: 'sg-z-base', default: '1', description: 'Baseline stacking', category: 'zindex' },
  { name: 'sg-z-sticky', default: '3', description: 'Sticky headers / table rows', category: 'zindex' },
  { name: 'sg-z-sticky-fixed', default: '5', description: 'Sticky fixed columns / pinned rows', category: 'zindex' },
  { name: 'sg-z-loading', default: '10', description: 'Spinners and overlays', category: 'zindex' },
  { name: 'sg-z-modal', default: '1000', description: 'Modal dialogs', category: 'zindex' },
  { name: 'sg-z-tooltip', default: '1000', description: 'Tooltips', category: 'zindex' },
  { name: 'sg-z-dropdown', default: '1050', description: 'Dropdowns / menus', category: 'zindex' },
  { name: 'sg-z-notification', default: '1060', description: 'Toasts / notifications', category: 'zindex' },
]

export const componentTokenGroups: ComponentTokenGroup[] = [
  {
    component: 'Button',
    slug: 'button',
    vars: [
      { name: 'sg-btn-bg', default: 'transparent', description: 'Background fill (per variant)' },
      { name: 'sg-btn-color', default: 'var(--sg-color-text)', description: 'Foreground text/icon color' },
      { name: 'sg-btn-border', default: 'var(--sg-color-border)', description: 'Border color' },
      { name: 'sg-btn-height', default: 'var(--sg-height-md)', description: 'Height (size propagates)' },
      { name: 'sg-btn-padding', default: '0 var(--sg-padding-md)', description: 'Inline padding' },
      { name: 'sg-btn-radius', default: 'var(--sg-border-radius)', description: 'Corner radius' },
      { name: 'sg-btn-font-size', default: 'var(--sg-font-size)', description: 'Label font size' },
    ],
  },
  {
    component: 'Input',
    slug: 'input',
    vars: [
      { name: 'sg-input-height', default: 'var(--sg-height-md)', description: 'Control height' },
      { name: 'sg-input-padding', default: 'var(--sg-padding-xs) var(--sg-padding-md)', description: 'Inner padding' },
      { name: 'sg-input-font-size', default: 'var(--sg-font-size)', description: 'Text size' },
      { name: 'sg-input-color', default: 'var(--sg-color-text)', description: 'Text color' },
      { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: 'Background fill' },
      { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Border color (state-driven)' },
      { name: 'sg-input-radius', default: 'var(--sg-border-radius)', description: 'Corner radius' },
    ],
  },
  {
    component: 'Table',
    slug: 'table',
    vars: [
      { name: 'sg-table-row-height', default: 'auto', description: 'Minimum row height' },
      { name: 'sg-table-row-bg', default: 'transparent', description: 'Row background' },
      { name: 'sg-table-row-hover-bg', default: 'var(--sg-color-bg-hover)', description: 'Row background on hover' },
      { name: 'sg-table-header-bg', default: 'var(--sg-color-bg-secondary)', description: 'Header row background' },
      { name: 'sg-table-border-color', default: 'var(--sg-color-border)', description: 'Header/edge border' },
      { name: 'sg-table-border-color-secondary', default: 'var(--sg-color-border-secondary)', description: 'Row separators' },
      { name: 'sg-table-cell-padding', default: 'var(--sg-padding-sm) var(--sg-padding-md)', description: 'Per-cell padding (tune density)' },
      { name: 'sg-table-cell-solid-bg', default: 'var(--sg-color-bg)', description: 'Opaque base for grid & fixed cells' },
    ],
  },
  {
    component: 'Spin',
    slug: 'spin',
    vars: [
      { name: 'sg-spin-color', default: 'var(--sg-color-primary)', description: 'Dots / spinner color' },
      { name: 'sg-spin-overlay-bg', default: 'rgba(255, 255, 255, 0.65)', description: 'Loading overlay background' },
    ],
  },
]

export const categoryLabels: Record<TokenCategory, string> = {
  palette: 'Palette',
  color: 'Brand & state colors',
  background: 'Backgrounds',
  text: 'Text colors',
  border: 'Borders',
  sizing: 'Control sizing',
  typography: 'Typography',
  spacing: 'Spacing',
  radius: 'Radius',
  shadow: 'Shadow',
  motion: 'Motion',
  zindex: 'Z-index',
}

export const categoryOrder: TokenCategory[] = [
  'color',
  'background',
  'text',
  'border',
  'radius',
  'sizing',
  'typography',
  'spacing',
  'shadow',
  'motion',
  'zindex',
  'palette',
]
