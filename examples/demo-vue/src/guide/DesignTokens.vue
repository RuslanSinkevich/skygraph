<script setup lang="ts">
/**
 * Guide → Design Tokens — Wave 3.4 stub.
 *
 * React reference (`examples/demo/src/demos/DesignTokensPage.tsx`) is
 * a searchable index over `tokens-data` (~650 token definitions). The
 * data file lives in `examples/demo/src/tokens/` and is not exported
 * cross-package — porting it requires either copying the dataset or
 * exposing it via `_shared`. Both are out of scope for Wave 3.4 — see
 * `docs/_streams/findings/T-Vue-Demo-Header-Parity.md#guide-stubs`.
 */
import { GITHUB_URL } from '@skygraph-examples/shared'
import { useI18n } from '../i18n'

const { t } = useI18n()

const REACT_REFERENCE = `${GITHUB_URL}/blob/master/examples/demo/src/demos/DesignTokensPage.tsx`
</script>

<template>
  <section class="doc-page">
    <h1>{{ t.guideStub.designTokensTitle }}</h1>
    <p class="doc-lead">{{ t.guideStub.designTokensLead }}</p>

    <p>
      <a class="doc-link" :href="REACT_REFERENCE" target="_blank" rel="noreferrer noopener">
        {{ t.guideStub.seeReactDocs }}
      </a>
    </p>
  </section>
</template>
