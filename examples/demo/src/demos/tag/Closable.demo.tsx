import { useState } from 'react'
import { Tag } from '@skygraph/react'

/**
 * `closable` appends a × button; `onClose` fires when it's activated.
 * The Tag itself never removes itself from the DOM — you manage the
 * source array.
 */
export function ClosableTag() {
  const [tags, setTags] = useState(['design', 'engineering', 'product', 'research'])

  const reset = () => setTags(['design', 'engineering', 'product', 'research'])

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {tags.map((t) => (
        <Tag
          key={t}
          color="processing"
          closable
          onClose={() => setTags((list) => list.filter((x) => x !== t))}
        >
          {t}
        </Tag>
      ))}
      {tags.length === 0 && (
        <button type="button" onClick={reset} style={{ font: 'inherit' }}>
          Reset
        </button>
      )}
    </div>
  )
}
