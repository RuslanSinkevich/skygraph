import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { SizesAvatar } from './avatar/Sizes.demo'
import SizesSource from './avatar/Sizes.demo?raw'
import { ShapesAvatar } from './avatar/Shapes.demo'
import ShapesSource from './avatar/Shapes.demo?raw'
import { FallbackAvatar } from './avatar/Fallback.demo'
import FallbackSource from './avatar/Fallback.demo?raw'
import { ColoredInitialsAvatar } from './avatar/ColoredInitials.demo'
import ColoredInitialsSource from './avatar/ColoredInitials.demo?raw'
import { GroupAvatar } from './avatar/Group.demo'
import GroupSource from './avatar/Group.demo?raw'
import { WithBadgeAvatar } from './avatar/WithBadge.demo'
import WithBadgeSource from './avatar/WithBadge.demo?raw'
import { TokensOverrideAvatar } from './avatar/TokensOverride.demo'
import TokensOverrideSource from './avatar/TokensOverride.demo?raw'
import { UnstyledAvatar } from './avatar/Unstyled.demo'
import UnstyledSource from './avatar/Unstyled.demo?raw'

const avatarProps: PropDef[] = [
  { name: 'src', description: 'Image URL (photo avatar)', type: 'string' },
  { name: 'alt', description: 'Alt text for the image', type: 'string' },
  { name: 'aria-label', description: 'Accessible name when there is no visible text', type: 'string' },
  { name: 'size', description: 'Preset size token or explicit px number', type: "'small' | 'middle' | 'large' | number", default: "'middle'" },
  { name: 'shape', description: 'Circle or rounded square', type: "'circle' | 'square'", default: "'circle'" },
  { name: 'icon', description: 'Icon shown when src is missing', type: 'ReactNode' },
  { name: 'children', description: 'Initials / text fallback when src and icon are missing', type: 'ReactNode' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style (overrides background etc.)', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop sg-avatar-* classes (headless mode)', type: 'boolean', default: 'false' },
]

const avatarCssVars: CssVarDef[] = [
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Fallback background when src / icon / children are absent' },
  { name: 'sg-color-white', default: '#ffffff', description: 'Foreground colour on the tinted background' },
  { name: 'sg-border-radius', default: '6px', description: 'Corner radius for shape="square"' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Recommended border colour when stacking avatars in a group' },
]

export function AvatarDemo() {
  return (
    <ComponentDoc
      title="Avatar"
      description="Image, icon, or text avatar with three preset sizes and circle / square shapes. Degrades gracefully: photo → icon → initials."
      whenToUse={[
        'Profile picture in a menu or header.',
        'Compact "who is involved" list on a card, with a stacked group + overflow counter.',
        'Fallback chip when a photo URL is missing and you have a name.',
      ]}
    >
      <DemoBox title="Sizes" description="Preset tokens + any px number." code={SizesSource}>
        <SizesAvatar />
      </DemoBox>

      <DemoBox title="Shapes" description="Circle vs. rounded square." code={ShapesSource}>
        <ShapesAvatar />
      </DemoBox>

      <DemoBox
        title="Fallback order"
        description="src → icon → children."
        code={FallbackSource}
      >
        <FallbackAvatar />
      </DemoBox>

      <DemoBox
        title="Coloured initials"
        description="Hash the name into a palette for deterministic tints."
        code={ColoredInitialsSource}
      >
        <ColoredInitialsAvatar />
      </DemoBox>

      <DemoBox
        title="Avatar group"
        description="Stacked avatars with a +N overflow slot."
        code={GroupSource}
      >
        <GroupAvatar />
      </DemoBox>

      <DemoBox
        title="With Badge"
        description="Wrap the avatar in a Badge for presence / count."
        code={WithBadgeSource}
      >
        <WithBadgeAvatar />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Bump --sg-border-radius for softer squares, swap --sg-color-text-disabled for a branded fallback."
        code={TokensOverrideSource}
      >
        <TokensOverrideAvatar />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Drop every sg-avatar class — you own the painting."
        code={UnstyledSource}
      >
        <UnstyledAvatar />
      </DemoBox>

      <PropsTable title="Avatar API" data={avatarProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Avatar has no dedicated tokens. The fallback background is `--sg-color-text-disabled`, the square radius is `--sg-border-radius`, and text is `--sg-color-white`. For per-instance colours, inline style={{ background, color }} is the simplest override."
        data={avatarCssVars}
      />
    </ComponentDoc>
  )
}
