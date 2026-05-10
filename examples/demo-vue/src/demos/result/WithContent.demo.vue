<script setup lang="ts">
/**
 * Default slot renders inside a soft panel below `#extra`. Use
 * it for diagnostics, error logs, or next-step checklists — keep
 * it secondary so the primary outcome stays scannable.
 */
import { SgResult, SgButton } from '@skygraph/vue'
</script>

<template>
  <SgResult
    status="error"
    title="Deploy failed"
    sub-title="Build #1242 crashed during the post-install step."
  >
    <template #extra>
      <SgButton type="primary">Retry build</SgButton>
      <SgButton>View logs</SgButton>
    </template>
    <div style="text-align: left; font-family: monospace; font-size: 12px">
      <p style="margin: 0">The following errors were reported:</p>
      <ul style="margin: 8px 0 0 20px; padding: 0">
        <li>E_NOPERM: permission denied on <code>/opt/app</code></li>
        <li>E_NETWORK: failed to download asset <code>bundle.js</code></li>
      </ul>
    </div>
  </SgResult>
</template>
