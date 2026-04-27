import { Avatar } from '@skygraph/react'

/**
 * Three preset sizes (`small` 24px, `middle` 32px, `large` 40px) or
 * any number for a custom px size. Font size auto-scales at 45%
 * of the avatar diameter.
 */
export function SizesAvatar() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="small">U</Avatar>
      <Avatar>U</Avatar>
      <Avatar size="large">U</Avatar>
      <Avatar size={56}>U</Avatar>
      <Avatar size={72}>U</Avatar>
    </div>
  )
}
