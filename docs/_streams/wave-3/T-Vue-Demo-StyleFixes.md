# T-Vue-Demo-StyleFixes — Волна 3.2 / Tab E: скриншот-аудит + фиксы визуальных регрессий

> Прочитал `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`,
> `docs/_streams/done/T-Vue-Demo-Foundation.md`,
> `docs/_streams/findings/T-Vue-Demo-Foundation.md`,
> `docs/_streams/decisions/T-Vue-Demo-Foundation.md`,
> `docs/_streams/audit/vue-broken-styles.md`? Если нет — прочитай сначала.
> Этот таб **строго после** T-Vue-Demo-Foundation.

## ID и волна
- **ID:** T-Vue-Demo-StyleFixes
- **Волна:** 3.2
- **Режим:** один таб, параллельно с 3.2/Tab A/B/C/D.

## ⚠️ Правила автономности стрима — читать первым

**Этот стрим автономный. Никогда не останавливайся, не задавай вопросов
пользователю, не жди подтверждений.** Если поток рассуждений упирается в
неопределённость — решаешь сам по правилам ниже:

1. **Конфликт карты и кода → доверяй коду**, фиксируй запись в
   `docs/_streams/decisions/T-Vue-Demo-StyleFixes.md`.
2. **Регрессия в `packages/**`** → finding (НЕ маскируем CSS-патчем
   на уровне demo-сайта). См. §«Шаг 2».
3. **Попытка не работает 3 раза** → finding `decision-protocol-N`, идёшь дальше.
4. **Параллельно работают табы A/B/C/D.** Они **удаляют** свои
   `pages/<Comp>Page.vue`. Если страница в их списке — патчим **новый**
   `demos/<Comp>Demo.vue` НЕЛЬЗЯ (чужая зона) → finding со ссылкой
   «нужно учесть в табе X». См. §«Конфликты с другими табами».
5. **Никаких вопросов пользователю.** Если что-то надо «уточнить» —
   принимай решение, документируешь и идёшь дальше.

В конце — отчёт `docs/_streams/done/T-Vue-Demo-StyleFixes.md` обязательно содержит:
- acceptance criteria checklist (✓/✗ по каждому пункту),
- таблицу регрессий (P1/P2/P3, статус FIXED/finding/deferred),
- список созданных/изменённых файлов,
- ссылки на все decisions и findings,
- секцию **«Решения вне плана»** — что сделал не по карте и почему.

**Запрещено:** спрашивать пользователя, останавливаться без отчёта,
блокировать другие табы, делать `git commit`/`git push`/`git stash`/`git rebase`,
запускать `pnpm install`, трогать чужие зоны (`demos/**`, `router/**`,
`pages/<Comp>Page.vue` чужих компонентов), маскировать поломки `packages/**`
локальными CSS-патчами.

## Контекст

Аудит Волны 3.1 (`docs/_streams/audit/vue-broken-styles.md`) фиксирует
визуальные регрессии в `examples/demo-vue` после Волны 2.
**Скриншот-аудит в 3.1 НЕ был сделан** (см. `vue-broken-styles.md` §2 +
finding `audit-styles-no-playwright`) — два dev-сервера + Chromium не
поднимаются автономно из последовательного стрима. **Поэтому первое,
что должен сделать этот таб — собрать скриншот-аудит сам**, и только
потом фиксить.

Контентом (атомные примеры, агрегаторы, словари) не занимается, это
зона табов A/B/C/D.

## Зона файлов (можно трогать)

### Правки
- `examples/demo-vue/src/style.css` — глобальные стили демо-сайта.
- `examples/_shared-vue/src/layout/styles.css` — стили AppShell для Vue
  (только если регрессия в shell, а не в компоненте).
- `examples/demo-vue/src/components/*.vue` — старые `ComponentDoc.vue`,
  `DemoBox.vue`, `PropsTable.vue` (используются страницами **до**
  миграции 3.2; после полной миграции их можно будет удалить отдельно
  в Волне 3.3, но сейчас оставляем работающими).
- Стили внутри `examples/demo-vue/src/pages/*.vue` (если регрессия в
  странице — фиксим in-place, **не делаем миграцию в `demos/`**, это
  чужая зона).
- `docs/_streams/findings/T-Vue-Demo-StyleFixes.md` — каждая поломка,
  у которой корень в `packages/styles/components/*.css` или
  `packages/vue/src/components/**`, **записывается как finding**, не
  фиксится.

### Создание (только если без этого никак)
- Новые CSS-файлы в `examples/demo-vue/src/styles/` (мини-фолдер для
  заплаток). Имя `fix-<comp>.css`. Импорт из `examples/demo-vue/src/style.css`
  одной строкой `@import './styles/fix-<comp>.css';`.
- `scripts/screenshot-audit.mjs` — Playwright скрипт для сбора скриншотов
  (см. Шаг 1). Можно создать в этом стриме.
- `docs/_streams/audit/screenshots/{vue,react}/*.png` — артефакты аудита.
- `docs/_streams/audit/screenshots/routes.json` — список маршрутов
  (можно сгенерировать из `vue-broken-styles.md` §4).

