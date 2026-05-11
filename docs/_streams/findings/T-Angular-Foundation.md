# T-Angular-Foundation — Findings

> Append-only лог пропусков / находок вне scope Wave 4.1.

---

## F1. `SgSpin` container/blur mode (with-children) → Wave 4.2

React `<Spin>` поддерживает overlay-over-children:

```tsx
<Spin spinning={isLoading}><Table/></Spin>
```

DOM при `spinning=true`:
```html
<div class="sg-spin-container">
  <div class="sg-spin-overlay"><span class="sg-spin"/></div>
  <div class="sg-spin-blur">{children}</div>
</div>
```

В Angular это требует выбор между:
- двумя отдельными компонентами (`<sg-spin>` standalone vs
  `<sg-spin-overlay>` wrapper);
- одним компонентом с `*ngTemplateOutlet` или `<ng-template
  [sgSpinContent]>` директивой;
- `display:contents` host hack, который ломает true DOM-парность.

**Wave 4.1 ship'ает только standalone + fullscreen режимы** (см.
`decisions/T-Angular-Foundation.md` D2). Container mode будет
проектироваться в Wave 4.2 вместе с `SgTooltip` / `SgPopconfirm`, где
такая же проблема «projected content + ARIA wrapper».

## F2. `SgSpin` `delay` input игнорируется

React-Spin показывает спиннер через `setTimeout(delay)`. В Wave 4.1
оставляем input в Public API (для совместимости с типами), но не
запускаем таймер. Реализация — Wave 4.2 через `effect()` +
`destroyRef.onDestroy`.

## F3. Реальные размеры бандлов

После первого `pnpm --filter @skygraph/angular build` /
`pnpm --filter demo-angular build` нужно записать реальные значения
brotli-размеров в `.size-limit.json`. На момент написания этого файла
билды ещё не прогнаны; финальные числа добавит шаг 5 этой задачи
(см. `done/T-Angular-Foundation.md` после завершения).

## F4. AppShell в demo-angular — минимальный inline

Карта говорит «Layout копируется визуально из
`examples/_shared-react/src/layout/AppShell.tsx`». В Wave 4.1 делаем
минимальный header (brand link) + sidebar (1 раздел с одной ссылкой —
Button) + main с `<router-outlet>`. Полный AppShell с темой,
переключателем фреймворков, языком, Footer и т.д. — Wave 4.3.

## F5. `<DemoBox>` / `<ComponentDoc>` / `<PropsTable>` — Wave 4.3

В React-демо есть переиспользуемые `<DemoBox>`/`<PropsTable>`/`<ComponentDoc>`
обёртки. В Wave 4.1 страница Button использует минимальный inline
`<section><h3>title</h3><div class="row">…</div></section>`. Демо-обёртки
портируем в Wave 4.3 при создании `examples/_shared-angular/`.

## F7. `SgConfigProvider` subtree-scoped DI-override — Wave 4.2

В Angular `<ng-content>`-projected children используют injector того
компонента, **в template которого они написаны**, а не injector проекционного
хоста. То есть `providers` на `SgConfigProviderComponent` не доходят до
button'а внутри `<sg-config-provider><button sg-button>`.

Идиоматичные пути в Angular: структурная директива `*sgConfigProvider` или
компонент с `<ng-template>` + `ngTemplateOutlet` + custom Injector
(см. `decisions/T-Angular-Foundation.md` D4).

В Wave 4.1 `provideSgConfig()` (app/route-level) полностью работает, что
покрывает основной use case React-демо (один root `<ConfigProvider>`).
Nested `<ConfigProvider>` (редкий кейс, в React-демо встречается только в
`ConfigProviderDemo`) — Wave 4.2.

## F6. Парность-тест: inline expected shape вместо React-render

В Vue parity-тест `packages/vue/src/__tests__/styling-contract.parity.test.ts`
сравнивает не сырой outerHTML React'а, а **inline-выписанный из исходника
React DOM-shape**. Подход документирован прямо в файле теста как
осознанное решение: тянуть React+react-dom в devDeps Vue ради одного
теста — переинженеринг. Берём тот же приём для `@skygraph/angular`.

Wave 4.1 покрывает минимум: дефолтный `SgButton`, `SgButton(primary, large,
danger, loading)`, `SgSpin` standalone, `SgConfigProvider` (size override).
Полное покрытие в духе Vue parity (`InputPassword`/`SearchInput`/...) —
Wave 4.2 при портах компонентов.
