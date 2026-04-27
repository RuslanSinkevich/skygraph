import { Avatar } from '@skygraph/react'

/**
 * Deterministic background colour from the name is a common pattern —
 * hash the initials into a palette, apply via inline `style`. The
 * avatar still inherits text colour from `--sg-color-white`.
 */
const palette = ['#f97316', '#22c55e', '#3b82f6', '#a855f7', '#ef4444', '#0ea5e9', '#eab308']

function pickColor(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0
  return palette[Math.abs(hash) % palette.length]
}

const people = ['Alice', 'Bob', 'Carol', 'Dmitry', 'Elena', 'Felix', 'Grace']

export function ColoredInitialsAvatar() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      {people.map((name) => (
        <Avatar
          key={name}
          style={{ background: pickColor(name), color: '#fff' }}
          aria-label={name}
        >
          {name.slice(0, 1)}
        </Avatar>
      ))}
    </div>
  )
}
