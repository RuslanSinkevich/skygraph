import { Textarea } from '@skygraph/react'

/**
 * Disabled and loading mirror the single-line Input. Loading adds a
 * spinner in the top-right and blocks edits.
 */
export function TextareaStates() {
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <Textarea disabled defaultValue="This textarea is read-only for now." rows={2} />
      <Textarea loading placeholder="Generating summary…" rows={2} />
    </div>
  )
}
