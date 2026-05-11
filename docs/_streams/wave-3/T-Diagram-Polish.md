# T-Diagram-Polish — Волна 3.3c: полная доводка компонента Diagram (React + Vue + Core)

> Читать первым: `docs/_streams/CHARTER.md`, `docs/_streams/wave-3/CHARTER.md`.
> Этот стрим запускается **параллельно** с 3.3a и 3.3b и **не пересекается**
> с их зонами.

## ID и волна

- **ID:** T-Diagram-Polish
- **Волна:** 3.3c (один независимый стрим, **параллельно** с 3.3a/3.3b, **до** 3.3 PostMigration-Audit)
- **Режим:** один таб

## Зачем стрим

В showcase «Редактор процессов» (`examples/showcases/src/showcases/workflow-editor/WorkflowEditorApp.tsx`)
видны два типа проблем:

1. **Drag-and-drop из палитры не работает.** Кнопки «старт / задача /
   решение / конец» в палитре не могут быть перетащены на канвас →
   узел не создаётся.
2. **Маршрутизация рёбер некрасивая.** Линии связей (`router.ts`)
   проходят сквозь сами узлы, обрываются под странными углами,
   углы ортогональных линий не выровнены.

Этот стрим — **полный аудит и доработка компонента Diagram**: DnD из
палитры, маршрутизация рёбер, hover-actions, селекция, история,
visual polish, парность React↔Vue. Никаких других компонентов.

## Зона файлов (можно трогать)

### React-сторона
- `packages/react/src/components/complex/Diagram/Diagram.tsx`
- `packages/react/src/components/complex/Diagram/HoverActions.tsx`
- `packages/react/src/components/complex/Diagram/selection.ts`
- `packages/react/src/components/complex/Diagram/index.ts`
- (если потребуется) `packages/react/src/components/complex/Diagram/<новые файлы>.tsx`

### Vue-сторона
- `packages/vue/src/components/complex/Diagram/Diagram.vue`
- `packages/vue/src/components/complex/Diagram/types.ts`
- `packages/vue/src/components/complex/Diagram/index.ts`
- (если нужно) дополнительные SFC рядом, например
  `packages/vue/src/components/complex/Diagram/HoverActions.vue`

### Core (graph engine)
- `packages/core/src/engines/graph/GraphEngine.ts`
- `packages/core/src/engines/graph/router.ts` — **главный файл маршрутизации**
- `packages/core/src/engines/graph/history.ts`
- `packages/core/src/engines/graph/obb.ts` (oriented bounding box, для
  edge-routing)
- `packages/core/src/engines/graph/types.ts`
- `packages/core/src/engines/graph/index.ts`
- `packages/core/src/__tests__/graph.test.ts` — расширять при изменении
  поведения router'а

### Стили
- `packages/styles/components/diagram.css`

### Showcase (только этот компонент)
- `examples/showcases/src/showcases/workflow-editor/WorkflowEditorApp.tsx`
- `examples/showcases/src/showcases/workflow-editor/**` если возникнут
  shared-файлы для этого showcase

### Демо (Diagram-страница)
- `examples/demo-vue/src/demos/diagram/**` и `diagram-doc/**` —
  дополнить примерами DnD/router (только если в React-демо есть
  аналог; иначе finding).
- `examples/demo/src/demos/diagram/**` и `diagram-doc/**` — аналогично.

### Документация
- `docs/_streams/{decisions,findings,done}/T-Diagram-Polish.md`

## Зона файлов (НЕЛЬЗЯ трогать)

- `packages/react/src/components/**` кроме `complex/Diagram/**`
- `packages/vue/src/components/**` кроме `complex/Diagram/**`
- `packages/core/src/engines/**` кроме `graph/**`
- `packages/styles/components/*.css` кроме `diagram.css`
- `examples/showcases/src/showcases/**` кроме `workflow-editor/**`
- `examples/demo-vue/src/demos/components/*` (зона 3.3a Wrappers-Parity)
- `examples/demo-vue/src/demos/<comp>/**` для **не**-`diagram` компонентов
  (зона 3.2/3.3)
- `examples/demo-vue/src/router/**`, `nav.ts`, `App.vue`, `main.ts`,
  `i18n/**` — не правим
- Тесты других компонентов
- `package.json` любого пакета — без `pnpm install`
- `.size-limit.json` — лимиты не двигать; если build раздулся → finding

## Разделение зон с другими стримами 3.3

| Стрим | Что трогает | Конфликт с этим? |
|---|---|---|
| 3.3a Wrappers-Parity | `examples/demo-vue/src/demos/components/*` + `style.css` + `i18n/**` | нет |
| 3.3b Components-DOM-Parity | `packages/vue/src/components/**` все компоненты, но **исключая `complex/Diagram/**`** | нет (см. ниже) |
| 3.3 PostMigration-Audit | `examples/demo-vue/src/demos/<comp>/**`, shell CSS | нет |

