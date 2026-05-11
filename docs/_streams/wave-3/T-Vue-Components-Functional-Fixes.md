# T-Vue-Components-Functional-Fixes — Волна 3.5: ремонт сломанных Vue-компонентов и удаление хардкода

> Читать первым: `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`,
> `docs/_streams/done/T-Vue-Components-DOM-Parity.md`,
> `docs/_streams/findings/T-Vue-Components-DOM-Parity.md`.
>
> 3.3b (DOM Parity) прошёлся по 88 SFC и привёл DOM/className к React,
> но **функциональные** баги (попапы не открываются, разметка
> сломана, использование нативных тегов вместо `Sg*`) остались.
> Этот стрим — точечный bugfix.

## ID и волна

- **ID:** T-Vue-Components-Functional-Fixes
- **Волна:** 3.5 (один независимый стрим)
- **Режим:** один таб, **параллельно** с T-Vue-Demo-Header-Parity (3.4) и T-Angular-Wave42-Components (4.2). Зоны не пересекаются.

## Список багов от пользователя

### P0 — попапы не открываются

1. **ColorPicker** — клик по триггеру не открывает палитру.
2. **DatePicker** — клик по триггеру не открывает календарь.
3. **TimePicker** — клик по триггеру не открывает выбор времени.

### P1 — разметка / стили сломаны

4. **Calendar** — разметка/стили полностью сломаны.
5. **Upload** — разметка/стили сломаны.
6. **Transfer** — разметка/стили сломаны.
7. **Steps** — разметка/стили сломаны.
8. **Segmented** — разметка/стили сломаны.

### P2 — сложные, отличаются от React

9. **Table** — отличается от React в демо части и визуально.
10. **ResourceCalendar** — отличается логика и визуал.

### Сквозной аудит — хардкод

В каждом из 10 компонентов **и** их демо-страницах удалить «свою»
разметку/иконки/попапы там, где должен использоваться готовый
`Sg*`-компонент. Минимум — проверить что:
- `Pagination` внутри `Table` это `<SgPagination>`, не самописный.
- `<input type="search">` в search-bar Table/Transfer — это `<SgInput>` с `prefix`/`type="search"`.
- Кнопки навигации в Calendar/ResourceCalendar/DatePicker header — `<SgButton type="text">`.
- Чекбоксы в Transfer-row — `<SgCheckbox>`.
- Icons — из `@skygraph/styles` классов / переданного slot, не inline `<svg>`-хардкод (исключение: иконки внутри самих `Sg*`-компонентов и SVG-grid в Diagram).
- Empty-state — `<SgEmpty>`, не свой div.
- Loading-state — inline `<span class="sg-spin sg-spin-small">` или `<SgSpin>`, не свой spinner.

## Эталоны (READ-ONLY)

- `packages/react/src/components/ui/{ColorPicker,DatePicker,TimePicker,Calendar,Upload,Transfer,Segmented,Steps}.tsx`.
- `packages/react/src/components/complex/Table/**` и `packages/react/src/components/complex/ResourceCalendar/**`.
- `examples/demo/src/demos/{colorpicker,datepicker,timepicker,calendar,upload,transfer,steps,segmented,table,resource-calendar}/**` (атомные `*.demo.tsx` и агрегаторы `<Comp>Demo.tsx`).
- `examples/demo/src/demos/<comp>-doc/{en,ru}.ts` — словари демо.

## Зона файлов

### Можно править

#### Подложечные компоненты (`packages/vue`)
- `packages/vue/src/components/ui/ColorPicker.vue`
- `packages/vue/src/components/ui/DatePicker.vue`
- `packages/vue/src/components/ui/TimePicker.vue`
- `packages/vue/src/components/ui/Calendar.vue`
- `packages/vue/src/components/ui/Upload.vue`
- `packages/vue/src/components/ui/Transfer.vue`
- `packages/vue/src/components/ui/Segmented.vue`
- `packages/vue/src/components/ui/Steps.vue`
- `packages/vue/src/components/complex/Table/**` (`Table.vue`, `types.ts`, `index.ts`, любые внутренние SFC).
- `packages/vue/src/components/complex/ResourceCalendar/**`
- `packages/vue/src/__tests__/components/{table,colorpicker,datepicker,timepicker,calendar,upload,transfer,segmented,steps,resource-calendar}.test.ts` — расширение/добавление кейсов под починенные сценарии.

