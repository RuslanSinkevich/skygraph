import type { ReactNode } from 'react'
import { Input } from '@skygraph/react'

/**
 * Shared toolbar wrapper to replace dozens of inline `<div className="sc-toolbar">`
 * scattered across showcases. Provides consistent search + actions layout.
 */

export interface ToolbarProps {
  search?: {
    value: string
    onChange: (v: string) => void
    placeholder?: string
    width?: number
  }
  /** Left-side controls placed after search (filters, segmented, dropdowns). */
  filters?: ReactNode
  /** Right-side actions (primary buttons, exports). */
  actions?: ReactNode
  className?: string
}

export function Toolbar({ search, filters, actions, className }: ToolbarProps) {
  return (
    <div className={['sc-toolbar', className].filter(Boolean).join(' ')}>
      {search && (
        <Input
          placeholder={search.placeholder ?? 'Search...'}
          value={search.value}
          onChange={search.onChange}
          style={{ width: search.width ?? 240 }}
        />
      )}
      {filters}
      <div className="sc-toolbar-spacer" />
      {actions}
    </div>
  )
}
