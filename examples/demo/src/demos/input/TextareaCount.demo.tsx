import { useState } from 'react'
import { Textarea } from '@skygraph/react'

/**
 * `showCount` + `maxLength` display a live "N / max" counter under
 * the field. `maxLength` is enforced in the change handler — the user
 * can't type past it.
 */
export function TextareaCount() {
  const [value, setValue] = useState('')
  return (
    <Textarea
      value={value}
      onChange={setValue}
      rows={4}
      maxLength={140}
      showCount
      placeholder="Tweet-length update (max 140)"
      style={{ maxWidth: 420 }}
    />
  )
}
