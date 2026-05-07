/**
 * English source of truth for the Styling Showcase page strings.
 * Other locales must provide the same keys (see `ru.ts`).
 */
export const stylingShowcaseDocEn = {
  // ── Page chrome ────────────────────────────────────────────────────────
  pageTitle: 'Styling Showcase',
  pageBadge: 'Contract',
  crumbGuide: 'Guide',
  crumbStylingShowcase: 'Styling Showcase',
  pageLead:
    'Concentrated tour of SkyGraph styling. Everything here is a public, stable API — tokens, root classes, slot keys, classNames/styles props, and unstyled mode.',
  pageWhen1: 'Learn the three levels of styling: tokens → classNames/styles → unstyled.',
  pageWhen2: 'Copy recipes into real apps. They all work without !important and without deep selectors.',
  pageWhen3: 'Verify the styling contract visually before shipping.',
  notesPart1: 'Full reference: ',
  notesPart2: ', practical recipes: ',
  notesPart3: '. Every slot shown here is enumerated in §4 of the contract.',

  // ── Shared list copy (used by SlotsList) ───────────────────────────────
  listItem1: 'Override tokens globally or per instance.',
  listItem2: 'Use slot classNames/styles for complex components.',
  listItem3: 'Use unstyled for full control.',
  listItem4: 'rowClassName, cellClassName, headerClassName — conditional styling without !important.',

  // ── 1. Palette swatches ────────────────────────────────────────────────
  recipePaletteTitle: 'Palette tokens',
  recipePaletteDesc: 'Stable numeric scales for each accent colour. Safe to read from any CSS.',

  // ── 2. Semantic swatches ───────────────────────────────────────────────
  recipeSemanticTitle: 'Semantic tokens',
  recipeSemanticDesc:
    'These tokens switch automatically with data-sg-theme. Override them on a scope to re-skin everything inside.',
  swatchSemanticBadge: 'semantic',

  // ── 3. Scoped brand via tokens ─────────────────────────────────────────
  recipeScopedBrandTitle: 'Scoped brand via tokens',
  recipeScopedBrandDesc:
    'Wrap any subtree and override semantic tokens. Everything inside picks them up — buttons, inputs, switches, progress, anything that reads the tokens.',
  recipeScopedBrandHeading: 'Scoped brand card',
  scopedBrandPrimary: 'Primary',
  scopedBrandDefault: 'Default',
  scopedBrandInputPlaceholder: 'Inherits tokens',

  // ── 4. Dark scope ──────────────────────────────────────────────────────
  recipeDarkTitle: 'Dark theme scope (data-sg-theme="dark")',
  recipeDarkDesc:
    'Put the attribute on ANY container — all semantic tokens inside switch to dark. Layout and palette are unchanged.',
  darkPrimary: 'Primary',
  darkDefault: 'Default',
  darkInputPlaceholder: 'Dark input',

  // ── 5. Component tokens — Button (pill recipe) ─────────────────────────
  recipeBtnTokensTitle: 'Component tokens — Button',
  recipeBtnTokensDesc:
    'Override --sg-btn-* on a local scope. Only these buttons become pills, the rest of the app stays intact.',
  pillPrimary: 'Pill primary',
  pillDefault: 'Pill default',
  pillDashed: 'Pill dashed',

  // ── 6. Component tokens — Input / Select ───────────────────────────────
  recipeInputTokensTitle: 'Component tokens — Input / Select',
  recipeInputTokensDesc: 'Same trick for inputs. Tokens are per-component and documented in the contract.',
  roundedInputPlaceholder: 'Rounded soft input',
  matchingSelectPlaceholder: 'Matching select',

  // ── 7. Component tokens — Table ────────────────────────────────────────
  recipeTableTokensTitle: 'Component tokens — Table',
  recipeTableTokensDesc:
    'Change density, header background, hover colour via --sg-table-* without redeclaring classes.',

  // ── 8. Slots — Table ───────────────────────────────────────────────────
  recipeSlotsTableTitle: 'Slots — Table (classNames + styles)',
  recipeSlotsTableDesc:
    'Target stable DOM nodes by slot key. No deep selectors, no !important. Every slot key is documented in §4 of the contract.',

  // ── 9. Per-column headerClassName ──────────────────────────────────────
  recipeHeaderColTitle: 'Per-column headerClassName',
  recipeHeaderColDesc:
    'Parity with column.cellClassName. Style a single header cell without touching the others.',

  // ── 10. Conditional rows ───────────────────────────────────────────────
  recipeCondRowsTitle: 'Conditional rows (rowClassName)',
  recipeCondRowsDesc: 'High-scorers get a featured background. Pure CSS class, zero !important.',

  // ── 11. Conditional cells ──────────────────────────────────────────────
  recipeCondCellsTitle: 'Conditional cells (column.cellClassName)',
  recipeCondCellsDesc: 'Per-column hook runs for every body cell and returns a class name.',

  // ── 12. Slots — List ───────────────────────────────────────────────────
  recipeSlotsListTitle: 'Slots — List (classNames + styles)',
  recipeSlotsListDesc:
    'Same API as Table. Every slot key is declared in the contract: root / header / footer / items / item / empty / pagination.',
  slotsListHeader: 'Styling principles',
  slotsListFooter: 'All three levels compose.',

  // ── 13. Conditional List items ─────────────────────────────────────────
  recipeCondListTitle: 'Conditional List items (rowClassName)',
  recipeCondListDesc: 'Pick items dynamically — pinned, featured, read, unread — with one function.',
  condListItem1: 'Override tokens',
  condListItem2: 'Slot classNames/styles',
  condListItem3: 'Unstyled',
  condListItem4: 'Dark theme via data-sg-theme',

  // ── 14. Unstyled mix ───────────────────────────────────────────────────
  recipeUnstyledTitle: 'Unstyled: full visual control',
  recipeUnstyledDesc:
    'Each component rendered with unstyled keeps semantics (roles, aria-*, focus trap) but ships zero default CSS.',
  unstyledWrapperTitle: 'Unstyled wrapper',
  unstyledOpenButton: 'Open custom modal',
  unstyledInputPlaceholder: 'Bring your own CSS',
  unstyledModalTitle: 'Custom modal',
  unstyledModalBody:
    'This modal shipped with no CSS from the library. Semantics (role, aria-modal, focus trap) are still wired up.',
  unstyledModalClose: 'Close',

  // ── 15. Per-feature brand ──────────────────────────────────────────────
  recipePerFeatureTitle: 'Per-feature brand (composed)',
  recipePerFeatureDesc:
    'Interactive: move the slider, pick a colour. One scope restyles a whole feature — buttons, inputs, table header, row hover — with no rebuild.',
  perFeatureLabelPrimary: 'Primary',
  perFeatureLabelRadius: 'Radius',
  perFeaturePrimary: 'Primary',
  perFeatureDefault: 'Default',
  perFeatureInputPlaceholder: 'Scoped input',
} as const

/** Writable string map — use for builders (same keys as `stylingShowcaseDocEn`). */
export type StylingShowcaseDocStrings = {
  -readonly [K in keyof typeof stylingShowcaseDocEn]: string
}
