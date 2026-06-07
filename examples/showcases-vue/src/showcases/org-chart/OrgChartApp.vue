<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  SgButton,
  SgEmpty,
  SgDiagram,
  SgNotificationContainer,
  notification,
  useGraph,
} from '@skygraph/vue'
import type { GraphNode } from '@skygraph/core'
import {
  PEOPLE,
  DEPT_ORDER,
  DEPT_COLOR,
  NODE_W,
  NODE_H,
  computeLayout,
  childrenOf,
  personById,
  subtreeCount,
  MANAGER_IDS,
} from './data'
import { useAppLocale } from '../_shared'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RECT_OUTLINE: any = { kind: 'rect', w: NODE_W, h: NODE_H }

const COLLAPSIBLE_IDS = MANAGER_IDS.filter((id) => personById(id)?.managerId != null)

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

const l = useAppLocale('orgChart')
const { graph, state } = useGraph()

const collapsed = ref<Set<string>>(new Set())
const selected = ref<string | null>(null)

const layout = computed(() => computeLayout(collapsed.value))

watch(
  layout,
  (lo) => {
    graph.clear()
    for (const n of lo.nodes) {
      graph.addNode({ id: n.id, transform: { x: n.x, y: n.y }, outline: RECT_OUTLINE })
    }
    for (const e of lo.edges) {
      graph.addEdge({
        id: e.id,
        from: { node: e.from, anchor: { s: 0.5 } },
        to: { node: e.to, anchor: { s: 0.5 } },
        routing: 'orthogonal',
      })
    }
    const visible = new Set(lo.nodes.map((n) => n.id))
    if (selected.value && !visible.has(selected.value)) selected.value = null
  },
  { immediate: true },
)

const deptCounts = computed(() => {
  const counts = {} as Record<(typeof DEPT_ORDER)[number], number>
  for (const d of DEPT_ORDER) counts[d] = 0
  for (const p of PEOPLE) counts[p.dept] += 1
  return counts
})

const selectedPerson = computed(() => (selected.value ? personById(selected.value) : undefined))
const selectedManager = computed(() =>
  selectedPerson.value?.managerId ? personById(selectedPerson.value.managerId) : undefined,
)

function nodePerson(node: GraphNode) {
  return personById(String(node.id))
}

function toggleCollapse(id: string) {
  const next = new Set(collapsed.value)
  if (next.has(id)) {
    next.delete(id)
    notification.info(l.toasts.expanded(personById(id)?.name ?? id))
  } else {
    next.add(id)
    notification.info(l.toasts.collapsed(personById(id)?.name ?? id))
  }
  collapsed.value = next
}

function expandAll() {
  collapsed.value = new Set()
  notification.success(l.toasts.expandedAll)
}

function collapseAll() {
  collapsed.value = new Set(COLLAPSIBLE_IDS)
  notification.info(l.toasts.collapsedAll)
}
</script>

