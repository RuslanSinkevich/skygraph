import { TreeSelect } from '@skygraph/react'
import { orgTree } from './data'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * TreeSelect shares the input tokens for the control and the global colour /
 * surface families for the dropdown. Three scoped recipes — branded green,
 * dark field, glass pick — reskin the same control.
 */
export function TokensOverrideTreeSelect() {
  return (
    <TokenScopeCards
      extra={{
        brand: { ['--sg-input-border' as never]: '#6ee7b7' },
        dark: {
          ['--sg-input-bg' as never]: '#0f172a',
          ['--sg-input-color' as never]: '#e2e8f0',
          ['--sg-input-border' as never]: '#1e293b',
        },
        glass: {
          ['--sg-input-bg' as never]: 'rgba(255, 255, 255, 0.55)',
          ['--sg-input-border' as never]: 'rgba(15, 23, 42, 0.08)',
          ['--sg-input-radius' as never]: '12px',
        },
      }}
      render={() => (
        <TreeSelect treeData={orgTree} treeDefaultExpandAll placeholder="Select team" allowClear />
      )}
    />
  )
}
