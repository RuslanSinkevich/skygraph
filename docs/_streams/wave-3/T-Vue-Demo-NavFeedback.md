# T-Vue-Demo-NavFeedback — Волна 3.2 / Tab C: navigation + feedback компоненты

> Прочитал `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`,
> `docs/_streams/done/T-Vue-Demo-Foundation.md`,
> `docs/_streams/findings/T-Vue-Demo-Foundation.md`,
> `docs/_streams/decisions/T-Vue-Demo-Foundation.md`,
> `docs/_streams/audit/T-Vue-Demo-Parity.md`? Если нет — прочитай сначала.
> Этот таб **строго после** T-Vue-Demo-Foundation.

## ID и волна
- **ID:** T-Vue-Demo-NavFeedback
- **Волна:** 3.2
- **Режим:** один таб, параллельно с 3.2/Tab A/B/D/E.

## ⚠️ Правила автономности стрима — читать первым

**Этот стрим автономный. Никогда не останавливайся, не задавай вопросов
пользователю, не жди подтверждений.** Если поток рассуждений упирается в
неопределённость — решаешь сам по правилам ниже:

1. **Конфликт карты и кода → доверяй коду**, фиксируй запись в
   `docs/_streams/decisions/T-Vue-Demo-NavFeedback.md`.
2. **Нет API в `@skygraph/vue`** для буквального переноса React-примера →
   **пропусти пример**, finding в `docs/_streams/findings/T-Vue-Demo-NavFeedback.md`,
   **в `packages/vue/**` не лезь**.
3. **Попытка не работает 3 раза** → finding `decision-protocol-N`, идёшь дальше.
4. **Параллельно работают табы A/B/D/E.** Их зоны не пересекаются с твоими.
   В `router/index.ts` правишь только свои 12 строк.
5. **Никаких вопросов пользователю.** Если что-то надо «уточнить» —
   принимай решение, документируешь и идёшь дальше.

В конце — отчёт `docs/_streams/done/T-Vue-Demo-NavFeedback.md` обязательно содержит:
- acceptance criteria checklist (✓/✗ по каждому пункту),
- таблицу «N примеров перенесено / N в React» по всем 12 компонентам,
- список созданных/удалённых файлов,
- ссылки на все decisions и findings,
- секцию **«Решения вне плана»** — что сделал не по карте и почему.

**Запрещено:** спрашивать пользователя, останавливаться без отчёта,
блокировать другие табы, делать `git commit`/`git push`/`git stash`/`git rebase`,
запускать `pnpm install`, трогать чужие зоны.

## Контекст
Тот же что в `T-Vue-Demo-Forms.md` §«Контекст». Этот таб занимается
navigation и feedback компонентами. Обе категории объединены в один
таб потому что вместе дают ≈12 компонентов — поместятся в один бюджет.

## Зона ответственности — компоненты (12)

### Navigation (7)

| comp-kebab | comp-pascal | React-агрегатор | React-DemoBox / CSS-vars |
|---|---|---|---:|
| `tabs` | `Tabs` | `examples/demo/src/demos/TabsDemo.tsx` | 7 / 1 |
| `menu` | `Menu` | `MenuDemo.tsx` | **10 / 1 — самый тяжёлый** |
| `breadcrumb` | `Breadcrumb` | `BreadcrumbDemo.tsx` | 7 / 1 |
| `dropdown` | `Dropdown` | `DropdownDemo.tsx` | 8 / 1 |
| `pagination` | `Pagination` | `PaginationDemo.tsx` | 8 / 1 |
| `steps` | `Steps` | `StepsDemo.tsx` | 9 / 1 |
| `segmented` | `Segmented` | `SegmentedDemo.tsx` | 8 / 1 |

### Feedback (5)

| comp-kebab | comp-pascal | React-агрегатор | React-DemoBox / CSS-vars |
|---|---|---|---:|
| `modal` | `Modal` | `ModalDemo.tsx` | 7 / 1 |
| `drawer` | `Drawer` | `DrawerDemo.tsx` | 7 / 1 |
| `popconfirm` | `Popconfirm` | `PopconfirmDemo.tsx` | 7 / 1 |
| `notification` | `Notification` | `NotificationDemo.tsx` | 9 / 1 |
| `configprovider` | `ConfigProvider` | `ConfigProviderDemo.tsx` | **7 / 0 — без CssVarsTable** |

