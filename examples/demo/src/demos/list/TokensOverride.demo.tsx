import { List } from '@skygraph/react'
import { shortData } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * List has no component-local tokens — row hover reads `--sg-color-bg-hover`,
 * the outline reads `--sg-color-border`, the header tint reads
 * `--sg-color-bg-secondary`. Three scoped recipes — branded green, dark field,
 * glass pick — reskin it.
 */
const STRINGS_HEADER = 'List'

export function TokensOverrideList() {
  return (
    <TokenScopeCards
      render={() => (
        <List
          bordered
          header={STRINGS_HEADER}
          dataSource={shortData}
          renderItem={(item) => <div style={{ padding: '8px 0' }}>{item}</div>}
        />
      )}
    />
  )
}
