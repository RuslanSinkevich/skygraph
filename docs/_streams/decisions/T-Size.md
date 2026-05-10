# T-Size — decisions

## Формула лимитов

`limit = ceil(current * 1.05)` (5% headroom). Цель — не падать на каждой
осмысленной правке, но ловить заметные раздувания (типичная регрессия —
случайный barrel-import всей библиотеки или забытый `import * from`).

## Метрика

`brotli` для всех entry — единая компрессия по всему проекту. Даёт
числа, ближе к реальной production-передаче (CDN с brotli включён по
дефолту).

## Список entry

| Entry | Файл(ы) | Лимит | Источник лимита |
|---|---|---|---|
| `@skygraph/core (esm)` | `packages/core/dist/index.js` | 60 KB | initial guess (нет dist во время baseline) |
| `@skygraph/react (esm)` | `packages/react/dist/index.js` | 250 KB | initial guess (нет dist во время baseline) |
| `@skygraph/vue (esm)` | `packages/vue/dist/index.js` | 75 KB | замер: 67 KB → +5% → 70 KB → округление вверх |
| `@skygraph/vue (cjs)` | `packages/vue/dist/index.cjs` | 65 KB | замер: 60 KB → +5% → 63 KB → округление вверх |
| `examples/demo (all chunks)` | `examples/demo/dist/assets/*.js` | 1 MB | замер: 720 KB total → +5% → 760 KB → округление до удобного числа с запасом на rebuild-вариативность |
| `examples/demo-vue (all chunks)` | `examples/demo-vue/dist/assets/*.js` | 200 KB | initial guess (нет dist во время baseline) |

Числа `core/react/demo-vue` пересчитываются автоматически в финальной
sanity-фазе после первого `pnpm install` + полного `pnpm build` —
результат `pnpm size --json` даёт реальный baseline, после которого
лимиты обновляются по формуле выше и закоммичиваются вместе с этим
PR-ом (см. отчёт `done/T-Size.md`).

## Как обновлять при намеренном росте

1. Сначала **пойми, почему растёт**. Чаще всего — лишний import.
2. Если рост обоснован (новый компонент, нужная фича):
   ```bash
   pnpm --filter <pkg> build
   pnpm size            # видишь, насколько превышен лимит
   ```
3. Подними лимит в `.size-limit.json` по формуле `current * 1.05`,
   но не больше `current * 1.20` за один PR. Если нужно больше —
   разбей на несколько PR и зафиксируй причину в commit-message.
4. Закоммить `.size-limit.json` вместе с фичей.

## Стоп-лист (повтор из task-карты)

- НЕ оптимизировать пакеты ради меньшего размера в этом стриме. Только
  baseline.
- НЕ менять конфигурацию vite/rollup пакетов.
- НЕ ставить лимит «впритык» — будут ложные срабатывания на любую
  полезную правку.

## Почему `@size-limit/file`, а не webpack/esbuild checker

В конфиге намеренно НЕТ полей `"import"` / `"webpack"` / `"esbuild"`.
Это означает что size-limit использует `@size-limit/file` —
просто меряет brotli уже готового `dist/`-файла.

Webpack-checker полезен для tree-shaking analysis («сколько весит этот
конкретный экспорт»), но для INFRA-сетки этого не нужно: мы хотим
поймать раздувание собранного артефакта, а не переанализировать его
заново. Артефакт собран `tsup` / `vite build` пакета — он и есть
истина. Webpack-checker внёс бы лишнюю зависимость от webpack-config'а
в каждом пакете и замедлил бы CI.
