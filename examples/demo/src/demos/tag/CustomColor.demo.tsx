import { Tag } from '@skygraph/react'

/**
 * Any non-preset string is passed through as a raw CSS colour and
 * applied to both background and border — the text flips to white
 * for contrast. Hex, rgb, hsl, and CSS colour names all work.
 */
export function CustomColorTag() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="rgb(124, 58, 237)">rgb(124, 58, 237)</Tag>
      <Tag color="teal">teal</Tag>
    </div>
  )
}
