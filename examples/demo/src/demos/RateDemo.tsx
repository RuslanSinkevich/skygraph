import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicRate } from './rate/Basic.demo'
import BasicSource from './rate/Basic.demo?raw'
import { AllowHalfRate } from './rate/AllowHalf.demo'
import AllowHalfSource from './rate/AllowHalf.demo?raw'
import { CountRate } from './rate/Count.demo'
import CountSource from './rate/Count.demo?raw'
import { CustomCharacterRate } from './rate/CustomCharacter.demo'
import CustomCharacterSource from './rate/CustomCharacter.demo?raw'
import { DisabledRate } from './rate/Disabled.demo'
import DisabledSource from './rate/Disabled.demo?raw'
import { InFormRate } from './rate/InForm.demo'
import InFormSource from './rate/InForm.demo?raw'
import { TokensOverrideRate } from './rate/TokensOverride.demo'
import TokensOverrideSource from './rate/TokensOverride.demo?raw'
import { UnstyledRate } from './rate/Unstyled.demo'
import UnstyledSource from './rate/Unstyled.demo?raw'

const rateProps: PropDef[] = [
  { name: 'value', description: 'Controlled rating value', type: 'number' },
  { name: 'defaultValue', description: 'Initial rating when uncontrolled', type: 'number', default: '0' },
  { name: 'count', description: 'Number of rating symbols', type: 'number', default: '5' },
  { name: 'allowHalf', description: 'Enable 0.5 steps (clicking the left half of a star)', type: 'boolean', default: 'false' },
  { name: 'character', description: 'Custom symbol for each star (ReactNode)', type: 'ReactNode', default: "'★'" },
  { name: 'onChange', description: 'Fires with the next rating', type: '(value: number) => void' },
  { name: 'disabled', description: 'Lock the control (read-only)', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes (headless mode)', type: 'boolean', default: 'false' },
]

const rateCssVars: CssVarDef[] = [
  { name: 'sg-color-star', default: '#fadb14', description: 'Fill colour of a selected / half star' },
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: 'Colour of an empty star' },
  { name: 'sg-font-size-xl', default: '20px', description: 'Size of each rating symbol' },
  { name: 'sg-padding-xs', default: '8px', description: 'Gap between stars' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Hover color + scale transition duration' },
]

export function RateDemo() {
  return (
    <ComponentDoc
      title="Rate"
      description="Star-rating control with hover preview, optional half-steps and any ReactNode as the symbol. Clicking the already-selected value clears it back to 0."
      whenToUse={[
        'Collect quick sentiment on reviews, surveys, or products.',
        'Read-only "social proof" display next to an author or place.',
        'Anywhere a slider would feel heavier than "pick a discrete 1–5".',
      ]}
    >
      <DemoBox title="Basic" description="Controlled 5-star rating, click to clear." code={BasicSource}>
        <BasicRate />
      </DemoBox>

      <DemoBox
        title="Half-steps"
        description="allowHalf uses pointer position to pick N − 0.5 vs N."
        code={AllowHalfSource}
      >
        <AllowHalfRate />
      </DemoBox>

      <DemoBox title="Custom count" description="3 for sentiment, 10 for NPS-like scales." code={CountSource}>
        <CountRate />
      </DemoBox>

      <DemoBox
        title="Custom character"
        description="Any ReactNode works — emoji, SVG, icon component."
        code={CustomCharacterSource}
      >
        <CustomCharacterRate />
      </DemoBox>

      <DemoBox title="Disabled" description="Read-only display mode." code={DisabledSource}>
        <DisabledRate />
      </DemoBox>

      <DemoBox title="Inside a Form" description="Validator for 'must rate'." code={InFormSource}>
        <InFormRate />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Swap --sg-color-star to rebrand, or widen --sg-font-size-xl for bigger stars."
        code={TokensOverrideSource}
      >
        <TokensOverrideRate />
      </DemoBox>

      <DemoBox title="Unstyled" description="ARIA stays; you own the painting." code={UnstyledSource}>
        <UnstyledRate />
      </DemoBox>

      <PropsTable title="Rate API" data={rateProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Rate has a single dedicated token — `--sg-color-star` — for the filled colour. The empty star uses the global border colour, and the symbol size is `--sg-font-size-xl`."
        data={rateCssVars}
      />
    </ComponentDoc>
  )
}
