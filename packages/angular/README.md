# @skygraph/angular

Angular adapter for SkyGraph — same components as `@skygraph/react` and
`@skygraph/vue`, same `.sg-*` CSS, Angular bindings.

> **Status:** Wave 4.1 (foundation). Ships `SgButton` + `SgSpin`,
> `provideSgConfig`, `injectSgConfig`, `<sg-config-provider>`, locales
> `en_US` + `ru_RU`. Full component port arrives in Wave 4.2 / 4.3.

## Install

```bash
pnpm add @skygraph/angular @skygraph/core @skygraph/styles
```

> The React and Vue adapters also ship a meta-package
> (`skygraph-react`, `skygraph-vue`) that pulls in core + styles in one
> step. Angular gets the same treatment once the adapter stabilises.

Requires **Angular 21** (standalone API, control flow `@if`/`@for`).
`zone.js` is still supported; `zoneless` mode is planned for Wave 4.2.

## Usage

```ts
// main.ts
import 'zone.js'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideSgConfig, en_US } from '@skygraph/angular'

import { AppComponent } from './app/app.component'

bootstrapApplication(AppComponent, {
  providers: [
    provideSgConfig({ size: 'middle', locale: en_US }),
  ],
})
```

```css
/* styles.css */
@import '@skygraph/styles/index.css';
```

```ts
// any standalone component
import { Component } from '@angular/core'
import { SgButtonComponent } from '@skygraph/angular'

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [SgButtonComponent],
  template: `<button sg-button type="primary" (click)="onClick()">Click me</button>`,
})
export class GreetingComponent {
  onClick() { console.log('clicked') }
}
```

The `[sg-button]` and `[sg-spin]` selectors are **attribute-based**, so the
rendered DOM matches the React adapter byte-for-byte:

```html
<button class="sg-button sg-button-primary sg-button-middle"
        aria-disabled="false">
  Click me
</button>
```

## API

| Export | Purpose |
|---|---|
| `SgButtonComponent` | Attribute selector `button[sg-button], a[sg-button]`. |
| `SgSpinComponent` | Attribute selector `span[sg-spin], div[sg-spin]`. |
| `SgConfigProviderComponent` | `<sg-config-provider>` wrapper (Wave 4.1: passthrough; subtree DI override → Wave 4.2). |
| `provideSgConfig(config)` | App / route-level DI factory for `SG_CONFIG_TOKEN`. |
| `injectSgConfig()` | Reads the active `SgConfig` from the injector. |
| `SgConfigService` | Reactive signal-based holder around `SG_CONFIG_TOKEN`. |
| `SG_CONFIG_TOKEN` | `InjectionToken<SgConfig>` (defaults to `{}`). |
| `en_US`, `ru_RU` | Locale presets, parity with `packages/react/src/locales`. |
| `SgConfig`, `SgLocale`, `SizeType`, `BaseComponentProps`, `InteractiveProps`, `SizableProps` | Type primitives. |

## Component parity

DOM, class names, and `aria-*` attributes are copied 1:1 from
`packages/react/src/components/ui/Button.tsx` and `Spin.tsx`. The parity is
locked by `packages/angular/__tests__/styling-contract.parity.test.ts`.

## Notes (Wave 4.1 scope)

- `SgSpin`: only `standalone` + `fullscreen` branches. The container-over-
  children mode (`<Spin spinning><Table /></Spin>` in React) is a Wave 4.2
  item — see `docs/_streams/findings/T-Angular-Foundation.md` F1.
- `SgSpin.delay`: input is accepted for API parity but currently no-op
  (F2).
- `<sg-config-provider>`: `@Input config` is exposed but does not
  propagate via DI to projected children yet — use `provideSgConfig()`
  at root / route level. The structural-directive form lands in Wave 4.2
  (F7).
- Locales: only `en_US` and `ru_RU` shipped. The other four React locales
  (`zh_CN`, `de_DE`, `fr_FR`, `es_ES`) follow in Wave 4.2.

## License

MIT
