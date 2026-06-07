import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useAvatarDocStrings } from './avatar-doc/useAvatarDocStrings'

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

export function AvatarDemo() {
  const t = useAvatarDocStrings()

  const avatarProps = useMemo<PropDef[]>(
    () => [
      { name: 'src', description: t.propSrc, type: 'string' },
      { name: 'alt', description: t.propAlt, type: 'string' },
      { name: 'aria-label', description: t.propAriaLabel, type: 'string' },
      {
        name: 'size',
        description: t.propSize,
        type: "'small' | 'middle' | 'large' | number",
        default: "'middle'",
      },
      { name: 'shape', description: t.propShape, type: "'circle' | 'square'", default: "'circle'" },
      { name: 'icon', description: t.propIcon, type: 'ReactNode' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const avatarCssVars = useMemo<CssVarDef[]>(
    () => [
      {
        name: 'sg-color-text-disabled',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssSgColorTextDisabled,
      },
      { name: 'sg-color-white', default: '#ffffff', description: t.cssSgColorWhite },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-color-bg-container', default: '#ffffff', description: t.cssSgColorBgContainer },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbAvatar]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesAvatar />
      </DemoBox>

      <DemoBox title={t.demoShapesTitle} description={t.demoShapesDesc} code={ShapesSource}>
        <ShapesAvatar />
      </DemoBox>

      <DemoBox title={t.demoFallbackTitle} description={t.demoFallbackDesc} code={FallbackSource}>
        <FallbackAvatar />
      </DemoBox>

      <DemoBox
        title={t.demoColoredTitle}
        description={t.demoColoredDesc}
        code={ColoredInitialsSource}
      >
        <ColoredInitialsAvatar />
      </DemoBox>

      <DemoBox title={t.demoGroupTitle} description={t.demoGroupDesc} code={GroupSource}>
        <GroupAvatar />
      </DemoBox>

      <DemoBox
        title={t.demoWithBadgeTitle}
        description={t.demoWithBadgeDesc}
        code={WithBadgeSource}
      >
        <WithBadgeAvatar />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideAvatar />
      </DemoBox>

      <PropsTable title={t.tableAvatarApi} data={avatarProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={avatarCssVars} />
    </ComponentDoc>
  )
}
