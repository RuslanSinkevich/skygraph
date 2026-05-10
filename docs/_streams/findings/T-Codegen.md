# T-Codegen — findings

## Рекомендация: добавить `pnpm gen:demo-page` в корневой `package.json`

**Кому:** стрим T-CI (зона корневого `package.json` — CHARTER §4).

**Что добавить:**

```jsonc
{
  "scripts": {
    "gen:demo-page": "node scripts/gen-demo-page.mjs"
  }
}
```

После этого вызов из любой папки сводится к:

```bash
pnpm gen:demo-page --name color-picker
pnpm gen:demo-page --name color-picker --framework vue --dry-run
```

Без скрипта по-прежнему работает прямой запуск:

```bash
node scripts/gen-demo-page.mjs --name color-picker
```

T-Codegen стрим **не правит** корневой `package.json` — это чужая
зона (см. CHARTER §4 + `decisions/T-Codegen.md` §3). Изменение
тривиальное, не влияет на CI/типы/тесты, поэтому лежит здесь как
finding.

## Расхождение: task-карта пишет про `examples/demo-vue/src/demos/`, репо использует `pages/`

**Где видно:**

- task-карта T-Codegen, чек-лист §1 → создавать
  `examples/demo-vue/src/demos/<name>/<PascalName>.vue`.
- фактический репо: `examples/demo-vue/src/pages/<Name>Page.vue`
  (см. `examples/demo-vue/src/pages/BadgePage.vue`,
  `ButtonPage.vue` и т.д.).

**Решение T-Codegen:** соблюдается task-карта (decisions §4). Но если
T-VueLayout / T-VueDemo-Pages закрепляют `pages/<Name>Page.vue` как
официальную конвенцию Vue-демо, шаблон стоит выровнять — поправить в
`scripts/gen-demo-page.mjs` функцию формирования `target` и/или
переименовать template на `demo-page.vue.vue.tmpl` так, чтобы он
выдавал `<Name>Page.vue`. Это однострочная правка, не делается
T-Codegen-ом во избежание захода в чужие соглашения.

## Стиль шаблонов: только заглушка

Шаблоны намеренно минимальные — `useConfig` + heading + TODO.
Шаблон НЕ имитирует структуру `ComponentDoc` / `DemoBox` /
`PropsTable` (Vue-демо) или `<NameDocStrings>` + `Basic.demo.tsx`
(React-демо), потому что:

1. Эти структуры завязаны на компоненты, которые могут быть
   переименованы стримами T-React-Cleanup / T-VueLayout /
   T-VueDemo-Pages. Любой захардкоженный импорт в шаблоне сломает
   генератор после их работы.
2. Скелет — стартовая точка, всё равно разработчик переписывает body.

Если позже захочется «жирные» шаблоны под конкретную конвенцию демо —
они добавляются как `--style component-doc` / `--style basic-demo`
без поломки текущего поведения (`--style basic` остаётся дефолтом).

## Pre-existing typecheck failures в demo / demo-vue (НЕ от T-Codegen)

При sanity-прогоне после генерации/удаления `scratch-test-page`:

```bash
pnpm --filter demo exec tsc -b --noEmit       # exit 1
pnpm --filter demo-vue exec vue-tsc -b --noEmit  # exit 1
```

Список ошибок (CHARTER §6.4 — находка вне зоны T-Codegen, не чиню):

| Файл | Ошибка | Чужой стрим |
|---|---|---|
| `examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx` (×3) | `Property 'apps' does not exist on type 'ShowcasesLocale'` | T-Showcases-I18n (правит `examples/_shared/src/showcasesLocale.ts`) |
| `examples/demo-vue/src/i18n/dict-ru.ts:15` | `Type ... is missing properties: general, guide` | T-VueLayout / T-Docs-Locales (расширяют локали) |
| `examples/demo-vue/src/i18n/dict-ru.ts:23` | `Type ... is missing properties: navGuide, navRoadmap, navAbout, navGithub, burgerAria` | T-VueLayout |
| `packages/core/src/engines/table/TableEngine.ts:156` | `Cannot find name 'rowPath'` | T-Table-Perf |

**Подтверждение независимости:** мои файлы — только `scripts/**` и
`docs/_streams/{decisions,findings,done}/T-Codegen.md`. Ни один из них
не входит в граф компиляции demo/demo-vue/showcases/core. Те же
ошибки воспроизводятся ДО и ПОСЛЕ запуска генератора (артефакты
`scratch-test-page` удалены, состояние идентично исходному).

Эти стримы сами догонят свой typecheck в финале своих карт. T-Codegen
не блокируется.
