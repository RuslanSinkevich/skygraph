import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useCascaderDocStrings } from './cascader-doc/useCascaderDocStrings'

import { BasicCascader } from './cascader/Basic.demo'
import BasicSource from './cascader/Basic.demo?raw'
import { DefaultValueCascader } from './cascader/DefaultValue.demo'
import DefaultValueSource from './cascader/DefaultValue.demo?raw'
import { HoverTriggerCascader } from './cascader/HoverTrigger.demo'
import HoverTriggerSource from './cascader/HoverTrigger.demo?raw'
import { ChangeOnSelectCascader } from './cascader/ChangeOnSelect.demo'
import ChangeOnSelectSource from './cascader/ChangeOnSelect.demo?raw'
import { SearchCascader } from './cascader/Search.demo'
import SearchSource from './cascader/Search.demo?raw'
import { MultipleCascader } from './cascader/Multiple.demo'
import MultipleSource from './cascader/Multiple.demo?raw'
import { SizesCascader } from './cascader/Sizes.demo'
import SizesSource from './cascader/Sizes.demo?raw'
import { DisabledCascader } from './cascader/Disabled.demo'
import DisabledSource from './cascader/Disabled.demo?raw'
import { CustomRenderCascader } from './cascader/CustomRender.demo'
import CustomRenderSource from './cascader/CustomRender.demo?raw'
import { AsyncLoadCascader } from './cascader/AsyncLoad.demo'
import AsyncLoadSource from './cascader/AsyncLoad.demo?raw'
import { TokensOverrideCascader } from './cascader/TokensOverride.demo'
import TokensOverrideSource from './cascader/TokensOverride.demo?raw'
import { FloatingLabelCascader } from './cascader/FloatingLabel.demo'
import FloatingLabelSource from './cascader/FloatingLabel.demo?raw'

