import { useState } from 'react'
import { Tag } from '@skygraph/react'

const initialTags = ['React', 'TypeScript', 'Node.js', 'SkyGraph']

export function TagDemo() {
  const [tags, setTags] = useState(initialTags)

  return (
    <section>
      <h2>Tag</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Labels with preset and custom colors. Closable tags.
      </p>

      <h4 style={{ marginBottom: 8 }}>Preset Colors</h4>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <Tag color="default">Default</Tag>
        <Tag color="success">Success</Tag>
        <Tag color="error">Error</Tag>
        <Tag color="warning">Warning</Tag>
        <Tag color="processing">Processing</Tag>
      </div>

      <h4 style={{ marginBottom: 8 }}>Custom Colors</h4>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <Tag color="#f50">#f50</Tag>
        <Tag color="#2db7f5">#2db7f5</Tag>
        <Tag color="#87d068">#87d068</Tag>
        <Tag color="#108ee9">#108ee9</Tag>
      </div>

      <h4 style={{ marginBottom: 8 }}>Closable</h4>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {tags.map((tag) => (
          <Tag key={tag} closable onClose={() => setTags(tags.filter((t) => t !== tag))}>
            {tag}
          </Tag>
        ))}
        {tags.length === 0 && (
          <span style={{ color: 'var(--sg-color-text-tertiary)', fontSize: 12 }}>All tags removed</span>
        )}
      </div>

      <h4 style={{ marginBottom: 8 }}>Borderless</h4>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Tag color="success" bordered={false}>Success</Tag>
        <Tag color="processing" bordered={false}>Processing</Tag>
        <Tag color="error" bordered={false}>Error</Tag>
        <Tag color="warning" bordered={false}>Warning</Tag>
      </div>
    </section>
  )
}
