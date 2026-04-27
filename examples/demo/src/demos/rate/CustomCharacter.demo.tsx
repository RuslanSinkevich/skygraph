import { Rate } from '@skygraph/react'

/**
 * `character` accepts any ReactNode — emoji, SVG, a lucide icon. It is
 * the exact same node for all stars; filled/half styling is applied
 * by CSS on top.
 */
export function CustomCharacterRate() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Rate character="♥" defaultValue={4} />
      <Rate character="🔥" defaultValue={3} />
      <Rate
        defaultValue={4}
        character={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2L14.2 9.2L21.6 9.2L15.7 13.8L17.9 21L12 16.3L6.1 21L8.3 13.8L2.4 9.2L9.8 9.2L12 2Z" />
          </svg>
        }
      />
    </div>
  )
}
