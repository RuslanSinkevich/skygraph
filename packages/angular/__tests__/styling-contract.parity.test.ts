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
import { en_US, ru_RU, zh_CN, de_DE, fr_FR, es_ES } from '../src/lib/locales'
import { SgButtonComponent } from '../src/lib/components/ui/button/sg-button.component'
import { SgSpinComponent } from '../src/lib/components/ui/spin/sg-spin.component'
import { SgConfigProviderComponent } from '../src/lib/config/sg-config-provider.component'
import { SgTagComponent } from '../src/lib/components/ui/tag/sg-tag.component'
import { SgBadgeComponent } from '../src/lib/components/ui/badge/sg-badge.component'
import { SgAvatarComponent } from '../src/lib/components/ui/avatar/sg-avatar.component'
import { SgTooltipComponent } from '../src/lib/components/ui/tooltip/sg-tooltip.component'
import { SgSkeletonComponent } from '../src/lib/components/ui/skeleton/sg-skeleton.component'
import { SgProgressComponent } from '../src/lib/components/ui/progress/sg-progress.component'
import { SgEmptyComponent } from '../src/lib/components/ui/empty/sg-empty.component'
import { SgResultComponent } from '../src/lib/components/ui/result/sg-result.component'
import { SgSwitchComponent } from '../src/lib/components/ui/switch/sg-switch.component'
import { SgCheckboxComponent } from '../src/lib/components/ui/checkbox/sg-checkbox.component'
import { SgRadioGroupComponent } from '../src/lib/components/ui/radio/sg-radio-group.component'
import { SgSliderComponent } from '../src/lib/components/ui/slider/sg-slider.component'
import { SgRateComponent } from '../src/lib/components/ui/rate/sg-rate.component'
import { SgColorPickerComponent } from '../src/lib/components/ui/colorpicker/sg-colorpicker.component'
import { SgInputComponent } from '../src/lib/components/ui/input/sg-input.component'
import { SgInputNumberComponent } from '../src/lib/components/ui/input-number/sg-input-number.component'
import { SgTextareaComponent } from '../src/lib/components/ui/textarea/sg-textarea.component'
import { SgInputPasswordComponent } from '../src/lib/components/ui/input-password/sg-input-password.component'
import { SgSearchInputComponent } from '../src/lib/components/ui/search-input/sg-search-input.component'
import { SgPinInputComponent } from '../src/lib/components/ui/pin-input/sg-pin-input.component'
import { SgTagInputComponent } from '../src/lib/components/ui/tag-input/sg-tag-input.component'
import { SgMentionsComponent } from '../src/lib/components/ui/mentions/sg-mentions.component'
import { SgInlineEditComponent } from '../src/lib/components/ui/inline-edit/sg-inline-edit.component'
import { SgInputGroupComponent } from '../src/lib/components/ui/input-group/sg-input-group.component'
import { SgTabsComponent } from '../src/lib/components/ui/tabs/sg-tabs.component'
import { SgMenuComponent } from '../src/lib/components/ui/menu/sg-menu.component'
import { SgBreadcrumbComponent } from '../src/lib/components/ui/breadcrumb/sg-breadcrumb.component'
import { SgDropdownComponent } from '../src/lib/components/ui/dropdown/sg-dropdown.component'
import { SgPaginationComponent } from '../src/lib/components/ui/pagination/sg-pagination.component'
import { SgStepsComponent } from '../src/lib/components/ui/steps/sg-steps.component'
import { SgSegmentedComponent } from '../src/lib/components/ui/segmented/sg-segmented.component'
import { SgModalComponent } from '../src/lib/components/ui/modal/sg-modal.component'
import { SgDrawerComponent } from '../src/lib/components/ui/drawer/sg-drawer.component'
import { SgPopconfirmComponent } from '../src/lib/components/ui/popconfirm/sg-popconfirm.component'
import {
  SgCarouselComponent,
  SgCarouselSlideDirective,
} from '../src/lib/components/ui/carousel/sg-carousel.component'
import { SgCollapseComponent } from '../src/lib/components/ui/collapse/sg-collapse.component'
import { SgDescriptionsComponent } from '../src/lib/components/ui/descriptions/sg-descriptions.component'
import { SgSelectComponent } from '../src/lib/components/ui/select/sg-select.component'
import { SgAutoCompleteComponent } from '../src/lib/components/ui/autocomplete/sg-autocomplete.component'
import { SgCascaderComponent } from '../src/lib/components/ui/cascader/sg-cascader.component'
import { SgTreeSelectComponent } from '../src/lib/components/ui/tree-select/sg-tree-select.component'
import { SgDatePickerComponent } from '../src/lib/components/ui/date-picker/sg-date-picker.component'
import { SgTimePickerComponent } from '../src/lib/components/ui/time-picker/sg-time-picker.component'
import { SgCalendarComponent } from '../src/lib/components/ui/calendar/sg-calendar.component'
import { SgUploadComponent } from '../src/lib/components/ui/upload/sg-upload.component'
import { SgTransferComponent } from '../src/lib/components/ui/transfer/sg-transfer.component'
import { SgTimelineComponent } from '../src/lib/components/ui/timeline/sg-timeline.component'
import {
  SgListComponent,
  SgListItemTemplateDirective,
  SgListItemComponent,
} from '../src/lib/components/complex/list/sg-list.component'
import {
  SgTreeComponent,
  type SgTreeDataNode,
} from '../src/lib/components/complex/tree/sg-tree.component'
import { SgTransitionDirective } from '../src/lib/components/ui/transition/sg-transition.directive'

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

// ────────────────────────────────────────────────────────────────────────────
// Wave 4.2 — Batch A (UI primitives) parity hosts.
// ────────────────────────────────────────────────────────────────────────────

@Component({ standalone: true, imports: [SgTagComponent], template: `<span sg-tag>Default</span>` })
class TagDefaultHost {}

