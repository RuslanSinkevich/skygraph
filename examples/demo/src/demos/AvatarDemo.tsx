import { Avatar, Badge } from '@skygraph/react'

export function AvatarDemo() {
  return (
    <section>
      <h2>Avatar</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        User avatars with images, text, and icons. Multiple sizes and shapes.
      </p>

      <h4 style={{ marginBottom: 8 }}>Sizes</h4>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <Avatar size="small">S</Avatar>
        <Avatar>M</Avatar>
        <Avatar size="large">L</Avatar>
        <Avatar size={64}>64</Avatar>
      </div>

      <h4 style={{ marginBottom: 8 }}>Shapes</h4>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <Avatar>AB</Avatar>
        <Avatar shape="square">CD</Avatar>
      </div>

      <h4 style={{ marginBottom: 8 }}>With Badge</h4>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
        <Badge count={3}>
          <Avatar size="large">JD</Avatar>
        </Badge>
        <Badge dot>
          <Avatar size="large" shape="square">SK</Avatar>
        </Badge>
      </div>

      <h4 style={{ marginBottom: 8 }}>Custom Colors</h4>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar style={{ background: 'var(--sg-color-primary)' }}>U</Avatar>
        <Avatar style={{ background: 'var(--sg-color-success)' }}>A</Avatar>
        <Avatar style={{ background: 'var(--sg-color-warning)' }}>B</Avatar>
        <Avatar style={{ background: 'var(--sg-color-error)' }}>C</Avatar>
      </div>
    </section>
  )
}
