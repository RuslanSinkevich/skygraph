# T-Angular-Foundation — Волна 4.1: фундамент Angular-адаптера

> Читать первым: `docs/_streams/CHARTER.md`, `docs/_streams/wave-4/CHARTER.md`.
> Каркас (`packages/angular/{package.json,tsconfig.json,ng-package.json,
> src/public-api.ts}`, `examples/demo-angular/{package.json,tsconfig*.json,
> index.html,src/main.ts}`) уже создан, `pnpm install` уже выполнен —
> **этот стрим install не запускает**. Все зависимости в
> `node_modules/` готовы к использованию.

## ID и волна

- **ID:** T-Angular-Foundation
- **Волна:** 4.1 (один независимый стрим)
- **Режим:** один таб, **параллельно** с 3.3a / 3.3b / 3.3c (зоны не пересекаются, install не нужен)

## Цель

Превратить инертный каркас в работающий пакет `@skygraph/angular` с:
- DI-эквивалентом `useConfig()` из React (`SgConfigService`,
  `provideSgConfig`, `injectSgConfig`, `<sg-config-provider>`),
- двумя эталонными компонентами (`SgButton` + `SgSpin`),
- двумя локалями (`en_US`, `ru_RU`),
- парность-тестом DOM с React,
- работающим демо `examples/demo-angular` (Landing + страница Button).

Принцип: **«не изобретай свой визуал и стили»** — DOM, классы, aria,
имена пропсов копируются из React 1:1, меняется только обвязка
(Inputs/Outputs/DI вместо props/callbacks/Context).

## Эталоны (READ-ONLY)

- `packages/react/src/components/ConfigProvider.tsx` — образец
  `SgConfig` / `useConfig`.
- `packages/react/src/components/ui/Button.tsx` — DOM-эталон Button.
- `packages/react/src/components/ui/Spin.tsx` — DOM-эталон Spin.
- `packages/react/src/locales/{en_US,ru_RU}.ts` — структура локалей.
- `packages/react/src/types.ts` — `BaseComponentProps` /
  `InteractiveProps` / `SizableProps`.
- `examples/demo/src/App.tsx` + `examples/_shared-react/src/layout/**` —
  как устроен AppShell в React-демо. Копировать визуал, не код.
- `examples/demo/src/demos/button/**` + `examples/demo/src/demos/ButtonDemo.tsx` —
  как устроена страница Button в React-демо.

## Зона файлов

### Можно править / создавать

#### Пакет `packages/angular/`
- `src/public-api.ts` (заменить пустышку на полный re-export)
- `src/lib/types.ts` (новый, аналог `packages/react/src/types.ts`)
- `src/lib/config/sg-config.tokens.ts` (новый)
- `src/lib/config/sg-config.service.ts` (новый)
- `src/lib/config/provide-sg-config.ts` (новый)
- `src/lib/config/inject-sg-config.ts` (новый)
- `src/lib/config/sg-config-provider.component.ts` (новый)
- `src/lib/config/index.ts` (новый)
- `src/lib/components/ui/spin/sg-spin.component.ts` (новый)
- `src/lib/components/ui/spin/index.ts` (новый)
- `src/lib/components/ui/button/sg-button.component.ts` (новый)
- `src/lib/components/ui/button/index.ts` (новый)
- `src/lib/locales/{en_US,ru_RU,index}.ts` (новые)
- `__tests__/styling-contract.parity.test.ts` (новый, парность с React)
- `__tests__/setup.ts` (новый, jsdom + zone.js bootstrap)
- `vitest.config.ts` (новый)
- `README.md` (новый)
- `package.json` — **только аддитивные правки** (добавить script
  `api:check`/`api:update` если нужно, scripts уже корректны). Не
  удалять зависимости. Не менять версии.
- `tsconfig.json` — **только аддитивные правки** (например paths). Не
  переписывать.
- `ng-package.json` — без правок (entry уже корректен).

#### Демо `examples/demo-angular/`
- `angular.json` (новый, минимальный конфиг для `@angular/build`)
- `src/main.ts` (заменить пустышку на `bootstrapApplication`)
- `src/styles.css` (новый, импорт `@skygraph/styles/sg.css`)
- `src/app/app.component.ts` (новый, AppShell standalone)
- `src/app/app.component.html` / `app.component.css` (новые)
- `src/app/app.config.ts` (новый, providers: router + provideSgConfig)
- `src/app/app.routes.ts` (новый)
- `src/app/shared/layout/header.component.ts` (новый, inline)
- `src/app/shared/layout/sidebar.component.ts` (новый, inline)
- `src/app/pages/landing/landing.component.ts` (новый)
- `src/app/pages/components/button/button-page.component.ts` (новый)
- `src/app/pages/components/button/button-page.component.html` (новый)
- `index.html` — без правок (пустышка `<sg-root>` корректна; AppComponent
  selector = `sg-root`).
