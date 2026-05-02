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
import { afterEach, describe, it, expect } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import axe from 'axe-core'

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
// `ColorPicker` and `TimePicker` are intentionally not imported — both have
// known violations captured as `it.todo` below.

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

  // Known gap: the styled `ColorPicker` trigger is a `<div>` (no ARIA role),
  // but it carries `aria-haspopup` / `aria-expanded` — axe flags this as
  // `aria-allowed-attr` (critical). Fix: give the trigger `role="button"` or
  // render it as a `<button>`. Tracked separately from this tab.
  it.todo(
    'ColorPicker (closed) — aria-allowed-attr on trigger (needs role=button or <button>)',
  )

  // Known gap: the `TimePicker` styled trigger is an `<input>` inside a
  // `role="combobox"` wrapper but neither has a programmatic accessible name,
  // so axe `aria-input-field-name` (serious) fires. Wrapping in a `<label>`
  // does not associate because the trigger nests below the combobox role.
  // Fix: accept `aria-label` / `aria-labelledby` like the new Select.
  it.todo(
    'TimePicker (closed) — aria-input-field-name (needs aria-label / aria-labelledby)',
  )

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
})
