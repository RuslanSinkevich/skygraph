# Vue Demo React Parity

## Goal

Bring `examples/demo-vue` to the same quality level as `examples/demo`.

React demo is the source of truth for this work:

- visual layout;
- component scenarios;
- tokens and styling;
- demo order;
- open-code UX;
- texts and descriptions where they are framework-neutral.

Vue should differ only where Vue API requires it: `v-model`, slots, emits, Vue-specific naming and template syntax.

Important context: Vue demo is visibly broken or inconsistent in several places today. Treat this as a parity and repair pass, not just a style cleanup. Pay special attention to demos that look correct in React but degrade in Vue.

## Scope

Primary scope:

- `examples/demo-vue/src/demos/**`;
- Vue component demo pages;
- Vue demo source shown by "open code";
- Vue token override demos;
- Vue hidden data/config/helper imports used by demos.

Reference scope:

- `examples/demo/src/demos/**`.

React is used as a reference. Do not rewrite React demos during this parity pass unless a separate issue explicitly asks for it.

## Non-Goals

- Do not redesign the React demo.
- Do not invent Vue-only visual variants when React already has a good demo.
- Do not refactor component library internals unless a Vue demo exposes a real component bug.
- Do not hide important demo behavior behind new shared helpers.

## Rules

### React Is Canonical

For every Vue demo, first check the React equivalent.

Vue must match React in:

- scenario set;
- card/block order;
- token values;
- spacing and layout;
- light/dark behavior;
- empty/loading/disabled/error states;
- popup/dropdown behavior where applicable.

### Open Code Must Teach Usage

When a developer opens code, the code must be understandable without knowing internal demo infrastructure.

Keep visible in the main demo source:

- component imports;
- props;
- state;
- handlers;
- slots/render logic;
- token scopes;
- wrapper styles that explain the example;
- important config that demonstrates the component API.

Allowed hidden/imported pieces:

- i18n/demo-shell infrastructure;
- large neutral mock data;
- large option lists;
- large static tree data;
- large row datasets;
- large configs only if they are not the point of the example.

Not allowed to hide:

- styling tokens that are the point of the demo;
- behavior handlers;
- validators/formatters/filter logic when they explain the feature;
- render/slot logic when it is the feature;
- wrappers/layout that explain token scoping.

### Hidden Sources

If a demo imports large data/config from another file, the source viewer should expose it as an optional extra source block.

Examples:

- `user-table.data.ts`;
- `user-table.columns.ts`;
- `tree.demo-data.ts`;
- `select.options.ts`;
- `transfer.items.ts`;
- `upload.fixtures.ts`.

The block label should match the import or filename. If there is no extra source file, do not show an extra block.

## Work Plan

### 0. Execution Order

Start with the heaviest and riskiest components while the full context is still fresh.

Do not begin with simple display components like `avatar`, `badge`, `empty`, `spin`, or `progress`. They are cheaper and can wait until the risky API-heavy pages are done.

Priority order:

1. `table` first. It has the highest risk because it combines columns, data, row states, sorting/filtering/pagination, scroll/fixed layout, empty/loading states, dark theme, and hidden source concerns.
2. Data-heavy/tree-like components: `transfer`, `tree`, `treeselect`, `cascader`, `select`.
3. Popup and form controls: `datepicker`, `timepicker`, `autocomplete`, `input`, `inputnumber`, `dropdown`, `tooltip`, `upload`.
4. Layout and complex content components: `descriptions`, `calendar`, `menu`, `tabs`, `steps`, `collapse`, `drawer`, `modal`, `notification`.
5. Remaining simple/display components: everything else.

### 1. Inventory

Create an inventory of React and Vue demo pages.

For each shared component, record:

- React page exists;
- Vue page exists;
- demo list matches;
- Vue has missing demos;
- Vue has extra demos;
- Vue imports hidden data/config/helpers;
- Vue uses shared helpers that make open code unclear;
- visual check status.

### 2. Page Parity

For each Vue component page:

1. Open React page and use it as the reference.
2. Compare Vue page structure and demo order.
3. Rename/reorder Vue demos where needed.
4. Align descriptions and labels with React.
5. Keep Vue syntax idiomatic, but do not change the scenario.

### 3. Demo Parity

For each individual Vue demo:

1. Compare React and Vue source.
2. Match props and states.
3. Match layout and spacing.
4. Match token values and CSS variables.
5. Match example data shape when relevant.
6. Keep Vue-only syntax only where necessary.

### 4. Tokens Override

For every Vue `TokensOverride.demo.vue`:

1. Compare with React `TokensOverride.demo.tsx`.
2. Match `brand`, `dark`, `glass` scenarios.
3. Match token values.
4. Match card order and visual structure.
5. Remove accidental differences like random colors, different backgrounds, or `data-sg-theme` used where React uses explicit scoped tokens.
6. Make sure open code clearly shows the token story.