### НЕЛЬЗЯ трогать
- `packages/**` — целиком read-only. Это включает `packages/styles/components/*.css`.
  Если регрессия в общем CSS — finding, не фиксим.
- `examples/demo/**`, `examples/showcases/**`, `examples/_shared/**`,
  `examples/_shared-react/**` — read-only.
- `examples/demo-vue/src/demos/**` — зона T-Vue-Demo-Foundation
  (фундамент, button) и табов A/B/C/D (контент). Не править.
- `examples/demo-vue/src/router/index.ts` — не править.
- `examples/demo-vue/src/nav.ts` — не править.
- `examples/demo-vue/src/main.ts`, `App.vue` — не править.
- `examples/demo-vue/src/i18n/**` — не править.
- `examples/demo-vue/src/pages/Landing.vue` — зона 3.1.
- `.size-limit.json` — не повышать лимит.
- `examples/demo-vue/package.json` — не добавлять зависимости.

## Чек-лист

### Шаг 0. Прочитать обязательное (~20 мин)

**В этом порядке:**

1. `docs/_streams/CHARTER.md` — главные правила.
2. `docs/_streams/wave-3/CHARTER.md` — конституция Волны 3.
3. `docs/_streams/done/T-Vue-Demo-Foundation.md` — итоги 3.1.
4. `docs/_streams/findings/T-Vue-Demo-Foundation.md` — там запись
   `audit-styles-no-playwright`, которая объясняет почему скриншот-
   аудит не был сделан в 3.1.
5. `docs/_streams/audit/vue-broken-styles.md` — твой план работы
   (раздел 3 «Что должен сделать таб E» + раздел 5 «Регрессии,
   замеченные при ручном чтении исходников 3.1»).

### Шаг 1. Скриншот-аудит — сделать сам (~30-60 мин)

Это **первое, что делает таб E**. В 3.1 не получилось из-за
неинтерактивного окружения — здесь окружение интерактивное.

```bash
# Терминал A
pnpm --filter demo-vue dev    # http://localhost:5174

# Терминал B
pnpm --filter demo dev        # http://localhost:5173

# Терминал C — Playwright скрипт (написать рядом с tests/smoke/, но НЕ в tests/smoke/)
node scripts/screenshot-audit.mjs \
     --vue=http://localhost:5174 \
     --react=http://localhost:5173 \
     --routes=docs/_streams/audit/screenshots/routes.json \
     --out=docs/_streams/audit/screenshots
```

Если скрипта `scripts/screenshot-audit.mjs` ещё нет — создаёшь его
**сам** в этом стриме (это часть твоей зоны). Минимальная имплементация
~80 строк на `@playwright/test` (browser launch + iterate routes +
page.screenshot fullPage). Список из 32 маршрутов — в
`docs/_streams/audit/vue-broken-styles.md` §4.

Если Chromium не доступен (нет браузера в окружении): finding
`screenshot-audit-no-chromium`, переходишь к §5 «Ручные находки» и
работаешь по ним. **Это допустимо**, но в отчёте обязательно отметить.

Результат: `docs/_streams/audit/screenshots/{vue,react}/<comp>.png` ×
32 маршрута × 2 фреймворка = до 64 файлов.

### Шаг 1a. Сравнить попарно и записать в `vue-broken-styles.md` (~30 мин)

Для каждой пары `react/<comp>.png` vs `vue/<comp>.png`:

- Если визуально совпадают (компоновка, фон, рамки, отступы) →
  `## /components/<comp>` со статусом **OK**.
- Если расходятся → запись в формате (см. `vue-broken-styles.md` §3):

  ```markdown
  ## /components/<comp>

  **Статус**: NEEDS-FIX
  **Описание**: 1-2 строки про регрессию.
  **Возможная причина**: какой класс / variable.
  **Локализация**: <файл:строка>
  ```

Этот append идёт **прямо в** `docs/_streams/audit/vue-broken-styles.md`
(append-only по CHARTER §12).

### Шаг 1b. Приоритезация (~15 мин)

Для каждой записи `NEEDS-FIX` поставить приоритет:
- **P1** — ломает основное demo (главная навигация, чтение страницы,
  вёрстка целиком).
- **P2** — портит конкретную страницу или блок (несовпадение
  с React-аналогом, но читать можно).
- **P3** — мелкие косметические (отступы, цвета шрифта).

### Шаг 2. Локализация корня (~10 мин на регрессию)

Для каждой записи определить **где живёт CSS-правило**:
- `examples/_shared-vue/src/layout/styles.css` (shell) — наша зона.
- `examples/demo-vue/src/style.css` — наша зона.
- `examples/demo-vue/src/pages/<Comp>Page.vue` style scoped — наша зона
  (только если страница ещё не мигрирована в `demos/`; если уже мигрирована
  табом A/B/C/D — finding, мы её не трогаем).
- `packages/styles/components/<file>.css` — **finding**, не наша зона.
- `packages/vue/src/components/<comp>.vue` style scoped — **finding**.

### Шаг 3. Фикс (~15 мин на регрессию)

