# T-React-Cleanup — findings (вне scope)

## `pnpm --filter demo build` красный из-за зоны T-Showcases-I18n

`examples/demo/src/pages/Showcases/ShowcasesPage.tsx` импортирует
напрямую из `examples/showcases/src/ShowcasesViews.tsx` (новый файл
T-Showcases-I18n). В то же время
`examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx`
(тоже новый файл T-Showcases-I18n) обращается к `ShowcasesLocale['apps']`,
но в `examples/_shared/src/showcasesLocale.ts` поля `apps` ещё нет —
T-Showcases-I18n в процессе работы.

```
examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx(35,62):
  error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx(37,20):
  error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
examples/showcases/src/showcases/_shared/showcaseLocaleContext.tsx(39,17):
  error TS2339: Property 'apps' does not exist on type 'ShowcasesLocale'.
```

`examples/_shared/src/showcasesLocale.ts` — зона T-Showcases-I18n
(см. CHARTER §4 «Карта зон»). Не трогаю, фиксирую как finding.

После того как T-Showcases-I18n закроет свой scope (расширит
`ShowcasesLocale` полем `apps`), demo build снова станет зелёным без
участия React-группы.

## Воспроизведение

```bash
# clean tsbuildinfo cache (после моих типовых правок)
rm examples/demo/node_modules/.tmp/tsconfig.app.tsbuildinfo
pnpm --filter demo build
```

В логе остаются только 3 ошибки выше из showcases. По моим файлам
`@skygraph/react` ошибок нет — `pnpm --filter @skygraph/react typecheck`
/ `test` / `build` / `api:check` все зелёные.
