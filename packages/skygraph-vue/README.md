# skygraph-vue

SkyGraph for Vue 3 — components, composables and the matching CSS bundle
in a single package.

```bash
npm install skygraph-vue
```

```vue
<script setup lang="ts">
import { SgForm, SgField, SgSubmitButton } from 'skygraph-vue'
</script>

<template>
  <SgForm :default-values="{ email: '' }">
    <SgField name="email" label="Email" />
    <SgSubmitButton>Submit</SgSubmitButton>
  </SgForm>
</template>
```

That's it — no extra `@skygraph/styles` import, no separate `@skygraph/core`
install. The styles are pulled in automatically as a side effect of
importing from `skygraph-vue`.

## What's inside

`skygraph-vue` re-exports the full public API of `@skygraph/vue` and
ships the same `@skygraph/core` runtime plus the shared CSS. Existing
imports from `@skygraph/core` / `@skygraph/vue` / `@skygraph/styles`
keep working — this package is purely additive.

## License

MIT
