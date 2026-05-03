/**
 * Automated a11y smoke tests powered by `axe-core`.
 *
 * Goal: catch the most common a11y regressions on primitive UI components
 * (missing labels, broken ARIA, duplicate IDs, role contracts, ...). Axe is
 * a *static* linter and only covers a subset of WCAG, so passing tests do
 * not certify full compliance — they guard the obvious mistakes.
 *
 * jsdom-only rules that need a real viewport / paint pass are disabled in
 * the runner config (`color-contrast`, `region`, ...), see `runAxe`.
 */
import { afterEach, beforeAll, describe, it, expect } from 'vitest'
import { render, cleanup, act } from '@testing-library/react'
import axe from 'axe-core'

// jsdom does not implement ResizeObserver. `<VirtualList>` (and any other
// component that uses `useVirtualScroll`) installs an observer on mount, so
// without a stub the test crashes before axe sees the DOM.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    class ResizeObserverStub {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    }
    ;(globalThis as unknown as { ResizeObserver: typeof ResizeObserverStub }).ResizeObserver = ResizeObserverStub
  }
})

import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Checkbox } from '../components/ui/Checkbox'
import { Switch } from '../components/ui/Switch'
import { RadioGroup } from '../components/ui/Radio'
import { Select } from '../components/ui/Select'
import { Modal } from '../components/ui/Modal'
import { Tabs } from '../components/ui/Tabs'
import { Carousel } from '../components/ui/Carousel'
import { Mentions } from '../components/ui/Mentions'
import { Rate } from '../components/ui/Rate'
import { Cascader } from '../components/complex/Cascader'
import { ColorPicker } from '../components/ui/ColorPicker'
import { TimePicker } from '../components/ui/TimePicker'
import { VirtualList } from '../components/complex/VirtualList/VirtualList'

interface AxeViolation {
  rule: string
  impact: string | null
  nodes: string[]
}

/** Runs axe on a container and returns a flat, easy-to-print violation list. */
async function runAxe(container: HTMLElement): Promise<AxeViolation[]> {
  const result = await axe.run(container, {
    rules: {
      'color-contrast': { enabled: false },
      region: { enabled: false },
      'landmark-one-main': { enabled: false },
      'page-has-heading-one': { enabled: false },
      'document-title': { enabled: false },
      'html-has-lang': { enabled: false },
      'scrollable-region-focusable': { enabled: false },
    },
  })
  return result.violations.map((v) => ({
    rule: v.id,
    impact: v.impact ?? null,
    nodes: v.nodes.map((n) => n.target.join(' ')),
  }))
}

