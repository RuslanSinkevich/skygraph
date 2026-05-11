import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withHashLocation } from '@angular/router'
import { provideSgConfig, en_US } from '@skygraph/angular'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideSgConfig({ size: 'middle', locale: en_US }),
  ],
}
