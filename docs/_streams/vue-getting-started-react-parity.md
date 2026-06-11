# Vue Getting Started React Parity

## Goal

Make Vue `/#/guide/getting-started` match the quality and structure of React `/#/guide/getting-started`.

This is a separate stream from component demo parity. It can run in parallel because it should not touch component demo pages.

React reference:

- `examples/demo/src/demos/GettingStartedPage.tsx`
- route: `/#/guide/getting-started`

Vue target:

- `examples/demo-vue/src/guide/GettingStarted.vue`
- route: `/#/guide/getting-started`

## Scope

Allowed files:

- `examples/demo-vue/src/guide/GettingStarted.vue`
- Vue guide route/nav files only if broken links are found
- Vue i18n dictionaries/types for `gettingStarted`
- Vue guide/page CSS only if React parity requires it

Reference-only files:

- `examples/demo/src/demos/GettingStartedPage.tsx`
- React i18n dictionaries/types for `gettingStarted`
- React app CSS used by the guide page

Do not touch:

- component demos;
- `TokensOverride` demos;
- table/component parity work;
- React implementation, unless a separate issue explicitly says so.

## Rules

### React Is The Source Of Truth

Vue should match React in:

- section order;
- headings;
- lead text;
- code block order;
- next-card order;
- page layout classes;
- spacing and visual rhythm;
- light/dark behavior;
- route intent.

Vue should only differ where Vue needs different syntax:

- Vue SFC snippets;
- `script setup`;
- `v-model`;
- Vue event syntax;
- Vue package names/imports if the public API differs.

### Snippets Must Be Valid Vue Examples

The Vue code blocks must be copyable and teach Vue usage, not React usage with syntax swapped halfway.

Check:

- install commands;
- package names;
- style import note;
- basic form snippet;
- individual components snippet;
- `Button`, `Switch`, `Select` usage;
- `v-model` / props / emits syntax;
- whether imports match actual package exports.

### No Component Demo Work In This Stream

If this task reveals a broken component demo, write it down as a note and leave it for `vue-demo-react-parity.md`.

This stream only owns the Getting Started guide page and its direct navigation/source/text support.

## Current Known Context

Vue `GettingStarted.vue` is already a port of React `GettingStartedPage.tsx`, but it still needs a parity pass.

Areas to check carefully:

- Vue page links currently use guide-prefixed routes like `#/guide/theming` and `#/guide/core-api`; React source uses legacy short links in the file, while React app also supports guide routes. Confirm the intended final Vue links against Vue router/nav.
- Code snippets are stored as escaped strings in Vue. Make sure they render cleanly and remain readable in the browser.
- Package names in snippets must match the actual public packages used by this repo/docs.
- CSS parity depends on shared guide classes like `doc-page`, `doc-code`, `doc-card-row`, and `doc-next-card`.

## Work Plan

### 1. Compare Structure

Compare React and Vue pages section by section:

1. title and lead;
2. installation;
3. import styles;
4. basic form;
5. individual components;
6. what is next cards.

Record every difference as either:

- intended Vue syntax difference;
- route/link difference;
- real parity bug.

### 2. Compare I18n

Compare React and Vue `gettingStarted` dictionary entries:

- English;
- Russian;
- TypeScript i18n types.

Vue should not drift in meaning from React unless the text must mention Vue-specific syntax/package names.

### 3. Validate Code Snippets

For every Vue snippet:

- verify imports;
- verify component names;
- verify props/events;
- verify `v-model` usage;
- verify form API;
- verify Select options shape;
- verify no React-only syntax remains.

If snippets are too hard to read in escaped string form, consider a small local readability refactor inside `GettingStarted.vue`, but do not introduce hidden shared helpers.

### 4. Validate Links

Check all links:

- install/import styles note link;
- Theming card;
- Core API card;
- Components card;
- nav entry;
- footer links if touched.

Vue links should land on existing Vue routes. If React uses legacy aliases, Vue does not need to copy broken/legacy paths blindly.

