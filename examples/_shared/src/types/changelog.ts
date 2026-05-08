/**
 * Structural types for the SkyGraph CHANGELOG.md tree.
 *
 * The repo's CHANGELOG follows a "Keep a Changelog" layout enriched with
 * per-round subsections:
 *
 *   ## [Unreleased]
 *   ### Round 11 — UX полишинг + ...
 *   #### Charts UX (`6bad1f9`) — таб A
 *   - bullet
 *   - bullet
 *   #### Diagram UX (...)
 *   ## [0.4.0] — 2026-04-30
 *   ### Round 10 — ...
 *
 * `parseChangelog` returns one `ChangelogEntry` per `## [version]`. Each
 * entry contains the rounds (`### Round N — ...`) and each round contains
 * subsections (`#### Title`). Body text is preserved as plain markdown
 * lines so the consumer can render it however it likes.
 */

export interface ChangelogSubsection {
  /** Heading text after the `#### ` prefix. */
  title: string
  /** Body lines (preserves bullet markers, **bold**, `code`, etc.). */
  body: string[]
}

export interface ChangelogRound {
  /** Heading text after the `### ` prefix (e.g. "Round 11 — ..."). */
  title: string
  /** Body lines that appear before the first `#### ` subsection. */
  body: string[]
  /** Subsections (`#### `) inside the round. */
  subsections: ChangelogSubsection[]
}

export interface ChangelogEntry {
  /** Heading text after the `## ` prefix (e.g. "[Unreleased]" or "[0.4.0] — 2026-04-30"). */
  title: string
  /** Bracketed version label, when present. */
  version: string | null
  /** Optional date suffix, when present (e.g. "2026-04-30"). */
  date: string | null
  /** Body lines that appear before the first `### ` round. */
  body: string[]
  /** Rounds (`### `) inside the entry. */
  rounds: ChangelogRound[]
}
