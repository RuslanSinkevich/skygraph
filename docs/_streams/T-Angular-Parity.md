# Stream T-Angular-Parity — Visual & API parity demo-angular ↔ demo (React)

> Один стрим, отдельная вкладка. Vue из этого стрима исключён —
> идёт параллельно по `T-Vue-Parity.md`. Angular-стрим длиннее: сначала
> нужно поднять Angular-демо до базового качества (DemoBox, локализация,
> API-таблицы), и только потом догонять состав demo-блоков. Adapter
> `packages/angular` правится только хирургически.

---

## 0. Контекст и установки от владельца

- Три demo-приложения хостятся как **отдельные поддомены**
  (`react.*`, `vue.*`, `angular.*`). Каждое полное и автономное.
- **Сначала привести Angular-демо к качеству React-демо** (структура
  страниц, кнопка «Show code», локализация ru/en), а потом портировать
  недостающие компоненты.
- Benchmarks — отдельная история, в этом стриме не обязательна (см.
  §3.6).
- Adapter `@skygraph/angular` правится **только** там, где без правки
  невозможно реализовать конкретный demo (например, добавить
  отсутствующий проп в компонент). Изменения публичного API — в
  `decisions/T-Angular-Parity.md`.

---

## 1. Текущее состояние (по фактам)

### 1.1. Структура страниц

В Angular есть инфраструктура, эквивалентная React/Vue:

- `src/app/shared/demo/` — `component-doc.component.ts`,
  `demo-box.component.ts`, `props-table.component.ts`,
  `css-vars-table.component.ts`. Все классы готовы.
- `src/app/i18n/` — словарь на 220 ключей (en/ru), сервис `I18nService`,
  типы. Готово.
- Гайд-страницы: `pages/guide/{getting-started, theming, design-tokens,
  core-api, styling-showcase, config-provider}.component.ts` — есть.

### 1.2. Проблема №1 — `<sg-demo-box>` использован только на 2 страницах

| Компонент | `<sg-demo-box>` блоков |
|---|---|
| button | **7** |
| tag | **4** |
| **остальные 49 страниц** | **0** |

То есть Button и Tag — единственные «правильные» страницы. Остальные
49 написаны старо: `<h1>...</h1>`, `<section class="demo-section">`,
**без** ComponentDoc / DemoBox / Show Code / PropsTable / CssVarsTable.

Пример (`input-page.component.ts`):

```html
<h1>Input</h1>
<p class="lead">Single-line text input...</p>
<section class="demo-section">
  <h3>Sizes</h3>
  <div class="col">
    <span sg-input size="small" placeholder="Small"></span>
    ...
  </div>
</section>
```

То же в `select`, `checkbox`, `tabs`, `tree`, `table-ничего-нет` и
ещё ~45 страницах.

### 1.3. Проблема №2 — нет локализации тел страниц

`I18nService` есть, словарь chrome (headers, sidebar, demoBox) полный.
Но **тексты внутри страниц-компонентов хардкожены по-английски**:
`<h1>Input</h1>`, `<h3>Sizes</h3>`, `placeholder="Small"`, описания
демо. У React/Vue это лежит в `<comp>-doc/{en,ru}.ts` (паттерн
`useDemoStrings`) — в Angular такого нет вообще.

### 1.4. Проблема №3 — нет PropsTable / CssVarsTable на 49 страницах

Они импортированы только в `button-page` и `tag-page`. Остальное —
без API-таблиц.

### 1.5. Состав компонентов — diff с React

Каталог компонентов в Angular уже большой (51 страница), но список
отличается.

**В React есть, в Angular НЕТ** (P0 — крупные компоненты):
- `charts`
- `config-provider` (есть как guide, нет как demo)
- `dashboard`
- `diagram`
- `form`
- `gantt`
- `print` (это утилита, у React отдельной страницы вроде нет — уточнить)
- `resource-calendar`
- `schema-form-editor`
- `spin`
- `table`

**В Angular есть, в React НЕТ** (Angular-эксклюзивы, ~Input-семейство):
- `inlineedit`, `inputgroup`, `inputpassword`, `mentions`, `pininput`,
  `searchinput`, `taginput`, `textarea`

  Решение принимать по факту: либо скрыть их из nav (страницы оставить),
  либо добавить аналоги в React (out of scope), либо оставить как
  Angular-эксклюзив и пометить бейджем "angular only" в sidebar. По
  умолчанию — **оставить**, **не показывать в основном nav** через
  отдельную секцию или фильтр; в `decisions/T-Angular-Parity.md`
  зафиксировать решение.