- `package.json` — без правок.

#### Корневые файлы (минимальные правки)
- `.size-limit.json` — добавить два **новых** объекта (не править
  существующие):
  - `@skygraph/angular (esm)` → `packages/angular/dist/fesm2022/skygraph-angular.mjs`
    (или иной путь, который выдаст ng-packagr; уточнить после первого
    `build`), лимит **120 KB brotli** (с запасом, реальный замер запишет
    finding).
  - `examples/demo-angular (main bundle)` → `examples/demo-angular/dist/demo-angular/browser/main-*.js`,
    лимит **600 KB brotli** (Angular runtime жирнее React/Vue, точный
    замер — finding).
- `pnpm-workspace.yaml` — без правок (уже подхватывает
  `packages/*` и `examples/*`).
- `package.json` (root) — без правок (`pnpm -r` уже подхватит новые
  пакеты).

#### Документация
- `docs/_streams/{decisions,findings,done}/T-Angular-Foundation.md`

### Нельзя трогать

- `packages/{core,react,vue,styles}/**` — read-only эталоны.
- `examples/{demo,demo-vue,_shared,_shared-react,_shared-vue,
  showcases}/**` — целиком read-only.
- `tsconfig.base.json`, root `package.json`, `pnpm-lock.yaml`.
- `.husky/**`, `.github/**`.
- Зоны других стримов 3.3a/b/c.

## ⚠️ Правила автономности

Не останавливаться, не задавать вопросов. Решения вне карты —
`docs/_streams/decisions/T-Angular-Foundation.md`. Пропуски и
ограничения — `docs/_streams/findings/T-Angular-Foundation.md`.
В конце — отчёт `docs/_streams/done/T-Angular-Foundation.md`.

**Никаких:**
- `git commit` / `push` / `stash` / `rebase`,
- `pnpm install` / `pnpm add` / `pnpm update` / `pnpm clean` (всё уже
  установлено; если нужна **новая** зависимость — finding и пропуск,
  не пытаться поставить),
- глобальных `pnpm typecheck` / `build` / `test` (только через
  `--filter @skygraph/angular` или `--filter demo-angular`).

Если что-то падает из-за того, что Angular CLI просит
`@angular-devkit/build-angular` или другой пакет, которого нет —
**finding**, описываем чем заменили (например, остаёмся на
`@angular/build` Vite-builder и переписываем `angular.json` под него).

## Технические решения (зафиксированные заранее)

1. **Версия Angular:** 21.x (latest stable, `@angular/core ^21.2.12`).
2. **Standalone API only:** никаких `NgModule`. Всё через
   `bootstrapApplication`, standalone компоненты.
3. **Control flow:** `@if` / `@for` / `@switch` (Angular 17+).
4. **Сигналы (Signals):** для внутреннего state Service-ов и где
   уместно. Public API компонентов — классические `@Input` / `@Output`
   (для совместимости с template-driven).
5. **Билд библиотеки:** `ng-packagr` (стандарт), entry =
   `src/public-api.ts`. Output → `packages/angular/dist/`.
6. **Билд демо:** `@angular/build` (новый Vite-based application
   builder, не legacy webpack `@angular-devkit/build-angular`).
7. **Тесты:** `vitest` + `@analogjs/vitest-angular` + `jsdom`
   (паритет с React/Vue — везде Vitest, никакого Jasmine/Karma).
8. **Зоны:** оставляем `zone.js` (zoneless ещё experimental на
   Angular 21). Не делаем zoneless в этом стриме — может в Wave 4.2.
9. **Селектор Button:** **атрибут-селектор**
   `selector: 'button[sg-button], a[sg-button]'`. Это даёт DOM 1:1 с
   React (`<button class="sg-button…">`), без обёртки `<sg-button>`.
   То же для всех «host-element» компонентов (Spin, Tag, Badge — в
   Wave 4.2).
10. **Селектор ConfigProvider:** обычный `selector: 'sg-config-provider'`
    с `<ng-content>` внутри. Это инфраструктурный компонент, обёртку
    не унаследовать без NgModule. Не критично для DOM-парности.