**Не трогать** index.ts уровня пакета и locales — это вне scope.

#### Стили (`packages/styles`)
- `packages/styles/components/{color-picker,date-picker,time-picker,calendar,upload,transfer,segmented,steps,table,resource-calendar}.css` — **только Vue-релевантные правки**, общие селекторы используются и React-кодом, поэтому без необходимости не трогаем. Если правка нужна и для React — finding, не делаем.

#### Демо (`examples/demo-vue`)
- `examples/demo-vue/src/demos/{colorpicker,datepicker,timepicker,calendar,upload,transfer,segmented,steps,table,resource-calendar}/**/*.{vue,ts}` — атомные `*.demo.vue` + `_data.ts`.
- `examples/demo-vue/src/demos/{ColorPicker,DatePicker,TimePicker,Calendar,Upload,Transfer,Segmented,Steps,Table,ResourceCalendar}Demo.vue` — агрегаторы.
- `examples/demo-vue/src/demos/{colorpicker,datepicker,timepicker,calendar,upload,transfer,segmented,steps,table,resource-calendar}-doc/{en,ru,useStrings}.ts` — если в демо обнаруживаются хардкод-строки, пере́лить через словарь (как у других компонентов).

#### Документация
- `docs/_streams/{decisions,findings,done}/T-Vue-Components-Functional-Fixes.md`.

### Нельзя трогать

- `packages/{core,react,angular}/**` — целиком read-only (React — это эталон).
- `packages/vue/src/components/**` **кроме** перечисленных выше 10 компонентов. Никаких «соседних правок».
- `packages/vue/src/index.ts`, `packages/vue/src/locales/**` — вне scope; если упирается, finding.
- `examples/demo/**`, `examples/{_shared*,showcases,demo-angular}/**` — read-only.
- `examples/demo-vue/src/{App.vue, nav.ts, router/**, i18n/**, pages/**, guide/**, components/**}` — это зона T-Vue-Demo-Header-Parity (3.4).
- `examples/demo-vue/src/demos/components/**` — общие обёртки, не наша зона (3.3a).
- `examples/demo-vue/src/demos/<comp>/**` для **любых** компонентов **не из нашего списка** — не трогаем.
- `tsconfig.base.json`, root `package.json`, `pnpm-lock.yaml`, `.size-limit.json`.

## ⚠️ Правила автономности

Не останавливаться, не задавать вопросов. Решения вне карты —
`docs/_streams/decisions/T-Vue-Components-Functional-Fixes.md`. Пропуски,
ограничения, остатки P2 — `docs/_streams/findings/T-Vue-Components-Functional-Fixes.md`.
В конце — отчёт `docs/_streams/done/T-Vue-Components-Functional-Fixes.md`.

**Никаких:**
- `git commit` / `push`,
- `pnpm install` / `add` / `update`,
- глобальных `pnpm typecheck` / `build` / `test`. Только
  `--filter @skygraph/vue` и `--filter demo-vue`.
- правок в чужих зонах (см. §«Нельзя трогать»).
- расширения публичного API `@skygraph/vue` (новые опциональные props
  можно — это additive; удалять/переименовывать существующие нельзя).

## Принципы починки (применять к каждому компоненту)

### Для попапов (ColorPicker / DatePicker / TimePicker)

1. **Триггер** — кликабельный `<button>` или `<input>` с `@click`/`@focus`. Должен иметь `aria-haspopup`, `aria-expanded={isOpen}`, `aria-controls={popupId}`.
2. **Состояние** — `const isOpen = ref(false)` плюс reactive computed для синхронизации с пропсом `open` если он есть (controlled).
3. **Попап** — `<Teleport to="body">` (или встроенный) с `v-if="isOpen"`, абсолютным позиционированием через ref на trigger + `getBoundingClientRect()`. Если есть utility `usePopup` / `useFloating` в `@skygraph/vue` — использовать его, не плодить.
4. **Outside-click** — `useEventListener(document, 'mousedown', …)` с проверкой что target вне trigger и popup; на close сбрасывать `isOpen`.
5. **Escape** — `useEventListener(document, 'keydown', …)`, `key === 'Escape'` → close.
6. **Unmount** — все listeners снять в `onBeforeUnmount`. Тестировать что не выкидывает после смены маршрута.
7. **Сравнить с React** — алгоритм там тот же, повторить порядок и условия.

