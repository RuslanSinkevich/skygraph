import { Collapse, Button, Tag } from '@skygraph/react'
import type { CollapseItem } from '@skygraph/react'

/**
 * `extra` lives on each item and renders to the right of the header
 * text. Use it for status tags, counts, or actions — click events
 * on it do NOT bubble to toggle unless you stop propagation.
 */
const items: CollapseItem[] = [
  {
    key: 'billing',
    label: 'Billing information',
    extra: <Tag color="success">Up to date</Tag>,
    children: 'Visa •••• 4242 — next invoice 1 May.',
  },
  {
    key: 'team',
    label: 'Team members',
    extra: <Tag>3 pending</Tag>,
    children: 'Alice, Bob, Charlie — invites sent 3 days ago.',
  },
  {
    key: 'danger',
    label: 'Danger zone',
    extra: (
      <Button
        size="small"
        onClick={(e) => {
          e.stopPropagation()
          alert('Reset triggered')
        }}
        style={{ color: 'var(--sg-color-error)', borderColor: 'var(--sg-color-error)' }}
      >
        Reset
      </Button>
    ),
    children: 'Reset API keys and invalidate every session.',
  },
]

export function ExtraCollapse() {
  return <Collapse items={items} defaultActiveKey={['billing']} />
}