**Важно для 3.3b:** карта `T-Vue-Components-DOM-Parity` теперь явно
**пропускает** `packages/vue/src/components/complex/Diagram/**` (зона
этого стрима). 3.3b не должна одновременно править Diagram.vue.

## ⚠️ Правила автономности

Не останавливаться, не задавать вопросов. Решения вне карты —
`docs/_streams/decisions/T-Diagram-Polish.md`. Пропуски и breaking
changes — `docs/_streams/findings/T-Diagram-Polish.md`. В конце —
отчёт `docs/_streams/done/T-Diagram-Polish.md`. Никаких
`git commit`/`push`/`pnpm install`. Не лезь в чужие зоны.

Если правка ломает существующие тесты `graph.test.ts` — сначала
понять **почему** (возможно тест отражает старый бажный кейс),
обновить тест и **зафиксировать** в decisions; если не уверен —
finding и не трогаем.

## Что починить (минимум)

### 1. DnD из палитры на канвас

Текущее поведение: клик по кнопке палитры выбирает её, но drag не
переносит узел на канвас. Нужно:

- В `WorkflowEditorApp.tsx` (или новый shared-компонент `Palette.tsx`
  рядом) — повесить на пункты палитры HTML5 DnD (`draggable="true"`,
  `onDragStart` → `dataTransfer.setData('application/x-sg-node',
  JSON.stringify(template))`).
- В `Diagram.tsx` (React) и `Diagram.vue` (Vue) — на корневом
  `.sg-diagram` повесить `onDragOver` (preventDefault) и `onDrop` →
  декодировать template, преобразовать координаты курсора в
  координаты канваса (учитывать `transform: scale + translate` если
  есть), вызвать GraphEngine `addNode`/`createNode`.
- Если такого публичного API в `GraphEngine` нет — **добавить**
  опциональный метод `createNode({ type, position })`. Это **дополнение
  API**, не breaking change.
- Покрыть тестом в `graph.test.ts` (создание узла по координатам).

Альтернативно, если DnD считается «делом showcase, не пакета» — в
showcase-файле смонтировать вручную через `useRef` к `.sg-diagram`
+ document listeners, и зафиксировать решение в decisions.

### 2. Маршрутизация рёбер

`packages/core/src/engines/graph/router.ts` — отвечает за прокладку
ортогональных линий. Текущие проблемы (по скриншоту):

- Линии пересекают сами узлы → нужно учитывать `obb` (oriented
  bounding box) при выборе waypoint'ов.
- Углы не выровнены → router должен возвращать целочисленные шаги
  (snap к сетке).
- Конечные точки выходят из неправильной грани узла → выбирать
  ближайшую грань source/target (top/right/bottom/left) исходя из
  относительной позиции.

Проверить `obb.ts` — оттуда брать прямоугольник узла + отступ
(padding). Расширить тест `graph.test.ts` под кейсы:
- два узла рядом по горизонтали → линия `right → left`;
- узел сверху + узел снизу → `bottom → top`;
- линия не пересекает третий узел между ними (огибает).

### 3. Visual polish (`packages/styles/components/diagram.css`)

- Цвета бэкграунда сетки (точки/линии) — сейчас, по скриншоту,
  используется крупная клетка. React/Vue визуал должен быть один.
- Тени узлов, подсветка hover, focus-ring — синхронизировать с
  остальными компонентами `sg-*`.
- Палитра (`sg-diagram-palette` или эквивалент) — оформление пунктов,
  hover, drag-cursor (`grab`/`grabbing`).

### 4. Парность React ↔ Vue

После всех правок React и Vue версии Diagram **должны иметь одинаковый
DOM, классы, события и публичный API**. Чек-лист:

- Список props совпадает (`nodes`, `edges`, `onChange`, `onSelect`,
  `routerMode`, `lassoMode`, ...).
- DOM root: `<div class="sg-diagram">…</div>` в обеих реализациях.
- Sub-классы (`sg-diagram-canvas`, `sg-diagram-node`, `sg-diagram-edge`,
  `sg-diagram-palette`, ...) одинаковы.
- События `select`/`change`/`dropNode` — одинаковая сигнатура.
- Имена методов на ref/expose (`fitView()`, `print()`, `zoomTo()`,
  ...) — одинаковы.

## Чек-лист

### Шаг 0. Прочитать обязательное (~30 мин)

- `packages/react/src/components/complex/Diagram/*.tsx`
- `packages/vue/src/components/complex/Diagram/*.{vue,ts}`
- `packages/core/src/engines/graph/*.ts`
- `packages/core/src/__tests__/graph.test.ts`
- `packages/styles/components/diagram.css`
- `examples/showcases/src/showcases/workflow-editor/WorkflowEditorApp.tsx`
- `examples/demo/src/demos/diagram/*.demo.tsx` (как образец примеров)

