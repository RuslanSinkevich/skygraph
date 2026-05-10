<script setup lang="ts">
/**
 * Built-in HTTP error artwork for `404`, `403`, and `500`. The
 * icon is an outlined number — Result doesn't force a dedicated
 * illustration so you can swap it via the `#icon` slot if you
 * like.
 */
import { SgResult, SgButton } from '@skygraph/vue'
</script>

<template>
  <div
    style="
      display: grid;
      gap: 32px;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    "
  >
    <SgResult
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <SgButton type="primary">Back Home</SgButton>
      </template>
    </SgResult>
    <SgResult
      status="403"
      title="403"
      sub-title="You don't have permission to view this page."
    >
      <template #extra>
        <SgButton type="primary">Sign in</SgButton>
      </template>
    </SgResult>
    <SgResult
      status="500"
      title="500"
      sub-title="Sorry, something went wrong on our end."
    >
      <template #extra>
        <SgButton type="primary">Retry</SgButton>
      </template>
    </SgResult>
  </div>
</template>
