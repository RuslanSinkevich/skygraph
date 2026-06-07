import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useCarouselDocStrings } from './carousel-doc/useCarouselDocStrings'

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

export function CarouselDemo() {
  const t = useCarouselDocStrings()

  const carouselProps = useMemo<PropDef[]>(
    () => [
      { name: 'autoplay', description: t.propAutoplay, type: 'boolean', default: 'false' },
      { name: 'autoplaySpeed', description: t.propAutoplaySpeed, type: 'number', default: '3000' },
      { name: 'dots', description: t.propDots, type: 'boolean', default: 'true' },
      {
        name: 'dotPosition',
        description: t.propDotPosition,
        type: "'top' | 'bottom' | 'left' | 'right'",
        default: "'bottom'",
      },
      { name: 'effect', description: t.propEffect, type: "'slide' | 'fade'", default: "'slide'" },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const carouselCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssPrimary },
      {
        name: 'sg-color-text-disabled',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssTextDisabled,
      },
      {
        name: 'sg-color-text-tertiary',
        default: 'rgba(0, 0, 0, 0.45)',
        description: t.cssTextTertiary,
      },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-padding-xs', default: '4px', description: t.cssPaddingXs },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssTransitionDuration },
      {
        name: 'sg-transition-timing',
        default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        description: t.cssTransitionTiming,
      },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbCarousel]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicCarousel />
      </DemoBox>

      <DemoBox title={t.demoAutoplayTitle} description={t.demoAutoplayDesc} code={AutoplaySource}>
        <AutoplayCarousel />
      </DemoBox>

      <DemoBox title={t.demoFadeTitle} description={t.demoFadeDesc} code={FadeSource}>
        <FadeCarousel />
      </DemoBox>

      <DemoBox
        title={t.demoDotPositionTitle}
        description={t.demoDotPositionDesc}
        code={DotPositionSource}
      >
        <DotPositionCarousel />
      </DemoBox>

      <DemoBox
        title={t.demoHiddenDotsTitle}
        description={t.demoHiddenDotsDesc}
        code={HiddenDotsSource}
      >
        <HiddenDotsCarousel />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideCarousel />
      </DemoBox>

      <PropsTable title={t.tableCarouselApi} data={carouselProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={carouselCssVars} />
    </ComponentDoc>
  )
}