@Component({
  standalone: true,
  imports: [SgTagComponent],
  template: `<span sg-tag color="success">Ok</span>`,
})
class TagSuccessHost {}

@Component({
  standalone: true,
  imports: [SgTagComponent],
  template: `<span sg-tag color="#abcdef">Custom</span>`,
})
class TagCustomColorHost {}

@Component({
  standalone: true,
  imports: [SgTagComponent],
  template: `<span sg-tag closable>X</span>`,
})
class TagClosableHost {}

@Component({
  standalone: true,
  imports: [SgBadgeComponent],
  template: `<span sg-badge [count]="5"><a>x</a></span>`,
})
class BadgeCountHost {}

@Component({
  standalone: true,
  imports: [SgBadgeComponent],
  template: `<span sg-badge dot noChildren></span>`,
})
class BadgeStandaloneDotHost {}

@Component({
  standalone: true,
  imports: [SgBadgeComponent],
  template: `<span sg-badge status="success" text="On" noChildren></span>`,
})
class BadgeStatusHost {}

@Component({
  standalone: true,
  imports: [SgAvatarComponent],
  template: `<span sg-avatar>JD</span>`,
})
class AvatarTextHost {}

@Component({
  standalone: true,
  imports: [SgAvatarComponent],
  template: `<span sg-avatar shape="square" [size]="48">A</span>`,
})
class AvatarSquareHost {}

@Component({
  standalone: true,
  imports: [SgTooltipComponent],
  template: `<span sg-tooltip title="Hi" placement="bottom"><a>X</a></span>`,
})
class TooltipHost {}

@Component({
  standalone: true,
  imports: [SgSkeletonComponent],
  template: `<div sg-skeleton></div>`,
})
class SkeletonDefaultHost {}

@Component({
  standalone: true,
  imports: [SgSkeletonComponent],
  template: `<div sg-skeleton avatar active></div>`,
})
class SkeletonActiveAvatarHost {}

@Component({
  standalone: true,
  imports: [SgProgressComponent],
  template: `<div sg-progress [percent]="40"></div>`,
})
class ProgressLineHost {}

@Component({
  standalone: true,
  imports: [SgProgressComponent],
  template: `<div sg-progress type="circle" [percent]="100"></div>`,
})
class ProgressCircleHost {}

@Component({ standalone: true, imports: [SgEmptyComponent], template: `<div sg-empty></div>` })
class EmptyDefaultHost {}

@Component({
  standalone: true,
  imports: [SgResultComponent],
  template: `<div sg-result status="success" title="Done"></div>`,
})
class ResultSuccessHost {}

@Component({
  standalone: true,
  imports: [SgSwitchComponent],
  template: `<button sg-switch [value]="true"></button>`,
})
class SwitchOnHost {}

@Component({
  standalone: true,
  imports: [SgCheckboxComponent],
  template: `<label sg-checkbox [value]="true">Accept</label>`,
})
class CheckboxCheckedHost {}

@Component({
  standalone: true,
  imports: [SgRadioGroupComponent],
  template: `<div sg-radio-group [options]="opts" [value]="'a'"></div>`,
})
class RadioGroupHost {
  opts = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ]
}

@Component({
  standalone: true,
  imports: [SgSliderComponent],
  template: `<div sg-slider [value]="40"></div>`,
})
class SliderHost {}

@Component({
  standalone: true,
  imports: [SgRateComponent],
  template: `<div sg-rate [value]="3" [count]="5"></div>`,
})
class RateHost {}

@Component({
  standalone: true,
  imports: [SgColorPickerComponent],
  template: `<div sg-colorpicker value="#ff0000"></div>`,
})
class ColorPickerHost {}

