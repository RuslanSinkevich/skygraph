import { Tag } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    tag1: 'Tag 1',
    tag2: 'Tag 2',
    neutral: 'Neutral label',
  },
  ru: {
    tag1: 'Тег 1',
    tag2: 'Тег 2',
    neutral: 'Нейтральная метка',
  },
} as const

/**
 * Default Tag renders as a neutral pill using `--sg-color-bg-secondary`
 * for the background and `--sg-color-border` for the edge.
 */
export function BasicTag() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag>{t.tag1}</Tag>
      <Tag>{t.tag2}</Tag>
      <Tag>{t.neutral}</Tag>
    </div>
  )
}
