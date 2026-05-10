<script setup lang="ts">
import { SgCarousel } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Carousel',
    lead: 'Sliding image / content viewer with dot navigation. Optional autoplay, fade or slide effect, dots in any corner.',
    when1: 'Hero section with rotating banners.',
    when2: 'Step-through marketing copy on a landing page.',
    basicTitle: 'Basic',
    basicDesc: 'Three slides with bottom dots.',
    autoplayTitle: 'Autoplay',
    autoplayDesc: 'Auto-advances every 2 seconds.',
    fadeTitle: 'Fade effect',
    fadeDesc: 'Cross-fade between slides instead of horizontal slide.',
  },
  ru: {
    title: 'Carousel',
    lead: 'Слайдер контента с точечной навигацией. Опционально autoplay, fade или slide, точки в любом углу.',
    when1: 'Hero-секция с ротацией баннеров.',
    when2: 'Пошаговый маркетинговый текст на лендинге.',
    basicTitle: 'Basic',
    basicDesc: 'Три слайда с точками снизу.',
    autoplayTitle: 'Autoplay',
    autoplayDesc: 'Авто-переключение каждые 2 секунды.',
    fadeTitle: 'Fade-эффект',
    fadeDesc: 'Растворение вместо горизонтального слайда.',
  },
})

const propsData: PropDef[] = [
  {
    name: 'autoplay',
    description: 'Auto-advance slides on an interval.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'autoplaySpeed',
    description: 'Interval (ms) between autoplay steps.',
    type: 'number',
    default: '3000',
  },
  { name: 'dots', description: 'Show dot navigation.', type: 'boolean', default: 'true' },
  {
    name: 'dotPosition',
    description: 'Where dots are placed.',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
  },
  {
    name: 'effect',
    description: 'Slide transition.',
    type: "'slide' | 'fade'",
    default: "'slide'",
  },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const slideStyle = (color: string) =>
  `height: 160px; display: flex; align-items: center; justify-content: center;
   color: var(--sg-color-white, #fff); font-size: 24px; font-weight: 600;
   background: ${color};`

const BASIC = `<SgCarousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</SgCarousel>`
const AUTOPLAY = `<SgCarousel autoplay :autoplay-speed="2000">…</SgCarousel>`
const FADE = `<SgCarousel effect="fade" autoplay>…</SgCarousel>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Carousel']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC" vertical>
      <SgCarousel style="width: 100%; max-width: 480px">
        <div :style="slideStyle('#1677ff')">Slide 1</div>
        <div :style="slideStyle('#52c41a')">Slide 2</div>
        <div :style="slideStyle('#faad14')">Slide 3</div>
      </SgCarousel>
    </DemoBox>

    <DemoBox :title="t.autoplayTitle" :description="t.autoplayDesc" :code="AUTOPLAY" vertical>
      <SgCarousel autoplay :autoplay-speed="2000" style="width: 100%; max-width: 480px">
        <div :style="slideStyle('#13c2c2')">Auto 1</div>
        <div :style="slideStyle('#722ed1')">Auto 2</div>
        <div :style="slideStyle('#eb2f96')">Auto 3</div>
      </SgCarousel>
    </DemoBox>

    <DemoBox :title="t.fadeTitle" :description="t.fadeDesc" :code="FADE" vertical>
      <SgCarousel
        effect="fade"
        autoplay
        :autoplay-speed="2200"
        style="width: 100%; max-width: 480px"
      >
        <div :style="slideStyle('#1677ff')">Fade 1</div>
        <div :style="slideStyle('#52c41a')">Fade 2</div>
      </SgCarousel>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