11. **DI:** `SG_CONFIG_TOKEN: InjectionToken<SgConfig>` + factory
    `provideSgConfig(config?)` + helper `injectSgConfig()`. Сервис
    `SgConfigService` хранит сигнал `config` для реактивности.
12. **Локали:** `SgLocale` интерфейс копируется из
    `packages/react/src/locales/en_US.ts` (тот же набор ключей).
    `en_US` и `ru_RU` — точная транслитерация React-локалей.
13. **CSS:** только импорт `@skygraph/styles/sg.css` в `styles.css`
    демо. Никаких новых селекторов в `packages/styles/**` (это вне
    зоны).

## Конкретные файлы и сигнатуры

### `packages/angular/src/lib/types.ts`

Аналог `packages/react/src/types.ts`. Все интерфейсы — те же:
```ts
export interface BaseComponentProps {
  className?: string
  style?: Partial<CSSStyleDeclaration> | Record<string, string | number>
  unstyled?: boolean
}
export interface InteractiveProps {
  disabled?: boolean
  loading?: boolean
}
export interface SizableProps {
  size?: 'small' | 'middle' | 'large'
}
```

### `packages/angular/src/lib/config/sg-config.tokens.ts`

```ts
import { InjectionToken } from '@angular/core'
import type { SgLocale } from '../locales'

export interface SgConfig {
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  locale?: SgLocale
  // расширять по образцу packages/react/src/components/ConfigProvider.tsx
}

export const SG_CONFIG_TOKEN = new InjectionToken<SgConfig>(
  'SG_CONFIG_TOKEN',
  { providedIn: 'root', factory: () => ({}) },
)
```

### `packages/angular/src/lib/config/provide-sg-config.ts`

```ts
import { Provider } from '@angular/core'
import { SG_CONFIG_TOKEN, SgConfig } from './sg-config.tokens'
export function provideSgConfig(config: SgConfig = {}): Provider {
  return { provide: SG_CONFIG_TOKEN, useValue: config }
}
```

### `packages/angular/src/lib/config/inject-sg-config.ts`

```ts
import { inject } from '@angular/core'
import { SG_CONFIG_TOKEN } from './sg-config.tokens'
export function injectSgConfig() {
  return inject(SG_CONFIG_TOKEN)
}
```

### `packages/angular/src/lib/config/sg-config-provider.component.ts`

Стандарт-компонент, по образцу React `<ConfigProvider>`. Принимает
`@Input() config: SgConfig`, переопределяет токен на уровне своего
дерева (через `viewProviders`).

### `packages/angular/src/lib/components/ui/spin/sg-spin.component.ts`

Минимальный аналог `packages/react/src/components/ui/Spin.tsx`.
Standalone, attribute-selector `[sg-spin]` или host-tag — посмотреть
React-исходник и решить через decisions, как ближе к DOM-эталону.

### `packages/angular/src/lib/components/ui/button/sg-button.component.ts`

```ts
import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { injectSgConfig } from '../../../config/inject-sg-config'
import { SgSpinComponent } from '../spin/sg-spin.component'

@Component({
  selector: 'button[sg-button], a[sg-button]',
  standalone: true,
  imports: [CommonModule, SgSpinComponent],
  template: `
    @if (loading) { <sg-spin size="small" [unstyled]="unstyled"></sg-spin> }
    <ng-content></ng-content>
  `,
  host: {
    '[class]': 'classes()',
    '[attr.type]': 'htmlType',
    '[attr.disabled]': 'disabled || loading ? true : null',
    '[attr.aria-disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgButtonComponent {
  private cfg = injectSgConfig()

  @Input() type: 'default' | 'primary' | 'dashed' | 'text' | 'link' = 'default'
  @Input() htmlType: 'button' | 'submit' | 'reset' = 'button'
  @Input() size: 'small' | 'middle' | 'large' | undefined
  @Input() disabled = false
  @Input() loading = false
  @Input() danger = false
  @Input() block = false
  @Input() unstyled = false
  @Input() className = ''

  classes = computed(() => {
    if (this.unstyled) return this.className
    const size = this.size ?? this.cfg.size ?? 'middle'
    return [
      'sg-button',
      `sg-button-${this.type}`,
      `sg-button-${size}`,
      this.danger ? 'sg-button-danger' : '',
      this.block ? 'sg-button-block' : '',
      this.loading ? 'sg-button-loading' : '',
      this.className,
    ].filter(Boolean).join(' ')
  })
}
```

(точные детали — copy-from React `Button.tsx`, особенно поведение
`unstyled` + порядок классов).