describe('CSS contract parity — Wave 4.2 Batch A', () => {
  it('SgTag (default) — preset adds sg-tag-default', () => {
    // React `Tag` treats 'default' as a preset, emitting `sg-tag sg-tag-default`.
    const s = rootShape(TagDefaultHost, '[sg-tag]')
    expect(s.tag).toBe('span')
    expect(s.classes).toEqual(['sg-tag', 'sg-tag-default'])
  })

  it('SgTag (preset color=success)', () => {
    const s = rootShape(TagSuccessHost, '[sg-tag]')
    expect(s.classes).toEqual(['sg-tag', 'sg-tag-success'])
  })

  it('SgTag (custom color → only sg-tag, no preset class)', () => {
    const s = rootShape(TagCustomColorHost, '[sg-tag]')
    expect(s.classes).toEqual(['sg-tag'])
  })

  it('SgTag (closable) renders <span class="sg-tag-close">', () => {
    const s = rootShape(TagClosableHost, '[sg-tag]')
    const close = s.children.find((c) => c.classes.includes('sg-tag-close'))
    expect(close).toBeDefined()
    expect(close!.attrs.role).toBe('button')
  })

  it('SgBadge (count) — wraps children with sg-badge + sg-badge-count', () => {
    const s = rootShape(BadgeCountHost, '[sg-badge]')
    expect(s.classes).toEqual(['sg-badge'])
    const sup = s.children.find((c) => c.tag === 'sup' && c.classes.includes('sg-badge-count'))
    expect(sup).toBeDefined()
  })

  it('SgBadge (standalone dot) — sg-badge-standalone + sg-badge-dot', () => {
    const s = rootShape(BadgeStandaloneDotHost, '[sg-badge]')
    expect(s.classes).toEqual(['sg-badge', 'sg-badge-standalone'])
    const dot = s.children.find((c) => c.classes.includes('sg-badge-dot'))
    expect(dot).toBeDefined()
  })

  it('SgBadge (status only)', () => {
    const s = rootShape(BadgeStatusHost, '[sg-badge]')
    expect(s.classes).toEqual(['sg-badge-status'])
    const dot = s.children.find((c) => c.classes.includes('sg-badge-status-dot'))
    expect(dot).toBeDefined()
    expect(dot!.classes).toContain('sg-badge-status-success')
  })

  it('SgAvatar (text) — circle + middle/default size class', () => {
    const s = rootShape(AvatarTextHost, '[sg-avatar]')
    expect(s.classes).toEqual(['sg-avatar', 'sg-avatar-circle', 'sg-avatar-default'])
    expect(s.attrs.role).toBe('img')
  })

  it('SgAvatar (square + numeric size — no size class)', () => {
    const s = rootShape(AvatarSquareHost, '[sg-avatar]')
    expect(s.classes).toEqual(['sg-avatar', 'sg-avatar-square'])
  })

  it('SgTooltip — wrapper with sg-tooltip-wrapper', () => {
    const s = rootShape(TooltipHost, '[sg-tooltip]')
    expect(s.classes).toEqual(['sg-tooltip-wrapper'])
  })

  it('SgSkeleton (default) — sg-skeleton + title + paragraph', () => {
    const s = rootShape(SkeletonDefaultHost, '[sg-skeleton]')
    expect(s.classes).toEqual(['sg-skeleton'])
    const content = s.children.find((c) => c.classes.includes('sg-skeleton-content'))
    expect(content).toBeDefined()
    const title = content!.children.find((c) => c.classes.includes('sg-skeleton-title'))
    const p = content!.children.find((c) => c.classes.includes('sg-skeleton-paragraph'))
    expect(title).toBeDefined()
    expect(p).toBeDefined()
  })

  it('SgSkeleton (active + avatar)', () => {
    const s = rootShape(SkeletonActiveAvatarHost, '[sg-skeleton]')
    expect(s.classes).toEqual(['sg-skeleton', 'sg-skeleton-active', 'sg-skeleton-with-avatar'])
  })

  it('SgProgress (line)', () => {
    const s = rootShape(ProgressLineHost, '[sg-progress]')
    expect(s.classes).toEqual([
      'sg-progress',
      'sg-progress-default',
      'sg-progress-line',
      'sg-progress-normal',
    ])
    expect(s.attrs.role).toBe('progressbar')
    expect(s.attrs['aria-valuenow']).toBe('40')
  })

  it('SgProgress (circle, 100% → success)', () => {
    const s = rootShape(ProgressCircleHost, '[sg-progress]')
    expect(s.classes).toEqual(['sg-progress', 'sg-progress-circle', 'sg-progress-success'])
  })

  it('SgEmpty — sg-empty + role=status', () => {
    const s = rootShape(EmptyDefaultHost, '[sg-empty]')
    expect(s.classes).toEqual(['sg-empty'])
    expect(s.attrs.role).toBe('status')
    const img = s.children.find((c) => c.classes.includes('sg-empty-image'))
    const desc = s.children.find((c) => c.classes.includes('sg-empty-description'))
    expect(img).toBeDefined()
    expect(desc).toBeDefined()
  })

  it('SgResult (success)', () => {
    const s = rootShape(ResultSuccessHost, '[sg-result]')
    expect(s.classes).toEqual(['sg-result', 'sg-result-success'])
    expect(s.attrs.role).toBe('status')
    expect(s.attrs['aria-live']).toBe('polite')
  })

  it('SgSwitch (on)', () => {
    const s = rootShape(SwitchOnHost, '[sg-switch]')
    expect(s.classes).toEqual(['sg-switch', 'sg-switch-checked', 'sg-switch-default'])
    expect(s.attrs.role).toBe('switch')
    expect(s.attrs['aria-checked']).toBe('true')
  })

  it('SgCheckbox (checked label)', () => {
    const s = rootShape(CheckboxCheckedHost, '[sg-checkbox]')
    expect(s.tag).toBe('label')
    expect(s.classes).toEqual(['sg-checkbox'])
    const input = s.children.find((c) => c.classes.includes('sg-checkbox-input'))
    expect(input).toBeDefined()
  })

  it('SgRadioGroup (horizontal)', () => {
    const s = rootShape(RadioGroupHost, '[sg-radio-group]')
    expect(s.classes).toEqual(['sg-radio-group', 'sg-radio-group-horizontal'])
    expect(s.attrs.role).toBe('radiogroup')
    const radios = s.children.filter((c) => c.classes.includes('sg-radio'))
    expect(radios.length).toBe(2)
    expect(radios[0].classes).toContain('sg-radio-checked')
  })

  it('SgSlider', () => {
    const s = rootShape(SliderHost, '[sg-slider]')
    expect(s.classes).toEqual(['sg-slider'])
    const track = s.children.find((c) => c.classes.includes('sg-slider-track'))
    expect(track).toBeDefined()
    const handle = track!.children.find((c) => c.classes.includes('sg-slider-handle'))
    expect(handle).toBeDefined()
    expect(handle!.attrs.role).toBe('slider')
    expect(handle!.attrs['aria-valuenow']).toBe('40')
  })

  it('SgRate', () => {
    const s = rootShape(RateHost, '[sg-rate]')
    expect(s.classes).toEqual(['sg-rate'])
    expect(s.attrs.role).toBe('radiogroup')
    const stars = s.children.filter((c) => c.classes.includes('sg-rate-star'))
    expect(stars.length).toBe(5)
    expect(stars[0].classes).toContain('sg-rate-star-full')
    expect(stars[2].classes).toContain('sg-rate-star-full')
    expect(stars[3].classes).not.toContain('sg-rate-star-full')
  })

  it('SgColorPicker', () => {
    const s = rootShape(ColorPickerHost, '[sg-colorpicker]')
    expect(s.classes.some((c) => c.startsWith('sg-colorpicker-'))).toBe(true)
    expect(s.classes).toContain('sg-colorpicker-wrapper')
    const trigger = s.children.find((c) => c.tag === 'button')
    expect(trigger).toBeDefined()
  })
})

// ────────────────────────────────────────────────────────────────────────────
// Wave 4.2 — Batch B (UI inputs) parity hosts.
// ────────────────────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [SgInputComponent],
  template: `<span sg-input value="hello"></span>`,
})
class InputDefaultHost {}