### 5. Visual QA

Check Vue page against React:

- light theme;
- dark theme;
- desktop width;
- narrow/mobile width;
- code block overflow;
- next cards layout;
- typography and spacing.

### 6. Final Validation

Run focused checks:

- lint for touched Vue guide/i18n files;
- typecheck if practical;
- manual browser pass for `/#/guide/getting-started`.

## Checklist

| Area | Status | Notes |
|---|---:|---|
| React reference reviewed | [x] | `GettingStartedPage.tsx` + React i18n + `app.css`. |
| Vue page reviewed | [x] | `GettingStarted.vue` + Vue i18n + `style.css`. |
| Section order matches | [x] | Identical: title/lead → installation → import-styles → basic-form → individual-components → whats-next. |
| Text/i18n parity checked | [x] | Realigned Vue EN+RU `gettingStarted` to React meaning; only `installLeadNpm` keeps Vue wording ("Vue bindings" / "Vue-биндинги"). Types match. |
| Install snippets checked | [x] | `skygraph-vue` is the correct published package (npm/pnpm). |
| Import styles snippet checked | [x] | `// styles are loaded automatically by skygraph-vue`; note link `#/guide/theming`. |
| Basic form snippet checked | [x] | Fixed: `Sg`-prefixed imports, `@finish(values)`, password via `#default` slot + `SgInput type="password"` (SgField has no `type` prop). |
| Individual components snippet checked | [x] | Fixed: `SgButton`/`SgSwitch`/`SgSelect`; `v-model` instead of `v-model:checked` (SgSwitch emits `update:modelValue`). |
| Links checked | [x] | `#/guide/theming`, `#/guide/core-api`, `#/components/button` all resolve in `router/index.ts`. |
| CSS/layout parity checked | [x] | `.doc-page/.doc-lead/.doc-code/.doc-link/.doc-card-row/.doc-next-card` rules identical to React `app.css`. |
| Light theme checked | [x] | Page uses only shared `--sg-color-*` tokens; theme-agnostic. |
| Dark theme checked | [x] | Same — driven by app-level `data-sg-theme`, no page overrides. |
| Mobile/narrow layout checked | [x] | `doc-card-row` = `auto-fit minmax(180px, 1fr)`; `doc-code` has `overflow-x: auto`. Same as React. |
| Lint/typecheck done | [x] | `pnpm --filter demo-vue typecheck` → exit 0; no linter errors on touched files. |

### Parity bugs fixed in this pass

- Vue snippets imported React component names (`Form`, `Field`, `SubmitButton`, `Button`, `Switch`, `Select`) which do not exist in `skygraph-vue`. Real exports are `Sg`-prefixed (`SgForm`, `SgField`, `SgSubmitButton`, `SgButton`, `SgSwitch`, `SgSelect`); `SgInput` used for the password control.
- Basic form used `@submit="(values) => …"`, but `SgForm`'s `submit` event emits `{ values, valid }`; switched to `@finish` which emits plain `values` (matches React `onSubmit(values)`).
- `SgField` has no `type` prop (its fallback control is a plain text input), so React's `<Field type="password">` was ported to a `#default` slot wrapping `SgInput type="password"`.
- Individual-components used `v-model:checked` on the switch, but `SgSwitch` emits `update:modelValue`; changed to `v-model`.
- i18n `gettingStarted` (EN + RU) had drifted to Vue-flavoured copy; realigned to React meaning per "React is the source of truth".
- Import-styles note rendered a stray space before `).`; tightened the template so it reads `(see Theming).` like React.

No broken component demos were found within this stream's scope; no component demo files were touched.

## Done Criteria

This task is done when:

- Vue `/#/guide/getting-started` visually matches React quality;
- the page structure matches React;
- Vue snippets are valid and copyable;
- links resolve to existing Vue routes;
- texts are aligned with React meaning;
- no component demo files were touched;
- checks pass for touched files.

