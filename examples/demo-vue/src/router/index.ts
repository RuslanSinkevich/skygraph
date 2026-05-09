import { createHashRouter, type RouteRecord } from './hashRouter'

const Landing = () => import('../pages/Landing.vue')

const ButtonPage = () => import('../pages/ButtonPage.vue')
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

const routes: RouteRecord[] = [
  { path: '/', component: Landing },
  { path: '/components/button', component: ButtonPage },
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
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createHashRouter(routes)
export { useRoute, useRouter, RouterView } from './hashRouter'
