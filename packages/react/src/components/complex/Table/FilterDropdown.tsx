import React from 'react'
import { Checkbox } from '../../ui/Checkbox'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import type { TableColumn, FilterDropdownProps, TableLocale } from './types'

interface FilterState {
  activeFilters: Record<string, unknown[]>
  filterSearchText: Record<string, string>
  openFilterDropdown: string | null
}

interface FilterActions {
  setOpenFilterDropdown: (key: string | null) => void
  handleFilterToggle: (colKey: string, value: unknown, multiple: boolean) => void
  handleFilterConfirm: (colKey: string) => void
  handleFilterReset: (colKey: string) => void
  handleFilterClose: (colKey: string) => void
  handleSearchFilterChange: (colKey: string, text: string) => void
  setFilterSearchText: React.Dispatch<React.SetStateAction<Record<string, string>>>
  getFilterDropdownProps: (col: TableColumn) => FilterDropdownProps
}

interface FilterTriggerProps {
  col: TableColumn
  t: Required<TableLocale>
  state: FilterState
  actions: FilterActions
  filterRef: React.RefObject<HTMLDivElement>
}

export function FilterTrigger({ col, t, state, actions }: FilterTriggerProps) {
  const hasFilter = col.filterDropdown || col.filterMode === 'search' || (col.filters && col.filters.length > 0)
  if (!hasFilter) return null

  const filtered = (state.activeFilters[col.key]?.length ?? 0) > 0
  const iconNode = col.filterIcon
    ? typeof col.filterIcon === 'function' ? col.filterIcon(filtered) : col.filterIcon
    : col.filterMode === 'search' ? t.searchIcon : t.filterIcon

  return (
    <span
      className={`sg-table-filter-trigger${filtered ? ' sg-table-filter-active' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        actions.setOpenFilterDropdown(state.openFilterDropdown === col.key ? null : col.key)
      }}
    >
      {iconNode}
    </span>
  )
}

export function FilterDropdownContent({ col, t, state, actions, filterRef }: FilterTriggerProps) {
  if (state.openFilterDropdown !== col.key) return null

  if (col.filterDropdown) {
    const props = actions.getFilterDropdownProps(col)
    const content = typeof col.filterDropdown === 'function' ? col.filterDropdown(props) : col.filterDropdown
    return (
      <div className="sg-table-filter-dropdown" ref={filterRef} onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    )
  }

  if (col.filterMode === 'search') {
    const searchVal = (state.activeFilters[col.key]?.[0] as string) ?? ''
    return (
      <div className="sg-table-filter-dropdown sg-table-filter-search-mode" ref={filterRef} onClick={(e) => e.stopPropagation()}>
        <Input
          placeholder={`${t.searchPlaceholder.replace('...', '')} ${typeof col.title === 'string' ? col.title : ''}...`}
          size="small"
          value={searchVal}
          onChange={(v) => actions.handleSearchFilterChange(col.key, v)}
        />
        <div className="sg-table-filter-actions">
          <Button size="small" onClick={() => { actions.handleFilterReset(col.key); actions.handleFilterClose(col.key) }}>{t.filterReset}</Button>
          <Button size="small" type="primary" onClick={() => actions.handleFilterConfirm(col.key)}>{t.filterConfirm}</Button>
        </div>
      </div>
    )
  }

  if (!col.filters || col.filters.length === 0) return null

  const multiple = col.filterMultiple !== false
  const currentVals = state.activeFilters[col.key] ?? []
  const searchTxt = state.filterSearchText[col.key] ?? ''

  let visibleFilters = col.filters
  if (col.filterSearch && searchTxt) {
    visibleFilters = col.filters.filter((f) => {
      if (typeof col.filterSearch === 'function') {
        return col.filterSearch(searchTxt, f)
      }
      return f.text.toLowerCase().includes(searchTxt.toLowerCase())
    })
  }

  return (
    <div className="sg-table-filter-dropdown" ref={filterRef} onClick={(e) => e.stopPropagation()}>
      {col.filterSearch !== undefined && col.filterSearch !== false && (
        <div className="sg-table-filter-search">
          <Input
            placeholder={t.filterSearchPlaceholder}
            size="small"
            value={searchTxt}
            onChange={(v) => actions.setFilterSearchText((prev) => ({ ...prev, [col.key]: v }))}
          />
        </div>
      )}
      <div className="sg-table-filter-list">
        {visibleFilters.map((f) => {
          const checked = currentVals.includes(f.value)
          return (
            <label key={String(f.value)} className="sg-table-filter-item">
              {multiple ? (
                <Checkbox checked={checked} onChange={() => actions.handleFilterToggle(col.key, f.value, true)} />
              ) : (
                <input type="radio" checked={checked} onChange={() => actions.handleFilterToggle(col.key, f.value, false)} />
              )}
              <span>{f.text}</span>
            </label>
          )
        })}
        {visibleFilters.length === 0 && (
          <div className="sg-table-filter-empty">{t.filterEmptyText}</div>
        )}
      </div>
      <div className="sg-table-filter-actions">
        <Button size="small" onClick={() => { actions.handleFilterReset(col.key); actions.handleFilterClose(col.key) }}>{t.filterReset}</Button>
        <Button size="small" type="primary" onClick={() => actions.handleFilterConfirm(col.key)}>{t.filterConfirm}</Button>
      </div>
    </div>
  )
}
