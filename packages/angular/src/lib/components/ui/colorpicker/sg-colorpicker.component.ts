import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

interface HSV {
  h: number
  s: number
  v: number
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3 ? clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2] : clean
  const num = parseInt(full, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
}

function rgbToHsv(r: number, g: number, b: number): HSV {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  return { h, s, v }
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  let r = 0,
    g = 0,
    b = 0
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function hsvToHex(h: number, s: number, v: number): string {
  const [r, g, b] = hsvToRgb(h, s, v)
  return rgbToHex(r, g, b)
}

function formatColor(hex: string, format: 'hex' | 'rgb'): string {
  if (format === 'rgb') {
    const [r, g, b] = hexToRgb(hex)
    return `rgb(${r}, ${g}, ${b})`
  }
  return hex
}

function parseColor(input: string): string | null {
  const trimmed = input.trim()
  if (/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(trimmed)) {
    const clean = trimmed.replace('#', '')
    const full =
      clean.length === 3
        ? '#' + clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2]
        : trimmed
    return full.toLowerCase()
  }
  const m = trimmed.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i)
  if (m) {
    const r = Math.min(255, parseInt(m[1]))
    const g = Math.min(255, parseInt(m[2]))
    const b = Math.min(255, parseInt(m[3]))
    return rgbToHex(r, g, b)
  }
  return null
}

const DEFAULT_COLOR = '#1677ff'

export interface SgColorPickerPreset {
  label: string
  colors: string[]
}

/**
 * Attribute-selector color picker, DOM-equivalent of
 * `packages/react/src/components/ui/ColorPicker.tsx`.
 *
 * Use as `<div sg-colorpicker [(value)]="color"></div>`.
 */
