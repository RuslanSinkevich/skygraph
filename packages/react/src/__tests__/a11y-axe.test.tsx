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

  // TODO(a11y): `Select` (styled) must accept `aria-label` /
  // `aria-labelledby` to satisfy WCAG 4.1.2 when the visual label is not a
  // native `<label>`-associated control. Tracked in TODO-cycle.md.
  it.todo('Select (styled) — name via aria-label / aria-labelledby')

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
})
