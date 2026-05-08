<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChartSize } from '../../../composables/useChartSize'
import { printElement } from '../../../utils/print'
import {
  chartBounds,
  colorForSeries,
  normalizePadding,
  resolveChartAnimation,
  type BaseChartProps,
} from './types'
import ChartLegend from './ChartLegend.vue'
import ChartAxes from './ChartAxes.vue'

interface LineChartProps extends BaseChartProps {
  markers?: boolean
  strokeWidth?: number
}

const props = withDefaults(defineProps<LineChartProps>(), {
  width: '100%',
  height: 200,
  unstyled: false,
  markers: true,
  strokeWidth: 2,
  legend: false,
  fileName: 'chart',
})

const rootRef = ref<HTMLDivElement | null>(null)
const svgRef = ref<SVGSVGElement | null>(null)
const fallbackW = computed(() =>
  typeof props.width === 'number' && Number.isFinite(props.width) ? props.width : 600,
)
const fallbackH = computed(() =>
  typeof props.height === 'number' && Number.isFinite(props.height) ? props.height : 200,
)
const { size } = useChartSize(svgRef, { width: fallbackW.value, height: fallbackH.value })

const padding = computed(() => normalizePadding(props.padding))
const viewW = computed(() => size.value.width)
const viewH = computed(() => size.value.height)
const plotX = computed(() => padding.value[3])
const plotY = computed(() => padding.value[0])
const plotW = computed(() => Math.max(0, viewW.value - padding.value[3] - padding.value[1]))
const plotH = computed(() => Math.max(0, viewH.value - padding.value[0] - padding.value[2]))

const bounds = computed(() => chartBounds(props.series.map((s) => s.values)))
const animation = computed(() => resolveChartAnimation(props.animate))

const xCoord = (i: number) => {
  const n = props.categories.length
  if (n <= 1) return plotX.value
  return plotX.value + (plotW.value * i) / (n - 1)
}

const yCoord = (v: number) => {
  const { min, max } = bounds.value
  if (max === min) return plotY.value + plotH.value / 2
  return plotY.value + plotH.value * (1 - (v - min) / (max - min))
}

const lineSegments = computed(() =>
  props.series.map((s, i) => {
    const color = colorForSeries(s, i)
    const segments: string[] = []
    let current: string[] = []
    s.values.forEach((v, idx) => {
      if (v === null || v === undefined) {
        if (current.length > 0) {
          segments.push(current.join(' '))
          current = []
        }
      } else {
        const cmd = current.length === 0 ? 'M' : 'L'
        current.push(`${cmd}${xCoord(idx)},${yCoord(v)}`)
      }
    })
    if (current.length > 0) segments.push(current.join(' '))
    return { id: s.id, color, label: s.label, segments }
  }),
)

const markerPoints = computed(() =>
  props.series.flatMap((s, i) => {
    const color = colorForSeries(s, i)
    return s.values
      .map((v, idx) => (v == null ? null : { id: `${s.id}-${idx}`, color, x: xCoord(idx), y: yCoord(v) }))
      .filter(Boolean) as { id: string; color: string; x: number; y: number }[]
  }),
)

defineExpose({
  print: (opts: { fileName?: string } = {}) => {
    const el = rootRef.value
    if (!el) return
    printElement(el, { fileName: opts.fileName ?? props.fileName ?? 'chart' })
  },
  exportSvg: () => {
    const svg = svgRef.value
    if (!svg) return null
    return new XMLSerializer().serializeToString(svg)
  },
})
</script>

<template>
  <div
    ref="rootRef"
    :class="[!props.unstyled && 'sg-chart sg-chart-line', props.className]"
    :style="{
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    }"
    :data-animate="animation.enabled ? 'on' : 'off'"
  >
    <svg
      ref="svgRef"
      :viewBox="`0 0 ${viewW} ${viewH}`"
      :width="typeof props.width === 'number' ? props.width : '100%'"
      :height="props.height"
      role="img"
      aria-label="Line chart"
    >
      <ChartAxes
        :x="plotX"
        :y="plotY"
        :plotW="plotW"
        :plotH="plotH"
        :categories="props.categories"
        :yMin="bounds.min"
        :yMax="bounds.max"
        :xAxis="props.xAxis"
        :yAxis="props.yAxis"
        :unstyled="props.unstyled"
      />
      <g class="sg-chart-line-paths">
        <template v-for="ln in lineSegments" :key="ln.id">
          <path
            v-for="(seg, si) in ln.segments"
            :key="`${ln.id}-${si}`"
            :d="seg"
            :stroke="ln.color"
            :stroke-width="props.strokeWidth"
            fill="none"
            vector-effect="non-scaling-stroke"
            :data-series-id="ln.id"
          />
        </template>
      </g>
      <g v-if="props.markers" class="sg-chart-line-markers">
        <circle
          v-for="m in markerPoints"
          :key="m.id"
          :cx="m.x"
          :cy="m.y"
          r="3"
          :fill="m.color"
        />
      </g>
    </svg>
    <ChartLegend v-if="props.legend" :series="props.series" :unstyled="props.unstyled" />
  </div>
</template>
