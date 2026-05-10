<script setup lang="ts">
/**
 * `:loading="false"` swaps the placeholder for the default slot
 * without remounting its parent — perfect for cards that fetch
 * their own data. Toggle the button to flip between states.
 */
import { ref } from 'vue'
import { SgSkeleton, SgButton } from '@skygraph/vue'

const loading = ref(true)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div>
      <SgButton @click="loading = !loading">
        {{ loading ? 'Load content' : 'Show skeleton' }}
      </SgButton>
    </div>
    <div
      style="
        padding: 16px;
        border: 1px solid var(--sg-color-border);
        border-radius: var(--sg-border-radius);
        background: var(--sg-color-bg-container);
      "
    >
      <SgSkeleton :loading="loading" avatar active>
        <div style="display: flex; gap: 12px; align-items: center">
          <div
            style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: var(--sg-color-primary);
            "
          />
          <div>
            <h4 style="margin: 0">John Doe</h4>
            <p style="margin: 0; color: var(--sg-color-text-secondary)">
              Software Engineer at Acme Corp
            </p>
          </div>
        </div>
      </SgSkeleton>
    </div>
  </div>
</template>
