<script setup lang="ts">
/**
 * Renders a single block of source code. No syntax highlighting yet —
 * a `<pre><code>` block keeps the bundle weight close to zero (we already
 * pay for `?raw`-imports of every example). When we want highlighting
 * later, swap the body for shiki / prism here without touching `DemoBox`.
 *
 * The DOM is intentionally bare (`<pre><code>`) — `.demo-box-code` on
 * the parent `<div>` (rendered by {@link DemoBox}) supplies all
 * styling, mirroring React `examples/demo/src/components/DemoBox.tsx`
 * which inlines the same DOM.
 */
interface Props {
  source: string
}

defineProps<Props>()
</script>

<template>
  <pre><code>{{ source }}</code></pre>
</template>