### Для разметки (Calendar / Upload / Transfer / Steps / Segmented)

1. Открыть React-аналог, сравнить иерархию DOM. Восстановить недостающие узлы / контейнеры.
2. Проверить `class`-наборы на корне и каждом sub-узле — должны совпадать с React (после Wave 3.3b большинство уже паритетны, могли быть упущения).
3. Проверить что в `packages/styles/components/<name>.css` все классы, используемые Vue-шаблоном, реально существуют.
4. **Хардкод**: внутри сложного компонента (например Calendar header) кнопки prev/next должны быть `<SgButton type="text" size="small">`, не `<button class="…">`. Иконки — slot или класс из `@skygraph/styles`.

### Для сложных (Table / ResourceCalendar)

1. Перечитать React-исходник целиком (`Table.tsx`, `ResourceCalendar.tsx`, плюс sub-компоненты `TableHeader.tsx`, `TableBody.tsx`, `VirtualTableBody.tsx`).
2. Сверить с Vue: какие фичи реализованы, какие нет, какие реализованы по-другому.
3. **Не пытаться полностью переписать** — починить **существующие** места, где визуал/поведение расходится. Если фича большая (например virtual scrolling в Table) и в Vue она есть, но плохо работает — finding для отдельного стрима, не дописываем.
4. Демо-страницы: сверить количество и порядок примеров с React-аналогом, восстановить недостающие.
5. Проверить хардкод (см. сквозной список выше).

## Чек-лист

### Шаг 0 (~30 мин). Воспроизвести
- Запустить `pnpm --filter demo-vue dev` и `pnpm --filter demo dev` (на разных портах).
- Прокликать каждую из 10 страниц `/components/<comp>` в обоих демо.
- Записать в `findings/T-Vue-Components-Functional-Fixes.md` секцию «Repro» — для каждого компонента: что именно не работает, console-error если есть, скриншот before (опц. в `docs/_streams/audit/screenshots/3.5/before/<comp>.png`).

### Шаг 1 (~60 мин). P0 попапы
- Починить ColorPicker → DatePicker → TimePicker (один за другим).
- После каждого: `pnpm --filter @skygraph/vue typecheck && pnpm --filter @skygraph/vue test --run -t <Comp>`.
- Прокликать страницу `/components/<comp>` — попап открывается, закрывается outside-click + Escape, состояние не теряется.

### Шаг 2 (~90 мин). P1 разметка / стили
- Calendar → Upload → Transfer → Steps → Segmented (по очереди).
- На каждый — прочитать React-аналог, починить DOM Vue, проверить `packages/styles/components/<name>.css` достаточно ли селекторов, сверить визуально с React.
- После каждого: typecheck + test (если тесты есть для этого компонента) + ручная проверка страницы.

### Шаг 3 (~120 мин). P2 Table + ResourceCalendar
- Table: сверить демо-страницы (`examples/demo-vue/src/demos/table/*.demo.vue`) с React-аналогом — порядок/количество/имена примеров. Если что-то расходится визуально — починить (без переписывания engine).
- ResourceCalendar: то же самое.
- Если упирается в большой рефакторинг → finding и пропуск. Сделать «насколько успели».

### Шаг 4 (~30 мин). Сквозной аудит хардкода
По всем 10 компонентам пройтись и найти места где:
- нативный `<input>` / `<button>` / `<select>` / `<a>` используется там, где есть готовый `Sg*`,
- inline `<svg>` для типовой иконки (стрелка, крестик, calendar, …),
- свой spinner вместо `<span class="sg-spin sg-spin-small">`,
- свой empty-state вместо `<SgEmpty>`,
- свой Pagination вместо `<SgPagination>`.

Каждое такое место — заменить на `Sg*`, **только если это не ломает API**. Если ломает (например, изменение типа `value` на `string|null`) — finding.

### Шаг 5. Финал
```text
pnpm --filter @skygraph/vue typecheck
pnpm --filter @skygraph/vue test --run
pnpm --filter @skygraph/vue build
pnpm --filter demo-vue typecheck
pnpm --filter demo-vue build
pnpm size
```
Все зелёные. Если `@skygraph/vue (esm)` упирается в 90 KB (из 3.3b
известно что 91.63 KB — уже превышение) — finding с реальным
замером, **лимит не повышаем**.

Скриншоты after в `docs/_streams/audit/screenshots/3.5/after/<comp>.png`.