@Component({
  standalone: true,
  imports: [SgInputComponent],
  template: `<span sg-input size="large" [readOnly]="true" value="x"></span>`,
})
class InputLargeReadonlyHost {}

@Component({
  standalone: true,
  imports: [SgInputNumberComponent],
  template: `<span sg-input-number [value]="5" [min]="0" [max]="10"></span>`,
})
class InputNumberHost {}

@Component({
  standalone: true,
  imports: [SgTextareaComponent],
  template: `<div sg-textarea value="abc"></div>`,
})
class TextareaHost {}

@Component({
  standalone: true,
  imports: [SgInputPasswordComponent],
  template: `<div sg-input-password value="abc"></div>`,
})
class InputPasswordHost {}

@Component({
  standalone: true,
  imports: [SgSearchInputComponent],
  template: `<span sg-search-input value="" placeholder="…"></span>`,
})
class SearchInputHost {}

@Component({
  standalone: true,
  imports: [SgSearchInputComponent],
  template: `<span sg-search-input value="" enterButton="Go"></span>`,
})
class SearchInputWithButtonHost {}

@Component({
  standalone: true,
  imports: [SgPinInputComponent],
  template: `<div sg-pin-input length="4" value="12"></div>`,
})
class PinInputHost {}

@Component({
  standalone: true,
  imports: [SgTagInputComponent],
  template: `<div sg-tag-input [value]="['alpha', 'beta']"></div>`,
})
class TagInputHost {}

@Component({
  standalone: true,
  imports: [SgMentionsComponent],
  template: `<div sg-mentions value="hi"></div>`,
})
class MentionsHost {}

@Component({
  standalone: true,
  imports: [SgInlineEditComponent],
  template: `<span sg-inline-edit value="Title"></span>`,
})
class InlineEditViewHost {}

@Component({
  standalone: true,
  imports: [SgInputGroupComponent, SgInputComponent],
  template: `
    <span sg-input-group>
      <span sg-input-group-before>https://</span>
      <span sg-input value=""></span>
      <span sg-input-group-after>.com</span>
    </span>
  `,
})
class InputGroupHost {}

