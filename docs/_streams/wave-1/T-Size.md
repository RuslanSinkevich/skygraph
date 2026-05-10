# T-Size — Bundle size guard

**Wave:** 1 (INFRA).
**Goal:** Зафиксировать baseline размеров бандла на каждый пакет. PR раздул → красный CI.

## Зона файлов

- `.size-limit.json` или `.size-limit.config.js` (новый, корневой)
- `package.json` (корневой) — добавить `size-limit` в `devDependencies` + script `size`
- `.github/workflows/ci.yml` (минимальная правка: добавить шаг `pnpm size`)
- `docs/_streams/decisions/T-Size.md` — пояснение базового лимита

## Чек-лист

1. Установить `size-limit` + `@size-limit/preset-small-lib` (для библиотек) и `@size-limit/preset-app` (для demo).
2. Прогнать `pnpm build` всех пакетов.
3. Зафиксировать в `.size-limit.json` baseline для каждого entry:
   - `@skygraph/core` — `dist/index.js` brotli
   - `@skygraph/react` — `dist/index.js` brotli
   - `@skygraph/vue` — `dist/index.js` brotli (CJS и ESM отдельно если хочешь)
   - `examples/demo` — `dist/assets/index-*.js` (через glob)
   - `examples/demo-vue` — то же
4. Лимит = текущий размер + 5% headroom. Чтобы пара мелких правок не сразу красила CI.
5. Скрипт корневой `pnpm size` запускает size-limit на всех entry.
6. Добавить в CI: `pnpm size` после `pnpm build`. Падение → красный.
7. Документация: `docs/_streams/decisions/T-Size.md` — формула лимитов и инструкция «как обновлять при намеренном росте».

## Acceptance criteria

- [ ] `pnpm size` зелёный на main после мержа.
- [ ] PR с искусственным увеличением (например, `import * as everything from 'lodash'` куда-то в react/vue) валит CI.
- [ ] Baseline закоммичен для всех 5 entry.
- [ ] CI runtime size-limit ≤ 1 минута.

## Стоп-лист

- НЕ оптимизировать пакеты ради меньшего размера в этом стриме. Только baseline.
- НЕ менять конфигурацию vite/rollup пакетов.
- НЕ ставить лимит «впритык» — будут ложные срабатывания на любую полезную правку.

## Зависимости

Нет. Параллельно с T-CI и T-API.

## Pre-PR команды

```bash
pnpm build
pnpm size
```
