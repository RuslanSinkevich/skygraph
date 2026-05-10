# `scripts/`

Helper Node scripts for the SkyGraph monorepo. All of them are pure ESM and
run on Node 18+ without extra dev-dependencies.

| Script | Purpose |
|---|---|
| `audit-styles.mjs` | Static audit of `.sg-*` CSS class usage. |
| `check-tokens.mjs` | Verify CSS token references against `tokens.css`. |
| `check-no-important.mjs` | Forbid `!important` in component CSS. |
| `check-bundle-budget.mjs` | Sum every JS chunk shipped by `examples/demo` against a hard ceiling. |
| `gen-demo-page.mjs` | Scaffold a new demo page for `examples/demo` and/or `examples/demo-vue`. |

---

## `gen-demo-page.mjs`

Scaffolds a new demo page from the templates in `scripts/templates/`.

### Usage

```bash
node scripts/gen-demo-page.mjs --name <kebab-case> [options]
```

> No `pnpm` script wired in by default — see
> `docs/_streams/findings/T-Codegen.md` for the recommended
> `package.json` entry, which the CI stream will land.

### Options

| Flag | Type | Default | Description |
|---|---|---|---|
| `--name` | `<kebab-case>` | — (required) | Page id, e.g. `color-picker`. |
| `--framework` | `react` \| `vue` \| `both` | `both` | Which demo to generate. |
| `--locale-key` | `<camelCase>` | derived from `--name` | Locale key the skeleton expects in i18n dicts. |
| `--dry-run` | flag | `false` | Print actions, write nothing. |
| `--force` | flag | `false` | Overwrite existing files. |
| `-h`, `--help` | flag | — | Print usage and exit. |

### Examples

```bash
# Generate React + Vue skeletons.
node scripts/gen-demo-page.mjs --name color-picker

# Vue only, with an explicit locale key.
node scripts/gen-demo-page.mjs --name color-picker --framework vue --locale-key colorPicker

# Preview without touching the disk.
node scripts/gen-demo-page.mjs --name color-picker --dry-run
```

### What it creates / what is left to you

| Created automatically | Left to do by hand |
|---|---|
| `examples/demo/src/demos/<name>/<PascalName>.tsx` (when `--framework` includes `react`) | Route registration in `examples/demo/src/App.tsx`. |
| `examples/demo-vue/src/demos/<name>/<PascalName>.vue` (when `--framework` includes `vue`) | Route registration in `examples/demo-vue/src/App.vue` (or `src/router/index.ts`). |
| Imports of `useConfig` from the right adapter. | i18n entries in `examples/demo/src/i18n/dict-{en,ru}.ts` and `examples/demo-vue/src/i18n/dict-{en,ru}.ts` under the `--locale-key`. |
| Page heading, structural classes, TODO body. | The actual demo content. |

The generator deliberately avoids writing to `App.tsx` / `App.vue`,
`nav.ts`, locale dicts, or the root `package.json`, because those files
are touched by other parallel work streams (see
`docs/_streams/CHARTER.md` §4–§5).

### Templates

Source-of-truth templates live in `scripts/templates/`:

- `demo-page.react.tsx.tmpl`
- `demo-page.vue.vue.tmpl`

Placeholders inside templates:

| Placeholder | Replaced with | Example for `--name color-picker` |
|---|---|---|
| `__NAME__` | the raw `--name` value | `color-picker` |
| `__PASCAL__` | PascalCase of `--name` | `ColorPicker` |
| `__TITLE__` | Title Case of `--name` | `Color Picker` |
| `__LOCALE_KEY__` | `--locale-key` (camelCase) | `colorPicker` |

Editing a template propagates to every future page generated. The
generator never re-runs against existing pages (refuses to overwrite
unless `--force` is passed).

### Exit codes

| Code | Meaning |
|---|---|
| `0` | Success (or dry-run finished). |
| `1` | Bad CLI arguments / target already exists. |
| `2` | Internal error (template missing, fs failure). |

---

## `check-bundle-budget.mjs`

Hard ceiling on the **total** raw JS payload shipped by the React showcase
demo (`examples/demo/dist/assets/*.js`). Complements `.size-limit.json`
which only watches the main entry chunk — without this guard, every new
lazy-loaded showcase app silently grows the user's first-paint network cost.

### Usage

```bash
pnpm --filter demo build   # produce dist/assets/*.js first
pnpm bundle:check          # node scripts/check-bundle-budget.mjs
```

Output is a sorted table of every JS chunk plus total / budget / headroom,
followed by `OK` or `FAIL`. Exits `1` on overshoot, `0` otherwise.

### Updating the limit

The limit lives in a single constant, `TOTAL_BUDGET_BYTES`, near the top of
`check-bundle-budget.mjs` (currently `5_000_000`, baseline ≈ 3.5 MB raw).

Bump only when:

1. The increase is **intentional** (e.g. a new showcase app, a vendor
   upgrade, a real feature) — not because someone accidentally pulled in
   a heavyweight dep.
2. You round **up to a clean number** (e.g. 5 → 6 → 8 MB), not to the
   nearest byte. Tight budgets create ratchet noise on every PR.
3. You note the reason in the PR description so the next reviewer can
   tell intentional growth from regression.

### CI

The CI workflow runs `pnpm bundle:check` once after `pnpm build`, only on
the `ubuntu-latest` × `node 22` matrix cell — bundle size is platform- and
Node-version-independent.
