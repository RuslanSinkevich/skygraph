# Cycle Log — журнал длинных стримов SkyGraph

> Лог хода автономной работы по стримам из `STREAM-PLAN.md`.
> Каждый стрим — отдельный раздел.
> Все решения по неоднозначностям, отклонения от плана и инциденты — здесь.

---

## Стрим 1 — Аудит всей системы

**Старт:** 2026-05-01
**Цель:** независимый отчёт `AUDIT.md` без правок кода.
**Артефакты:** `AUDIT.md`, `CYCLE-LOG.md` (этот файл), `TODO-cycle.md`.

### Решения по развилкам

- **STREAM-PLAN.md как часть первого коммита.** Документ создан до старта стрима, формально вне скоупа, но без него стрим не запускается. Включаю в первый коммит `cycle(1): scaffold audit infrastructure` вместе со скелетом `AUDIT.md`.
- **Посторонние модификации в `examples/demo/` и `packages/react/`** — не трогаю. Они не относятся к скоупу аудита (только чтение). В коммиты не включаю.
- **Язык отчёта `AUDIT.md`** — русский (по дефолту из STREAM-PLAN.md, раздел "Дефолты для развилок").

### Ход работ

**Инцидент 2026-05-01 — лишние файлы в первом коммите.**

При первом `git commit -m "cycle(1): scaffold ..."` в коммит попали 42 файла вместо 4. Причина: в индексе уже были посторонние модификации до старта стрима (M, MM, AM флаги в `examples/demo/`, `packages/react/`), и `git commit` без `--only` подхватил всё из индекса.

Исправлено через:
1. `git reset --soft HEAD^` (не запрещён, в отличие от `--hard`).
2. `git restore --staged .` — снять всё из индекса.
3. `git add` только 4 файла скоупа стрима.
4. `git commit` — повторно, с правильным составом.

**Следствие для будущих стримов:** перед каждым `git commit` проверять `git status --short` после `git add`, чтобы убедиться что в индексе только файлы скоупа.

**Инициатива пользователя 2026-05-01 — `STREAM-CHAT.md`.**

Во время Секции 6 пользователь вставил реплику прямо в `AUDIT.md` (строка ~685): «создай файл типо назови стрим с со мной и пиши туда что хочеш спросить у меня а я буду иногда отвечать». Это явное указание (не вопрос), исполнено без прерывания стрима:
- Создан `STREAM-CHAT.md` в корне.
- Реплика пользователя перенесена туда.
- Туда же выписаны 4 наблюдения / вопроса по ходу аудита (TreeSelect bug, complex/Transfer dead code, посторонние правки в worktree, lockfile дубль).
- Удалена посторонняя строка из `AUDIT.md`, восстановлен порядок Секции 6.
- Стрим продолжен.

**Фазы аудита:**

- [x] Скаффолдинг (CYCLE-LOG, TODO-cycle, AUDIT skeleton, коммит cycle(1))
- [x] Секция 1: Структура репозитория и инвентарь
- [x] Секция 2: Архитектурные границы (✅ зелёный, нарушений нет)
- [x] Секция 3: Состояние тестов и покрытие (497 тестов зелёные, README устарел на ~70)
- [x] Секция 4: Расхождения README / ARCHITECTURE с фактом (TreeSelect baseline bug найден)
- [x] Секция 5: Стилевой контракт (228 dead classes, 124 unstyled, magic colors)
- [x] Секция 6: examples/demo и examples/showcases (12 файлов > 250 строк)
- [x] Секция 7: Зависимости и инфраструктура (workspace дубль, lockfile дубль, R18/R19)
- [x] Секция 8: Dead code, дубли, неконсистентное именование (sg-btn vs sg-button, etc.)
- [x] Секция 9: Локализация и a11y (беглый обзор)
- [x] Секция 10: Приоритизация исправлений

### Финальный отчёт

**Стрим 1 (Аудит) завершён 2026-05-01.**

#### Что сделано

