<script setup lang="ts">
/**
 * `draggable` enables HTML5 DnD on every node. Vue emits `drop` with
 * `{ event, dragNode, node, dropPosition }` — `dropPosition` is `-1`
 * (before), `0` (inside) or `1` (after). SkyGraph reports the intent;
 * the consumer mutates the source data.
 */
import { ref } from 'vue'
import { SgTree } from '@skygraph/vue'
import type { TreeNodeData } from '@skygraph/vue'
import { fileTree } from './data'

const data = ref<TreeNodeData[]>(fileTree)
const log = ref<string[]>([])

function append(msg: string) {
  log.value = [msg, ...log.value].slice(0, 5)
}
</script>

<template>
  <div>
    <SgTree
      :tree-data="data"
      draggable
      default-expand-all
      @drop="(info) => append(`drop: ${String(info.dragNode.key)} → ${String(info.node.key)} (${info.dropPosition})`)"
    />
    <div
      style="
        margin-top: 8px;
        font-family: monospace;
        font-size: 12px;
        padding: 8px;
        background: var(--sg-color-bg-container);
        border: 1px solid var(--sg-color-border);
        border-radius: var(--sg-border-radius);
        min-height: 60px;
      "
    >
      <span v-if="log.length === 0" style="color: var(--sg-color-text-tertiary)">
        Drag a node onto another to log a drop event…
      </span>
      <div v-for="(line, i) in log" :key="i">{{ line }}</div>
    </div>
  </div>
</template>