### `packages/angular/src/lib/locales/en_US.ts` / `ru_RU.ts` / `index.ts`

Скопировать **только используемые** в фундаменте поля из
`packages/react/src/locales/en_US.ts`. Структура `SgLocale`
интерфейса — общая. На этом этапе можно ограничиться полями для
Button (но если структура SgLocale в React большая — оставляем
её целиком, чтобы Wave 4.2 не пришлось расширять).

### `packages/angular/src/public-api.ts` (полная замена)

```ts
export * from './lib/types'
export * from './lib/config'
export * from './lib/components/ui/button'
export * from './lib/components/ui/spin'
export * from './lib/locales'
```

### `packages/angular/__tests__/styling-contract.parity.test.ts`

Юнит-тест Vitest + Angular: рендерим `SgButtonComponent` (через
`TestBed`), сравниваем сгенерированный `outerHTML` с эталоном из
React (рендерим `<Button>` через React DOM/server, нормализуем
пробелы/`data-*` атрибуты). Минимум один кейс: дефолтный Button с
текстом «Click». Если для Vue в `packages/vue/__tests__/styling-contract.parity.test.ts`
уже есть аналогичный паттерн — взять оттуда подход (read-only).

### `packages/angular/vitest.config.ts`

```ts
import angular from '@analogjs/vite-plugin-angular'
import { defineConfig } from 'vitest/config'
export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['__tests__/setup.ts'],
    include: ['__tests__/**/*.test.ts'],
  },
})
```

### `examples/demo-angular/angular.json`

Минимальный конфиг для нового `@angular/build:application` builder.
Образец — `ng new --inline-style --inline-template --skip-tests demo`,
скопировать `architect.build.builder = "@angular/build:application"`,
input = `src/main.ts`, output = `dist/`, styles = `["src/styles.css"]`.

### `examples/demo-angular/src/main.ts` (полная замена)

```ts
import { bootstrapApplication } from '@angular/platform-browser'
import 'zone.js'
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'
bootstrapApplication(AppComponent, appConfig)
```

### `examples/demo-angular/src/app/app.config.ts`

```ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withHashLocation } from '@angular/router'
import { provideSgConfig } from '@skygraph/angular'
import { routes } from './app.routes'
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideSgConfig({ size: 'middle' }),
  ],
}
```

### `examples/demo-angular/src/app/app.routes.ts`

```ts
import { Routes } from '@angular/router'
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent) },
  { path: 'components/button', loadComponent: () => import('./pages/components/button/button-page.component').then(m => m.ButtonPageComponent) },
  { path: '**', redirectTo: '' },
]
```

### `examples/demo-angular/src/app/app.component.ts`

Standalone-компонент со селектором `sg-root`, в шаблоне — header +
sidebar + `<router-outlet>`. Layout копируется визуально из
`examples/_shared-react/src/layout/AppShell.tsx` (без копирования
кода — переписать на standalone-компоненты Angular).

### `examples/demo-angular/src/app/pages/components/button/button-page.component.ts`

Standalone-страница, демонстрирующая 5 примеров Button (по образцу
`examples/demo/src/demos/button/*.demo.tsx`):
1. Types (default/primary/dashed/text/link)
2. Sizes (small/middle/large)
3. States (disabled/loading)
4. Danger
5. Block

DOM-обёртка примеров на этом этапе — **минимальный inline-вариант**
(не полный аналог `<DemoBox>`, его портирует Wave 4.3). Достаточно
`<section><h3>Title</h3><div class="row"><button sg-button>...</button></div></section>`.

## Чек-лист

### Шаг 0. Прочитать обязательное
- `docs/_streams/CHARTER.md` + `docs/_streams/wave-4/CHARTER.md`.
- Эталоны из §«Эталоны (READ-ONLY)».
- `packages/vue/__tests__/styling-contract.parity.test.ts` (паттерн).

### Шаг 1. Заполнить пакет
- Все файлы из §«Можно править / создавать → Пакет» по списку выше.
- После каждой группы (config / button+spin / locales) →
  `pnpm --filter @skygraph/angular typecheck` → зелёный.

### Шаг 2. Парность-тест
- Создать `__tests__/setup.ts` + `vitest.config.ts`.
- Один тест на дефолтный Button → DOM 1:1 с React.
- `pnpm --filter @skygraph/angular test --run` → зелёный.

### Шаг 3. Билд библиотеки
- `pnpm --filter @skygraph/angular build` → зелёный (`ng-packagr`
  создаёт `dist/`, `dist/fesm2022/`, `.d.ts`).

