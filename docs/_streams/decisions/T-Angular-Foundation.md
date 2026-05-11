# T-Angular-Foundation — Decisions

> Append-only лог решений, принятых стримом за пределами task-карты.

---

## D1. `SgSpin` selector → attribute selector

**Карта:** «posмотреть React-исходник и решить через decisions, как ближе к
DOM-эталону».

**React-эталон** `packages/react/src/components/ui/Spin.tsx` рендерит
**`<span class="sg-spin-standalone">`** как root для standalone-режима
(без `children`). У Angular `tag selector` всегда оставляет хост-тег в DOM,
что даёт `<sg-spin><span class="sg-spin-standalone">…</span></sg-spin>` —
разрыв DOM-парности.

**Решение:** селектор `span[sg-spin], div[sg-spin]`. Хост-элемент = тот
самый `<span>`/`<div>` пользователя; класс `sg-spin-standalone` /
`sg-spin-container` / `sg-spin-fullscreen` применяется на host через
`host: { '[class.sg-spin-standalone]': '…' }`.

**Цена:** в template Button вместо `<sg-spin size="small">` из карты пишем
**`<span sg-spin size="small">`**. Это идиоматично Angular и единственный
способ удержать DOM 1:1.

---

## D2. `SgSpin` поддерживает только `standalone` и `fullscreen` режимы в Wave 4.1

**Карта:** «Минимальный аналог Spin.tsx».

В React-Spin шесть веток DOM:
1. standalone без `tip`
2. standalone с `tip`
3. fullscreen
4. контейнер с `children` + overlay + blur
5. `!visible && children` → возвращает `<>{children}</>`
6. `!visible && !children` → возвращает `null`

Wave 4.1 нужен Spin как зависимость Button (только standalone) и как
самостоятельный компонент демо. **Контейнер с overlay (4) и
`<>{children}</>` (5) — `finding` под Wave 4.2** (см.
`findings/T-Angular-Foundation.md`), потому что в Angular эта семантика
требует или `*ngTemplateOutlet`, или wrapper-компонента и должна делаться
вместе с портом `SkSkeleton` / `SgTooltip` подвола 4.2.

В Wave 4.1 поддерживаем:
- `<span sg-spin>` — standalone (с `tip` или без),
- `<div sg-spin fullscreen>` — fullscreen,
- `<span sg-spin [spinning]="false">` — невидимый (рендерит ничего внутри).

Без `delay` (input принимаем, но игнорируем; finding на Wave 4.2 поведение
delay через `effect()` + `setTimeout`).

---

## D3. `SgButton` — `host[class]` через `computed` signal, паблик `@Input` обычные

**Карта** прямо разрешает: «Public API компонентов — классические `@Input`/
`@Output` (для совместимости с template-driven)».

В компоненте обычные `@Input` поля, но host-binding `[class]` собирается
через `computed(() => …)` который читает `injectSgConfig()` (один раз
снимок при создании) + `@Input`-поля через ChangeDetection. Подписка
шипит при `OnPush` за счёт того что `signal`/`computed` инвалидирует
view автоматически.

`@Input` set'тер при изменении value не триггерит computed напрямую, но
вызывает change-detection, который пересчитает `classes()` (это
deterministic computed). Достаточно для парность-теста и реального
использования.

---

## D4. `SgConfigProvider` — два публичных API

В Angular DI hierarchy для projected content (`<ng-content>`) привязана к
**injector того компонента, в чьём template объявлен content**, а не к
проекционному хосту. То есть `<sg-config-provider><button sg-button>` не
переопределяет `SG_CONFIG_TOKEN` для button через `providers` на хосте —
button инжектится из injector родительского компонента (где написан HTML).

Идиоматичные пути для subtree-scope DI в Angular:
- структурная директива `*sgConfigProvider` с `Injector.create()` +
  `ViewContainerRef.createEmbeddedView(tpl, {injector})`,
- компонент с `<ng-template>` API + `ngTemplateOutlet` + custom Injector.

**Wave 4.1 решение:**
1. Экспортируем `provideSgConfig()` для app/route-level config (это работает
   нативно через Angular DI environment-injectors).
2. Экспортируем `SgConfigProviderComponent` как **семантический wrapper**
   через `<ng-content>`. Атрибут `@Input() config` сохраняется. Subtree-scope
   DI-override **не работает** для projected children в этом варианте — это
   `finding F7` под Wave 4.2 (структурная директива `*sgConfigProvider`).
3. Парность-тест с React покрывает `provideSgConfig()` (app-level) — это
   эквивалентно root `<ConfigProvider>` в React-демо. Тестового кейса на
   nested `<ConfigProvider>` (в React'е работает через context-stack) в
   Wave 4.1 нет — `finding F7`.

Это компромисс ради того чтобы Wave 4.1 закрылся стабильно. Полный
эквивалент React'овского `<ConfigProvider>` — Wave 4.2, и поведение
описано в `findings/T-Angular-Foundation.md` F7.

---

## D5. Demo `index.html` `<base href>` — без `<base href="/">`

`@angular/build:application` builder по умолчанию ожидает `<base href="/">`,
если используется PathLocationStrategy. Мы используем `withHashLocation()`
из `provideRouter`, так что `<base>` не нужен. Существующий `index.html`
без `<base>` остаётся без правок.
