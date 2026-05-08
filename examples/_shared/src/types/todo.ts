/**
 * Structural types for the SkyGraph TODO.md tree.
 *
 * The repo's TODO file follows a numbered-section layout:
 *
 *   ## 1. Большие задачи (отдельные стримы)
 *   ### 1.1 ✅ Gantt / EventTimeline / ResourceCalendar
 *   - body
 *   - body
 *   ### 1.2 ✅ SchemaForm визуальный редактор
 *   ## 2. Функциональные расширения
 *   ### 2.1 ✅ TableEngine — pro закрыт
 *
 * A `TodoSection` corresponds to `## N. <title>` and contains
 * `TodoItem`s for each `### N.M ✅? <title>` underneath. Status is
 * derived from a leading `✅` in the heading.
 */

export type TodoStatus = 'open' | 'closed'

export interface TodoItem {
  /** Numeric prefix (e.g. "1.1", "2.3"). Empty string if missing. */
  id: string
  /** Heading text without the numeric prefix and the status marker. */
  title: string
  /** `closed` if the heading starts with `✅`, otherwise `open`. */
  status: TodoStatus
  /** Body lines under the `### ` heading. Markdown preserved. */
  body: string[]
}

export interface TodoSection {
  /** Numeric prefix (e.g. "1", "2"). Empty string if missing. */
  id: string
  /** Section title (without the numeric prefix). */
  title: string
  /** Items under the section. */
  items: TodoItem[]
}
