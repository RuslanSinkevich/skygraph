import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

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

const drawerProps: PropDef[] = [
  { name: 'open', description: 'Whether the Drawer is visible', type: 'boolean' },
  { name: 'onClose', description: 'Called on ESC, mask click, or × button', type: '() => void' },
  { name: 'title', description: 'Header content next to the close control', type: 'ReactNode' },
  { name: 'children', description: 'Scrollable body content', type: 'ReactNode' },
  { name: 'footer', description: 'Sticky footer row for actions', type: 'ReactNode' },
  { name: 'placement', description: 'Edge the panel slides in from', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'" },
  { name: 'width', description: 'Panel width (horizontal placement)', type: 'number | string', default: '378' },
  { name: 'height', description: 'Panel height (vertical placement)', type: 'number | string', default: '378' },
  { name: 'closable', description: 'Show the × header button', type: 'boolean', default: 'true' },
  { name: 'mask', description: 'Render the dimmed backdrop', type: 'boolean', default: 'true' },
  { name: 'maskClosable', description: 'Clicking the mask calls onClose', type: 'boolean', default: 'true' },
  { name: 'className', description: 'Panel className', type: 'string' },
  { name: 'style', description: 'Panel inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-drawer-* class (headless mode)', type: 'boolean', default: 'false' },
]

const drawerCssVars: CssVarDef[] = [
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Panel background' },
  { name: 'sg-color-overlay', default: 'rgba(0, 0, 0, 0.45)', description: 'Mask colour + opacity' },
  { name: 'sg-color-border-secondary', default: 'rgba(5, 5, 5, 0.04)', description: 'Header / footer divider' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Title colour' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: '× close button colour' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Title font size' },
  { name: 'sg-font-size-xl', default: '20px', description: '× close glyph size' },
  { name: 'sg-padding-md', default: '12px', description: 'Header / footer vertical padding' },
  { name: 'sg-padding-xl', default: '24px', description: 'Body padding + header / footer horizontal padding' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0,0,0,0.08)', description: 'Panel elevation' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Slide-in / fade-in speed' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
  { name: 'sg-z-modal', default: '1000', description: 'Stacking layer for the drawer root' },
]

export function DrawerDemo() {
  return (
    <ComponentDoc
      title="Drawer"
      description="Edge-anchored panel that slides in from any side. Uses a focus trap, ESC-to-close, and an optional mask. Body scrolls while header / footer stay pinned."
      whenToUse={[
        'Edit a record or filter a list without losing page context.',
        'Show supplementary navigation / notifications tray.',
        "Reveal a side form that's too heavy for a Popover and too light for a Modal.",
      ]}
    >
      <DemoBox title="Basic" description="Right-side drawer with focus trap + ESC support." code={BasicSource}>
        <BasicDrawer />
      </DemoBox>

      <DemoBox
        title="Placement"
        description="Slide in from any edge; width / height switch automatically."
        code={PlacementSource}
      >
        <PlacementDrawer />
      </DemoBox>

      <DemoBox
        title="Custom size"
        description="Any CSS length works — px, %, vw. Use % for mobile-friendly drawers."
        code={SizesSource}
      >
        <SizesDrawer />
      </DemoBox>

      <DemoBox
        title="Sticky footer"
        description="Body scrolls, footer stays pinned."
        code={FooterSource}
      >
        <FooterDrawer />
      </DemoBox>

      <DemoBox
        title="Mask options"
        description="Turn off the mask, or keep it but force the × / ESC."
        code={NoMaskSource}
      >
        <NoMaskDrawer />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope surface tokens on a wrapper for a dark-mode drawer."
        code={TokensOverrideSource}
      >
        <TokensOverrideDrawer />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep a11y + ESC / trap; do your own painting."
        code={UnstyledSource}
      >
        <UnstyledDrawer />
      </DemoBox>

      <PropsTable title="Drawer API" data={drawerProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Drawer has no dedicated tokens — the panel is `--sg-color-bg-elevated`, the mask is `--sg-color-overlay`, and the lift is `--sg-shadow-lg`. Override them on a wrapper to restyle without editing the global theme."
        data={drawerCssVars}
      />
    </ComponentDoc>
  )
}
