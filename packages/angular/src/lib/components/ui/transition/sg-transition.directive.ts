import {
  Directive,
  ElementRef,
  effect,
  inject,
  input,
  output,
  signal,
  type OnDestroy,
} from '@angular/core'

/**
 * Angular port of `packages/react/src/components/ui/Transition.tsx`.
 *
 * Toggles enter / leave animation classes on the host element when the
 * `visible` signal flips. Mirrors React's class contract:
 *
 * - `${name}-enter-from` + `${name}-enter-active` on enter frame 1
 * - `${name}-enter-to`   + `${name}-enter-active` on enter frame 2
 * - `${name}-leave-from` + `${name}-leave-active` on leave frame 1
 * - `${name}-leave-to`   + `${name}-leave-active` on leave frame 2
 *
 * After `duration`ms the active classes are stripped and `(afterEnter)` /
 * `(afterLeave)` fires.
 *
 * Unlike the React component (which clones a single child element and
 * may unmount it), the Angular directive operates on its host element
 * — Angular consumers control mount/unmount via the standard `@if`
 * control-flow block. This is the idiomatic split: directive does
 * classes, structural directive / `@if` does mount.
 */
@Directive({
  selector: '[sgTransition]',
  standalone: true,
})
export class SgTransitionDirective implements OnDestroy {
  /** Drives the enter/leave cycle. `true` runs enter, `false` runs leave. */
  readonly visible = input<boolean>(false, { alias: 'sgTransition' })
  /** Class prefix. Default `'sg-fade'`. */
  readonly name = input<string>('sg-fade')
  /** Total animation length in ms. Default `200`. */
  readonly duration = input<number>(200)
  /** Custom initial class for enter (defaults to `${name}-enter-from`). */
  readonly enterFrom = input<string | undefined>(undefined)
  /** Custom final class for enter (defaults to `${name}-enter-to`). */
  readonly enterTo = input<string | undefined>(undefined)
  /** Custom initial class for leave (defaults to `${name}-leave-from`). */
  readonly leaveFrom = input<string | undefined>(undefined)
  /** Custom final class for leave (defaults to `${name}-leave-to`). */
  readonly leaveTo = input<string | undefined>(undefined)

  readonly afterEnter = output<void>()
  readonly afterLeave = output<void>()

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef)
  private timer: ReturnType<typeof setTimeout> | null = null
  private prev = signal<boolean | null>(null)
  private currentClasses: string[] = []

  constructor() {
    // React on every `visible` flip — but skip the very first read so the
    // initial render doesn't accidentally trigger an enter or leave on
    // a static element. Mirrors React's Transition where the effect's
    // first dep-array fire is a no-op (prevVisible.current === visible).
    effect(() => {
      const v = this.visible()
      const p = this.prev()
      if (p === null) {
        this.prev.set(v)
        return
      }
      if (p === v) return
      this.prev.set(v)

      this.cancelTimer()
      this.clearActive()

      if (v) this.runEnter()
      else this.runLeave()
    })
  }

  ngOnDestroy(): void {
    this.cancelTimer()
    this.clearActive()
  }

  private runEnter(): void {
    const name = this.name()
    const from = this.enterFrom() ?? `${name}-enter-from`
    const active = `${name}-enter-active`
    const to = this.enterTo() ?? `${name}-enter-to`

    this.applyClasses([from, active])
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (this.prev() === true) this.applyClasses([to, active])
      })
    })
    this.timer = setTimeout(() => {
      this.clearActive()
      this.afterEnter.emit()
    }, this.duration())
  }

  private runLeave(): void {
    const name = this.name()
    const from = this.leaveFrom() ?? `${name}-leave-from`
    const active = `${name}-leave-active`
    const to = this.leaveTo() ?? `${name}-leave-to`

    this.applyClasses([from, active])
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (this.prev() === false) this.applyClasses([to, active])
      })
    })
    this.timer = setTimeout(() => {
      this.clearActive()
      this.afterLeave.emit()
    }, this.duration())
  }

  private applyClasses(next: string[]): void {
    const el = this.el.nativeElement
    for (const c of this.currentClasses) el.classList.remove(c)
    for (const c of next) el.classList.add(c)
    this.currentClasses = next
  }

  private clearActive(): void {
    if (this.currentClasses.length === 0) return
    const el = this.el.nativeElement
    for (const c of this.currentClasses) el.classList.remove(c)
    this.currentClasses = []
  }

  private cancelTimer(): void {
    if (this.timer != null) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
