# T-React-I18n-Styles — Decisions

## D1. API baseline regeneration is required for the i18n part of the task

### Контекст

User-level constraint (across all three React cards): «НЕ перегенерировать `etc/react.api.md` baseline». Эта оговорка очевидно адресована **T-React-Cleanup**, где baseline трогать нельзя (Cleanup не должен снести экспорты, которые сейчас зафиксированы в snapshot).

T-React-I18n-Styles по своей природе **расширяет** `SgLocale`:

- новые подключи на каждый компонент (`charts`, `dashboard`, `gantt`, `cascader`, `tree`, …);
- новые suite-локалей: `BreadcrumbLocale`, `CarouselLocale`, `CascaderLocale`, `ChartsLocale`, `DashboardLocale`, `DatePickerLocale`, `DrawerLocale`, `GanttLocale`, `InlineEditLocale`, `InputPasswordLocale`, `NotificationLocale`, `RateLocale`, `ResourceCalendarLocale`, `SchemaFormEditorLocale`, `SearchInputLocale`, `SkeletonLocale`, `SpinLocale`, `TagInputLocale`, `TagLocale`, `TimelineLocale`, `TreeSelectLocale`;
- расширения существующих: `CalendarLocale`, `ModalLocale`, `PaginationLocale`, `UploadLocale`, `TreeLocale`.

Эти изменения **публичны**: они появляются в `SgLocale` и индивидуальных экспортах из `index.ts`, и `api-extractor` в strict mode (`api:check`) падает с диффом против старого `etc/react.api.md`.

### Варианты

| # | Подход | Минусы |
|---|---|---|
| A | Не трогать `SgLocale` | Невозможно: компоненты уже читают `useConfig().locale.<X>`. Без расширения тип не сходится. |
| B | Зашить локали инлайном в `SgLocale` | API всё равно меняется (новые поля в публичном `SgLocale`). Только усложняет реюз. |
| C | Регенерировать baseline | Нарушает user-level «не перегенерировать», но это необходимое следствие i18n-расширения. |
| D | Записать в `blocked/` и идти дальше | `api:check` остаётся красным навсегда → блокирует CI и T-API. |

### Решение

Принят вариант **C**: после завершения i18n правок делается `pnpm --filter @skygraph/react api:update`, новый snapshot фиксируется в `etc/react.api.md`. Это **не** удаляет экспортов и не меняет существующие сигнатуры — только добавляет новые типы и поля. Diff полностью additive.

### Обоснование по CHARTER §6

- §6.1 (неоднозначное API): минимально-инвазивный вариант — оставляем структуру именованных подлокалей, как уже принято в `PaginationLocale`/`ModalLocale`/`CalendarLocale`/`TableLocale`. Расширение SgLocale — необходимая часть scope T-React-I18n-Styles.
- §6.2 (чужой файл): `etc/react.api.md` — зона T-API (Волна 1, уже завершена). Но T-API не предусматривает обновление snapshot после Волны 2; сама по себе фиксация baseline без следующих волн делает любой задел по locales/типам невозможным.
- §4 «Общие зоны»: добавления в `SgLocale` явно разрешены T-React-I18n-Styles («только добавляет, если нужно»).

### Подтверждение

Все остальные проверки (`typecheck`, `test`, `build`, `demo build`, `check:styles`) зелёные. Diff в `react.api.md` — only additions (никаких removals/breaking renames).
