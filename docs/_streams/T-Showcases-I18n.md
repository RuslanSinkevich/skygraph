# T-Showcases-I18n — Локализация 12 SkyGraph Showcases

> Прочитал `CHARTER.md`? Если нет — прочитай сначала.

## ID и волна
- **ID:** T-Showcases-I18n
- **Волна:** 2

## Цель
Локализовать все 12 апп в `examples/showcases/`. Сейчас хабовые ключи (название/описание самого показ-апп) есть в `examples/_shared/src/showcasesLocale.ts`, но **внутри** каждого апп — хардкод (заголовки колонок таблиц, кнопки, плейсхолдеры, меню, статусы, сообщения).

Языки: en + ru (минимум). zh/de/fr/es — НЕ в этом стриме (это T-Docs-Locales работает с `SgLocale`, не с showcases).

## Зона файлов (можно трогать)

- `examples/showcases/src/showcases/**/*.tsx` — все 58 файлов.
- `examples/showcases/src/showcases/_shared/*.tsx` — общие шеллы и тулбары.
- `examples/_shared/src/showcasesLocale.ts` — расширение типа `ShowcasesLocale` и обоих словарей `showcasesLocaleEn`/`showcasesLocaleRu`.
- `examples/_shared/src/index.ts` — если надо доэкспортировать новые типы.

### НЕЛЬЗЯ трогать

- `packages/**` — весь `@skygraph/*`.
- `examples/demo/**` — другие демо.
- `examples/demo-vue/**`.
- `examples/_shared-react/**` — отдельная зона.

## Стратегия локалей

`ShowcasesLocale` уже есть в `examples/_shared/src/showcasesLocale.ts`. Расширяем его как **карту по апп**:

```ts
export interface ShowcasesLocale {
  // существующие хабовые поля без изменений
  hub: { ... }
  languageSwitcher: { ... }
  // новое:
  apps: {
    admin: AdminLocale
    crm: CrmLocale
    ecommerce: EcommerceLocale
    forms: FormsLocale
    hrPortal: HrPortalLocale
    fileManager: FileManagerLocale
    workflowEditor: WorkflowEditorLocale
    tableKitchenSink: TableKitchenSinkLocale
    chat: ChatLocale
    dashboard: DashboardLocale
    helpdesk: HelpdeskLocale
    inbox: InboxLocale
  }
}
```

Где `AdminLocale`, `CrmLocale` и т. д. — собственные интерфейсы со своими ключами (по табам/секциям внутри апп).

В TSX-компонентах используется существующий механизм передачи locale через пропс или через React-контекст из `_shared`. Изучи как это сделано в одном из апп (например, `admin/AdminApp.tsx`) и **повторяй паттерн**, не вводи новый.

## Чек-лист

### Подготовка (10 минут)

1. Прочитать `examples/_shared/src/showcasesLocale.ts` — понять текущую структуру, обоих словарей.
2. Прочитать `examples/showcases/src/App.tsx` (или ShowcasesViews/showcaseRouting) — понять как локаль попадает в апп.
3. Прочитать `examples/showcases/src/showcases/_shared/ShowcaseShell.tsx` и `Toolbar.tsx` — есть ли там общий механизм.
4. Найти один **уже локализованный** апп (если есть) и взять как образец. Если нет — образец задаёшь сам этим стримом, фиксируешь паттерн в `decisions/T-Showcases-I18n.md`.

### Работа по аппам

Для каждого из 12 апп — отдельный sub-step. Иди в порядке возрастания объёма:

1. `chat` (1 файл, минимум).
2. `inbox`.
3. `helpdesk`.
4. `dashboard`.
5. `file-manager`.
6. `workflow-editor`.
7. `forms` (5 файлов).
8. `hr-portal` (8 файлов).
9. `admin` (9 файлов).
10. `crm` (11 файлов).
11. `ecommerce` (6 файлов).
12. `table-kitchen-sink` (7 файлов).

Для каждого апп:

1. Сканируй файлы апп через `rg ">[\p{L}][^<{}]*<" examples/showcases/src/showcases/<app>/`. Это найдёт user-facing JSX-текст.
2. Также проверь:
   - `placeholder="..."`, `title="..."`, `aria-label="..."` со словами.
   - Содержимое массивов колонок таблицы: `{ key: 'foo', title: 'Foo' }`.
   - `toast`/`message`/`notification` строки.
   - Меню items.
3. Для каждого апп:
   - Создай интерфейс `<App>Locale` в `showcasesLocale.ts`.
   - Добавь en/ru словари (поля интерфейса).
   - Структурируй ключи по табам/секциям апп.
4. В TSX заменяй хардкод на `locale.apps.<app>.<path>`.
5. Если ключ касается **технического имени** (sg-классы, ARIA-роли, dataset-keys) — НЕ локализуй. См. CHARTER §10.
6. Если строка — Unicode-символ (`✓ ✕ → × ⌕ ◉ ✎`) — НЕ локализуй.

### Финал

```bash
pnpm --filter showcases typecheck   # если такой filter есть
pnpm --filter showcases build
```

Если у `examples/showcases` нет своего скрипта `typecheck` — используй `pnpm --filter showcases exec tsc -b`.

Sanity-check визуально:
- Открыть Showcases → переключить язык → все 12 апп НЕ должны показывать хардкод-строки на оригинальном языке.

## Acceptance criteria

- В `examples/showcases/src/showcases/**/*.tsx` нет user-facing хардкод-строк (кроме Unicode и тех. идентификаторов).
- `ShowcasesLocale` расширен типом `apps.<name>` для всех 12.
- `showcasesLocaleEn` и `showcasesLocaleRu` содержат полные переводы.
- `pnpm --filter showcases build` зелёный.
- Переключение языка реально меняет тексты во всех 12 апп.

## Стоп-лист

- НЕ менять `packages/**`.
- НЕ добавлять zh/de/fr/es локали (это работа T-Docs-Locales для `SgLocale`, у showcases свой namespace).
- НЕ переписывать апп с нуля. Только замена хардкод-строк.
- НЕ запускать `pnpm install`.
- НЕ запускать глобальные команды без `--filter`.
- НЕ удалять/добавлять апп.

## Зависимости
Никаких. Зона полностью изолирована от других стримов Волны 2.

## Финал
Отчёт: `docs/_streams/done/T-Showcases-I18n.md`. Перечисли ключи добавленных локалей по апп (структуру можно представить в виде дерева).
