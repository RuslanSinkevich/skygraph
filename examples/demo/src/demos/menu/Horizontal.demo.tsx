import { Menu } from '@skygraph/react'
import { topItems } from './data'

/**
 * Horizontal mode — intended for top nav bars. Submenus drop down
 * on hover.
 */
export function HorizontalMenu() {
  return <Menu mode="horizontal" items={topItems} defaultSelectedKeys={['mail']} />
}
