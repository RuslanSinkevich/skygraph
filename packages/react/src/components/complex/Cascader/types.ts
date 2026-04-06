import type React from 'react'

export interface CascaderOption {
  value: string | number
  label: React.ReactNode
  children?: CascaderOption[]
  disabled?: boolean
  isLeaf?: boolean
}

export interface CascaderProps {
  options: CascaderOption[]
  value?: (string | number)[]
  defaultValue?: (string | number)[]
  onChange?: (value: (string | number)[], selectedOptions: CascaderOption[]) => void
  placeholder?: string
  allowClear?: boolean
  disabled?: boolean
  size?: 'small' | 'middle' | 'large'
  multiple?: boolean
  showSearch?: boolean | { filter?: (inputValue: string, path: CascaderOption[]) => boolean }
  expandTrigger?: 'click' | 'hover'
  changeOnSelect?: boolean
  displayRender?: (labels: string[], selectedOptions: CascaderOption[]) => React.ReactNode
  loadData?: (selectedOptions: CascaderOption[]) => void
  maxTagCount?: number
  dropdownStyle?: React.CSSProperties
  className?: string
  style?: React.CSSProperties
  unstyled?: boolean
}