Important: React is still the source of truth. If React uses a shared helper and is accepted as the current standard, Vue should first match React. Any future "expand helper into explicit code" cleanup should be tracked separately and applied consistently.

### 5. Hidden Data And Config Audit

For every Vue demo, classify external imports:

- `demo infra`: i18n, viewer, docs shell. OK to stay hidden.
- `large data`: rows, options, tree nodes, transfer items. OK to move/show as optional source block.
- `large config`: columns, complex options. Optional source block only if not the feature itself.
- `demo logic`: handlers, filters, renderers, validators, formatters. Keep in main demo source by default.
- `unclear helper`: rename, inline, or expose as source block.

### 6. Optional Source Blocks

Add or adjust demo viewer support for extra source blocks if Vue lacks React-level behavior.

Expected UX:

- main "Open code" shows the demo source;
- extra blocks appear only when needed;
- each extra block can be expanded separately;
- copy action should be clear for each block;
- block names should match file/import names.

### 7. Visual QA

Check Vue against React in both themes:

- light theme;
- dark theme;
- token override cards;
- popups/portals;
- disabled/loading/error/empty states;
- responsive wrapping;
- source code panel.

### 8. Final Validation

Run relevant checks after edits:

- lint for touched Vue files;
- typecheck/build if practical;
- manual browser pass for changed pages;
- compare React and Vue screenshots for risky components.

## Component Checklist

Legend: `[x]` done · `[~]` source-level verified (no live browser pass available in this env) · `[ ]` not started.

Methodology notes:

