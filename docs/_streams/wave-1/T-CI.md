# T-CI — CI matrix + pre-commit hooks

**Wave:** 1 (INFRA, mergeable first).
**Goal:** Расширить CI и добавить husky/lint-staged. Все остальные стримы блокируются красным CI.

## Зона файлов

- `.github/workflows/ci.yml` (правка)
- `.github/workflows/test-suites.yml` (новый, опционально)
- `.husky/pre-commit` (новый)
- `.husky/commit-msg` (новый, опционально)
- `package.json` (корневой) — `lint-staged` и `husky` в `devDependencies` + `scripts`
- `.lintstagedrc.json` (новый)

## Чек-лист

1. Существующий CI прогоняет `lint + typecheck + check:styles + audit:styles + build + test`. Расширить до:
   - Добавить per-package smoke checks (`pnpm --filter @skygraph/vue typecheck`, `pnpm --filter demo build`, `pnpm --filter demo-vue build`).
   - Job `windows-latest` для Node 22 (catch path-related issues).
2. Установить `husky` ≥ 9 + `lint-staged` ≥ 15 (через `pnpm add -D -w husky lint-staged`).
3. `.husky/pre-commit`:
   - `pnpm lint-staged` (форматтер на staged-файлах)
   - `pnpm typecheck` (быстрый vue-tsc/tsc по проекту)
4. `.lintstagedrc.json`: ESLint + Prettier для `*.{ts,tsx,vue,css,md}`.
5. В `package.json` корневой: `"prepare": "husky"`.
6. Добавить commit-msg валидацию (Conventional Commits) — опционально.
7. Скрипт `pnpm prepare:hooks` который ставит husky локально.
8. Документация: `CONTRIBUTING.md` обновить с инструкцией про hooks.

## Acceptance criteria

- [ ] `git commit` локально запускает hooks.
- [ ] CI matrix даёт 4 jobs: ubuntu Node 18/20/22 + windows Node 22.
- [ ] Все 4 jobs зелёные на main после мержа.
- [ ] PR из feature-ветки запускает все 4 jobs.
- [ ] `lint-staged` правит только staged-файлы, не лезет в чужие.

## Стоп-лист

- НЕ менять `tsconfig.json` пакетов.
- НЕ добавлять формат-правила, которые приведут к массовому диффу.
- НЕ запускать full lint на pre-commit (только на staged).

## Зависимости

Нет. Стартует первым.

## Pre-PR команды

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
pnpm test
git commit -m "test" --allow-empty   # должен сработать pre-commit
```