Отчёт `done/T-Vue-Components-Functional-Fixes.md`:
- таблица 10 компонентов: `FIXED` / `PARTIAL (что осталось)` / `FINDING`,
- список заменённых хардкод-мест,
- ссылки на decisions/findings,
- секция «Не успели — для следующей волны».

## Acceptance criteria

- ColorPicker, DatePicker, TimePicker — попап открывается по клику на trigger, закрывается outside-click + Escape, нет console-warning'ов.
- Calendar, Upload, Transfer, Steps, Segmented — DOM/класcы/визуал совпадают с React-аналогом (скриншоты подтверждают).
- Table, ResourceCalendar — все демо-страницы рендерятся, визуал и количество примеров близко к React. Если что-то осталось — finding с конкретным списком.
- Хардкод (см. сквозной список) удалён везде где не ломает API. Каждое решение «оставили потому что …» — в decisions.
- `pnpm --filter @skygraph/vue {typecheck,test --run,build}` зелёные.
- `pnpm --filter demo-vue build` зелёный.
- `pnpm size` зелёный (или finding на превышение, без поднятия лимита).
- Никаких правок в `packages/{core,react,angular}/**`, `examples/demo/**`, `examples/_shared*/**`, `examples/showcases/**`, `examples/demo-angular/**`.
- Никаких правок в зонах 3.4 (`App.vue`, `nav.ts`, `router/**`, `pages/**`, `guide/**`, `components/FrameworkSwitcher.vue`, `i18n/**`).
- Отчёт сдан, decisions/findings заполнены.

## Зависимости

- **Параллельно** с T-Vue-Demo-Header-Parity (3.4) и T-Angular-Wave42-Components (4.2). Зоны попарно не пересекаются.
- **До** T-Vue-Demo-PostMigration-Audit (3.3) — иначе пост-аудит будет фиксировать те же баги, что чинит этот стрим.

---

## Текст запуска стрима (копипаст в новый таб Cursor)

```text
Ты — стрим T-Vue-Components-Functional-Fixes (Волна 3.5) в репозитории skygraph.

Задача: точечный bugfix 10 Vue-компонентов и удаление хардкода. Список:

P0 (попапы не открываются): ColorPicker, DatePicker, TimePicker.
P1 (разметка/стили сломаны): Calendar, Upload, Transfer, Steps, Segmented.
P2 (сложные, расходятся с React): Table, ResourceCalendar.

Дополнительно — сквозной аудит хардкода во всех 10 компонентах и
их демо-страницах: внутри сложного Sg-компонента не должно быть
нативного <input>/<button>/<select>/<a> там, где есть готовый
Sg-аналог; не должно быть своих <svg>-иконок там, где есть слот
или класс; не должно быть своего spinner/empty/pagination — только
SgSpin/SgEmpty/SgPagination или inline span sg-spin.

Принцип: НЕ ИЗОБРЕТАЙ — копируй DOM/className/aria-логику и порядок
действий из packages/react/src/components/{ui,complex}/<...>.tsx и
examples/demo/src/demos/<comp>/**.

Полная карта: docs/_streams/wave-3/T-Vue-Components-Functional-Fixes.md.

Все зависимости уже стоят. Никаких pnpm install / add / update.
Никаких git commit. Не лезь в packages/{core,react,angular}/**,
examples/{demo,_shared*,showcases,demo-angular}/**, в зону 3.4
(App.vue, nav.ts, router/, pages/, guide/, components/
FrameworkSwitcher.vue, i18n/) и зону 3.3a (demo-vue/src/demos/
components/**). Параллельно с 3.4 и 4.2.

Правила автономности: не останавливаться, не спрашивать. Решения
вне карты — docs/_streams/decisions/T-Vue-Components-Functional-Fixes.md,
пропуски — findings/. После каждого компонента: pnpm --filter
@skygraph/vue {typecheck,test --run -t <Comp>}. После всех — pnpm
--filter @skygraph/vue {test --run,build} && pnpm --filter demo-vue
build && pnpm size. В конце — отчёт docs/_streams/done/T-Vue-
Components-Functional-Fixes.md.

Старт: Шаг 0 (запустить pnpm --filter demo dev и pnpm --filter
demo-vue dev на разных портах, прокликать 10 страниц, записать
конкретный repro в findings/), потом Шаг 1 (P0 попапы).
```
