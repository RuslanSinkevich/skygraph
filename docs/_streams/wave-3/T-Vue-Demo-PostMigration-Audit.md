# T-Vue-Demo-PostMigration-Audit — Волна 3.3: полный QA demo-vue после миграции

> Читать первым: `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`,
> `docs/_streams/done/T-Vue-Demo-Foundation.md`,
> `docs/_streams/audit/T-Vue-Demo-Parity.md`,
> `docs/_streams/audit/vue-broken-styles.md`
> (история регрессий и скриншоты 3.2).

## ID и волна

- **ID:** T-Vue-Demo-PostMigration-Audit
- **Волна:** 3.3 (один независимый стрим, **после** закрытия 3.1 + 3.2 + 3.3a + 3.3b + 3.3c и мержа в рабочее дерево)
- **Режим:** один таб, **не** параллелится с 3.2 / 3.3a / 3.3b / 3.3c — иначе снова гонки по `demos/**`, обёрткам и Diagram.

## Зачем отдельный стрим

Волна 3.2 шла **пятью параллельными воркерами**. Tab E (`T-Vue-Demo-StyleFixes`)
по карте **не имел права** править `examples/demo-vue/src/demos/**`, хотя
часть косяков отображения — разметка/классы в агрегаторах и `.demo.vue`.
После миграции нужен **единый проход**: сверка с React, стили shell,
сетка превью, консоль, при необходимости — правки **в демо-коде** и
общих обёртках `demos/components/*`.

Этот стрим — **аудит + точечные фиксы** в разрешённых зонах; корни в
`packages/**` остаются findings.

## ⚠️ Правила автономности

**Не останавливаться, не спрашивать пользователя.** Решения вне карты —
в `docs/_streams/decisions/T-Vue-Demo-PostMigration-Audit.md`. Пропуски и
корни в пакете — в `docs/_streams/findings/T-Vue-Demo-PostMigration-Audit.md`.
Итог — `docs/_streams/done/T-Vue-Demo-PostMigration-Audit.md` с чеклистом
acceptance, таблицей маршрутов (OK / FIXED / FINDING), секцией
«Решения вне плана».

**Запрещено:** `git commit`/`push`/`rebase`/`stash` (если иное не сказал
владелец репо), `pnpm install`, правки `packages/**`, правки
`examples/demo/**` (React read-only).

## Цели (что проверить)

1. **Визуальный паритет** Vue vs React на всех маршрутах из
   `examples/demo-vue/src/router/index.ts` (`/` + `/components/*`), в
   пределах разумного (шрифты ОС, микро-отступы ≤2px — не блокер).
2. **Сломанные стили** — обрезание превью, неверный фон `.dv-demo-preview`,
   лишние поля, поломанная сетка `DemoBox`, конфликт с `AppShell`.
3. **Функциональное отображение** — пустые блоки, не смонтированные
   виджеты, очевидные layout-bugs в примерах (не баг `@skygraph/vue` —
   см. ниже про findings).
4. **Консоль** — ошибки и **необработанные** предупреждения Vue на каждой
   странице (headless или ручная выборка; зафиксировать в аудите).

## Артефакт аудита (обязательный)

Создать или **дополнять append-only**:

`docs/_streams/audit/vue-demo-postmigration-audit.md`

Формат каждого маршрута:

```markdown
## <hash-path> (/ или /components/input)

**Статус:** OK | NEEDS-FIX | FINDING-PACKAGE
**Визуал vs React:** match | mismatch (что именно)
**Консоль:** clean | errors (текст)
**Корень:** demos/<file>.vue | demos/components/*.vue | style.css | shell | packages/vue (finding)
**Действие:** …
```

В конце файла — сводная таблица: счётчик OK / NEEDS-FIX / FINDING.

При желании обновить скриншоты в
`docs/_streams/audit/screenshots/postmigration-{vue,react}/` — не затирая
существующие 3.2 без переименования (например подпапка `postmigration/`).

Инструменты: уже есть `scripts/screenshot-audit.mjs`,
`scripts/compare-screenshots.mjs` — переиспользовать; при отсутствии
браузера — finding `no-headless-browser`, тогда аудит по ручному
чеклисту + сохранённые PNG из предыдущего прогона.

## Зона файлов (можно трогать при фиксах)