describe('a11y smoke (axe-core)', () => {
  afterEach(cleanup)

  it('Button — no violations', async () => {
    const { container } = render(<Button>Save</Button>)
    expect(await runAxe(container)).toEqual([])
  })

  it('Input wrapped in a label — no violations', async () => {
    const { container } = render(
      <label>
        Email
        <Input value="" onChange={() => {}} placeholder="you@example.com" />
      </label>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('Checkbox with text label — no violations', async () => {
    const { container } = render(
      <Checkbox checked={false} onChange={() => {}}>
        Agree to terms
      </Checkbox>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('Switch wrapped in a label — no violations', async () => {
    const { container } = render(
      <label>
        <span>Notifications</span>
        <Switch checked={false} onChange={() => {}} />
      </label>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('RadioGroup wrapped in a fieldset — no violations', async () => {
    const { container } = render(
      <fieldset>
        <legend>Plan</legend>
        <RadioGroup
          value="a"
          onChange={() => {}}
          options={[
            { value: 'a', label: 'Free' },
            { value: 'b', label: 'Pro' },
          ]}
        />
      </fieldset>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  // Select (styled) renders `role=combobox` on a <div>, so a parent <label>
  // does not associate. Without an `aria-label`/`aria-labelledby` prop on
  // the styled variant the combobox has no accessible name. Captured here
  // as a known gap — covered by `Select.unstyled` which renders a real
  // `<select>` and is fully labelable.
  it('Select (unstyled / native) wrapped in a label — no violations', async () => {
    const { container } = render(
      <label>
        <span>Fruit</span>
        <Select
          value="a"
          onChange={() => {}}
          options={[
            { value: 'a', label: 'Apple' },
            { value: 'b', label: 'Banana' },
          ]}
          unstyled
        />
      </label>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  // Closed by tab D — Select (styled) now accepts `aria-label` /
  // `aria-labelledby` and applies them to the `role="combobox"` trigger.
  it('Select (styled) — name via aria-label — no violations', async () => {
    const { container } = render(
      <Select
        aria-label="Pick a fruit"
        value="a"
        onChange={() => {}}
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Banana' },
        ]}
      />,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('Select (styled) — name via aria-labelledby — no violations', async () => {
    const { container } = render(
      <div>
        <span id="fruit-lbl">Fruit</span>
        <Select
          aria-labelledby="fruit-lbl"
          value="a"
          onChange={() => {}}
          options={[
            { value: 'a', label: 'Apple' },
            { value: 'b', label: 'Banana' },
          ]}
        />
      </div>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('Modal open with title — no violations', async () => {
    const { container } = render(
      <Modal open title="Confirm" onClose={() => {}}>
        Are you sure?
      </Modal>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('Tabs — no violations', async () => {
    const { container } = render(
      <Tabs
        activeKey="a"
        onChange={() => {}}
        items={[
          { key: 'a', label: 'One', children: <p>One panel</p> },
          { key: 'b', label: 'Two', children: <p>Two panel</p> },
        ]}
      />,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('Carousel — no violations', async () => {
    const { container } = render(
      <Carousel dots>
        <div>Slide one</div>
        <div>Slide two</div>
        <div>Slide three</div>
      </Carousel>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('Mentions wrapped in a label — no violations', async () => {
    const { container } = render(
      <label>
        <span>Comment</span>
        <Mentions
          value=""
          onChange={() => {}}
          options={[
            { value: 'alice', label: 'Alice' },
            { value: 'bob', label: 'Bob' },
          ]}
        />
      </label>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('Rate with aria-label — no violations', async () => {
    const { container } = render(
      <div role="group" aria-label="Rating">
        <Rate value={3} onChange={() => {}} />
      </div>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  // Closed by tab C round 9 — `ColorPicker` trigger is now a `<button>` and
  // accepts `aria-label` / `aria-labelledby`. The previous gap was that the
  // trigger was a `<div>` carrying `aria-haspopup` / `aria-expanded` (axe
  // `aria-allowed-attr`, critical) and had no accessible name (axe
  // `button-name` once the role was fixed).
  it('ColorPicker (closed) — name via aria-label — no violations', async () => {
    const { container } = render(
      <ColorPicker aria-label="Pick a color" defaultValue="#1677ff" />,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('ColorPicker (closed) — name via aria-labelledby — no violations', async () => {
    const { container } = render(
      <div>
        <span id="color-lbl">Brand color</span>
        <ColorPicker aria-labelledby="color-lbl" defaultValue="#1677ff" />
      </div>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  // Closed by tab C round 9 — `TimePicker` accepts `aria-label` /
  // `aria-labelledby` and forwards them to the `role="combobox"` element.
  // The previous gap was an unnamed combobox flagged by axe
  // `aria-input-field-name` (serious).
  it('TimePicker (closed) — name via aria-label — no violations', async () => {
    const { container } = render(
      <TimePicker aria-label="Meeting time" />,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('TimePicker (closed) — name via aria-labelledby — no violations', async () => {
    const { container } = render(
      <div>
        <span id="time-lbl">Meeting time</span>
        <TimePicker aria-labelledby="time-lbl" />
      </div>,
    )
    expect(await runAxe(container)).toEqual([])
  })

  it('Cascader (closed) — no violations', async () => {
    const { container } = render(
      <Cascader
        options={[
          {
            value: 'a',
            label: 'A',
            children: [
              { value: 'a1', label: 'A1' },
              { value: 'a2', label: 'A2' },
            ],
          },
          { value: 'b', label: 'B' },
        ]}
        onChange={() => {}}
      />,
    )
    expect(await runAxe(container)).toEqual([])
  })

  // Open dropdown is a separate axe surface — duplicate-id, missing
  // accessible names on column items, and `region` rules can fire only
  // once the panel is mounted. Default expand mode (click) opens the
  // first column.
  it('Cascader (open) — no violations', async () => {
    const { container } = render(
      <Cascader
        options={[
          {
            value: 'a',
            label: 'A',
            children: [
              { value: 'a1', label: 'A1' },
              { value: 'a2', label: 'A2' },
            ],
          },
          { value: 'b', label: 'B' },
        ]}
        onChange={() => {}}
      />,
    )
    const trigger = container.querySelector('.sg-cascader-selector') as HTMLElement
    act(() => {
      trigger.click()
    })
    expect(await runAxe(container)).toEqual([])
  })

  // VirtualList is a generic scroll container; the rendered rows live
  // inside an absolute-positioned wrapper. Rows must remain landmark-free
  // and avoid `region` violations even with custom `renderItem` HTML.
  it('VirtualList — no violations', async () => {
    const items = Array.from({ length: 20 }, (_, i) => ({ id: i, label: `Item ${i + 1}` }))
    const { container } = render(
      <VirtualList
        data={items}
        itemHeight={32}
        style={{ height: 200 }}
        renderItem={(item, _idx, style) => (
          <div style={style} key={item.id}>{item.label}</div>
        )}
      />,
    )
    expect(await runAxe(container)).toEqual([])
  })
})