describe('CSS contract parity — Wave 4.2 Batch B', () => {
  it('SgInput (default) — wrapper + inner input', () => {
    const s = rootShape(InputDefaultHost, '[sg-input]')
    expect(s.tag).toBe('span')
    expect(s.classes).toEqual(['sg-input-wrapper', 'sg-input-wrapper-middle'])
    const inner = s.children.find((c) => c.tag === 'input')
    expect(inner).toBeDefined()
    expect(inner!.classes).toEqual(['sg-input', 'sg-input-middle'])
  })

  it('SgInput (large readonly)', () => {
    const s = rootShape(InputLargeReadonlyHost, '[sg-input]')
    expect(s.classes).toEqual([
      'sg-input-wrapper',
      'sg-input-wrapper-large',
      'sg-input-wrapper-readonly',
    ])
    const inner = s.children.find((c) => c.tag === 'input')
    expect(inner!.classes).toContain('sg-input-readonly')
    expect(inner!.attrs['aria-readonly']).toBe('true')
  })

  it('SgInputNumber', () => {
    const s = rootShape(InputNumberHost, '[sg-input-number]')
    expect(s.classes).toEqual(['sg-input-number', 'sg-input-number-middle'])
    const minus = s.children.find((c) => c.classes.includes('sg-input-number-minus'))
    const plus = s.children.find((c) => c.classes.includes('sg-input-number-plus'))
    const input = s.children.find((c) => c.classes.includes('sg-input-number-input'))
    expect(minus).toBeDefined()
    expect(plus).toBeDefined()
    expect(input).toBeDefined()
    expect(input!.attrs.role).toBe('spinbutton')
    expect(input!.attrs['aria-valuenow']).toBe('5')
  })

  it('SgTextarea', () => {
    const s = rootShape(TextareaHost, '[sg-textarea]')
    expect(s.tag).toBe('div')
    expect(s.classes).toEqual(['sg-textarea-middle', 'sg-textarea-wrapper'])
    const ta = s.children.find((c) => c.tag === 'textarea')
    expect(ta).toBeDefined()
    expect(ta!.classes).toEqual(['sg-input', 'sg-textarea'])
  })

  it('SgInputPassword', () => {
    const s = rootShape(InputPasswordHost, '[sg-input-password]')
    expect(s.tag).toBe('div')
    const wrapper = s.children.find((c) => c.classes.includes('sg-input-password-wrapper'))
    expect(wrapper).toBeDefined()
    const input = wrapper!.children.find((c) => c.tag === 'input')
    expect(input).toBeDefined()
    expect(input!.classes).toEqual(['sg-input', 'sg-input-middle', 'sg-input-password'])
    const toggle = wrapper!.children.find((c) => c.classes.includes('sg-input-password-toggle'))
    expect(toggle).toBeDefined()
  })

  it('SgSearchInput (no button)', () => {
    const s = rootShape(SearchInputHost, '[sg-search-input]')
    expect(s.classes).toEqual(['sg-search-input', 'sg-search-input-middle'])
    const icon = s.children.find((c) => c.classes.includes('sg-search-input-icon'))
    const input = s.children.find((c) => c.classes.includes('sg-search-input-field'))
    expect(icon).toBeDefined()
    expect(input).toBeDefined()
  })

  it('SgSearchInput (enterButton)', () => {
    const s = rootShape(SearchInputWithButtonHost, '[sg-search-input]')
    expect(s.classes).toContain('sg-search-input-with-button')
    const btn = s.children.find((c) => c.classes.includes('sg-search-input-btn'))
    expect(btn).toBeDefined()
  })

  it('SgPinInput', () => {
    const s = rootShape(PinInputHost, '[sg-pin-input]')
    expect(s.classes).toEqual(['sg-pin-input', 'sg-pin-input-middle'])
    expect(s.attrs.role).toBe('group')
    const cells = s.children.filter((c) => c.classes.includes('sg-pin-input-cell'))
    expect(cells.length).toBe(4)
    expect(cells[0].classes).toContain('sg-pin-input-cell-filled')
    expect(cells[1].classes).toContain('sg-pin-input-cell-filled')
    expect(cells[2].classes).not.toContain('sg-pin-input-cell-filled')
  })

  it('SgTagInput', () => {
    const s = rootShape(TagInputHost, '[sg-tag-input]')
    expect(s.classes).toEqual(['sg-tag-input', 'sg-tag-input-middle'])
    const tags = s.children.filter((c) => c.classes.includes('sg-tag'))
    expect(tags.length).toBe(2)
    const field = s.children.find((c) => c.classes.includes('sg-tag-input-field'))
    expect(field).toBeDefined()
  })

  it('SgMentions', () => {
    const s = rootShape(MentionsHost, '[sg-mentions]')
    expect(s.classes).toEqual(['sg-mentions', 'sg-mentions-middle'])
    const ta = s.children.find((c) => c.tag === 'textarea')
    expect(ta).toBeDefined()
  })

  it('SgInlineEdit (view)', () => {
    const s = rootShape(InlineEditViewHost, '[sg-inline-edit]')
    expect(s.classes).toEqual(['sg-inline-edit-view', 'sg-inline-edit-view-middle'])
    expect(s.attrs.role).toBe('button')
  })

  it('SgInputGroup', () => {
    const s = rootShape(InputGroupHost, '[sg-input-group]')
    expect(s.classes).toEqual(['sg-input-group', 'sg-input-group-compact', 'sg-input-group-middle'])
    const addons = s.children.filter((c) => c.classes.includes('sg-input-group-addon'))
    expect(addons.length).toBe(2)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// Wave 4.2 — Batch C (UI nav + feedback) parity hosts.
// ────────────────────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [SgTabsComponent],
  template: `<div sg-tabs [items]="items" [activeKey]="'a'"></div>`,
})
class TabsHost {
  items = [
    { key: 'a', label: 'A', content: 'one' },
    { key: 'b', label: 'B', content: 'two' },
  ]
}

@Component({
  standalone: true,
  imports: [SgMenuComponent],
  template: `<ul sg-menu [items]="items" mode="vertical" [selectedKeys]="['a']"></ul>`,
})
class MenuHost {
  items = [
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
  ]
}

@Component({
  standalone: true,
  imports: [SgBreadcrumbComponent],
  template: `<nav sg-breadcrumb [items]="items"></nav>`,
})
class BreadcrumbHost {
  items = [{ title: 'Home', href: '/' }, { title: 'Now' }]
}

@Component({
  standalone: true,
  imports: [SgDropdownComponent],
  template: `<sg-dropdown [items]="items" trigger="click"><span>x</span></sg-dropdown>`,
})
class DropdownHost {
  items = [{ key: 'a', label: 'A' }]
}

@Component({
  standalone: true,
  imports: [SgPaginationComponent],
  template: `<nav sg-pagination [current]="2" [total]="100" [pageSize]="10"></nav>`,
})
class PaginationHost {}

@Component({
  standalone: true,
  imports: [SgStepsComponent],
  template: `<div sg-steps [items]="items" [current]="1"></div>`,
})
class StepsHost {
  items = [{ title: 'Login' }, { title: 'Verify' }, { title: 'Done' }]
}

@Component({
  standalone: true,
  imports: [SgSegmentedComponent],
  template: `<div sg-segmented [options]="opts" [value]="'a'"></div>`,
})
class SegmentedHost {
  opts = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ]
}

@Component({
  standalone: true,
  imports: [SgModalComponent],
  template: `<sg-modal [open]="true" title="T">body</sg-modal>`,
})
class ModalHost {}

@Component({
  standalone: true,
  imports: [SgDrawerComponent],
  template: `<sg-drawer [open]="true" title="T" placement="right">body</sg-drawer>`,
})
class DrawerHost {}

@Component({
  standalone: true,
  imports: [SgPopconfirmComponent],
  template: `<sg-popconfirm title="Sure?"><span>x</span></sg-popconfirm>`,
})
class PopconfirmHost {}

@Component({
  standalone: true,
  imports: [SgCarouselComponent, SgCarouselSlideDirective],
  template: `
    <div sg-carousel>
      <ng-template sg-carousel-slide>1</ng-template>
      <ng-template sg-carousel-slide>2</ng-template>
    </div>
  `,
})
class CarouselHost {}

@Component({
  standalone: true,
  imports: [SgCollapseComponent],
  template: `<div sg-collapse [items]="items" [activeKey]="'a'"></div>`,
})
class CollapseHost {
  items = [
    { key: 'a', label: 'A', content: '1' },
    { key: 'b', label: 'B', content: '2' },
  ]
}

@Component({
  standalone: true,
  imports: [SgDescriptionsComponent],
  template: `<div sg-descriptions [items]="items" [column]="2"></div>`,
})
class DescriptionsHost {
  items = [
    { label: 'Name', value: 'X' },
    { label: 'Age', value: '30' },
  ]
}

describe('CSS contract parity — Wave 4.2 Batch C', () => {
  it('SgTabs', () => {
    const s = rootShape(TabsHost, '[sg-tabs]')
    expect(s.classes).toEqual(['sg-tabs', 'sg-tabs-card', 'sg-tabs-middle'])
    const nav = s.children.find((c) => c.classes.includes('sg-tabs-nav'))
    expect(nav).toBeDefined()
    expect(nav!.attrs.role).toBe('tablist')
    const tabs = nav!.children.filter((c) => c.classes.includes('sg-tabs-tab'))
    expect(tabs.length).toBe(2)
    expect(tabs[0].classes).toContain('sg-tabs-tab-active')
    const panel = s.children.find((c) => c.classes.includes('sg-tabs-content'))
    expect(panel!.attrs.role).toBe('tabpanel')
  })

  it('SgMenu', () => {
    const s = rootShape(MenuHost, '[sg-menu]')
    expect(s.classes).toEqual(['sg-menu', 'sg-menu-light', 'sg-menu-vertical'])
    expect(s.attrs.role).toBe('menu')
    const items = s.children.filter((c) => c.classes.includes('sg-menu-item'))
    expect(items.length).toBe(2)
    expect(items[0].classes).toContain('sg-menu-item-selected')
  })

  it('SgBreadcrumb', () => {
    const s = rootShape(BreadcrumbHost, '[sg-breadcrumb]')
    expect(s.classes).toEqual(['sg-breadcrumb'])
    expect(s.attrs['aria-label']).toBe('Breadcrumb')
    const link = s.children.find((c) => c.tag === 'a' && c.classes.includes('sg-breadcrumb-link'))
    expect(link).toBeDefined()
    const sep = s.children.find((c) => c.classes.includes('sg-breadcrumb-separator'))
    expect(sep).toBeDefined()
  })

  it('SgDropdown', () => {
    const s = rootShape(DropdownHost, 'sg-dropdown')
    expect(s.classes).toEqual(['sg-dropdown-wrapper'])
    const trigger = s.children.find((c) => c.classes.includes('sg-dropdown-trigger'))
    expect(trigger).toBeDefined()
    expect(trigger!.attrs['aria-expanded']).toBe('false')
    expect(trigger!.attrs['aria-haspopup']).toBe('menu')
  })

  it('SgPagination', () => {
    const s = rootShape(PaginationHost, '[sg-pagination]')
    expect(s.classes).toEqual(['sg-pagination'])
    expect(s.attrs['aria-label']).toBe('Pagination')
    const items = s.children.filter((c) => c.classes.includes('sg-pagination-item'))
    expect(items.length).toBeGreaterThan(2)
    const active = items.find((i) => i.classes.includes('sg-pagination-item-active'))
    expect(active).toBeDefined()
  })

  it('SgSteps', () => {
    const s = rootShape(StepsHost, '[sg-steps]')
    expect(s.classes).toEqual(['sg-steps', 'sg-steps-default', 'sg-steps-horizontal'])
    expect(s.attrs.role).toBe('list')
    const items = s.children.filter((c) => c.classes.includes('sg-steps-item'))
    expect(items.length).toBe(3)
    expect(items[0].classes).toContain('sg-steps-item-finish')
    expect(items[1].classes).toContain('sg-steps-item-process')
    expect(items[2].classes).toContain('sg-steps-item-wait')
  })

  it('SgSegmented', () => {
    const s = rootShape(SegmentedHost, '[sg-segmented]')
    expect(s.classes).toEqual(['sg-segmented', 'sg-segmented-middle'])
    expect(s.attrs.role).toBe('radiogroup')
    const items = s.children.filter((c) => c.classes.includes('sg-segmented-item'))
    expect(items.length).toBe(2)
    expect(items[0].classes).toContain('sg-segmented-item-selected')
  })

  it('SgModal (open)', () => {
    const s = rootShape(ModalHost, 'sg-modal')
    const mask = s.children.find((c) => c.classes.includes('sg-modal-mask'))
    expect(mask).toBeDefined()
    const dialog = mask!.children.find((c) => c.classes.includes('sg-modal'))
    expect(dialog).toBeDefined()
    expect(dialog!.attrs.role).toBe('dialog')
    expect(dialog!.attrs['aria-modal']).toBe('true')
  })

  it('SgDrawer (open right)', () => {
    const s = rootShape(DrawerHost, 'sg-drawer')
    const root = s.children.find((c) => c.classes.includes('sg-drawer-root'))
    expect(root).toBeDefined()
    const panel = root!.children.find((c) => c.classes.includes('sg-drawer'))
    expect(panel).toBeDefined()
    expect(panel!.classes).toContain('sg-drawer-right')
    expect(panel!.attrs.role).toBe('dialog')
  })

  it('SgPopconfirm (closed by default)', () => {
    const s = rootShape(PopconfirmHost, 'sg-popconfirm')
    expect(s.classes).toEqual(['sg-popconfirm-wrapper'])
    const popup = s.children.find((c) => c.classes.includes('sg-popconfirm'))
    expect(popup).toBeUndefined()
  })

  it('SgCarousel', () => {
    const s = rootShape(CarouselHost, '[sg-carousel]')
    expect(s.classes).toContain('sg-carousel')
    expect(s.classes).toContain('sg-carousel-dots-bottom')
    const container = s.children.find((c) => c.classes.includes('sg-carousel-container'))
    expect(container).toBeDefined()
    const slides = container!.children[0].children
    expect(slides.length).toBe(2)
    expect(slides[0].classes).toContain('sg-carousel-slide-active')
    const dots = s.children.find((c) => c.classes.includes('sg-carousel-dots'))
    expect(dots).toBeDefined()
    expect(dots!.children.length).toBe(2)
  })

  it('SgCollapse', () => {
    const s = rootShape(CollapseHost, '[sg-collapse]')
    expect(s.classes).toEqual(['sg-collapse', 'sg-collapse-bordered', 'sg-collapse-middle'])
    const panels = s.children.filter((c) => c.classes.includes('sg-collapse-panel'))
    expect(panels.length).toBe(2)
    expect(panels[0].classes).toContain('sg-collapse-panel-active')
  })

  it('SgDescriptions', () => {
    const s = rootShape(DescriptionsHost, '[sg-descriptions]')
    expect(s.classes).toEqual(['sg-descriptions', 'sg-descriptions-default'])
    expect(s.attrs.role).toBe('list')
    const table = s.children.find((c) => c.tag === 'table')
    expect(table).toBeDefined()
  })
})

// ────────────────────────────────────────────────────────────────────────────
// Wave 4.2 — Batch D (UI selectors + date) parity hosts.
// ────────────────────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [SgSelectComponent],
  template: `<div sg-select [options]="opts" [value]="'a'"></div>`,
})
class SelectHost {
  opts = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ]
}

