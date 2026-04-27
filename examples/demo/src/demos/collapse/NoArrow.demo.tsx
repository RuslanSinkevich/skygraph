import { Collapse } from '@skygraph/react'
import type { CollapseItem } from '@skygraph/react'

/**
 * `showArrow: false` per item hides the chevron while leaving the
 * header clickable. Useful for "always visible" panels where the
 * arrow adds no info (e.g. a single controlled pane).
 */
const items: CollapseItem[] = [
  { key: '1', label: 'Spoiler-free header', showArrow: false, children: 'No chevron next to me.' },
  { key: '2', label: 'Regular header', children: 'Chevron visible on this one.' },
]

export function NoArrowCollapse() {
  return <Collapse items={items} defaultActiveKey={['1']} />
}
