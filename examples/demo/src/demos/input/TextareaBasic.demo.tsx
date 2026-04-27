import { useState } from 'react'
import { Textarea } from '@skygraph/react'

/**
 * Multiline variant. `rows` sets the initial height; users can still
 * drag the corner to resize because the textarea uses native
 * `resize: vertical`.
 */
export function TextareaBasic() {
  const [value, setValue] = useState('')
  return (
    <Textarea
      value={value}
      onChange={setValue}
      rows={3}
      placeholder="Leave a comment…"
      style={{ maxWidth: 420 }}
    />
  )
}