### 1.6. Сводка по приоритетам

| Приоритет | Что делать |
|---|---|
| P0 | Перевести все 49 «старых» страниц на ComponentDoc + DemoBox + Show Code + PropsTable + CssVarsTable. |
| P0 | Локализовать тела страниц через `<comp>-doc/{en,ru}.ts` + хук `useDemoStrings`-аналог (см. §3.2). |
| P1 | Добавить 11 отсутствующих компонентов из React (charts, diagram, form, table, …) — порядок по сложности. |
| P2 | Решить судьбу Angular-эксклюзивов (inlineedit, mentions и др.). |
| P2 | Гайд-страницы — пройти, проверить локализацию и DOM-структуру. |
| P3 | DemoTOC в Angular (хвост стрима, если останется контекст). |

---

## 2. Зона стрима

**Можно**:
- `examples/demo-angular/**` — полностью.
- `examples/_shared/**` — только новые локали/константы, никаких
  правок существующих.
- `packages/angular/**` — точечно, **только** если без правки adapter
  не получается реализовать конкретный demo (отсутствует проп, эмит,
  слот). Тесты обязательны (`packages/angular/__tests__/`).

**Нельзя**:
- `examples/demo/**`, `examples/demo-vue/**` (это паритет в обратную
  сторону, отдельные стримы T-React-Parity / T-Vue-Parity).
- `examples/showcases/**`.
- `packages/{react,vue,core,styles}/**` — кроме хирургических правок
  с разрешения task-карты.

---

## 3. Поэтапный план

Каждый этап заканчивается зелёным `pnpm --filter demo-angular build` +
`pnpm --filter @skygraph/angular typecheck`.

### 3.1. Унификация структуры страницы — pilot на 3 компонентах (P0)

Цель — отработать паттерн на трёх простых компонентах (Switch,
Checkbox, Radio), чтобы потом тиражировать.

Каждая страница превращается в:

```ts
@Component({
  selector: 'sg-<comp>-page',
  standalone: true,
  imports: [SgXxxComponent, ComponentDocComponent, DemoBoxComponent,
            PropsTableComponent, CssVarsTableComponent],
  template: `
    <sg-component-doc
      [title]="d().pageTitle"
      [description]="d().pageLead"
      [crumbs]="[d().crumbDataEntry, d().crumbXxx]"
      [whenToUse]="[d().pageWhen1, d().pageWhen2]"
    >
      <sg-demo-box [title]="d().demoBasicTitle"
                   [description]="d().demoBasicDesc"
                   [code]="basicSource">
        ...
      </sg-demo-box>
      ...
      <sg-props-table [data]="xxxProps" [title]="d().tableXxxApi"></sg-props-table>
      <sg-css-vars-table [data]="xxxCssVars" [hint]="d().cssHint"
                         [title]="d().tableCssVars"></sg-css-vars-table>
    </sg-component-doc>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XxxPageComponent {
  protected readonly d = inject(XxxDocStrings).strings
  // sources as `readonly xxxSource = SRC_XXX`
  protected readonly xxxProps = XXX_PROPS_FN(this.d)
  protected readonly xxxCssVars = XXX_CSS_VARS_FN(this.d)
}
```

`SRC_XXX` — строковые литералы исходников (как сейчас в
`button-page`).

**Acceptance pilot**:
- 3 страницы (`switch`, `checkbox`, `radio`) полностью переписаны.
- Кнопка «Show code» / «Copy» работает на каждом demo-блоке.
- DOM-структура идентична React (`.demo-box`, `.demo-box-meta`,
  `.demo-box-actions` и т.д.).
- `pnpm --filter demo-angular build` зелёный.
- Визуально — рядом с React страницей выглядит 1-в-1.

### 3.2. Локализация demo-страниц через `<comp>-doc` (P0)

Создать паттерн, аналогичный React/Vue:

1. На каждый компонент — папка `src/app/pages/components/<comp>/<comp>-doc/`:
   - `en.ts` — `export const en = { pageTitle, pageLead, crumbXxx,
     demoBasicTitle, demoBasicDesc, ... propXxx, cssXxxYyy } as const`
   - `ru.ts` — тот же набор ключей по-русски.
   - `<comp>-doc.service.ts` — `@Injectable({ providedIn: 'any' })`
     класс, который через `I18nService` отдаёт нужный словарь
     реактивным `Signal`-ом.

2. Хук-эквивалент — Injectable service (`XxxDocStrings`). Внутри:
   ```ts
   @Injectable({ providedIn: 'root' })
   export class XxxDocStrings {
     private i18n = inject(I18nService)
     readonly strings = computed(() =>
       this.i18n.locale() === 'ru' ? ru : en,
     )
   }
   ```
   В шаблоне страницы — `[title]="d().pageTitle"`.

3. Для **сорсов demo** (строковых литералов с кодом) — локализация **не
   нужна**, это копипастный код. То же что в React.

**Acceptance**:
- Переключатель ru/en меняет тексты в `<h1>`, `<p>`, заголовки
  demo-блоков и API-таблицы.
- Никаких хардкоженых английских строк в шаблоне страницы (кроме
  кода в `[code]=`).

### 3.3. Тиражирование на оставшиеся ~46 страниц (P0)

После pilot — поточный режим, по 4-6 страниц за подход:

Группы (в порядке усложнения):
1. **Input-семья**: `input`, `inputnumber`, `textarea`, `inputgroup`,
   `inputpassword`, `pininput`, `searchinput`, `inlineedit`,
   `taginput`, `mentions`.
2. **Selection**: `select`, `autocomplete`, `cascader`, `treeselect`,
   `transfer`.
3. **Toggle**: `slider`, `rate`, `colorpicker`, `upload`.
4. **Date/Time**: `datepicker`, `timepicker`, `calendar`.
5. **Display**: `badge`, `tag`, `avatar`, `tooltip`, `descriptions`,
   `collapse`, `carousel`, `list`, `tree`.
6. **Feedback**: `modal`, `drawer`, `notification`, `popconfirm`,
   `progress`, `result`, `skeleton`, `empty`.
7. **Navigation**: `tabs`, `menu`, `breadcrumb`, `dropdown`,
   `pagination`, `steps`, `segmented`.

Источники того, **какие именно** demo-блоки портировать — соседние
`examples/demo/src/demos/<comp>/*.demo.tsx`. Имена блоков совпадают
с React. Если компонент Angular не поддерживает конкретный пропс,
который нужен в demo-блоке — два варианта:
1. Реализовать пропс в `packages/angular` (с тестом) — записать в
   `decisions/T-Angular-Parity.md`.
2. Пропустить demo-блок, описать причину в
   `findings/T-Angular-Parity.md`.

### 3.4. Решение по Angular-эксклюзивам (P2)

Восемь страниц без React-аналога: `inlineedit`, `inputgroup`,
`inputpassword`, `mentions`, `pininput`, `searchinput`, `taginput`,
`textarea`.

Шаги:
1. Зафиксировать как Angular-эксклюзив в `decisions/T-Angular-Parity.md`.
2. В sidebar выделить отдельную подсекцию «Angular extras» (или
   убрать совсем, если решение — спрятать).
3. По умолчанию (если нет других указаний): **оставить страницы**, но
   собрать их в отдельную секцию sidebar.

### 3.5. Портирование отсутствующих компонентов (P1)

Список (11 компонентов в порядке возрастания сложности):

1. `spin` — простой, нет props сложных.
2. `print` — утилита, страница-витрина.
3. `config-provider` — demo (есть как guide).
4. `gantt` (если adapter позволяет; иначе пропустить → finding).
5. `resource-calendar`.
6. `dashboard`.
7. `charts`.
8. `diagram`.
9. `schema-form-editor`.
10. `form`.
11. `table`.

Каждый компонент проверяется:
- Есть ли реализация в `packages/angular/src/components/`. Если **нет**
  — пишется в `findings/T-Angular-Parity.md` как **блокер**: «компонент
  X не реализован в @skygraph/angular, demo-страница пропущена,
  отдельный стрим T-Angular-<X>-Component». Не пытаемся
  реализовывать компонент здесь.

### 3.6. Benchmarks/Showcases в demo-angular (P2)

В demo-vue это идёт через T-Vue-Parity §3.4 с поддоменной моделью.
В demo-angular — **по аналогии**, но **только если основной scope
сделан**. Если не успеваем — отдельный стрим, записать в
`done/T-Angular-Parity.md`.

### 3.7. DemoTOC (P3, хвостовая часть)

Если останется контекст после §3.1–3.5:

1. Создать `src/app/shared/demo-toc/`:
   - `demo-toc-context.service.ts` (`@Injectable`, `signal`-state).
   - `demo-toc.component.ts` — sticky-панель.
   - `demo-toc.directive.ts` — атрибутная директива
     `[appDemoTocAnchor]="title"`, регистрирует свой элемент в
     контексте при init / удаляет при destroy.
   - `slugify.ts` — копия из React.
   - `intersection.ts` — `IntersectionObserver` в effect-е, runs
     outside Angular zone (зона уже отсутствует / zoneless? — проверить
     по `app.config.ts`).

2. Расширить `DemoBoxComponent`: внутри `effect()` регистрирует свой
   `nativeElement` в TOC-сервисе (если provider есть).

3. `ComponentDocComponent` оборачивается провайдером сервиса (через
   `providers: [DemoTocService]` на компоненте) и добавляет
   `<sg-demo-toc>` в правую колонку.

4. CSS — копия `demo-toc.css` из React + правка из T-Vue-Parity §6.2:
   **sticky на aside, не на nav** (см. ниже). Лежит в
   `examples/demo-angular/src/styles.css` или в отдельном файле
   рядом с компонентом TOC.

5. В конце TOC — раздел «API» со ссылками на PropsTable / CssVarsTable
   (см. T-Vue-Parity §6.3).

---

## 4. Локализация: правила для нового кода

- Каждая страница имеет свой `<comp>-doc/{en,ru}.ts` с **одинаковым
  набором ключей**. `as const` на `en` обязательно — это draft-источник
  типов.
- Не дублировать глобальные ключи (header, sidebar, demoBox) — они в
  `src/app/i18n/dict-{en,ru}.ts`.
- Unicode-символы (`✓ ✕ ⌃ ⌄ ⎘`) — **не** локализуем.
- Заголовки PropsTable / CssVarsTable («API», «CSS Variables») — берём
  из глобального словаря, не дублируем.

---

## 5. Adapter `@skygraph/angular` — когда трогать

Хирургические правки разрешены, если без них demo-блок невозможен
(например, нужен `[loading]` на Switch, а его в adapter нет). Правила:

1. Тип/проп/эмит добавляется минимально — без рефакторинга смежных
   API.
2. Юнит-тест обязателен: `packages/angular/__tests__/<comp>/<feature>.spec.ts`.
3. Запись в `decisions/T-Angular-Parity.md`: «Component X — added
   `[loading]` input to match React; reason: <demo>».
4. Если правка крупная (новый компонент, новый pipeline) — **не делать**,
   `findings/T-Angular-Parity.md` + блок страницы.

---

## 6. Команды

```bash
# Точечные:
pnpm --filter @skygraph/angular typecheck
pnpm --filter @skygraph/angular test
pnpm --filter @skygraph/angular build
pnpm --filter demo-angular build
pnpm --filter demo-angular dev

# Глобальные — НЕЛЬЗЯ (CHARTER §2.2)
```

Никаких `pnpm install` / `pnpm clean` / global typecheck.

---

## 7. Acceptance (общий)

1. `pnpm --filter @skygraph/angular typecheck && test && build` —
   зелёные.
2. `pnpm --filter demo-angular build` — зелёный.
3. **Каждая** страница компонента в demo-angular:
   - использует `<sg-component-doc>` + `<sg-demo-box>` + `<sg-props-table>`
     + `<sg-css-vars-table>`;
   - имеет кнопку «Show code» / «Copy» на каждом demo-блоке;
   - локализована ru/en (переключатель меняет всё, кроме кода в
     `[code]=`).
4. Список компонентов в sidebar demo-angular совпадает с demo (React) для
   общих компонентов; Angular-эксклюзивы выделены в отдельную секцию
   sidebar (либо скрыты — по решению §3.4).
5. DOM-классы `sg-*` и `demo-box-*` идентичны React/Vue.
6. (Если §3.7 выполнено) DemoTOC справа, sticky к верху, не уезжает;
   в конце — ссылки на API.

---

## 8. Финал

Отчёт в `docs/_streams/done/T-Angular-Parity.md`:
- сколько страниц перевели на новую структуру / сколько осталось;
- какие компоненты добавлены, какие отложены и почему (со ссылками на
  findings/blocked);
- diff-таблица «React demo count ↔ Angular demo count» по всем
  компонентам — где паритет достигнут;
- известные ограничения (например, `<sg-table>` не существует в
  adapter — отложено в отдельный стрим).
