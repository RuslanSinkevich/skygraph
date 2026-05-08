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

export { useFocusTrap } from './composables/useFocusTrap'

// Components (Sg* prefix to avoid clashing with React names and global Vue tags)
export { SgInput } from './components/Input'
export type { InputProps } from './components/Input'

export { SgForm, formContextKey } from './components/Form'
export type { FormProps, FormContextValue } from './components/Form'

export { SgField } from './components/Field'
export type { FieldProps } from './components/Field'

// UI primitives (Feedback / Navigation / Display / Misc)
export {
  SgConfigProvider,
  SgTransition,
  SgSpin,
  SgModal,
  SgDrawer,
  SgNotificationContainer,
  SgPopconfirm,
  SgTooltip,
  SgProgress,
  SgResult,
  SgEmpty,
  SgSkeleton,
  SgTabs,
  SgMenu,
  SgBreadcrumb,
  SgDropdown,
  SgPagination,
  SgSteps,
  SgSegmented,
  SgBadge,
  SgTag,
  SgAvatar,
  SgCarousel,
  SgTimeline,
  SgDescriptions,
  SgCollapse,
  SgButton,
  notification,
  useNotification,
  useConfig,
  useConfigWithDefaults,
  sgConfigKey,
} from './components/ui'

export type {
  ConfigProviderProps,
  SgConfig,
  TransitionProps,
  SpinProps,
  ModalProps,
  DrawerProps,
  NotificationConfig,
  NotificationContainerProps,
  NotificationType,
  PopconfirmProps,
  TooltipProps,
  ProgressProps,
  ResultProps,
  EmptyProps,
  SkeletonProps,
  TabsProps,
  TabItem,
  MenuItem,
  BreadcrumbProps,
  BreadcrumbItem,
  DropdownProps,
  DropdownItem,
  PaginationProps,
  StepsProps,
  StepItem,
  SegmentedProps,
  SegmentedOption,
  BadgeProps,
  TagProps,
  AvatarProps,
  CarouselProps,
  TimelineProps,
  TimelineItem,
  DescriptionsProps,
  DescriptionsItem,
  CollapseProps,
  CollapseItem,
  ButtonProps,
} from './components/ui'

// Shared types
export type { SizeType, BaseComponentProps, SgLocale } from './types'

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
