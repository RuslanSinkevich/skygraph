<script setup lang="ts">
/**
 * Guide → Styling Showcase — Wave 3.4 stub.
 *
 * The React reference page (`examples/demo/src/demos/StylingShowcasePage.tsx`)
 * is ~900 lines of interactive recipes (palette swatches, slot demos,
 * conditional rows, dark scopes, headless modals, per-feature brand…).
 * Porting it 1:1 is out of scope for this stream — see
 * `docs/_streams/findings/T-Vue-Demo-Header-Parity.md#guide-stubs`.
 *
 * This stub keeps the route + sidebar + DOM contract (.doc-page) so the
 * navigation works and the lint contract holds. Full content lands in a
 * follow-up wave.
 */
import { GITHUB_URL } from '@skygraph-examples/shared'
import { useI18n } from '../i18n'

const { t } = useI18n()

const REACT_REFERENCE = `${GITHUB_URL}/blob/master/examples/demo/src/demos/StylingShowcasePage.tsx`
</script>

<template>
  <section class="doc-page">
    <h1>{{ t.guideStub.stylingShowcaseTitle }}</h1>
    <p class="doc-lead">{{ t.guideStub.stylingShowcaseLead }}</p>

    <p>
      <a class="doc-link" :href="REACT_REFERENCE" target="_blank" rel="noreferrer noopener">
        {{ t.guideStub.seeReactDocs }}
      </a>
    </p>
  </section>
</template>