@Component({
  selector: 'div[sg-colorpicker]',
  standalone: true,
  template: `
    <button
      type="button"
      class="sg-colorpicker-trigger"
      [disabled]="isInteractiveDisabled()"
      aria-haspopup="dialog"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-labelledby]="ariaLabelledBy || null"
      (click)="onTriggerClick()"
    >
      <span class="sg-colorpicker-swatch" [style.background]="currentHex()"></span>
      @if (showText) {
        <span class="sg-colorpicker-text">{{ formatted() }}</span>
      }
    </button>
    @if (isOpen()) {
      <div class="sg-colorpicker-dropdown">
        <div
          #satPanel
          class="sg-colorpicker-saturation"
          [style.background]="satBackground()"
          (pointerdown)="onSatPointerDown($event)"
          (pointermove)="onSatPointerMove($event)"
          (pointerup)="onPointerUp()"
        >
          <div
            class="sg-colorpicker-cursor"
            [style.left.%]="hsv().s * 100"
            [style.top.%]="(1 - hsv().v) * 100"
            [style.background]="currentHex()"
          ></div>
        </div>
        <div
          #hueBar
          class="sg-colorpicker-hue"
          (pointerdown)="onHuePointerDown($event)"
          (pointermove)="onHuePointerMove($event)"
          (pointerup)="onPointerUp()"
        >
          <div class="sg-colorpicker-hue-cursor" [style.left.%]="hsv().h * 100"></div>
        </div>
        <div class="sg-colorpicker-input-row">
          <span class="sg-colorpicker-preview" [style.background]="currentHex()"></span>
          <input
            class="sg-colorpicker-input"
            [value]="textInput()"
            (input)="onTextInput($event)"
            spellcheck="false"
          />
        </div>
        @for (group of presets || []; track group.label) {
          <div class="sg-colorpicker-preset-group">
            <div class="sg-colorpicker-preset-label">{{ group.label }}</div>
            <div class="sg-colorpicker-preset-grid">
              @for (c of group.colors; track c) {
                <button
                  type="button"
                  class="sg-colorpicker-preset-color"
                  [style.background]="c"
                  [title]="c"
                  (click)="onPresetClick(c)"
                ></button>
              }
            </div>
          </div>
        }
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgColorPickerComponent {
  private readonly cfg = injectSgConfig()
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef)

  private readonly _value = signal<string | undefined>(undefined)
  private readonly _internal = signal<string>(DEFAULT_COLOR)
  private readonly _disabled = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)
  readonly hsv = signal<HSV>(rgbToHsv(...hexToRgb(DEFAULT_COLOR)))
  readonly textInput = signal<string>(DEFAULT_COLOR)
  readonly isOpen = signal(false)

  private dragging: 'sat' | 'hue' | null = null

  @ViewChild('satPanel') satPanelRef?: ElementRef<HTMLElement>
  @ViewChild('hueBar') hueBarRef?: ElementRef<HTMLElement>

  @Input()
  get value(): string | undefined {
    return this._value()
  }
  set value(v: string | undefined) {
    this._value.set(v)
    if (v) {
      this._internal.set(v.toLowerCase())
      this.hsv.set(rgbToHsv(...hexToRgb(v)))
      this.textInput.set(formatColor(v, this.format))
    }
  }

  @Input()
  set defaultValue(v: string | undefined) {
    if (v && this._value() === undefined) {
      this._internal.set(v.toLowerCase())
      this.hsv.set(rgbToHsv(...hexToRgb(v)))
      this.textInput.set(formatColor(v, this.format))
    }
  }

  @Input() format: 'hex' | 'rgb' = 'hex'
  @Input() trigger: 'click' | 'hover' = 'click'
  @Input({ transform: booleanAttribute }) showText = false
  @Input() presets?: SgColorPickerPreset[]

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled()
  }
  set disabled(v: boolean) {
    this._disabled.set(v)
  }

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Input('aria-label') ariaLabel?: string
  @Input('aria-labelledby') ariaLabelledBy?: string

  private readonly _unstyled = signal<boolean>(false)
  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  @Output() readonly valueChange = new EventEmitter<string>()
  @Output() readonly openChange = new EventEmitter<boolean>()

  readonly currentHex = computed(() => (this._value() ?? this._internal()).toLowerCase())

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly isInteractiveDisabled = computed(() => this._disabled() || (this.cfg.disabled ?? false))

  readonly classes = computed(() => {
    if (this._unstyled()) return ''
    return [
      'sg-colorpicker-wrapper',
      `sg-colorpicker-${this.resolvedSize()}`,
      this.isInteractiveDisabled() ? 'sg-colorpicker-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  })

  readonly satBackground = computed(() => {
    const hue = hsvToHex(this.hsv().h, 1, 1)
    return `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hue})`
  })

  readonly formatted = computed(() => formatColor(this.currentHex(), this.format))

  onTriggerClick(): void {
    if (this.isInteractiveDisabled() || this.trigger !== 'click') return
    const next = !this.isOpen()
    this.isOpen.set(next)
    this.openChange.emit(next)
  }

  @HostListener('document:mousedown', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.isOpen()) return
    if (!this.host.nativeElement.contains(e.target as Node)) {
      this.isOpen.set(false)
      this.openChange.emit(false)
    }
  }

  onSatPointerDown(e: PointerEvent): void {
    e.preventDefault()
    this.dragging = 'sat'
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    this.updateSat(e)
  }

  onSatPointerMove(e: PointerEvent): void {
    if (this.dragging !== 'sat') return
    this.updateSat(e)
  }

  onHuePointerDown(e: PointerEvent): void {
    e.preventDefault()
    this.dragging = 'hue'
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    this.updateHue(e)
  }

  onHuePointerMove(e: PointerEvent): void {
    if (this.dragging !== 'hue') return
    this.updateHue(e)
  }

  onPointerUp(): void {
    this.dragging = null
  }

  private updateSat(e: PointerEvent): void {
    const el = this.satPanelRef?.nativeElement
    if (!el) return
    const rect = el.getBoundingClientRect()
    const s = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const v = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height))
    const next = { ...this.hsv(), s, v }
    this.hsv.set(next)
    this.commit(hsvToHex(next.h, next.s, next.v))
  }

  private updateHue(e: PointerEvent): void {
    const el = this.hueBarRef?.nativeElement
    if (!el) return
    const rect = el.getBoundingClientRect()
    const h = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const next = { ...this.hsv(), h }
    this.hsv.set(next)
    this.commit(hsvToHex(next.h, next.s, next.v))
  }

  onTextInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value
    this.textInput.set(v)
    const parsed = parseColor(v)
    if (parsed) {
      this.hsv.set(rgbToHsv(...hexToRgb(parsed)))
      this.commit(parsed)
    }
  }

  onPresetClick(c: string): void {
    const parsed = parseColor(c)
    if (!parsed) return
    this.hsv.set(rgbToHsv(...hexToRgb(parsed)))
    this.commit(parsed)
  }

  private commit(hex: string): void {
    this._internal.set(hex)
    this.textInput.set(formatColor(hex, this.format))
    this.valueChange.emit(formatColor(hex, this.format))
  }
}
