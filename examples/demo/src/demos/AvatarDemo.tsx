import { Avatar } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const avatarProps: PropDef[] = [
  { name: 'src', description: 'Image source for the avatar', type: 'string' },
  { name: 'alt', description: 'Alt text for the avatar image', type: 'string' },
  { name: 'size', description: 'Size of the avatar', type: "'small' | 'middle' | 'large' | number", default: "'middle'" },
  { name: 'shape', description: 'Shape of the avatar', type: "'circle' | 'square'", default: "'circle'" },
  { name: 'icon', description: 'Custom icon inside the avatar', type: 'ReactNode' },
  { name: 'children', description: 'Text content (initials etc.)', type: 'ReactNode' },
]

export function AvatarDemo() {
  return (
    <ComponentDoc
      title="Avatar"
      description="Avatars can be used to represent people or objects."
      whenToUse={[
        'When you need to display a user profile picture.',
        'When you need to display initials when an image is not available.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Three sizes and two shapes."
        code={`import { Avatar } from '@skygraph/react'

<Avatar size="large">U</Avatar>
<Avatar>U</Avatar>
<Avatar size="small">U</Avatar>
<Avatar shape="square" size="large">U</Avatar>`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar size="large">U</Avatar>
          <Avatar>U</Avatar>
          <Avatar size="small">U</Avatar>
          <Avatar shape="square" size="large">U</Avatar>
          <Avatar shape="square">U</Avatar>
          <Avatar shape="square" size="small">U</Avatar>
        </div>
      </DemoBox>

      <DemoBox
        title="Custom Size"
        description="You can set the avatar size to a specific pixel value."
        code={`<Avatar size={64}>XL</Avatar>
<Avatar size={48}>L</Avatar>
<Avatar size={32}>M</Avatar>`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar size={64}>XL</Avatar>
          <Avatar size={48}>L</Avatar>
          <Avatar size={32}>M</Avatar>
        </div>
      </DemoBox>

      <DemoBox
        title="Image"
        description="Avatars with image source."
        code={`<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" shape="square" />`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" size="large" />
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" shape="square" size="large" />
        </div>
      </DemoBox>

      <DemoBox
        title="Colored initials"
        description="Use inline style or className to tint the background."
        code={`<Avatar style={{ background: '#f97316', color: '#fff' }}>A</Avatar>
<Avatar style={{ background: '#22c55e', color: '#fff' }}>B</Avatar>
<Avatar style={{ background: '#3b82f6', color: '#fff' }}>C</Avatar>`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar style={{ background: '#f97316', color: '#fff' }}>A</Avatar>
          <Avatar style={{ background: '#22c55e', color: '#fff' }}>B</Avatar>
          <Avatar style={{ background: '#3b82f6', color: '#fff' }}>C</Avatar>
          <Avatar style={{ background: '#a855f7', color: '#fff' }}>D</Avatar>
          <Avatar style={{ background: '#ef4444', color: '#fff' }}>E</Avatar>
        </div>
      </DemoBox>

      <DemoBox
        title="Avatar group"
        description="Stack avatars with negative margin for a compact group."
        code={`<div style={{ display: 'flex' }}>
  {users.map((u, i) => (
    <Avatar
      key={u}
      style={{ marginLeft: i === 0 ? 0 : -8, border: '2px solid var(--sg-color-bg-container)' }}
    >
      {u}
    </Avatar>
  ))}
</div>`}
      >
        <div style={{ display: 'flex' }}>
          {['A', 'B', 'C', 'D', '+3'].map((u, i) => (
            <Avatar
              key={u}
              style={{
                marginLeft: i === 0 ? 0 : -8,
                border: '2px solid var(--sg-color-bg-container)',
                background: i === 4 ? '#e5e7eb' : undefined,
                color: i === 4 ? '#111' : undefined,
              }}
            >
              {u}
            </Avatar>
          ))}
        </div>
      </DemoBox>

      <PropsTable data={avatarProps} />
    </ComponentDoc>
  )
}
