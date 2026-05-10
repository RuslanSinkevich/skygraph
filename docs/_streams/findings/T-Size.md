# T-Size — findings

## Lazy-chunks demo не покрыты size-limit

**Что:** glob в `.size-limit.json` для `examples/demo` —
`dist/assets/index-*.js`, ловит только main bundle (~750 KB brotli).
Лениво загружаемые чанки (Showcases, Benchmarks, Charts, etc. —
`AdminApp-*.js`, `dashboard-*.js`, `WorkflowEditorApp-*.js`, всего ~13)
не входят ни в одну entry size-limit.

**Почему так оставлено:** карта T-Size явно требует
`dist/assets/index-*.js`. При попытке glob'а `*.js` size-limit рапортует
~10 MB total (склеивает чанки и compress'ит вместе, плюс служебный
overhead) — это число неинтерпретируемо как лимит и приводит к flake.

**Риск:** регрессии типа «забытый barrel-import recharts в
AdminApp.tsx» не упадут на size-limit гейте; их поймает разве что
ручной аудит билда. Если станет проблемой — нужно либо:

1. Заменить single-glob entry на отдельные entry per-chunk (хрупко —
   имена чанков hash'ируются), либо
2. Добавить кастомный node-скрипт `scripts/check-bundle-budget.mjs`,
   который суммирует raw bytes всех `dist/assets/*.js` и валит при
   превышении total budget. Это уже отдельный стрим, не INFRA-сетка.

## Vue dist/index.d.ts ссылается на `core/src/*.ts` относительными
## путями

**Что:** `vite-plugin-dts` с `rollupTypes: true` и `alias` для
`@skygraph/core` оставляет в `packages/vue/dist/index.d.ts` строки вида
`from '../../core/src/index.ts'` (десятки штук, см. сырой grep).

**Почему важно:** api-extractor пытается загрузить `.ts` файл как
declaration — выкидывает `ae-wrong-input-file-type` (fatal). Чтобы
получить baseline я подавил это сообщение в `packages/vue/api-extractor.json`
(см. `decisions/T-API.md` в части vue). Это маскирует, не чинит.

**Корень:** vite-plugin-dts должен был свернуть типы core полностью в
один rolled-up `.d.ts` или оставить `from '@skygraph/core'` (резолв
через `bundledPackages`). Сейчас не делает ни того ни другого.

**Зона:** `packages/vue/vite.config.ts` — не моя зона (T-Vue-Cleanup
или новый стрим). Не трогаю.

**Workaround на стороне T-API:** `bundledPackages: ["@skygraph/core"]`
в `packages/vue/api-extractor.json` сейчас пуст — добавить туда
`@skygraph/core` не помогает, потому что imports относительные, а не
по имени пакета. Полное решение — починить vite-plugin-dts конфиг.
