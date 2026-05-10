<script setup lang="ts">
/**
 * Renders a single block of source code. No syntax highlighting yet —
 * a `<pre><code>` block keeps the bundle weight close to zero (we already
 * pay for `?raw`-imports of every example). When we want highlighting
 * later, swap the body for shiki / prism here without touching `DemoBox`.
 */
interface Props {
  source: string
}

defineProps<Props>()
</script>

<template>
  <pre class="dv-demo-code-pre"><code class="dv-demo-code-code">{{ source }}</code></pre>
</template>