### Шаг 4. Демо
- Все файлы из §«Можно править / создавать → Демо» по списку выше.
- `pnpm --filter demo-angular build` → зелёный.
- (опц.) `pnpm --filter demo-angular dev` → проверить что Landing и
  `/components/button` рендерятся и Button реально нажимается.

### Шаг 5. Size-limit
- В `.size-limit.json` добавить **два новых объекта** (не править
  существующие!) — см. §«Корневые файлы».
- `pnpm size` → зелёный (или finding с реальным замером, если лимит
  оказался занижен — зафиксировать и поднять до факта).

### Шаг 6. Финал
- `pnpm --filter @skygraph/angular typecheck && pnpm --filter @skygraph/angular test --run && pnpm --filter @skygraph/angular build` → зелёные.
- `pnpm --filter demo-angular build` → зелёный.
- `pnpm size` → зелёный.
- README в `packages/angular/README.md` (короткий: что это, как
  установить, минимальный пример с `provideSgConfig` + `<button sg-button>`).
- Отчёт `docs/_streams/done/T-Angular-Foundation.md` — список созданных
  файлов, перечень принятых решений (со ссылкой на decisions/),
  findings (со ссылкой), реальные размеры бандлов.

## Acceptance criteria

- `packages/angular/dist/` собран, есть FESM2022 entry, есть `.d.ts`.
- `examples/demo-angular/dist/` собран, в браузере открывается
  Landing и страница `/#/components/button`, Button рендерится и
  кликабелен.
- `pnpm --filter @skygraph/angular {typecheck,test --run,build}` —
  зелёные.
- `pnpm --filter demo-angular build` — зелёный.
- `pnpm size` — зелёный (с двумя новыми записями).
- Парность-тест с React сравнивает DOM Button и зелёный.
- Никаких правок в `packages/{core,react,vue,styles}/**`,
  `examples/{demo,demo-vue,_shared*,showcases}/**`,
  `tsconfig.base.json`, root `package.json`, `pnpm-lock.yaml`.
- Никаких `pnpm install`/`add`/`update`.
- Отчёт сдан, decisions/findings заполнены.

## Зависимости

- Каркас (package.json + tsconfig + ng-package + index.html + main.ts
  плейсхолдеры) уже создан, `pnpm install` уже выполнен **до** старта
  стрима.
- **Параллельно** с 3.3a / 3.3b / 3.3c — зоны не пересекаются, install
  не нужен.

---

## Текст запуска стрима (копипаст в новый таб Cursor)

```text
Ты — стрим T-Angular-Foundation (Волна 4.1) в репозитории skygraph.

Задача: превратить уже созданный инертный каркас Angular-адаптера в
работающий пакет @skygraph/angular + демо examples/demo-angular.
Содержание: DI-эквивалент useConfig (provideSgConfig + injectSgConfig
+ <sg-config-provider>), 2 эталонных компонента (SgButton + SgSpin)
с DOM 1:1 от React, локали en_US + ru_RU, парность-тест с React,
демо с Landing + страницей Button.

Принцип: НЕ ИЗОБРЕТАЙ свой визуал и стили — копируй DOM/className/aria
из packages/react/src/components/ui/Button.tsx и Spin.tsx, меняй
только обвязку (Inputs/Outputs/DI вместо props/callbacks/Context).
Версия Angular 21, standalone-only, control flow @if/@for, ng-packagr
для библиотеки, @angular/build для демо, vitest + @analogjs/vitest-
angular для тестов.

Полная карта: docs/_streams/wave-4/T-Angular-Foundation.md

Каркас уже создан, pnpm install уже выполнен — ВАМ install НЕ НУЖЕН,
все зависимости в node_modules. Никаких pnpm install / add / update.
Никаких git commit / push. Не лезь в packages/{core,react,vue,styles}/**,
examples/{demo,demo-vue,_shared*,showcases}/**, tsconfig.base.json,
root package.json. Параллельно с 3.3a/b/c, зоны не пересекаются.

Правила автономности: не останавливаться, не спрашивать. Решения
вне карты — docs/_streams/decisions/T-Angular-Foundation.md, пропуски
— findings/T-Angular-Foundation.md. В конце — отчёт
docs/_streams/done/T-Angular-Foundation.md.

Старт: Шаг 0 (прочитать React-эталоны Button/Spin/ConfigProvider/types
+ Vue parity-test как образец), потом Шаг 1 (заполнить пакет).
```