- Создана инфраструктура стримов: `STREAM-PLAN.md`, `CYCLE-LOG.md`, `TODO-cycle.md`, `STREAM-CHAT.md`.
- Проведён полный аудит репозитория `skygraph` без правок кода.
- Все 10 секций `AUDIT.md` заполнены с приоритизацией находок.
- Все находки разнесены по будущим стримам (2, 3, 4, 5, 6, 8, 9, 10) и мини-стримам.

#### Ключевые находки

1. **Архитектура чиста.** Все границы (`runtime/` ↛ `engines/`, `engines/` ↛ `engines/`, `ui/` ↛ `core/`) соблюдаются и enforce-ятся ESLint. ARCHITECTURE.md соответствует реальности.
2. **Все 497 тестов зелёные.** Расхождение с README (заявлено 428).
3. **Найден P0 баг публичного API:** `TreeSelect` имеет две разные реализации под одним именем (`@skygraph/react` vs `@skygraph/react/tree`).
4. **`complex/Transfer/` — мёртвый код,** не экспортируется ни из одного entrypoint.
5. **228 dead-классов в CSS,** часть — runtime transitions (нужен allowlist).
6. **README числа устарели** на ~11 компонентов (44/50, 11/16, 49/56) и ~69 тестов (428/497).
7. **`sg-btn-primary` в SchemaForm не имеет стилей** — кнопка submit без стиля.
8. **12 файлов в `examples/showcases` превышают порог 250 строк,** 7 из них — > 500 (`forms/FormsApp.tsx` 1131 строка).
9. **Дубль lockfile** (`package-lock.json` + `pnpm-lock.yaml`) и дубль workspace декларации (`workspaces` в package.json + `pnpm-workspace.yaml`).
10. **i18n инфраструктура для demo отсутствует** — Стрим 2 строит с нуля.
11. **Нет автоматических a11y-тестов** (axe-core / jest-axe).
12. **Нет coverage** ни в одном пакете.

#### Артефакты стрима 1

- `AUDIT.md` (~1230 строк, 10 секций) — главный артефакт.
- `STREAM-PLAN.md` (349 строк) — опорный план для будущих стримов.
- `CYCLE-LOG.md` (этот файл) — журнал.
- `TODO-cycle.md` — отложенные задачи, разнесённые по будущим стримам.
- `STREAM-CHAT.md` — канал общения с пользователем.
- `docs/_audit/styling-audit.md` — обновлён через `pnpm audit:styles`.

#### Коммиты в Стрим 1

1. `cycle(1): scaffold stream plan and audit infrastructure`
2. `cycle(1): audit section 1 - repository structure and inventory`
3. `cycle(1): audit section 2 - architectural boundaries (clean)`
4. `cycle(1): audit section 3 - tests and coverage (497 tests passing)`
5. `cycle(1): audit section 4 - readme/architecture vs reality (TreeSelect bug found)`
6. `cycle(1): audit section 5 - styling contract (228 dead classes, 124 unstyled, magic colors)`
7. `cycle(1): audit section 6 - examples (huge showcases, no i18n) + STREAM-CHAT.md infra`
8. `cycle(1): audit section 7 - dependencies and infrastructure`
9. `cycle(1): audit section 8 - dead code, duplicates, naming inconsistencies`
10. `cycle(1): audit section 9 - localization and a11y (overview)`
11. `cycle(1): audit section 10 - prioritization (final)`

11 коммитов, все только в файлы скоупа стрима. Посторонние модификации в `examples/demo/` и `packages/react/` (M, MM, AM из изначального git status) не тронуты.

#### Следующие шаги

Стрим 2 (Локализация demo через i18n) или любой другой по выбору пользователя — запускается командой `стартуй стрим N`. Все находки уже разнесены по стримам в `TODO-cycle.md` и Секции 10.

#### Соблюдение ГЛАВНОГО ПРАВИЛА

Ни одного вопроса пользователю не задано в течение стрима. Все развилки (включая инцидент с лишними файлами в первом коммите и две вставки сообщений пользователя в `AUDIT.md`) разрешены автономно с записью в лог.

---