<template>
  <div class="oc-shell">
    <SgNotificationContainer />

    <aside class="oc-side">
      <h4 class="oc-side-title">{{ l.sidebar.title }}</h4>
      <p class="oc-side-hint">{{ l.sidebar.hint }}</p>

      <h4 class="oc-side-title" style="margin-top: 18px">{{ l.sidebar.legendTitle }}</h4>
      <ul class="oc-legend">
        <li v-for="d of DEPT_ORDER" :key="d" class="oc-legend-row">
          <span class="oc-legend-dot" :style="{ background: DEPT_COLOR[d] }" />
          <span class="oc-legend-name">{{ l.dept[d] }}</span>
          <span class="oc-legend-count">{{ deptCounts[d] }}</span>
        </li>
      </ul>

      <h4 class="oc-side-title" style="margin-top: 18px">{{ l.sidebar.statsTitle }}</h4>
      <div class="oc-stats">
        <div>
          <strong>{{ PEOPLE.length }}</strong> {{ l.sidebar.peopleLabel }}
        </div>
        <div>
          <strong>{{ layout.nodes.length }}</strong> {{ l.sidebar.visibleLabel }}
        </div>
        <div>
          <strong>{{ layout.depth }}</strong> {{ l.sidebar.depthLabel }}
        </div>
      </div>
    </aside>

    <section class="oc-canvas-shell">
      <div class="sc-toolbar">
        <span class="oc-toolbar-hint">{{ l.toolbar.hint }}</span>
        <div class="sc-toolbar-spacer" />
        <SgButton size="small" @click="collapseAll">{{ l.toolbar.collapseAll }}</SgButton>
        <SgButton size="small" type="primary" @click="expandAll">{{
          l.toolbar.expandAll
        }}</SgButton>
      </div>

      <div class="oc-canvas">
        <SgDiagram
          :graph="graph"
          :state="state"
          width="100%"
          height="100%"
          panable
          zoomable
          :edge-arrows="false"
        >
          <template #node="{ node }">
            <div
              v-if="nodePerson(node)"
              :class="[
                'oc-node',
                `oc-node--${nodePerson(node)!.dept}`,
                selected === String(node.id) ? 'oc-node--active' : '',
              ]"
              :style="{ '--oc-accent': DEPT_COLOR[nodePerson(node)!.dept] }"
              @click.stop="selected = String(node.id)"
            >
              <span class="oc-node-avatar">{{ initials(nodePerson(node)!.name) }}</span>
              <span class="oc-node-body">
                <span class="oc-node-name">{{ nodePerson(node)!.name }}</span>
                <span class="oc-node-title">{{ nodePerson(node)!.title }}</span>
              </span>
              <button
                v-if="childrenOf(String(node.id)).length > 0"
                type="button"
                :class="[
                  'oc-node-toggle',
                  collapsed.has(String(node.id)) ? 'oc-node-toggle--collapsed' : '',
                ]"
                :title="l.inspector.focus"
                @click.stop="toggleCollapse(String(node.id))"
              >
                {{
                  collapsed.has(String(node.id))
                    ? l.reportsBadge(childrenOf(String(node.id)).length)
                    : '−'
                }}
              </button>
            </div>
          </template>
        </SgDiagram>
      </div>
    </section>

    <aside class="oc-inspector">
      <h4 class="oc-side-title">{{ l.inspector.title }}</h4>
      <SgEmpty v-if="!selectedPerson" :description="l.inspector.empty" />
      <template v-else>
        <div class="oc-card-head">
          <span class="oc-card-avatar" :style="{ background: DEPT_COLOR[selectedPerson.dept] }">
            {{ initials(selectedPerson.name) }}
          </span>
          <div>
            <div class="oc-card-name">{{ selectedPerson.name }}</div>
            <div class="oc-card-title">{{ selectedPerson.title }}</div>
          </div>
        </div>

        <div class="oc-row">
          <span class="oc-row-label">{{ l.inspector.department }}</span>
          <span class="oc-dept-tag" :style="{ background: DEPT_COLOR[selectedPerson.dept] }">
            {{ l.dept[selectedPerson.dept] }}
          </span>
        </div>
        <div class="oc-row">
          <span class="oc-row-label">{{ l.inspector.manager }}</span>
          <span>{{ selectedManager ? selectedManager.name : l.inspector.noManager }}</span>
        </div>
        <div class="oc-row">
          <span class="oc-row-label">{{ l.inspector.directReports }}</span>
          <code>{{ childrenOf(selectedPerson.id).length }}</code>
        </div>
        <div class="oc-row">
          <span class="oc-row-label">{{ l.inspector.totalReports }}</span>
          <code>{{ subtreeCount(selectedPerson.id) }}</code>
        </div>
        <div class="oc-row">
          <span class="oc-row-label">{{ l.inspector.email }}</span>
          <a class="oc-email" :href="`mailto:${selectedPerson.email}`">{{
            selectedPerson.email
          }}</a>
        </div>

        <div v-if="childrenOf(selectedPerson.id).length > 0" class="oc-inspector-section">
          <SgButton size="small" style="width: 100%" @click="toggleCollapse(selectedPerson.id)">
            {{ l.inspector.focus }}
          </SgButton>
        </div>
      </template>
    </aside>
  </div>
</template>