- **Demos Match** verified by comparing the `<DemoBox>` sequence (titles + source) in each React page vs its Vue page 1:1. Order/scenario drift was fixed where found (see Notes).
- **Tokens Match**: every Vue `TokensOverride.demo.vue` was rewritten to use the shared `_shared/TokenScopeCards.vue` with the same `brand`/`dark`/`glass` recipes and `extra` token values as the React `TokensOverride.demo.tsx`. `TokenScopeCards` gained `contentAlign` + `stack` props to match the React helper.
- **Hidden Sources**: React `DemoBox` exposes a single optional `code` block — there is **no** multi/extra source-block feature in the canonical React viewer, so Vue is at React parity (single `code`). Large data/option/tree imports are allowed-hidden neutral mock data per the rules. No viewer change required.
- **Visual Checked = `[~]`**: this environment has no browser, so all checks are source-level (typecheck + unit tests pass). Live light/dark + portal QA (Work Plan §7) is the only remaining step and needs a running dev server.
- Core fix: `SgDrawer`/`SgModal` teleport to `<body>`; they now copy scoped `--sg-*` vars from the mount point onto the panel/mask so per-card token scopes survive the portal (mirrors React's `getScopedCssVars`).

| Component | React Ref | Vue Page | Demos Match | Tokens Match | Hidden Sources Checked | Visual Checked | Notes |
|---|---:|---:|---:|---:|---:|---:|---|
| table | [x] | [x] | [x] | [x] | [x] | [~] | 29 demos 1:1; data/styles.css 1:1; fixed CustomTokens → React side-by-side default vs custom w/ explicit tokens |
| transfer | [x] | [x] | [x] | [x] | [x] | [~] | TokensOverride→TokenScopeCards (brand/dark/glass) |
| tree | [x] | [x] | [x] | [x] | [x] | [~] | 12 demos 1:1 |
| treeselect | [x] | [x] | [x] | [x] | [x] | [~] | 8 demos 1:1; TokensOverride→TokenScopeCards |
| cascader | [x] | [x] | [x] | [x] | [x] | [~] | 12 demos 1:1; TokensOverride→TokenScopeCards |
| select | [x] | [x] | [x] | [x] | [x] | [~] | 8 demos 1:1; TokensOverride→TokenScopeCards |
| autocomplete | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1; TokensOverride→TokenScopeCards |
| datepicker | [x] | [x] | [x] | [x] | [x] | [~] | 12 demos 1:1; TokensOverride→TokenScopeCards |
| timepicker | [x] | [x] | [x] | [x] | [x] | [~] | 9 demos 1:1; TokensOverride→TokenScopeCards (defaultValue 09:30:00) |
| input | [x] | [x] | [x] | [x] | [x] | [~] | 11 demos 1:1 |
| inputnumber | [x] | [x] | [x] | [x] | [x] | [~] | 8 demos 1:1; TokensOverride→TokenScopeCards |
| dropdown | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1; TokensOverride→TokenScopeCards (edit/duplicate/divider/delete-danger) |
| tooltip | [x] | [x] | [x] | [x] | [x] | [~] | 6 demos 1:1; TokensOverride→TokenScopeCards |
| upload | [x] | [x] | [x] | [x] | [x] | [~] | 8 demos 1:1 |
| descriptions | [x] | [x] | [x] | [x] | [x] | [~] | FIXED order: Vertical↔Columns were swapped, now matches React |
| calendar | [x] | [x] | [x] | [x] | [x] | [~] | 13 demos 1:1 |
| menu | [x] | [x] | [x] | [x] | [x] | [~] | 12 demos 1:1 |
| tabs | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1; Vue uses DemoBox `vertical` preview (React doesn't) — preview layout only, flagged for visual QA |
| steps | [x] | [x] | [x] | [x] | [x] | [~] | 8 demos 1:1; `vertical` preview (see tabs note) |
| collapse | [x] | [x] | [x] | [x] | [x] | [~] | FIXED order (Ghost/IconPosition/Extra/Disabled/NoArrow/Controlled) to match React; `vertical` preview |
| drawer | [x] | [x] | [x] | [x] | [x] | [~] | TokensOverride→TokenScopeCards; core SgDrawer tunnels scoped --sg-* through Teleport |
| modal | [x] | [x] | [x] | [x] | [x] | [~] | TokensOverride→TokenScopeCards; core SgModal tunnels scoped --sg-* through Teleport |
| notification | [x] | [x] | [x] | [x] | [x] | [~] | 8 demos 1:1 |
| popconfirm | [x] | [x] | [x] | [x] | [x] | [~] | 6 demos 1:1; TokensOverride→TokenScopeCards |
| checkbox | [x] | [x] | [x] | [x] | [x] | [~] | 6 demos 1:1; TokensOverride→TokenScopeCards |
| radio | [x] | [x] | [x] | [x] | [x] | [~] | 5 demos 1:1; TokensOverride→TokenScopeCards |
| switch | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1; TokensOverride→TokenScopeCards |
| segmented | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1; TokensOverride→TokenScopeCards; `vertical` preview |
| slider | [x] | [x] | [x] | [x] | [x] | [~] | 6 demos 1:1; TokensOverride→TokenScopeCards |
| colorpicker | [x] | [x] | [x] | [x] | [x] | [~] | 9 demos 1:1; TokensOverride→TokenScopeCards |
| pagination | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1; `vertical` preview |
| list | [x] | [x] | [x] | [x] | [x] | [~] | 13 demos 1:1; TokensOverride→TokenScopeCards; `vertical` preview |
| timeline | [x] | [x] | [x] | [x] | [x] | [~] | 9 demos 1:1; TokensOverride→TokenScopeCards |
| breadcrumb | [x] | [x] | [x] | [x] | [x] | [~] | 6 demos 1:1; TokensOverride→TokenScopeCards |
| button | [x] | [x] | [x] | [x] | [x] | [~] | FIXED: removed Vue-only `ScopedBrand` demo (React=6) + deleted orphan file; TokensOverride→TokenScopeCards |
| carousel | [x] | [x] | [x] | [x] | [x] | [~] | 6 demos 1:1; TokensOverride→TokenScopeCards |
| avatar | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1 |
| badge | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1 |
| empty | [x] | [x] | [x] | [x] | [x] | [~] | FIXED order: WithActions now before CustomImage (matches React) |
| progress | [x] | [x] | [x] | [x] | [x] | [~] | FIXED order (Active/Dynamic/CustomColor/Sizes/NoInfo); TokensOverride→TokenScopeCards |
| rate | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1; TokensOverride→TokenScopeCards |
| result | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1 |
| skeleton | [x] | [x] | [x] | [x] | [x] | [~] | FIXED order: Rows moved after WithAvatar; TokensOverride→TokenScopeCards |
| spin | [x] | [x] | [x] | [x] | [x] | [~] | FIXED order: Container before Tip, CustomColor before CustomIndicator |
| tag | [x] | [x] | [x] | [x] | [x] | [~] | 7 demos 1:1 |

## Known Risk Areas

- Vue demo has visible regressions in multiple areas. Do not assume a Vue demo is correct because it renders.
- Table demo is a priority risk area. Check columns, data, row states, sorting/filtering/pagination examples, empty/loading states, scroll/fixed layout, dark theme, open-code source, and any hidden `columns` / `dataSource` / helper imports.
- Inputs and form controls: `input`, `inputnumber`, `select`, `autocomplete`, `datepicker`, `timepicker`, `cascader`, `treeselect`.
- Components with popups/portals: `select`, `dropdown`, `tooltip`, `popover`-style demos, `datepicker`, `timepicker`, `cascader`.
- Components with large data/config: `table`, `tree`, `transfer`, `cascader`, `treeselect`, `select`, `upload`, `descriptions`.
- Token override demos: visual drift is easy because small token differences are visible in dark theme.

## Done Criteria

This task is done when:

- every Vue component page has been compared against React;
- Vue demos match React scenarios and visual styling;
- Vue `TokensOverride` demos match React token behavior;
- hidden Vue data/config/helper imports have been audited;
- optional source blocks exist where large hidden sources are necessary;
- open code is understandable and copyable;
- light and dark themes are manually checked for changed pages;
- lint/typecheck passes for touched files.

