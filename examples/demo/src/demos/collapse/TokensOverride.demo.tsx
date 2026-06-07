import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Collapse reads the global surface palette (`--sg-color-bg-container`,
 * `--sg-color-bg-secondary`, `--sg-color-bg-hover`) and border tokens. Three
 * scoped recipes — branded green, dark field, glass pick — reskin the panels.
 */
export function TokensOverrideCollapse() {
  return (
    <TokenScopeCards render={() => <Collapse items={sampleItems} defaultActiveKey={['1']} />} />
  )
}
