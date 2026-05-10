import { createHashRouter, type RouteRecord } from './hashRouter'

const Landing = () => import('../pages/Landing.vue')

// `/components/button` — Wave 3.1 reference migration to demos/ architecture.
// Old `pages/ButtonPage.vue` is gone (see T-Vue-Demo-Foundation done report).
const ButtonDemo = () => import('../demos/ButtonDemo.vue')
const InputPage = () => import('../pages/InputPage.vue')
const InputNumberPage = () => import('../pages/InputNumberPage.vue')
const TextareaPage = () => import('../pages/TextareaPage.vue')
const SelectPage = () => import('../pages/SelectPage.vue')
const CheckboxPage = () => import('../pages/CheckboxPage.vue')
const RadioPage = () => import('../pages/RadioPage.vue')
const SwitchPage = () => import('../pages/SwitchPage.vue')
const SliderPage = () => import('../pages/SliderPage.vue')
const DatePickerPage = () => import('../pages/DatePickerPage.vue')
const ModalPage = () => import('../pages/ModalPage.vue')
const DrawerPage = () => import('../pages/DrawerPage.vue')
const TooltipPage = () => import('../pages/TooltipPage.vue')
const TabsPage = () => import('../pages/TabsPage.vue')
const MenuPage = () => import('../pages/MenuPage.vue')
const PaginationPage = () => import('../pages/PaginationPage.vue')
const BadgePage = () => import('../pages/BadgePage.vue')
const TagPage = () => import('../pages/TagPage.vue')
const AvatarPage = () => import('../pages/AvatarPage.vue')
const ProgressPage = () => import('../pages/ProgressPage.vue')
const SpinPage = () => import('../pages/SpinPage.vue')
const SkeletonPage = () => import('../pages/SkeletonPage.vue')

// T-VueDemo-Pages additions
const RatePage = () => import('../pages/RatePage.vue')
const AutoCompletePage = () => import('../pages/AutoCompletePage.vue')
const BreadcrumbPage = () => import('../pages/BreadcrumbPage.vue')
const DropdownPage = () => import('../pages/DropdownPage.vue')
const PopconfirmPage = () => import('../pages/PopconfirmPage.vue')
const CollapsePage = () => import('../pages/CollapsePage.vue')
const EmptyPage = () => import('../pages/EmptyPage.vue')
const ResultPage = () => import('../pages/ResultPage.vue')
const SegmentedPage = () => import('../pages/SegmentedPage.vue')
const StepsPage = () => import('../pages/StepsPage.vue')
const TimelinePage = () => import('../pages/TimelinePage.vue')
const CarouselPage = () => import('../pages/CarouselPage.vue')
const DescriptionsPage = () => import('../pages/DescriptionsPage.vue')
const TimePickerPage = () => import('../pages/TimePickerPage.vue')
const ColorPickerPage = () => import('../pages/ColorPickerPage.vue')
const ListPage = () => import('../pages/ListPage.vue')
const TreePage = () => import('../pages/TreePage.vue')
const TreeSelectPage = () => import('../pages/TreeSelectPage.vue')
const CascaderPage = () => import('../pages/CascaderPage.vue')
const CalendarPage = () => import('../pages/CalendarPage.vue')
const NotificationPage = () => import('../pages/NotificationPage.vue')
const TransferPage = () => import('../pages/TransferPage.vue')
const UploadPage = () => import('../pages/UploadPage.vue')
const ConfigProviderPage = () => import('../pages/ConfigProviderPage.vue')
const FormPage = () => import('../pages/FormPage.vue')
const TablePage = () => import('../pages/TablePage.vue')
const ChartsPage = () => import('../pages/ChartsPage.vue')
const DiagramPage = () => import('../pages/DiagramPage.vue')
const DashboardPage = () => import('../pages/DashboardPage.vue')
const GanttPage = () => import('../pages/GanttPage.vue')
const EventTimelinePage = () => import('../pages/EventTimelinePage.vue')
const ResourceCalendarPage = () => import('../pages/ResourceCalendarPage.vue')
const SchemaFormEditorPage = () => import('../pages/SchemaFormEditorPage.vue')

const routes: RouteRecord[] = [
  { path: '/', component: Landing },
  { path: '/components/button', component: ButtonDemo },
  { path: '/components/input', component: InputPage },
  { path: '/components/inputnumber', component: InputNumberPage },
  { path: '/components/textarea', component: TextareaPage },
  { path: '/components/select', component: SelectPage },
  { path: '/components/checkbox', component: CheckboxPage },
  { path: '/components/radio', component: RadioPage },
  { path: '/components/switch', component: SwitchPage },
  { path: '/components/slider', component: SliderPage },
  { path: '/components/datepicker', component: DatePickerPage },
  { path: '/components/modal', component: ModalPage },
  { path: '/components/drawer', component: DrawerPage },
  { path: '/components/tooltip', component: TooltipPage },
  { path: '/components/tabs', component: TabsPage },
  { path: '/components/menu', component: MenuPage },
  { path: '/components/pagination', component: PaginationPage },
  { path: '/components/badge', component: BadgePage },
  { path: '/components/tag', component: TagPage },
  { path: '/components/avatar', component: AvatarPage },
  { path: '/components/progress', component: ProgressPage },
  { path: '/components/spin', component: SpinPage },
  { path: '/components/skeleton', component: SkeletonPage },

  // T-VueDemo-Pages additions
  { path: '/components/rate', component: RatePage },
  { path: '/components/autocomplete', component: AutoCompletePage },
  { path: '/components/breadcrumb', component: BreadcrumbPage },
  { path: '/components/dropdown', component: DropdownPage },
  { path: '/components/popconfirm', component: PopconfirmPage },
  { path: '/components/collapse', component: CollapsePage },
  { path: '/components/empty', component: EmptyPage },
  { path: '/components/result', component: ResultPage },
  { path: '/components/segmented', component: SegmentedPage },
  { path: '/components/steps', component: StepsPage },
  { path: '/components/timeline', component: TimelinePage },
  { path: '/components/carousel', component: CarouselPage },
  { path: '/components/descriptions', component: DescriptionsPage },
  { path: '/components/timepicker', component: TimePickerPage },
  { path: '/components/colorpicker', component: ColorPickerPage },
  { path: '/components/list', component: ListPage },
  { path: '/components/tree', component: TreePage },
  { path: '/components/treeselect', component: TreeSelectPage },
  { path: '/components/cascader', component: CascaderPage },
  { path: '/components/calendar', component: CalendarPage },
  { path: '/components/notification', component: NotificationPage },
  { path: '/components/transfer', component: TransferPage },
  { path: '/components/upload', component: UploadPage },
  { path: '/components/configprovider', component: ConfigProviderPage },
  { path: '/components/form', component: FormPage },
  { path: '/components/table', component: TablePage },
  { path: '/components/charts', component: ChartsPage },
  { path: '/components/diagram', component: DiagramPage },
  { path: '/components/dashboard', component: DashboardPage },
  { path: '/components/gantt', component: GanttPage },
  { path: '/components/event-timeline', component: EventTimelinePage },
  { path: '/components/resource-calendar', component: ResourceCalendarPage },
  { path: '/components/schema-form-editor', component: SchemaFormEditorPage },

  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createHashRouter(routes)
export { useRoute, useRouter, RouterView } from './hashRouter'