@Component({
  standalone: true,
  imports: [SgAutoCompleteComponent],
  template: `<div sg-autocomplete [options]="opts" value=""></div>`,
})
class AutoCompleteHost {
  opts = [{ label: 'Apple', value: 'apple' }]
}

@Component({
  standalone: true,
  imports: [SgCascaderComponent],
  template: `<div sg-cascader [options]="opts"></div>`,
})
class CascaderHost {
  opts = [{ label: 'A', value: 'a', children: [{ label: 'A1', value: 'a1' }] }]
}

@Component({
  standalone: true,
  imports: [SgTreeSelectComponent],
  template: `<div sg-tree-select [treeData]="data"></div>`,
})
class TreeSelectHost {
  data = [{ key: 'r', title: 'Root', children: [{ key: 'c', title: 'Child' }] }]
}

@Component({
  standalone: true,
  imports: [SgDatePickerComponent],
  template: `<div sg-date-picker></div>`,
})
class DatePickerHost {}

@Component({
  standalone: true,
  imports: [SgTimePickerComponent],
  template: `<div sg-time-picker></div>`,
})
class TimePickerHost {}

@Component({
  standalone: true,
  imports: [SgCalendarComponent],
  template: `<div sg-calendar></div>`,
})
class CalendarHost {}

@Component({
  standalone: true,
  imports: [SgUploadComponent],
  template: `<div sg-upload></div>`,
})
class UploadHost {}