- `examples/demo-vue/src/demos/**/*.vue` — разметка примеров и агрегаторов,
  классы обёрток, условная видимость (в т.ч. исправление **ошибок демо**,
  не маскируя баг компонента).
- `examples/demo-vue/src/demos/components/*.vue` — общие `DemoBox`,
  `ComponentDoc`, `PropsTable`, `CssVarsTable`, `SourceCode` (**если** баг в
  обёртке демо, а не в `Sg*`).
- `examples/demo-vue/src/style.css`, `examples/demo-vue/src/styles/**`
  (импорт из `style.css`).
- `examples/_shared-vue/src/layout/styles.css` — только shell/layout.
- `examples/demo-vue/src/pages/Landing.vue` + `pages/landing.css` — если
  проблемы лендинга.
- **Не трогать** без крайней нужды: `router/index.ts`, `nav.ts`,
  `main.ts`, `App.vue`, `i18n/**` (если нужен ключ — finding или
  минимальное добавление **своих** ключей без переименования чужих).
- **`packages/**`** — только finding → `docs/_streams/findings/T-Vue-Demo-PostMigration-Audit.md`
  + ссылка на будущую `T-Vue-Cleanup-2` или техдолг.

## Чек-лист выполнения

### Шаг 0. Пререквизиты (~10 мин)

- `pnpm --filter demo-vue typecheck` и `pnpm --filter demo-vue build` —
  зелёные; если красные — **сначала** починить блокеры в зоне демо или
  finding с точной ошибкой TS.
- Убедиться, что маршруты ведут на `demos/<Comp>Demo.vue`, а не на
  удалённые `pages/*Page.vue`.

### Шаг 1. Сбор эталона (~30–90 мин)

- Поднять `pnpm --filter demo dev` и `pnpm --filter demo-vue dev`.
- Прогнать скриншоты всех маршрутов (или сравнить с имеющимися в
  `docs/_streams/audit/screenshots/` + отметить расхождения после
  миграции).
- Заполнить `vue-demo-postmigration-audit.md` по каждому маршруту.

### Шаг 2. Приоритизация

- **P1** — страница нечитаема, критичный контент не виден, спам ошибок в
  консоли.
- **P2** — заметный визуальный разрыв с React или поломанный блок
  превью.
- **P3** — косметика.

### Шаг 3. Фиксы

- Чинить в порядке P1 → P2; P3 — по остатку времени, иначе deferred в
  findings.
- После каждого фикса: `pnpm --filter demo-vue typecheck` (и build при
  сомнении).
- **Лимит `.size-limit.json` не повышать** без явного решения владельца.

### Шаг 4. Финал

```text
pnpm --filter demo-vue typecheck
pnpm --filter demo-vue build
pnpm size
```

Все зелёные; если size красный — finding, не поднимать лимит самостоятельно.

## Acceptance criteria

- Файл `docs/_streams/audit/vue-demo-postmigration-audit.md` существует и
  покрывает **все** маршруты demo-vue из `router/index.ts`.
- Нет незакрытых P1; P2 либо FIXED, либо явный finding с владельцем зоны.
- Отчёт `docs/_streams/done/T-Vue-Demo-PostMigration-Audit.md` сдан.
- `findings/` и `decisions/` для этого ID заполнены или явно «пусто».

## Зависимости

- **После** завершения Волны 3.2 (все табы A–E, мерж в дерево).
- **Независим** от других активных стримов (зонирование: только этот
  стрим трогает перечисленные пути в одном рабочем дереве).

---

## Текст запуска стрима (копипаст в новый таб Cursor)

```text
Ты — стрим T-Vue-Demo-PostMigration-Audit (Волна 3.3) в репозитории skygraph.

Задача: после миграции 3.2 провести полный QA demo-vue — стили, сетка
превью, визуальное сравнение с React-демо, консоль; задокументировать в
docs/_streams/audit/vue-demo-postmigration-audit.md; исправить то, что
в зоне демо (demos/**, demos/components, style.css, _shared-vue layout,
Landing); корни в packages/** — только findings.

Полная карта: docs/_streams/wave-3/T-Vue-Demo-PostMigration-Audit.md

Правила: автономно, без вопросов пользователю; в конце
docs/_streams/done/T-Vue-Demo-PostMigration-Audit.md. Не делай git commit
и pnpm install без явного указания владельца.

Старт: Шаг 0 карты, затем скриншоты/сравнение и заполнение аудита.
```
