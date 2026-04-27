import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicEmpty } from './empty/Basic.demo'
import BasicSource from './empty/Basic.demo?raw'
import { DescriptionEmpty } from './empty/Description.demo'
import DescriptionSource from './empty/Description.demo?raw'
import { NoDescriptionEmpty } from './empty/NoDescription.demo'
import NoDescriptionSource from './empty/NoDescription.demo?raw'
import { WithActionsEmpty } from './empty/WithActions.demo'
import WithActionsSource from './empty/WithActions.demo?raw'
import { CustomImageEmpty } from './empty/CustomImage.demo'
import CustomImageSource from './empty/CustomImage.demo?raw'
import { InCardEmpty } from './empty/InCard.demo'
import InCardSource from './empty/InCard.demo?raw'
import { TokensOverrideEmpty } from './empty/TokensOverride.demo'
import TokensOverrideSource from './empty/TokensOverride.demo?raw'
import { UnstyledEmpty } from './empty/Unstyled.demo'
import UnstyledSource from './empty/Unstyled.demo?raw'

const emptyProps: PropDef[] = [
  { name: 'image', description: 'Illustration above the description — defaults to the built-in SVG', type: 'ReactNode' },
  { name: 'description', description: "Caption; defaults to 'No Data' when undefined, hidden when null", type: 'ReactNode' },
  { name: 'children', description: 'Footer slot for calls to action', type: 'ReactNode' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-empty-* class (headless mode)', type: 'boolean', default: 'false' },
]

const emptyCssVars: CssVarDef[] = [
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Default illustration colour (currentColor)' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Description / caption colour' },
  { name: 'sg-font-size', default: '14px', description: 'Caption font size' },
  { name: 'sg-line-height', default: '1.5714', description: 'Caption line-height' },
  { name: 'sg-padding-xl', default: '20px', description: 'Vertical padding of the wrapper' },
  { name: 'sg-margin-sm', default: '8px', description: 'Gap image → caption and caption → footer' },
  { name: 'sg-margin-md', default: '12px', description: 'Gap caption → footer (`children`)' },
]

export function EmptyDemo() {
  return (
    <ComponentDoc
      title="Empty"
      description="Zero-data placeholder — a centred illustration, a caption, and an optional footer slot for recovery actions."
      whenToUse={[
        'Empty tables, lists and search results.',
        'Freshly created accounts with nothing yet.',
        'Error-less "no match" states that still invite the user to recover.',
      ]}
    >
      <DemoBox title="Basic" description="Default illustration + caption." code={BasicSource}>
        <BasicEmpty />
      </DemoBox>

      <DemoBox
        title="Custom description"
        description="Strings or ReactNodes — both fine."
        code={DescriptionSource}
      >
        <DescriptionEmpty />
      </DemoBox>

      <DemoBox
        title="No description"
        description="`description={null}` drops the caption entirely."
        code={NoDescriptionSource}
      >
        <NoDescriptionEmpty />
      </DemoBox>

      <DemoBox
        title="With actions"
        description="Add a primary CTA via `children`."
        code={WithActionsSource}
      >
        <WithActionsEmpty />
      </DemoBox>

      <DemoBox
        title="Custom image"
        description="Emoji, <img />, SVG, Lottie — whatever renders."
        code={CustomImageSource}
      >
        <CustomImageEmpty />
      </DemoBox>

      <DemoBox
        title="Inside a card"
        description="Canonical placement inside a Table / Card / List."
        code={InCardSource}
      >
        <InCardEmpty />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Retint the illustration + caption via CSS variables."
        code={TokensOverrideSource}
      >
        <TokensOverrideEmpty />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep structure + aria, ship your own layout."
        code={UnstyledSource}
      >
        <UnstyledEmpty />
      </DemoBox>

      <PropsTable title="Empty API" data={emptyProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Empty has no component-private tokens. The built-in illustration paints with `currentColor` → `--sg-color-text-disabled`; the caption uses `--sg-color-text-tertiary`. Adjust spacing via the global `--sg-padding-xl` / `--sg-margin-*` tokens."
        data={emptyCssVars}
      />
    </ComponentDoc>
  )
}
