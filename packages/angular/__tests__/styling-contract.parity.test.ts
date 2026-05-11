/**
 * CSS contract parity tests for `@skygraph/angular`.
 *
 * Each Angular UI primitive is rendered with safe default inputs through
 * `TestBed`, then the resulting DOM is compared against an inline expected
 * shape derived directly from the matching React component in
 * `packages/react/src/components/ui/*.tsx`.
 *
 * Methodology + scope follow `packages/vue/src/__tests__/styling-contract.parity.test.ts`
 * (see its top-of-file comment for why we use INLINE expected shapes instead
 * of pulling React + react-dom into devDeps).
 *
 * Wave 4.1 ships only `SgButton` + `SgSpin`; richer coverage (Input, Select,
 * Tabs, etc.) lands during Wave 4.2 component ports.
 */

import { describe, it, expect } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { provideSgConfig } from '../src/lib/config/provide-sg-config'
import { SgButtonComponent } from '../src/lib/components/ui/button/sg-button.component'
import { SgSpinComponent } from '../src/lib/components/ui/spin/sg-spin.component'
import { SgConfigProviderComponent } from '../src/lib/config/sg-config-provider.component'

// ────────────────────────────────────────────────────────────────────────────
// Helpers — DOM shape extractor.
// ────────────────────────────────────────────────────────────────────────────

interface DomShape {
  tag: string
  attrs: Record<string, string>
  classes: string[]
  children: DomShape[]
}

function shape(el: Element): DomShape {
  const classes = Array.from(el.classList)
    .filter((c) => c.startsWith('sg-'))
    .sort()

  const attrs: Record<string, string> = {}
  for (const a of Array.from(el.attributes)) {
    const name = a.name
    const keep = name === 'role' || name.startsWith('aria-') || name.startsWith('data-')
    if (!keep) continue
    attrs[name] = a.value
  }

  return {
    tag: el.tagName.toLowerCase(),
    attrs,
    classes,
    children: Array.from(el.children).map(shape),
  }
}

function prune(s: DomShape): DomShape {
  const children = s.children.map(prune).filter((c) => {
    if (c.classes.length > 0) return true
    if (Object.keys(c.attrs).length > 0) return true
    if (c.children.length > 0) return true
    return false
  })
  return { ...s, children }
}

// Test harness: a tiny host component that drops a SgButton / SgSpin into the
// DOM. Each test queries the host's first element child to grab the actual
// button/span/div rendered by the directive.

@Component({
  standalone: true,
  imports: [SgButtonComponent],
  template: `<button sg-button>X</button>`,
})
class ButtonDefaultHost {}

@Component({
  standalone: true,
  imports: [SgButtonComponent],
  template: `<button sg-button type="primary" size="large" [danger]="true">X</button>`,
})
class ButtonPrimaryLargeDangerHost {}

@Component({
  standalone: true,
  imports: [SgButtonComponent],
  template: `<button sg-button [loading]="true">X</button>`,
})
class ButtonLoadingHost {}

@Component({
  standalone: true,
  imports: [SgButtonComponent],
  template: `<button sg-button [disabled]="true">X</button>`,
})
class ButtonDisabledHost {}

@Component({
  standalone: true,
  imports: [SgButtonComponent],
  template: `<button sg-button [block]="true">X</button>`,
})
class ButtonBlockHost {}

@Component({
  standalone: true,
  imports: [SgButtonComponent],
  template: `<a sg-button type="link">X</a>`,
})
class ButtonAnchorHost {}

@Component({
  standalone: true,
  imports: [SgSpinComponent],
  template: `<span sg-spin></span>`,
})
class SpinDefaultHost {}

@Component({
  standalone: true,
  imports: [SgSpinComponent],
  template: `<span sg-spin size="small"></span>`,
})
class SpinSmallHost {}

@Component({
  standalone: true,
  imports: [SgSpinComponent],
  template: `<div sg-spin fullscreen tip="Loading..."></div>`,
})
class SpinFullscreenHost {}

@Component({
  standalone: true,
  imports: [SgConfigProviderComponent, SgButtonComponent],
  template: `
    <sg-config-provider [config]="{ size: 'large' }">
      <button sg-button>X</button>
    </sg-config-provider>
  `,
})
class ConfigProviderHost {}

@Component({
  standalone: true,
  imports: [SgButtonComponent],
  template: `<button sg-button>X</button>`,
})
class ButtonWithRootConfigHost {}

function rootShape(hostType: new () => unknown, selector: string): DomShape {
  const fixture = TestBed.createComponent(hostType as never)
  fixture.detectChanges()
  const root = (fixture.nativeElement as HTMLElement).querySelector(selector)
  if (!root) throw new Error(`No element matched selector "${selector}"`)
  return prune(shape(root))
}

// ────────────────────────────────────────────────────────────────────────────
// Parity expectations.
// ────────────────────────────────────────────────────────────────────────────

