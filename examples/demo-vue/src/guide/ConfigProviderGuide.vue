<script setup lang="ts">
/**
 * Guide → ConfigProvider (`/guide/config-provider`) — Vue 3.
 *
 * Used to be a stub that pointed users at `#/components/configprovider`
 * (and that's it). Now it's a real guide page: explains the mental
 * model (scoped defaults, no prop drilling), lists the API surface,
 * shows nesting semantics, and still links to the component demo for
 * interactive playgrounds.
 */
import { SgConfigProvider, SgButton, SgInput } from '@skygraph/vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const PROVIDE_BASIC = `import { createApp } from 'vue'
import { SgConfigProvider } from '@skygraph/vue'
import { ru_RU } from '@skygraph/vue/locales'
import '@skygraph/styles'

const app = createApp(App)

// Root-level provider — pick a locale + default size for the whole app.
app.component('SgConfigProvider', SgConfigProvider)`

const PROVIDE_TEMPLATE = `<template>
  <SgConfigProvider :config="{ size: 'large', locale: ru_RU }">
    <App />
  </SgConfigProvider>
</template>`

const NESTED = `<SgConfigProvider :config="{ locale: ru_RU, size: 'middle' }">
  <Form>
    <SgInput placeholder="middle (from outer)" />

    <!-- Inner provider only overrides size — locale stays ru_RU. -->
    <SgConfigProvider :config="{ size: 'small' }">
      <SgInput placeholder="small (from inner)" />
    </SgConfigProvider>
  </Form>
</SgConfigProvider>`

const USE_CONFIG = `<script setup lang="ts">
import { useConfig } from '@skygraph/vue'

const config = useConfig()
// → { size: 'middle', locale: ru_RU, ... }
<\/script>`
</script>

<template>
  <section class="doc-page">
    <header class="doc-header">
      <h1 class="doc-component-title">{{ t.configProviderGuide.title }}</h1>
      <p class="doc-lead">{{ t.configProviderGuide.lead }}</p>
    </header>

    <h2>{{ t.configProviderGuide.whenHeading }}</h2>
    <ul>
      <li>{{ t.configProviderGuide.when1 }}</li>
      <li>{{ t.configProviderGuide.when2 }}</li>
      <li>{{ t.configProviderGuide.when3 }}</li>
      <li>{{ t.configProviderGuide.when4 }}</li>
    </ul>

    <h2>{{ t.configProviderGuide.apiHeading }}</h2>
    <p>{{ t.configProviderGuide.apiLead }}</p>
    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 25%">{{ t.propsTable.colProperty }}</th>
          <th style="width: 35%">{{ t.propsTable.colType }}</th>
          <th>{{ t.propsTable.colDescription }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>size</code></td>
          <td><code>'small' | 'middle' | 'large'</code></td>
          <td>{{ t.configProviderGuide.apiSizeDesc }}</td>
        </tr>
        <tr>
          <td><code>disabled</code></td>
          <td><code>boolean</code></td>
          <td>{{ t.configProviderGuide.apiDisabledDesc }}</td>
        </tr>
        <tr>
          <td><code>bordered</code></td>
          <td><code>boolean</code></td>
          <td>{{ t.configProviderGuide.apiBorderedDesc }}</td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td><code>SgLocale</code></td>
          <td>{{ t.configProviderGuide.apiLocaleDesc }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Setup</h2>
    <pre class="doc-code"><code>{{ PROVIDE_BASIC }}</code></pre>
    <pre class="doc-code"><code>{{ PROVIDE_TEMPLATE }}</code></pre>

    <h2>{{ t.configProviderGuide.nestedHeading }}</h2>
    <p>{{ t.configProviderGuide.nestedLead }}</p>
    <pre class="doc-code"><code>{{ NESTED }}</code></pre>

    <SgConfigProvider :config="{ size: 'middle' }">
      <div
        :style="{
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid var(--sg-color-border-secondary)',
          background: 'var(--sg-color-bg-elevated)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginTop: '12px',
        }"
      >
        <div :style="{ display: 'flex', gap: '8px', alignItems: 'center' }">
          <SgInput placeholder="middle (outer)" :style="{ width: '220px' }" />
          <SgButton type="primary">middle</SgButton>
        </div>
        <SgConfigProvider :config="{ size: 'small' }">
          <div :style="{ display: 'flex', gap: '8px', alignItems: 'center' }">
            <SgInput placeholder="small (inner)" :style="{ width: '220px' }" />
            <SgButton type="primary">small</SgButton>
          </div>
        </SgConfigProvider>
      </div>
    </SgConfigProvider>

    <h2>useConfig()</h2>
    <pre class="doc-code"><code>{{ USE_CONFIG }}</code></pre>

    <h2>{{ t.configProviderGuide.componentHeading }}</h2>
    <p>{{ t.configProviderGuide.componentLead }}</p>
    <p>
      <a class="doc-link" href="#/components/configprovider">
        {{ t.configProviderGuide.componentCta }}
      </a>
    </p>
  </section>
</template>
