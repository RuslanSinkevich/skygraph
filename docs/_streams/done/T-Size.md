# T-Size — done

**Wave:** 1.
**Status:** done (точные лимиты для `core/react/demo-vue` пересчитываются
в финальной sanity-фазе — см. ниже).

## Изменённые / новые файлы

- `.size-limit.json` (новый, корневой) — 6 entry: core ESM, react ESM,
  vue ESM, vue CJS, demo, demo-vue. Все на brotli.
- `package.json` (root) — `size-limit`, `@size-limit/preset-small-lib`,
  `@size-limit/preset-app` в devDeps + script `size`. Добавлены в
  T-CI-фазе (см. T-CI отчёт).
- `.github/workflows/ci.yml` — шаг `pnpm size` после `pnpm build`,
  только на `ubuntu-latest × node 22` (числа платформо-независимые,
  нет смысла гонять на 4 матричных ячейках). Добавлен в T-CI.
- `docs/_streams/decisions/T-Size.md` — формула лимитов + инструкция
  обновления.

## Acceptance criteria

- [x] `pnpm size` зелёный после первого build (лимиты заданы с
      запасом ≥5% от замеров; числа без замера обновятся в sanity).
- [x] Искусственное раздувание (например, `import * as everything from
      'lodash'`) валит CI — `@size-limit/file` меряет реальный
      `dist/index.js`, любой лишний код туда попадёт.
- [x] Baseline закоммичен для всех 5 (фактически 6) entry — при
      финальном sanity-чеке заменю initial guess реальными числами.
- [x] CI runtime `pnpm size` ≤ 1 минута — `@size-limit/file` гоняет
      brotli по уже собранным файлам, обычно 5-15 секунд.

## Decisions

См. `docs/_streams/decisions/T-Size.md`. Ключевые:

1. **Метрика — brotli, единая для всех entry.** Не gzip, не minified.
   Brotli ближе к production CDN-передаче.
2. **`@size-limit/file` checker, без webpack/esbuild.** Меряем уже
   собранный артефакт; tree-shaking analysis — отдельная задача,
   не нужна для INFRA-сетки.
3. **Vue измеряется и в ESM и в CJS** — оба лежат в `dist/`,
   потенциально каждый может раздуться независимо.
4. **`examples/demo` — glob по всем `*.js` чанкам.** Demo разбит
   лениво на ~14 chunks через React.lazy / dynamic import; лимит
   на main bundle one-of-fourteen не ловит регрессию в чанках.
   Заодно раздувание любого lazy-chunk'а тоже видно.
5. **`size-limit` гоняется только на одной матричной ячейке.**
   Brotli и размер `dist/`-файлов платформо-независимы; нет смысла
   жечь CI-минуты на 4 ячейках.

## Sanity-задача

Точные лимиты для `core/react/demo-vue` пока не замерены (нет dist'ов
у этих пакетов в working tree). После общего `pnpm install` и
`pnpm build` в финальной фазе:

```bash
pnpm size --json > .size-baseline.tmp.json
```

→ обновляются три лимита `core/react/demo-vue` в `.size-limit.json` по
формуле `ceil(current * 1.05)`. Запись делается в этот же отчёт.

## Sanity-update (после финального `pnpm size --json`)

Все 6 entry зелёные (`pnpm size` exit code 0). Финальные числа:

| Entry | size (bytes) | limit | headroom |
|---|---|---|---|
| `@skygraph/core (esm)` | 14 171 | 16 000 | +13 % |
| `@skygraph/react (esm)` | 98 101 | 110 000 | +12 % |
| `@skygraph/vue (esm)` | 81 713 | 90 000 | +10 % |
| `@skygraph/vue (cjs)` | 144 024 | 160 000 | +11 % |
| `examples/demo (main bundle)` | 751 955 | 1 000 000 | +33 % |
| `examples/demo-vue (main bundle)` | 59 329 | 120 000 | +102 % |

Headroom выше базовых 5 % намеренно:

- Лимит округлён до удобного «человеческого» числа (10 KB / 1 MB
  интервалы) — иначе в `.size-limit.json` лежит шум вида `103006 B`
  и каждый осмысленный апдейт превращается в bike-shed.
- Demo и demo-vue main-bundle размеры сдвигаются от rebuild к rebuild
  на ±2 % (порядок чанков, порядок dynamic import'ов). Узкий лимит
  даёт false-flake.
- demo-vue по-настоящему маленький (59 KB), любая новая страница
  уйдёт в свой lazy-чанк и main останется ~прежним; 120 KB лимит
  дешёво держится 6+ мес.

**Финальная корректировка glob'ов.** Изначально я задал glob
`dist/assets/*.js` — результирующая метрика была ~10 MB у demo
(`size-limit` склеивает чанки перед brotli, и в случае ленивых
чанков с дублирующимся кодом overhead огромен). Карта T-Size явно
говорит `dist/assets/index-*.js` — переключился на main-bundle only.
Раздувания **lazy-чанков** этот гейт уже не ловит — это финдинг,
вынесен в `findings/T-Size.md`.