describe('CSS contract parity — UI primitives', () => {
  // ── Button ────────────────────────────────────────────────────────────────

  it('SgButton (default, idle)', () => {
    // React: <button type="button"
    //   class="sg-button sg-button-default sg-button-middle"
    //   aria-disabled={false} aria-busy={undefined}>X</button>
    const s = rootShape(ButtonDefaultHost, '[sg-button]')
    expect(s.tag).toBe('button')
    expect(s.classes).toEqual(['sg-button', 'sg-button-default', 'sg-button-middle'])
    expect(s.attrs['aria-disabled']).toBe('false')
    expect(s.children).toEqual([])
  })

  it('SgButton (primary, large, danger)', () => {
    // React adds sg-button-primary, sg-button-large, sg-button-danger.
    const s = rootShape(ButtonPrimaryLargeDangerHost, '[sg-button]')
    expect(s.classes).toEqual([
      'sg-button',
      'sg-button-danger',
      'sg-button-large',
      'sg-button-primary',
    ])
  })

  it('SgButton (loading) — renders <span sg-spin> + aria-busy', () => {
    // React: <button class="… sg-button-loading" disabled aria-busy=true>
    //          <span class="sg-spin-standalone">
    //            <span class="sg-spin sg-spin-small" role="status" .../>
    //          </span>
    //          {children}
    //        </button>
    const s = rootShape(ButtonLoadingHost, '[sg-button]')
    expect(s.classes).toContain('sg-button-loading')
    expect(s.attrs['aria-busy']).toBe('true')
    expect(s.attrs['aria-disabled']).toBe('true')
    const spinHost = s.children.find((c) => c.classes.includes('sg-spin-standalone'))
    expect(spinHost).toBeDefined()
    const inner = spinHost!.children.find((c) => c.classes.includes('sg-spin'))
    expect(inner).toBeDefined()
    expect(inner!.classes).toEqual(['sg-spin', 'sg-spin-small'])
    expect(inner!.attrs.role).toBe('status')
    expect(inner!.attrs['aria-live']).toBe('polite')
    expect(inner!.attrs['aria-label']).toBe('Loading')
  })

  it('SgButton (disabled) — aria-disabled=true, no aria-busy', () => {
    const s = rootShape(ButtonDisabledHost, '[sg-button]')
    expect(s.attrs['aria-disabled']).toBe('true')
    expect(s.attrs['aria-busy']).toBeUndefined()
  })

  it('SgButton (block)', () => {
    const s = rootShape(ButtonBlockHost, '[sg-button]')
    expect(s.classes).toContain('sg-button-block')
  })

  it('SgButton on <a> — no `type` attribute, classes intact', () => {
    // React <Button> always uses <button>, but our attribute selector also
    // accepts <a sg-button>. We deliberately suppress the HTML `type` on
    // anchors (HTML spec forbids `type=button` on <a>).
    const s = rootShape(ButtonAnchorHost, '[sg-button]')
    expect(s.tag).toBe('a')
    expect(s.classes).toEqual(['sg-button', 'sg-button-link', 'sg-button-middle'])
  })

  // ── Spin ──────────────────────────────────────────────────────────────────

  it('SgSpin (standalone, default size)', () => {
    // React: <span class="sg-spin-standalone">
    //          <span class="sg-spin sg-spin-default" role="status" aria-live="polite" aria-label="Loading" />
    //        </span>
    const s = rootShape(SpinDefaultHost, '[sg-spin]')
    expect(s.tag).toBe('span')
    expect(s.classes).toEqual(['sg-spin-standalone'])
    const indicator = s.children.find((c) => c.classes.includes('sg-spin'))
    expect(indicator).toBeDefined()
    expect(indicator!.classes).toEqual(['sg-spin', 'sg-spin-default'])
    expect(indicator!.attrs.role).toBe('status')
    expect(indicator!.attrs['aria-live']).toBe('polite')
    expect(indicator!.attrs['aria-label']).toBe('Loading')
  })

  it('SgSpin (size=small)', () => {
    const s = rootShape(SpinSmallHost, '[sg-spin]')
    const indicator = s.children.find((c) => c.classes.includes('sg-spin'))
    expect(indicator!.classes).toEqual(['sg-spin', 'sg-spin-small'])
  })

  it('SgSpin (fullscreen, with tip)', () => {
    // React fullscreen: <div class="sg-spin-fullscreen">…</div>
    const s = rootShape(SpinFullscreenHost, '[sg-spin]')
    expect(s.tag).toBe('div')
    expect(s.classes).toEqual(['sg-spin-fullscreen'])
    const indicator = s.children.find((c) => c.classes.includes('sg-spin'))
    expect(indicator).toBeDefined()
    const tip = s.children.find((c) => c.classes.includes('sg-spin-tip'))
    expect(tip).toBeDefined()
  })

  // ── ConfigProvider — DI ───────────────────────────────────────────────────

  it('provideSgConfig(size=large) at root feeds size into SgButton', () => {
    // App/route-level `provideSgConfig()` is the Wave 4.1 supported surface
    // for setting defaults — equivalent to React's root `<ConfigProvider>`.
    // Subtree-scoped `<sg-config-provider>` DI-override is a Wave 4.2 item
    // (see findings/T-Angular-Foundation.md F7).
    TestBed.configureTestingModule({ providers: [provideSgConfig({ size: 'large' })] })
    const s = rootShape(ButtonWithRootConfigHost, '[sg-button]')
    expect(s.classes).toContain('sg-button-large')
    expect(s.classes).not.toContain('sg-button-middle')
  })

  it('SgConfigProvider element renders projected children without errors', () => {
    // Element-form provider is a structural wrapper in Wave 4.1; DI
    // propagation lives behind the directive form (Wave 4.2).
    const fixture = TestBed.createComponent(ConfigProviderHost)
    fixture.detectChanges()
    const btn = (fixture.nativeElement as HTMLElement).querySelector('[sg-button]')
    expect(btn).not.toBeNull()
    expect(btn!.classList.contains('sg-button')).toBe(true)
  })
})
