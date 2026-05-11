import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'components/button',
    loadComponent: () =>
      import('./pages/components/button/button-page.component').then((m) => m.ButtonPageComponent),
  },
  { path: '**', redirectTo: '' },
]
