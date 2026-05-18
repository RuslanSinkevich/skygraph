# skygraph-react

SkyGraph for React — UI components, hooks and the matching CSS bundle in
a single package.

```bash
npm install skygraph-react
```

```tsx
import { Form, Field, SubmitButton } from 'skygraph-react'

function App() {
  return (
    <Form defaultValues={{ email: '' }}>
      <Field name="email" label="Email" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
```

That's it — no extra `@skygraph/styles` import, no separate `@skygraph/core`
install. The styles are pulled in automatically as a side effect of
importing from `skygraph-react`.

## What's inside

`skygraph-react` re-exports the full public API of `@skygraph/react`
and ships the same `@skygraph/core` runtime plus the shared CSS. Existing
imports from `@skygraph/core` / `@skygraph/react` / `@skygraph/styles`
keep working — this package is purely additive.

## License

MIT
