import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicCarousel } from './carousel/Basic.demo'
import BasicSource from './carousel/Basic.demo?raw'
import { AutoplayCarousel } from './carousel/Autoplay.demo'
import AutoplaySource from './carousel/Autoplay.demo?raw'
import { FadeCarousel } from './carousel/Fade.demo'
import FadeSource from './carousel/Fade.demo?raw'
import { DotPositionCarousel } from './carousel/DotPosition.demo'
import DotPositionSource from './carousel/DotPosition.demo?raw'
import { HiddenDotsCarousel } from './carousel/HiddenDots.demo'
import HiddenDotsSource from './carousel/HiddenDots.demo?raw'
import { TokensOverrideCarousel } from './carousel/TokensOverride.demo'
import TokensOverrideSource from './carousel/TokensOverride.demo?raw'
import { UnstyledCarousel } from './carousel/Unstyled.demo'
import UnstyledSource from './carousel/Unstyled.demo?raw'

const carouselProps: PropDef[] = [
  { name: 'autoplay', description: 'Advance to the next slide on an interval', type: 'boolean', default: 'false' },
  { name: 'autoplaySpeed', description: 'Interval between autoplay steps (ms)', type: 'number', default: '3000' },
  { name: 'dots', description: 'Render the dot navigation strip', type: 'boolean', default: 'true' },
  { name: 'dotPosition', description: 'Where to dock the dots (left / right flip the layout to vertical)', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'" },
  { name: 'effect', description: 'Transition style — horizontal slide or crossfade', type: "'slide' | 'fade'", default: "'slide'" },
  { name: 'children', description: 'Each direct child is one slide', type: 'ReactNode' },
  { name: 'className', description: 'Extra class on the root', type: 'string' },
  { name: 'style', description: 'Inline style on the root', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop sg-carousel-* styles — only the active slide and numbered buttons render', type: 'boolean', default: 'false' },
]

const carouselCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: '#1677ff', description: 'Active dot colour (wider "pill")' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Idle dot colour' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Hovered dot colour' },
  { name: 'sg-font-size', default: '14px', description: 'Inherited font size inside the track' },
  { name: 'sg-padding-xs', default: '4px', description: 'Gap between dots' },
  { name: 'sg-padding-sm', default: '8px', description: 'Padding around the dot strip' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Slide / fade duration + dot colour transition' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing for transitions' },
]

export function CarouselDemo() {
  return (
    <ComponentDoc
      title="Carousel"
      badge="Data Display"
      crumbs={['Data Display', 'Carousel']}
      description="Rotating slide container with dot navigation, four dot positions, and slide / fade transitions."
      whenToUse={[
        'When a group of content on the same level needs to rotate through a single viewport — hero banners, testimonials.',
        'When limited horizontal space must cycle through a few items rather than scroll.',
      ]}
    >
      <DemoBox title="Basic" description="Default slide transition, dots bottom-centre." code={BasicSource}>
        <BasicCarousel />
      </DemoBox>

      <DemoBox
        title="Autoplay"
        description="Auto-advance every `autoplaySpeed` ms."
        code={AutoplaySource}
      >
        <AutoplayCarousel />
      </DemoBox>

      <DemoBox
        title="Fade"
        description="Cross-fade slides via opacity."
        code={FadeSource}
      >
        <FadeCarousel />
      </DemoBox>

      <DemoBox
        title="Dot position"
        description="Top, bottom (default), left or right — left / right go vertical."
        code={DotPositionSource}
      >
        <DotPositionCarousel />
      </DemoBox>

      <DemoBox
        title="Hidden dots"
        description="`dots={false}` for decorative carousels."
        code={HiddenDotsSource}
      >
        <HiddenDotsCarousel />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope the dot colours to rebrand."
        code={TokensOverrideSource}
      >
        <TokensOverrideCarousel />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Active slide + numbered buttons, zero built-in CSS."
        code={UnstyledSource}
      >
        <UnstyledCarousel />
      </DemoBox>

      <PropsTable title="Carousel API" data={carouselProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Carousel has no component-local tokens. The dot colours come from the global palette — rebrand by scoping `--sg-color-primary` + `--sg-color-text-disabled` + `--sg-color-text-tertiary`."
        data={carouselCssVars}
      />
    </ComponentDoc>
  )
}
