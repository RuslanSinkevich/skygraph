import { useState } from 'react'
import { Tag } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    design: 'design',
    engineering: 'engineering',
    product: 'product',
    research: 'research',
    reset: 'Reset',
  },
  ru: {
    design: 'дизайн',
    engineering: 'инженерия',
    product: 'продукт',
    research: 'исследования',
    reset: 'Сбросить',
  },
} as const

const KEYS = ['design', 'engineering', 'product', 'research'] as const
type TagKey = (typeof KEYS)[number]

/**
 * `closable` appends a × button; `onClose` fires when it's activated.
 * The Tag itself never removes itself from the DOM — you manage the
 * source array.
 */
export function ClosableTag() {
  const t = useDemoStrings(STRINGS)
  const [tags, setTags] = useState<TagKey[]>([...KEYS])

  const reset = () => setTags([...KEYS])

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {tags.map((key) => (
        <Tag
          key={key}
          color="processing"
          closable
          onClose={() => setTags((list) => list.filter((x) => x !== key))}
        >
          {t[key]}
        </Tag>
      ))}
      {tags.length === 0 && (
        <button type="button" onClick={reset} style={{ font: 'inherit' }}>
          {t.reset}
        </button>
      )}
    </div>
  )
}
