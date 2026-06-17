# SkyGraph — План: демо + баги (индекс)

> Источник: разбор репорта по `/react` и `/vue` (config-provider, select, table) + ревизия demo-инфраструктуры и локалей.
> Работа разбита на **3 параллельных стрима** (непересекающиеся файловые зоны) + финальный релиз E.

## Файлы стримов

| Стрим | Файл | Ветка | Зона | Пункты |
|------|------|-------|------|--------|
| **S1 — Table** | [`stream-1-table.md`](stream-1-table.md) | `stream/table` | `packages/{react,vue}/.../complex/Table/**` + `styles/components/table.css` | A1–A5 |
| **S2 — Config & i18n** | [`stream-2-config-i18n.md`](stream-2-config-i18n.md) | `stream/config-i18n` | `packages/{react,vue}/src/components/ui/**` (не Table) + `Form/Field` + `src/locales/**` + экспорт-строки `index.ts` | B1–B3, C1–C2 |
| **S3a — Demos React** | [`stream-3a-demos-react.md`](stream-3a-demos-react.md) | `stream/demos-react` | `examples/demo/**`, `examples/showcases/**`, `examples/_shared-react/**` | D1(React), D2, D3(React), D4(React) |
| **S3b — Demos Vue** | [`stream-3b-demos-vue.md`](stream-3b-demos-vue.md) | `stream/demos-vue` | `examples/demo-vue/**`, `examples/showcases-vue/**`, `examples/_shared-vue/**` | D1(Vue), D3(Vue), D4(Vue), D5 |

**Гарантия отсутствия конфликтов:** S1 = только папки `Table` + `table.css`; S2 = `components/ui` + `Form` + `locales` + строки экспорта; S3a = только React-demo; S3b = только Vue-demo. Общих файлов нет — можно вести в 4 отдельных чатах одновременно.

## Charter (во всех стримах)
1. Не останавливаться до конца стрима. Не спрашивать — решать самому.
2. Не выходить за свою файловую зону.
3. Без субагентов.
4. Definition of done — в файле каждого стрима.

## Порядок мержа
1. S1, S2, S3a, S3b — параллельно, мержатся в любом порядке (зоны не пересекаются).
2. **E (релиз)** — после мержа всех четырёх.

---

## БЛОКЕР: проверить наличие `packages/`

В ходе сессии рабочая копия `packages/` пропадала с диска (побочка переподключения workspace). Восстановлена через `git restore packages`. Перед стартом S1/S2/E убедиться, что папка на месте; если нет — `git restore packages`.

Состояние версий пакетов (бамп начат частично):

| Пакет | Версия | Бамп начат |
|---|---|---|
| core | 0.5.2 | нет |
| react | 0.5.4 | да (staged) |
| vue | 0.6.4 | да |
| styles | 0.2.4 | да |
| skygraph-react | 0.6.4 | да |
| skygraph-vue | 0.6.4 | да |

Релизная версия в `CHANGELOG.md` — единая, последняя `0.6.3`.

---

## Решения по постановке

- **Демки не переписываем оптом.** Корень — инфраструктура, утекающая в «Show Code» (`TokenScopeCards`), и рассинхрон props-таблиц. Чиним точечно (см. S3/D1, D2).
- **Языки локалей:** добавляем Tier 1 без экзотики — `ja_JP`, `ko_KR`, `pt_BR`, `it_IT`. Арабский/RTL — не сейчас.
- **TokenScopeCards:** РЕШЕНО — убрать, заменить на один inline тёмный блок (детали в S3/D1).

---

## Stream E — Релиз и публикация (ФИНАЛЬНЫЙ, после S1–S3)

Запускать только когда S1, S2, S3a, S3b завершены и смержены. Предусловие — `packages/` на месте.

### E1. Документация
- **`CHANGELOG.md`**: новая запись по формату (`Core` / `Components` / `Styles` / `Fixes` / `Breaking / Removed`). Источник изменений — секции «Для релиза» в файлах S1/S2/S3a/S3b.
- **Курируемые публичные доки** (`README.md`, `ARCHITECTURE.md`, `MIGRATION.md`, `docs/`): синхронизировать вручную. `publish-public.mjs` их НЕ копирует — только подсвечивает `[DIFFER]`.
- Проверить актуальность таблиц пропсов/CSS-vars (пересекается с S3/D2).
- Решить судьбу удалённых `docs/_streams/vue-demo-react-parity.md` и `vue-getting-started-react-parity.md`.

### E2. Поднять версии всех пакетов
- Бамп 6 публичных пакетов: `core, react, vue, styles, skygraph-react, skygraph-vue` (`core` ещё не поднят, остальные staged).
- semver: фиксы (S1) = patch; новые локали и propagation (S2) = minor. Определить единый уровень или per-package.
- Синхронизировать межпакетные `dependencies` (`skygraph-*` → `react`/`vue`/`core`/`styles`).
- Решить: независимые версии или единая релизная (сейчас рассинхрон core 0.5.x / vue 0.6.x / styles 0.2.x).

### E3. Сборка пакетов
- `pnpm -r build` (или `pnpm -r --filter "./packages/*" build`).
- Гейты: `pnpm typecheck`, `pnpm test`, `pnpm lint`, `pnpm check:styles`, `pnpm api:check`, `pnpm size`/`bundle:check`.

### E4. Собрать все веб-версии
- `node deploy/build-all.mjs` → `deploy/output/`: пакеты, landing, React demo (`/react/`) + showcases, Vue demo (`/vue/`) + showcases, Angular-stub.
- Проверить сборку упрощённых token-демок (S3/D1) и sticky-демо (S3/D4).

### E5. Обновить публичный mirror `_publish/skygraph-public`
- `node scripts/publish-public.mjs --dry-run` — план.
- `node scripts/publish-public.mjs` — синхронизация mirrored-набора (6 пакетов, `deploy/`, `landing/index.html`, `LICENSE`, `CONTRIBUTING.md`; артефакты и `angular` исключены).
- Разобрать `[DIFFER]` (E1) вручную.
- Коммит: `node scripts/publish-public.mjs --commit "<msg>"` (опц. `--push`).

---

## Чек-лист репорта → стрим

| Пункт репорта | Стрим / пункт |
|---------------|-------|
| `/vue` config-provider~disabled — не все компоненты | S2 / B1 |
| `/vue` select~плавающий label прыгает | S3b / D3 |
| `/vue` table~фильтры — значок-треугольник | S1 / A1 |
| `/vue` table~свой фильтр dropdown — значок-треугольник | S1 / A1 |
| `/vue` table~пустое состояние не по центру | S1 / A2 |
| `/react` демо с пропсами не из таблицы | S3a / D2 |
| `/react` config-provider — переводится не всё | S2 / B2 + C1 (+ S1/A5) |
| `/react` select~плавающий label прыгает | S3a / D3 |
| `/react` table~сортировка — мультисорт | S1 / A3 |
| `/react` table~resizable — прыжок влево | S1 / A4 |
| оба table — нет sticky-шапки в демо | S3a + S3b / D4 |
| Локали: добавить языки | S2 / C2 (+ C1) |
| Демки «сложные»/TokenScopeCards | S3a + S3b / D1 |
| Поправить документацию (+ CHANGELOG) | E1 |
| Поднять версии всех пакетов | E2 |
| Собрать все веб-версии | E3/E4 |
| Обновить `_publish/skygraph-public` | E5 |


ты прочитал в конце прошу собери всё в кучу все ядра и собери демо собери все ветки которые ты правил сегодня , проверь чтобы всё было хорошо
устрани чужие ошибки ты последний стрим
