import { Routes } from '@angular/router'
import { LandingComponent } from './pages/landing/landing.component'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // Eager: avoids a separate lazy chunk for `/` — some setups never
    // complete that fetch (eternal tab spinner, no JS console error).
    component: LandingComponent,
  },

  // Wave 5.3 — top-level pages (parity with React/Vue demos)
  {
    path: 'changelog',
    loadComponent: () =>
      import('./pages/roadmap/roadmap.component').then((m) => m.RoadmapPageComponent),
  },
  // Legacy URL — keep `/roadmap` working for external links.
  { path: 'roadmap', redirectTo: 'changelog', pathMatch: 'full' },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutPageComponent),
  },

  // Wave 5.3 — guide pages (mirrors examples/demo-vue/src/guide/*)
  {
    path: 'guide',
    pathMatch: 'full',
    redirectTo: 'guide/getting-started',
  },
  {
    path: 'guide/getting-started',
    loadComponent: () =>
      import('./pages/guide/getting-started.component').then((m) => m.GettingStartedPageComponent),
  },
  {
    path: 'guide/theming',
    loadComponent: () =>
      import('./pages/guide/theming.component').then((m) => m.ThemingPageComponent),
  },
  {
    path: 'guide/design-tokens',
    loadComponent: () =>
      import('./pages/guide/design-tokens.component').then((m) => m.DesignTokensPageComponent),
  },
  {
    path: 'guide/styling-showcase',
    loadComponent: () =>
      import('./pages/guide/styling-showcase.component').then(
        (m) => m.StylingShowcasePageComponent,
      ),
  },
  {
    path: 'guide/config-provider',
    loadComponent: () =>
      import('./pages/guide/config-provider.component').then((m) => m.ConfigProviderPageComponent),
  },
  {
    path: 'guide/core-api',
    loadComponent: () =>
      import('./pages/guide/core-api.component').then((m) => m.CoreApiPageComponent),
  },

  // Wave 4.1 — foundation
  {
    path: 'components/button',
    loadComponent: () =>
      import('./pages/components/button/button-page.component').then((m) => m.ButtonPageComponent),
  },
  {
    path: 'components/spin',
    loadComponent: () =>
      import('./pages/components/spin/spin-page.component').then((m) => m.SpinPageComponent),
  },

  // Wave 4.2 — Batch A: UI primitives
  {
    path: 'components/tag',
    loadComponent: () =>
      import('./pages/components/tag/tag-page.component').then((m) => m.TagPageComponent),
  },
  {
    path: 'components/badge',
    loadComponent: () =>
      import('./pages/components/badge/badge-page.component').then((m) => m.BadgePageComponent),
  },
  {
    path: 'components/avatar',
    loadComponent: () =>
      import('./pages/components/avatar/avatar-page.component').then((m) => m.AvatarPageComponent),
  },
  {
    path: 'components/tooltip',
    loadComponent: () =>
      import('./pages/components/tooltip/tooltip-page.component').then(
        (m) => m.TooltipPageComponent,
      ),
  },
  {
    path: 'components/skeleton',
    loadComponent: () =>
      import('./pages/components/skeleton/skeleton-page.component').then(
        (m) => m.SkeletonPageComponent,
      ),
  },
  {
    path: 'components/progress',
    loadComponent: () =>
      import('./pages/components/progress/progress-page.component').then(
        (m) => m.ProgressPageComponent,
      ),
  },
  {
    path: 'components/empty',
    loadComponent: () =>
      import('./pages/components/empty/empty-page.component').then((m) => m.EmptyPageComponent),
  },
  {
    path: 'components/result',
    loadComponent: () =>
      import('./pages/components/result/result-page.component').then((m) => m.ResultPageComponent),
  },
  {
    path: 'components/switch',
    loadComponent: () =>
      import('./pages/components/switch/switch-page.component').then((m) => m.SwitchPageComponent),
  },
  {
    path: 'components/checkbox',
    loadComponent: () =>
      import('./pages/components/checkbox/checkbox-page.component').then(
        (m) => m.CheckboxPageComponent,
      ),
  },
  {
    path: 'components/radio',
    loadComponent: () =>
      import('./pages/components/radio/radio-page.component').then((m) => m.RadioPageComponent),
  },
  {
    path: 'components/slider',
    loadComponent: () =>
      import('./pages/components/slider/slider-page.component').then((m) => m.SliderPageComponent),
  },
  {
    path: 'components/rate',
    loadComponent: () =>
      import('./pages/components/rate/rate-page.component').then((m) => m.RatePageComponent),
  },
  {
    path: 'components/colorpicker',
    loadComponent: () =>
      import('./pages/components/colorpicker/colorpicker-page.component').then(
        (m) => m.ColorPickerPageComponent,
      ),
  },

  // Wave 4.2 — Batch B: UI inputs
  {
    path: 'components/input',
    loadComponent: () =>
      import('./pages/components/input/input-page.component').then((m) => m.InputPageComponent),
  },
  {
    path: 'components/inputnumber',
    loadComponent: () =>
      import('./pages/components/inputnumber/inputnumber-page.component').then(
        (m) => m.InputNumberPageComponent,
      ),
  },
  {
    path: 'components/textarea',
    loadComponent: () =>
      import('./pages/components/textarea/textarea-page.component').then(
        (m) => m.TextareaPageComponent,
      ),
  },
  {
    path: 'components/inputpassword',
    loadComponent: () =>
      import('./pages/components/inputpassword/inputpassword-page.component').then(
        (m) => m.InputPasswordPageComponent,
      ),
  },
  {
    path: 'components/searchinput',
    loadComponent: () =>
      import('./pages/components/searchinput/searchinput-page.component').then(
        (m) => m.SearchInputPageComponent,
      ),
  },
  {
    path: 'components/pininput',
    loadComponent: () =>
      import('./pages/components/pininput/pininput-page.component').then(
        (m) => m.PinInputPageComponent,
      ),
  },
  {
    path: 'components/taginput',
    loadComponent: () =>
      import('./pages/components/taginput/taginput-page.component').then(
        (m) => m.TagInputPageComponent,
      ),
  },
  {
    path: 'components/mentions',
    loadComponent: () =>
      import('./pages/components/mentions/mentions-page.component').then(
        (m) => m.MentionsPageComponent,
      ),
  },
  {
    path: 'components/inlineedit',
    loadComponent: () =>
      import('./pages/components/inlineedit/inlineedit-page.component').then(
        (m) => m.InlineEditPageComponent,
      ),
  },
  {
    path: 'components/inputgroup',
    loadComponent: () =>
      import('./pages/components/inputgroup/inputgroup-page.component').then(
        (m) => m.InputGroupPageComponent,
      ),
  },

  // Wave 4.2 — Batch C: UI nav + feedback
  {
    path: 'components/tabs',
    loadComponent: () =>
      import('./pages/components/tabs/tabs-page.component').then((m) => m.TabsPageComponent),
  },
  {
    path: 'components/menu',
    loadComponent: () =>
      import('./pages/components/menu/menu-page.component').then((m) => m.MenuPageComponent),
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () =>
      import('./pages/components/breadcrumb/breadcrumb-page.component').then(
        (m) => m.BreadcrumbPageComponent,
      ),
  },
  {
    path: 'components/dropdown',
    loadComponent: () =>
      import('./pages/components/dropdown/dropdown-page.component').then(
        (m) => m.DropdownPageComponent,
      ),
  },
  {
    path: 'components/pagination',
    loadComponent: () =>
      import('./pages/components/pagination/pagination-page.component').then(
        (m) => m.PaginationPageComponent,
      ),
  },
  {
    path: 'components/steps',
    loadComponent: () =>
      import('./pages/components/steps/steps-page.component').then((m) => m.StepsPageComponent),
  },
  {
    path: 'components/segmented',
    loadComponent: () =>
      import('./pages/components/segmented/segmented-page.component').then(
        (m) => m.SegmentedPageComponent,
      ),
  },
  {
    path: 'components/modal',
    loadComponent: () =>
      import('./pages/components/modal/modal-page.component').then((m) => m.ModalPageComponent),
  },
  {
    path: 'components/drawer',
    loadComponent: () =>
      import('./pages/components/drawer/drawer-page.component').then((m) => m.DrawerPageComponent),
  },
  {
    path: 'components/popconfirm',
    loadComponent: () =>
      import('./pages/components/popconfirm/popconfirm-page.component').then(
        (m) => m.PopconfirmPageComponent,
      ),
  },
  {
    path: 'components/notification',
    loadComponent: () =>
      import('./pages/components/notification/notification-page.component').then(
        (m) => m.NotificationPageComponent,
      ),
  },
  {
    path: 'components/carousel',
    loadComponent: () =>
      import('./pages/components/carousel/carousel-page.component').then(
        (m) => m.CarouselPageComponent,
      ),
  },
  {
    path: 'components/collapse',
    loadComponent: () =>
      import('./pages/components/collapse/collapse-page.component').then(
        (m) => m.CollapsePageComponent,
      ),
  },
  {
    path: 'components/descriptions',
    loadComponent: () =>
      import('./pages/components/descriptions/descriptions-page.component').then(
        (m) => m.DescriptionsPageComponent,
      ),
  },

  // Wave 4.2 — Batch D: UI selectors + date
  {
    path: 'components/select',
    loadComponent: () =>
      import('./pages/components/select/select-page.component').then((m) => m.SelectPageComponent),
  },
  {
    path: 'components/autocomplete',
    loadComponent: () =>
      import('./pages/components/autocomplete/autocomplete-page.component').then(
        (m) => m.AutoCompletePageComponent,
      ),
  },
  {
    path: 'components/cascader',
    loadComponent: () =>
      import('./pages/components/cascader/cascader-page.component').then(
        (m) => m.CascaderPageComponent,
      ),
  },
  {
    path: 'components/treeselect',
    loadComponent: () =>
      import('./pages/components/treeselect/treeselect-page.component').then(
        (m) => m.TreeSelectPageComponent,
      ),
  },
  {
    path: 'components/datepicker',
    loadComponent: () =>
      import('./pages/components/datepicker/datepicker-page.component').then(
        (m) => m.DatePickerPageComponent,
      ),
  },
  {
    path: 'components/timepicker',
    loadComponent: () =>
      import('./pages/components/timepicker/timepicker-page.component').then(
        (m) => m.TimePickerPageComponent,
      ),
  },
  {
    path: 'components/calendar',
    loadComponent: () =>
      import('./pages/components/calendar/calendar-page.component').then(
        (m) => m.CalendarPageComponent,
      ),
  },
  {
    path: 'components/upload',
    loadComponent: () =>
      import('./pages/components/upload/upload-page.component').then((m) => m.UploadPageComponent),
  },
  {
    path: 'components/transfer',
    loadComponent: () =>
      import('./pages/components/transfer/transfer-page.component').then(
        (m) => m.TransferPageComponent,
      ),
  },
  {
    path: 'components/timeline',
    loadComponent: () =>
      import('./pages/components/timeline/timeline-page.component').then(
        (m) => m.TimelinePageComponent,
      ),
  },

  // Wave 4.2 — Batch E: complex (best-effort)
  {
    path: 'components/list',
    loadComponent: () =>
      import('./pages/components/list/list-page.component').then((m) => m.ListPageComponent),
  },
  {
    path: 'components/tree',
    loadComponent: () =>
      import('./pages/components/tree/tree-page.component').then((m) => m.TreePageComponent),
  },

  { path: '**', redirectTo: '' },
]
