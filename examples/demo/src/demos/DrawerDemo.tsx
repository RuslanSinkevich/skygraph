import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useDrawerDocStrings } from './drawer-doc/useDrawerDocStrings'

import { BasicDrawer } from './drawer/Basic.demo'
import BasicSource from './drawer/Basic.demo?raw'
import { PlacementDrawer } from './drawer/Placement.demo'
import PlacementSource from './drawer/Placement.demo?raw'
import { SizesDrawer } from './drawer/Sizes.demo'
import SizesSource from './drawer/Sizes.demo?raw'
import { FooterDrawer } from './drawer/Footer.demo'
import FooterSource from './drawer/Footer.demo?raw'
import { NoMaskDrawer } from './drawer/NoMask.demo'
import NoMaskSource from './drawer/NoMask.demo?raw'
import { TokensOverrideDrawer } from './drawer/TokensOverride.demo'
import TokensOverrideSource from './drawer/TokensOverride.demo?raw'
import { UnstyledDrawer } from './drawer/Unstyled.demo'
import UnstyledSource from './drawer/Unstyled.demo?raw'

export function DrawerDemo() {
  const t = useDrawerDocStrings()

  const drawerProps = useMemo<PropDef[]>(
    () => [
      { name: 'open', description: t.propOpen, type: 'boolean' },
      { name: 'onClose', description: t.propOnClose, type: '() => void' },
      { name: 'title', description: t.propTitle, type: 'ReactNode' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'footer', description: t.propFooter, type: 'ReactNode' },
      { name: 'placement', description: t.propPlacement, type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'" },
      { name: 'width', description: t.propWidth, type: 'number | string', default: '378' },
      { name: 'height', description: t.propHeight, type: 'number | string', default: '378' },
      { name: 'closable', description: t.propClosable, type: 'boolean', default: 'true' },
      { name: 'mask', description: t.propMask, type: 'boolean', default: 'true' },
      { name: 'maskClosable', description: t.propMaskClosable, type: 'boolean', default: 'true' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const drawerCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.cssBgElevated },
      { name: 'sg-color-overlay', default: 'rgba(0, 0, 0, 0.45)', description: t.cssOverlay },
      { name: 'sg-color-border-secondary', default: 'rgba(5, 5, 5, 0.04)', description: t.cssBorderSecondary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssTextTertiary },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssFontSizeLg },
      { name: 'sg-font-size-xl', default: '20px', description: t.cssFontSizeXl },
      { name: 'sg-padding-md', default: '12px', description: t.cssPaddingMd },
      { name: 'sg-padding-xl', default: '24px', description: t.cssPaddingXl },
      { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0,0,0,0.08)', description: t.cssShadowLg },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssTransitionDuration },
      { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: t.cssTransitionTiming },
      { name: 'sg-z-modal', default: '1000', description: t.cssZModal },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicDrawer />
      </DemoBox>

      <DemoBox title={t.demoPlacementTitle} description={t.demoPlacementDesc} code={PlacementSource}>
        <PlacementDrawer />
      </DemoBox>

      <DemoBox title={t.demoSizeTitle} description={t.demoSizeDesc} code={SizesSource}>
        <SizesDrawer />
      </DemoBox>

      <DemoBox title={t.demoFooterTitle} description={t.demoFooterDesc} code={FooterSource}>
        <FooterDrawer />
      </DemoBox>

      <DemoBox title={t.demoNoMaskTitle} description={t.demoNoMaskDesc} code={NoMaskSource}>
        <NoMaskDrawer />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideDrawer />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledDrawer />
      </DemoBox>

      <PropsTable title={t.tableDrawerApi} data={drawerProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={drawerCssVars} />
    </ComponentDoc>
  )
}
