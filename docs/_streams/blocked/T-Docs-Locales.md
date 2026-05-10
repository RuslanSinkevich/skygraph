# T-Docs-Locales — blocked (typedoc генерация)

## Что заблокировано

Часть 1 task-карты — «прогнать `npx typedoc`, убедиться что генерация
проходит» — заблокирована до установки зависимостей.

## Причина

`typedoc` отсутствует в репозитории:

```
> Get-ChildItem -Path node_modules\.pnpm -Filter "typedoc*" -Directory
> # пусто
> Select-String -Path package.json -Pattern "typedoc"
> # ничего не найдено
```

Запускать `pnpm install` запрещено CHARTER §5 («НЕ запускать
`pnpm install`») и явной hard-constraint пользователя.

## Что сделано вместо этого

- `typedoc.json` создан в корне репозитория с финальной конфигурацией:
  - `entryPoints`: `packages/{core,react,vue}/src/index.ts`
  - `entryPointStrategy: "expand"`
  - `out: "docs/api"`
  - `excludePrivate: true`, `excludeInternal: true`
  - `tsconfig: "tsconfig.base.json"`
  - `validation.invalidLink: true` (теперь, после T-React-Cleanup,
    ни одного `ae-unresolved-link` нет → typedoc не должен ругаться).
- Папка `docs/api/` пока не создаётся — её создаст `typedoc` при первом
  запуске после установки.

## Что должно произойти дальше (вне моего scope)

1. Кто-то с правом на корневой `package.json` (зона T-CI или владелец
   репо) добавит:
   ```json
   "devDependencies": { "typedoc": "^0.27.0" },
   "scripts": { "docs": "typedoc" }
   ```
2. Запустится `pnpm install`.
3. `pnpm docs` сгенерирует HTML в `docs/api/`.
4. `.gitignore` нужно проверить на `docs/api/` (см. `findings/T-Docs-Locales.md`).

## Никаких побочных правок

- Корневой `package.json` не изменён.
- `.gitignore` не изменён.
- `tsconfig.base.json` не изменён.