### Шаг 1. Воспроизвести проблему (~15 мин)

`pnpm --filter showcases dev` (или эквивалент) → открыть «Редактор
процессов», убедиться:
- DnD реально не работает (не создаётся узел).
- Линии реально пересекают узлы.

Сделать **скриншот before** в
`docs/_streams/audit/screenshots/diagram-before.png`.

### Шаг 2. Починить router (~60–120 мин)

- Расширить `router.ts` под `obb`-aware маршрутизацию.
- Добавить тесты в `graph.test.ts`.
- `pnpm --filter @skygraph/core test --run` — зелёный.

### Шаг 3. Починить DnD (~60 мин)

- Палитра в showcase + handler в Diagram (React + Vue одновременно,
  чтобы парность сохранялась).
- Тест: программно создать DnD event и проверить что `onChange`/
  `dropNode` стрельнул.

### Шаг 4. Visual polish (~30 мин)

- `diagram.css` — синхронизировать grid, узлы, рёбра, палитру.
- Hover/focus-ring, drag-cursor.

### Шаг 5. React↔Vue parity check (~30 мин)

- Сравнить DOM/класcы/props/events React vs Vue (см. §«Парность»).
- Если расходится → исправить менее завершённую сторону.

### Шаг 6. Дополнить демо (~30 мин)

- Если в React `examples/demo/src/demos/diagram/` уже есть
  пример DnD/Router — повторить в Vue (`examples/demo-vue/src/demos/diagram/`).
- Если в React нет — finding, не зарождаем.

### Шаг 7. Финал

```text
pnpm --filter @skygraph/core typecheck && pnpm --filter @skygraph/core test --run && pnpm --filter @skygraph/core build
pnpm --filter @skygraph/react typecheck && pnpm --filter @skygraph/react build
pnpm --filter @skygraph/vue typecheck && pnpm --filter @skygraph/vue build
pnpm --filter showcases build
pnpm --filter demo-vue build
pnpm size
```

Все зелёные. Если size упал — finding, не повышать лимит.

Скриншот **after** в `docs/_streams/audit/screenshots/diagram-after.png`,
визуально сравнить с before.

## Acceptance criteria

- В showcase «Редактор процессов» работает DnD из палитры на канвас:
  пункт перетащился → узел появился в указанной позиции.
- Линии связей не пересекают узлы, выровнены по сетке, выходят из
  ближайших граней.
- React-Diagram и Vue-Diagram имеют одинаковый DOM/классы/props/events.
- `pnpm --filter @skygraph/core test --run` зелёный, новые тесты
  router'а добавлены.
- `pnpm --filter @skygraph/{core,react,vue} build` зелёные.
- `pnpm --filter showcases build` зелёный.
- `pnpm size` зелёный, лимиты Vue (90/160 KB) не подняты.
- Отчёт `docs/_streams/done/T-Diagram-Polish.md` сдан с before/after
  скриншотами, списком правок, перечнем добавленных тестов, секцией
  «Решения вне плана».

## Зависимости

- **Параллельно** с `T-Vue-Demo-Wrappers-Parity` (3.3a) и
  `T-Vue-Components-DOM-Parity` (3.3b). 3.3b явно исключает
  `packages/vue/src/components/complex/Diagram/**`.
- **До** `T-Vue-Demo-PostMigration-Audit` (3.3) — иначе аудит будет
  фиксировать те же проблемы Diagram, что чинит этот стрим.

---

## Текст запуска стрима (копипаст в новый таб Cursor)

```text
Ты — стрим T-Diagram-Polish (Волна 3.3c) в репозитории skygraph.

Задача: полная доводка компонента SgDiagram. По скриншоту showcase
«Редактор процессов» (workflow-editor/WorkflowEditorApp.tsx) видны
2 проблемы: (1) drag-and-drop из палитры на канвас не работает,
(2) маршрутизация рёбер некрасивая (линии пересекают узлы, обрываются
под странными углами). Полный фронт: починить router в
packages/core/src/engines/graph/router.ts, починить DnD в Diagram
(React + Vue одновременно), привести React↔Vue к паритету по DOM/
classes/props/events, отполировать diagram.css, при необходимости
дополнить demo-страницы Diagram.

Полная карта: docs/_streams/wave-3/T-Diagram-Polish.md

Правила автономности: не останавливаться, не спрашивать. Не лезь в
чужие зоны (только Diagram + graph engine + diagram.css + workflow-
editor showcase). Никаких git commit / pnpm install. В конце — отчёт
docs/_streams/done/T-Diagram-Polish.md с before/after скриншотами.

Старт: Шаг 0 (читать React/Vue Diagram + graph engine + showcase),
далее Шаг 1 (воспроизвести проблему).
```
