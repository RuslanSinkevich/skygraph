import { Avatar } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    morePeople: 'more people',
  },
  ru: {
    morePeople: 'ещё человек',
  },
} as const

/**
 * Stacking avatars with negative margin + a matching border creates a
 * compact "who's here" group. Reserve the last slot for a +N count
 * and swap in a neutral fill.
 */
const people = [
  { name: 'Alice', seed: 1 },
  { name: 'Bob', seed: 2 },
  { name: 'Carol', seed: 3 },
  { name: 'Dmitry', seed: 4 },
]
const extra = 3

export function GroupAvatar() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex' }}>
      {people.map((p, i) => (
        <Avatar
          key={p.name}
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${p.seed}`}
          alt={p.name}
          size="large"
          style={{
            marginLeft: i === 0 ? 0 : -10,
            border: '2px solid var(--sg-color-bg-container)',
          }}
        />
      ))}
      <Avatar
        size="large"
        style={{
          marginLeft: -10,
          background: 'var(--sg-color-fill-secondary, #e5e7eb)',
          color: 'var(--sg-color-text, #111)',
          border: '2px solid var(--sg-color-bg-container)',
          fontSize: 12,
        }}
        aria-label={`${extra} ${t.morePeople}`}
      >
        +{extra}
      </Avatar>
    </div>
  )
}
