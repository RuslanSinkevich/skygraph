// Composables
export { useForm } from './composables/useForm'
export type { UseFormOptions, UseFormReturn } from './composables/useForm'

export { useField } from './composables/useField'
export type { UseFieldReturn, FieldStatus } from './composables/useField'

export { useTable } from './composables/useTable'
export type { UseTableOptions, UseTableReturn, FilterFn } from './composables/useTable'

export { useTree } from './composables/useTree'
export type { UseTreeOptions, UseTreeReturn } from './composables/useTree'

export { useGraph } from './composables/useGraph'
export type { UseGraphOptions, UseGraphReturn } from './composables/useGraph'

// Components (Sg* prefix to avoid clashing with React names and global Vue tags)
export { SgButton } from './components/Button'
export type { ButtonProps } from './components/Button'

export { SgInput } from './components/Input'
export type { InputProps } from './components/Input'

export { SgForm, formContextKey } from './components/Form'
export type { FormProps, FormContextValue } from './components/Form'

export { SgField } from './components/Field'
export type { FieldProps } from './components/Field'

// Re-export key types from core (mirrors what @skygraph/react does)
export type {
  Core,
  FormEngine,
  FormState,
  FormOptions,
  FieldMeta,
  Rule,
  RuleObject,
  RuleFn,
  ValidationResult,
  ValidationMode,
  TableEngine,
  TableState,
  TableOptions,
  RowId,
  SortConfig,
  SortDirection,
  ColumnFilter,
  TreeEngine,
  TreeState,
  TreeNodeData,
  TreeKey,
  GraphEngine,
  GraphState,
  GraphEngineOptions,
} from '@skygraph/core'