@Component({
  standalone: true,
  imports: [SgTransferComponent],
  template: `<sg-transfer [dataSource]="src"></sg-transfer>`,
})
class TransferHost {
  src = [
    { key: '1', title: 'A' },
    { key: '2', title: 'B' },
  ]
}

@Component({
  standalone: true,
  imports: [SgTimelineComponent],
  template: `<ul sg-timeline [items]="items"></ul>`,
})
class TimelineHost {
  items = [{ content: 'one' }, { content: 'two' }]
}

describe('CSS contract parity — Wave 4.2 Batch D', () => {
  it('SgSelect', () => {
    const s = rootShape(SelectHost, '[sg-select]')
    expect(s.classes).toEqual(['sg-select', 'sg-select-middle'])
    const sel = s.children.find((c) => c.classes.includes('sg-select-selector'))
    expect(sel).toBeDefined()
    expect(sel!.attrs.role).toBe('combobox')
    expect(sel!.attrs['aria-expanded']).toBe('false')
  })

  it('SgAutoComplete', () => {
    const s = rootShape(AutoCompleteHost, '[sg-autocomplete]')
    expect(s.classes).toEqual(['sg-autocomplete', 'sg-autocomplete-middle'])
    const wrap = s.children.find((c) => c.classes.includes('sg-input-wrapper'))
    expect(wrap).toBeDefined()
    const inp = wrap!.children.find((c) => c.tag === 'input')
    expect(inp).toBeDefined()
    expect(inp!.attrs.role).toBe('combobox')
  })

  it('SgCascader', () => {
    const s = rootShape(CascaderHost, '[sg-cascader]')
    expect(s.classes).toEqual(['sg-cascader', 'sg-cascader-middle'])
    const sel = s.children.find((c) => c.classes.includes('sg-cascader-selector'))
    expect(sel).toBeDefined()
  })

  it('SgTreeSelect', () => {
    const s = rootShape(TreeSelectHost, '[sg-tree-select]')
    expect(s.classes).toEqual(['sg-tree-select', 'sg-tree-select-middle'])
    const sel = s.children.find((c) => c.classes.includes('sg-tree-select-selector'))
    expect(sel).toBeDefined()
  })

  it('SgDatePicker', () => {
    const s = rootShape(DatePickerHost, '[sg-date-picker]')
    expect(s.classes).toEqual(['sg-datepicker', 'sg-datepicker-middle'])
    const inp = s.children.find((c) => c.classes.includes('sg-datepicker-input'))
    expect(inp).toBeDefined()
  })

  it('SgTimePicker', () => {
    const s = rootShape(TimePickerHost, '[sg-time-picker]')
    expect(s.classes).toEqual(['sg-timepicker', 'sg-timepicker-middle'])
    const inp = s.children.find((c) => c.classes.includes('sg-timepicker-input'))
    expect(inp).toBeDefined()
    expect(inp!.attrs.role).toBe('combobox')
  })

  it('SgCalendar', () => {
    const s = rootShape(CalendarHost, '[sg-calendar]')
    expect(s.classes).toEqual(['sg-calendar', 'sg-calendar-fullscreen'])
    expect(s.attrs.role).toBe('grid')
    const header = s.children.find((c) => c.classes.includes('sg-calendar-header'))
    const table = s.children.find((c) => c.tag === 'table')
    expect(header).toBeDefined()
    expect(table).toBeDefined()
  })

  it('SgUpload', () => {
    const s = rootShape(UploadHost, '[sg-upload]')
    expect(s.classes).toEqual(['sg-upload'])
    const input = s.children.find((c) => c.tag === 'input')
    expect(input).toBeDefined()
  })

  it('SgTransfer', () => {
    const s = rootShape(TransferHost, 'sg-transfer')
    expect(s.classes).toEqual(['sg-transfer'])
    const lists = s.children.filter((c) => c.classes.includes('sg-transfer-list'))
    expect(lists.length).toBe(2)
    const ops = s.children.find((c) => c.classes.includes('sg-transfer-operations'))
    expect(ops).toBeDefined()
  })

  it('SgTimeline', () => {
    const s = rootShape(TimelineHost, '[sg-timeline]')
    expect(s.classes).toEqual(['sg-timeline', 'sg-timeline-left'])
    expect(s.attrs.role).toBe('list')
    const items = s.children.filter((c) => c.classes.includes('sg-timeline-item'))
    expect(items.length).toBe(2)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// Wave 4.2 — Batch E (complex, best-effort) parity hosts.
// ────────────────────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [SgListComponent, SgListItemTemplateDirective, SgListItemComponent],
  template: `
    <div sg-list [dataSource]="rows" header="Header" footer="Footer">
      <ng-template sgListItem let-item>
        <div sg-list-item>{{ item }}</div>
      </ng-template>
    </div>
  `,
})
class ListHost {
  rows = ['a', 'b']
}

@Component({
  standalone: true,
  imports: [SgTreeComponent],
  template: `<div sg-tree [treeData]="data" defaultExpandAll></div>`,
})
class TreeHost {
  data: SgTreeDataNode[] = [
    {
      key: 'r',
      title: 'Root',
      children: [
        { key: 'a', title: 'A' },
        { key: 'b', title: 'B' },
      ],
    },
  ]
}

// ────────────────────────────────────────────────────────────────────────────
// Wave 5.3 — Transition directive parity. The directive applies enter
// classes synchronously when `visible` flips to true; the rAF-driven
// final classes can't be deterministically asserted under jsdom, so
// the test only checks the first-frame contract.

import { signal as ngSignal } from '@angular/core'

@Component({
  standalone: true,
  imports: [SgTransitionDirective],
  template: `<div [sgTransition]="visible()" name="sg-fade"></div>`,
})
class TransitionToggleHost {
  visible = ngSignal(false)
}

describe('SgTransition directive — class contract', () => {
  it('idle on first render, enters when toggled to true, leaves on toggle back', () => {
    const fixture = TestBed.createComponent(TransitionToggleHost)
    fixture.detectChanges()
    const div = (fixture.nativeElement as HTMLElement).querySelector('div')!

    // Initial render — no animation classes yet (matches React Transition).
    expect(div.classList.contains('sg-fade-enter-from')).toBe(false)
    expect(div.classList.contains('sg-fade-leave-from')).toBe(false)

    fixture.componentInstance.visible.set(true)
    fixture.detectChanges()
    expect(div.classList.contains('sg-fade-enter-from')).toBe(true)
    expect(div.classList.contains('sg-fade-enter-active')).toBe(true)

    fixture.componentInstance.visible.set(false)
    fixture.detectChanges()
    expect(div.classList.contains('sg-fade-enter-from')).toBe(false)
    expect(div.classList.contains('sg-fade-leave-from')).toBe(true)
    expect(div.classList.contains('sg-fade-leave-active')).toBe(true)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// Locale parity — all six React presets must have an Angular twin with
// the same shape (keyed top-level groups). Wave 5.3 added zh_CN, de_DE,
// fr_FR, es_ES alongside the existing en_US / ru_RU.
// ────────────────────────────────────────────────────────────────────────────

describe('Locale presets — parity surface', () => {
  const presets = { en_US, ru_RU, zh_CN, de_DE, fr_FR, es_ES }
  const expectedTopKeys = [
    'empty',
    'pagination',
    'popconfirm',
    'modal',
    'form',
    'upload',
    'transfer',
    'calendar',
    'inputPassword',
    'searchInput',
    'inlineEdit',
    'tagInput',
    'drawer',
    'notification',
    'tag',
    'spin',
    'skeleton',
    'breadcrumb',
    'carousel',
    'rate',
    'charts',
    'datePicker',
    'cascader',
    'treeSelect',
    'dashboard',
    'gantt',
    'resourceCalendar',
    'timeline',
    'schemaFormEditor',
  ] as const

  for (const [name, preset] of Object.entries(presets)) {
    it(`${name} exposes the same top-level groups as en_US`, () => {
      const keys = Object.keys(preset).sort()
      const expected = [...expectedTopKeys].sort()
      expect(keys).toEqual(expected)
    })
  }

  it('all presets expose the React-shaped sub-keys', () => {
    for (const preset of Object.values(presets)) {
      expect(preset.empty?.description).toBeTypeOf('string')
      expect(preset.pagination?.totalPrefix).toBeTypeOf('string')
      expect(preset.modal?.okText).toBeTypeOf('string')
      expect(preset.calendar?.monthNames?.length).toBe(12)
      expect(preset.calendar?.dayNames?.length).toBe(7)
      expect(typeof preset.tagInput?.removeTag).toBe('function')
      expect(typeof preset.rate?.star).toBe('function')
      expect(typeof preset.carousel?.slide).toBe('function')
      expect(typeof preset.resourceCalendar?.capacity).toBe('function')
    }
  })
})

describe('CSS contract parity — Wave 4.2 Batch E (complex)', () => {
  it('SgList', () => {
    const s = rootShape(ListHost, '[sg-list]')
    expect(s.classes).toEqual(['sg-list', 'sg-list-default', 'sg-list-split'])
    const header = s.children.find((c) => c.classes.includes('sg-list-header'))
    const footer = s.children.find((c) => c.classes.includes('sg-list-footer'))
    const items = s.children.find((c) => c.classes.includes('sg-list-items'))
    expect(header).toBeDefined()
    expect(footer).toBeDefined()
    expect(items).toBeDefined()
    const rows = items!.children.filter((c) => c.classes.includes('sg-list-item'))
    expect(rows.length).toBe(2)
  })

  it('SgTree', () => {
    const s = rootShape(TreeHost, '[sg-tree]')
    expect(s.classes).toEqual(['sg-tree', 'sg-tree-animated'])
    expect(s.attrs.role).toBe('tree')
    const nodes = s.children.filter((c) => c.classes.includes('sg-tree-node'))
    expect(nodes.length).toBe(3)
    const root = nodes[0]!
    expect(root.attrs.role).toBe('treeitem')
    expect(root.attrs['aria-expanded']).toBe('true')
  })
})