export function CascaderDemo() {
  const t = useCascaderDocStrings()

  const cascaderProps = useMemo<PropDef[]>(
    () => [
      { name: 'options', description: t.propOptions, type: 'CascaderOption[]' },
      { name: 'value', description: t.propValue, type: '(string | number)[]' },
      { name: 'defaultValue', description: t.propDefaultValue, type: '(string | number)[]' },
      { name: 'onChange', description: t.propOnChange, type: '(value, selected) => void' },
      { name: 'placeholder', description: t.propPlaceholder, type: 'string' },
      { name: 'allowClear', description: t.propAllowClear, type: 'boolean', default: 'true' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      {
        name: 'size',
        description: t.propSize,
        type: "'small' | 'middle' | 'large'",
        default: "'middle'",
      },
      { name: 'multiple', description: t.propMultiple, type: 'boolean', default: 'false' },
      {
        name: 'showSearch',
        description: t.propShowSearch,
        type: 'boolean | { filter }',
        default: 'false',
      },
      {
        name: 'expandTrigger',
        description: t.propExpandTrigger,
        type: "'click' | 'hover'",
        default: "'click'",
      },
      {
        name: 'changeOnSelect',
        description: t.propChangeOnSelect,
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'displayRender',
        description: t.propDisplayRender,
        type: '(labels, selected) => ReactNode',
      },
      { name: 'loadData', description: t.propLoadData, type: '(selected) => void' },
      { name: 'maxTagCount', description: t.propMaxTagCount, type: 'number' },
      { name: 'dropdownStyle', description: t.propDropdownStyle, type: 'CSSProperties' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const optionProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.optionValue, type: 'string | number' },
      { name: 'label', description: t.optionLabel, type: 'ReactNode' },
      { name: 'children', description: t.optionChildren, type: 'CascaderOption[]' },
      { name: 'disabled', description: t.optionDisabled, type: 'boolean' },
      { name: 'isLeaf', description: t.optionIsLeaf, type: 'boolean' },
    ],
    [t],
  )

  const cascaderCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      {
        name: 'sg-color-primary-hover',
        default: 'var(--sg-blue-5)',
        description: t.cssSgColorPrimaryHover,
      },
      {
        name: 'sg-color-primary-bg',
        default: 'var(--sg-blue-1)',
        description: t.cssSgColorPrimaryBg,
      },
      { name: 'sg-color-bg-container', default: '#ffffff', description: t.cssSgColorBgContainer },
      { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.cssSgColorBgElevated },
      { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: t.cssSgColorBgHover },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      {
        name: 'sg-color-text-placeholder',
        default: 'rgba(0, 0, 0, 0.45)',
        description: t.cssSgColorTextPlaceholder,
      },
      {
        name: 'sg-color-text-tertiary',
        default: 'rgba(0, 0, 0, 0.45)',
        description: t.cssSgColorTextTertiary,
      },
      {
        name: 'sg-color-text-disabled',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssSgColorTextDisabled,
      },
      { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.cssSgColorBorder },
      {
        name: 'sg-color-border-secondary',
        default: 'var(--sg-gray-4)',
        description: t.cssSgColorBorderSecondary,
      },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
      {
        name: 'sg-shadow-lg',
        default: '0 6px 16px rgba(0, 0, 0, 0.08)',
        description: t.cssSgShadowLg,
      },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssSgFontSizeLg },
      { name: 'sg-height-sm', default: '24px', description: t.cssSgHeightSm },
      { name: 'sg-height-md', default: '32px', description: t.cssSgHeightMd },
      { name: 'sg-height-lg', default: '40px', description: t.cssSgHeightLg },
      { name: 'sg-padding-xs', default: '8px', description: t.cssSgPaddingXs },
      { name: 'sg-padding-sm', default: '12px', description: t.cssSgPaddingSm },
      { name: 'sg-padding-md', default: '16px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-lg', default: '24px', description: t.cssSgPaddingLg },
      { name: 'sg-transition-duration', default: '0.2s', description: t.cssSgTransitionDuration },
      {
        name: 'sg-transition-timing',
        default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        description: t.cssSgTransitionTiming,
      },
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
        <BasicCascader />
      </DemoBox>

      <DemoBox
        title={t.demoDefaultValueTitle}
        description={t.demoDefaultValueDesc}
        code={DefaultValueSource}
      >
        <DefaultValueCascader />
      </DemoBox>

      <DemoBox
        title={t.demoHoverTriggerTitle}
        description={t.demoHoverTriggerDesc}
        code={HoverTriggerSource}
      >
        <HoverTriggerCascader />
      </DemoBox>

      <DemoBox
        title={t.demoChangeOnSelectTitle}
        description={t.demoChangeOnSelectDesc}
        code={ChangeOnSelectSource}
      >
        <ChangeOnSelectCascader />
      </DemoBox>

      <DemoBox title={t.demoSearchTitle} description={t.demoSearchDesc} code={SearchSource}>
        <SearchCascader />
      </DemoBox>

      <DemoBox title={t.demoMultipleTitle} description={t.demoMultipleDesc} code={MultipleSource}>
        <MultipleCascader />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesCascader />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledCascader />
      </DemoBox>

      <DemoBox
        title={t.demoCustomRenderTitle}
        description={t.demoCustomRenderDesc}
        code={CustomRenderSource}
      >
        <CustomRenderCascader />
      </DemoBox>

      <DemoBox
        title={t.demoAsyncLoadTitle}
        description={t.demoAsyncLoadDesc}
        code={AsyncLoadSource}
      >
        <AsyncLoadCascader />
      </DemoBox>

      <DemoBox
        title={t.demoTokensOverrideTitle}
        description={t.demoTokensOverrideDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideCascader />
      </DemoBox>

      <DemoBox
        title={t.demoFloatingLabelTitle}
        description={t.demoFloatingLabelDesc}
        code={FloatingLabelSource}
      >
        <FloatingLabelCascader />
      </DemoBox>

      <PropsTable title={t.tableCascaderApi} data={cascaderProps} />
      <PropsTable title={t.tableOption} data={optionProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={cascaderCssVars} />
    </ComponentDoc>
  )
}
