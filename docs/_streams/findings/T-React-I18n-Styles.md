# T-React-I18n-Styles — findings (вне scope)

## `pnpm --filter demo build` красный из-за зоны T-Showcases-I18n

После моих изменений `pnpm --filter demo build` падает не на типах
`@skygraph/react`, а на новых файлах T-Showcases-I18n:

```
../showcases/src/showcases/ecommerce/CustomersTab.tsx(12,9):
  error TS6133: 'c' is declared but its value is never read.
../showcases/src/showcases/ecommerce/CustomersTab.tsx(13,9):
  error TS6133: 'orderStatusLabel' is declared but its value is never read.
```

`examples/showcases/src/showcases/**/*.tsx` — зона T-Showcases-I18n (см.
CHARTER §4 «Карта зон»). Не трогаю, фиксирую как finding.

`@skygraph/react` сам по себе остаётся полностью зелёным:

```
pnpm --filter @skygraph/react typecheck   # OK
pnpm --filter @skygraph/react test        # 626 passed | 2 skipped
pnpm --filter @skygraph/react build       # OK
pnpm --filter @skygraph/react api:check   # OK (после api:update — см. decisions/)
pnpm check:styles                         # OK (check-tokens + check-no-important)
```

После того как T-Showcases-I18n закроет свой scope, demo build снова
станет зелёным без участия React-группы.
