import { Tag } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const tagProps: PropDef[] = [
  { name: 'color', description: 'Color of the Tag', type: "'default' | 'success' | 'error' | 'warning' | 'processing' | string", default: "'default'" },
  { name: 'closable', description: 'Whether the Tag can be closed', type: 'boolean', default: 'false' },
  { name: 'onClose', description: 'Callback when the tag is closed', type: '() => void' },
  { name: 'bordered', description: 'Whether to show border', type: 'boolean', default: 'true' },
  { name: 'children', description: 'Content of the Tag', type: 'ReactNode' },
]

export function TagDemo() {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3'])

  return (
    <ComponentDoc
      title="Tag"
      description="Tag for categorizing or markup."
      whenToUse={[
        'When you want to label or categorize items.',
        'To display a collection of removable tags.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic usage of Tag with link and closable."
        code={`import { Tag } from '@skygraph/react'

<Tag>Tag 1</Tag>
<Tag>Tag 2</Tag>
<Tag closable onClose={() => console.log('closed')}>Tag 3</Tag>`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag>Tag 1</Tag>
          <Tag>Tag 2</Tag>
          <Tag closable>Closable Tag</Tag>
        </div>
      </DemoBox>

      <DemoBox
        title="Colorful"
        description="Preset and custom colors."
        code={`<Tag color="success">Success</Tag>
<Tag color="processing">Processing</Tag>
<Tag color="error">Error</Tag>
<Tag color="warning">Warning</Tag>
<Tag color="#f50">#f50</Tag>
<Tag color="#2db7f5">#2db7f5</Tag>
<Tag color="#87d068">#87d068</Tag>`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag color="success">Success</Tag>
          <Tag color="processing">Processing</Tag>
          <Tag color="error">Error</Tag>
          <Tag color="warning">Warning</Tag>
          <Tag color="#f50">#f50</Tag>
          <Tag color="#2db7f5">#2db7f5</Tag>
          <Tag color="#87d068">#87d068</Tag>
        </div>
      </DemoBox>

      <DemoBox
        title="Closable"
        description="Dynamically add and remove tags."
        code={`const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3'])

{tags.map(tag => (
  <Tag
    key={tag}
    closable
    onClose={() => setTags(t => t.filter(i => i !== tag))}
  >
    {tag}
  </Tag>
))}`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <Tag key={tag} closable onClose={() => setTags((t) => t.filter((i) => i !== tag))}>
              {tag}
            </Tag>
          ))}
        </div>
      </DemoBox>

      <DemoBox
        title="Borderless"
        description="Tags without border."
        code={`<Tag bordered={false}>Borderless</Tag>
<Tag bordered={false} color="processing">Processing</Tag>
<Tag bordered={false} color="success">Success</Tag>`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <Tag bordered={false}>Borderless</Tag>
          <Tag bordered={false} color="processing">Processing</Tag>
          <Tag bordered={false} color="success">Success</Tag>
        </div>
      </DemoBox>

      <DemoBox
        title="Full palette"
        description="All palette tokens are accepted as color values for Tag."
        code={`<Tag color="blue">blue</Tag>
<Tag color="green">green</Tag>
<Tag color="red">red</Tag>
<Tag color="orange">orange</Tag>`}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['blue', 'green', 'red', 'orange', 'gray'].map((c) => (
            <Tag key={c} color={c}>
              {c}
            </Tag>
          ))}
        </div>
      </DemoBox>

      <PropsTable data={tagProps} />
    </ComponentDoc>
  )
}