Если корень в нашей зоне:
1. Внести минимальную правку.
2. Hard refresh demo-vue dev (или новый `pnpm --filter demo-vue build`,
   но dev быстрее).
3. Сделать новый скриншот в
   `docs/_streams/audit/screenshots/vue/<comp>-fixed.png`.
4. В `vue-broken-styles.md` обновить статус: `FIXED` + commit-id будет
   потом, пока пометить датой.

Если корень **вне** нашей зоны (`packages/**`):
1. В `findings/T-Vue-Demo-StyleFixes.md` запись:
   - Описание регрессии.
   - Точный селектор/файл/строка где сломано.
   - Предложенный фикс.
   - Маркер «нужен T-Vue-Cleanup-2».
2. Регрессию **не маскируем** на уровне demo-сайта (не патчим CSS
   локально чтобы скрыть проблему пакета).

### Шаг 4. Регресс-проверка

После каждого фикса (или каждых 5):
```bash
pnpm --filter demo-vue typecheck
pnpm --filter demo-vue build
```
Зелёные. Если красный — фикс ломает что-то ещё, откатить.

### Шаг 5. Финал

```bash
pnpm --filter demo-vue typecheck
pnpm --filter demo-vue build
pnpm size
```

Все три зелёные. **Лимит size не повышаем.**

Если на момент финала ещё не все остальные табы 3.2 закончили — это не
блокирует. Регрессии мы фиксим в `style.css` и `_shared-vue/styles.css`,
которые трогают другие табы. Если возник конфликт зон — разбор в
ручном merge пользователем.

## Acceptance criteria

- Каждая P1/P2 регрессия из `vue-broken-styles.md`:
  - либо `FIXED` (в нашей зоне),
  - либо записана в `findings/T-Vue-Demo-StyleFixes.md` (вне зоны).
- P3 регрессии — fix приветствуется, но не обязательны; явно отметить
  «deferred to next round» если не успели.
- `pnpm --filter demo-vue typecheck && pnpm --filter demo-vue build && pnpm size` — зелёные.
- Скриншоты «до/после» по каждой исправленной регрессии в
  `docs/_streams/audit/screenshots/vue/<comp>-fixed.png`.
- Если регрессий не было — отчёт явно: «audit reported no regressions».

## Стоп-лист

- НЕ трогать `packages/**`.
- НЕ трогать `examples/demo/**`, `examples/showcases/**`,
  `examples/_shared/**`, `examples/_shared-react/**`,
  `examples/_shared-vue/src/**` **кроме** `layout/styles.css`.
- НЕ трогать `examples/demo-vue/src/demos/**`.
- НЕ трогать `examples/demo-vue/src/router/**`, `nav.ts`, `main.ts`,
  `App.vue`, `i18n/**`, `Landing.vue`.
- НЕ повышать лимит `.size-limit.json`.
- НЕ добавлять зависимости в `examples/demo-vue/package.json`.
- НЕ запускать `pnpm install`.
- НЕ запускать глобальные команды без `--filter`.
- НЕ делать `git commit`/`git push`/`git rebase`/`git stash`.
- НЕ маскировать поломки в `packages/**` локальными CSS-патчами
  (это скрывает проблему — пишем finding).
- НЕ выдумывать новые «регрессии» сверх аудита (для дополнительных
  находок — finding, отдельная задача).

## Зависимости
- **СТРОГО ПОСЛЕ** T-Vue-Demo-Foundation (3.1).
- **Параллельно** с T-Vue-Demo-Forms, T-Vue-Demo-Display,
  T-Vue-Demo-NavFeedback, T-Vue-Demo-Complex.

## Конфликты с другими табами 3.2

Возможны на:
- `examples/_shared-vue/src/layout/styles.css` — этот таб может
  править layout-CSS, контентные табы — нет (по их стоп-листу). Конфликт
  маловероятен.
- `examples/demo-vue/src/style.css` — то же.
- `examples/demo-vue/src/pages/<Comp>Page.vue` — таб A/B/C/D **удаляет**
  свои страницы. Алгоритм решения (race-condition aware):

  **Перед** правкой страницы открой `docs/_streams/wave-3/T-Vue-Demo-{Forms,Display,NavFeedback,Complex}.md`
  и сверь компонент со списком в этих картах:

  - **Страница в списке миграции** (любого таба A/B/C/D) →
    finding со ссылкой «нужно учесть в табе X», **не патчим ничего**
    (ни старую страницу, ни новый `demos/<Comp>Demo.vue` — последний
    чужая зона). Решение проблемы — после полной миграции, в
    отдельной волне 3.3.
  - **Страница НЕ в списке миграции** → патчим in-place.
  - **На момент правки `<Comp>Page.vue` уже удалён** (таб A/B/C/D
    обогнал) → файла нет, фикс невозможен. Finding
    `<comp>-already-migrated`, ссылка на новый `demos/<Comp>Demo.vue`,
    **не лезть** в demos/. Решение — в волне 3.3.

  **НИКОГДА** не модифицируй `examples/demo-vue/src/demos/**` — это
  жёсткая чужая зона.

## Финал
Отчёт: `docs/_streams/done/T-Vue-Demo-StyleFixes.md`.