Точные числа — в `docs/_streams/audit/T-Vue-Demo-Parity.md` §1.

**Особый случай — `ConfigProvider`:** в React-демо **нет** `CssVarsTable`
(это не визуальный компонент, а провайдер контекста). Поэтому в Vue
**не зарождаем** `CssVarsTable` для ConfigProvider — паритет «снизу
вверх». Генератор вызывать **без** `--with-css-vars`:

```bash
node scripts/gen-vue-demo.mjs configprovider --examples=7
```

`ConfigProvider` логически general, но в Vue-сайдбаре уже стоит в
`general` секции — оставляем там, демо переносим в этот таб для
параллельной нагрузки.

Если для какого-то нет React-агрегатора — finding, пропуск.

## Зона файлов

Идентична `T-Vue-Demo-Forms.md` §«Зона файлов», но для своих
**12 компонентов** из таблиц выше. Свои строки в `router/index.ts`,
свои страницы для удаления, свои папки в `demos/<comp>/`.

### НЕЛЬЗЯ трогать
То же что в Forms: `packages/**`, `examples/demo/**`,
`examples/showcases/**`, `examples/_shared*/**`,
`examples/demo-vue/src/demos/components/**`,
`examples/demo-vue/src/demos/button*`,
страницы и роуты **чужих** компонентов (forms/display/complex/style-fixes),
`Landing.vue`, `.size-limit.json`, `examples/demo-vue/package.json`,
`pnpm install`.

## Чек-лист

Идентичен `T-Vue-Demo-Forms.md` §«Чек-лист», шаги 0-8 (включая Шаг 0a
«Универсальные правила миграции»). Применять для каждого из 12
компонентов из таблиц выше.

Команда генератора (общая):

```bash
node scripts/gen-vue-demo.mjs <comp-kebab> --examples=<N> --with-css-vars
```

`<N>` — из колонки «React-DemoBox». Для **`configprovider`** —
**без** `--with-css-vars` (см. таблицу выше).

### Особое внимание
- **Modal/Drawer/Popconfirm/Notification** — портал/teleport. В Vue
  используется `<Teleport to="body">`, в React — `createPortal`. DOM
  структура должна остаться той же (`sg-modal-mask`, `sg-modal-wrap`
  и т.д.). Если в `@skygraph/vue` компонент рендерит через `<Teleport>`,
  значит DOM окажется не в `.dv-demo-preview`, а в `<body>`. Это
  нормально и совпадает с React-поведением. **Не править поведение
  компонента в пакете.**
- **ConfigProvider** — в демо обычно показывают вложенные провайдеры.
  Vue идиома: `<SgConfigProvider :size="'large'">...</SgConfigProvider>`.
  Воспроизвести структуру React-демо.
- **Notification** — открывается императивно через `notification.success(...)`.
  В Vue экспортирован как `notification` объект. Сигнатуры совпадают.

## Acceptance criteria

- Для всех 12 компонентов:
  - `demos/<comp>/*.demo.vue` (≥ N-1 от React),
  - `demos/<comp>-doc/{en,ru,useStrings}.ts`,
  - `demos/<Comp>Demo.vue`,
  - роутер указывает на `demos/<Comp>Demo.vue`,
  - старый `pages/<Comp>Page.vue` удалён.
- `pnpm --filter demo-vue typecheck && pnpm --filter demo-vue build && pnpm size` — зелёные.
- `findings/T-Vue-Demo-NavFeedback.md` — skip-ы с причинами или «no skips».
- Отчёт `done/T-Vue-Demo-NavFeedback.md` — таблица «N примеров перенесено / N в React».
- На live demo-vue: открыть Modal/Drawer/Popconfirm/Notification из
  соответствующих демо вручную — портал работает, бэкдроп тоже.

## Стоп-лист
То же что в Forms (см. `T-Vue-Demo-Forms.md` §«Стоп-лист»).

## Зависимости
- **СТРОГО ПОСЛЕ** T-Vue-Demo-Foundation (3.1).
- **Параллельно** с T-Vue-Demo-Forms, T-Vue-Demo-Display,
  T-Vue-Demo-Complex, T-Vue-Demo-StyleFixes.

## Конфликты с другими табами 3.2
То же что в Forms (§«Конфликты»).

## Финал
Отчёт: `docs/_streams/done/T-Vue-Demo-NavFeedback.md`.
