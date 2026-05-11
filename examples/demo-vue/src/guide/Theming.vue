<script setup lang="ts">
/**
 * Guide → Theming — Wave 3.4 port of
 * `examples/demo/src/demos/ThemingPage.tsx`.
 *
 * Pure documentation page. The toggle code snippet shows the Vue-flavoured
 * `<script setup>` example because the surrounding theming contract
 * (data-sg-theme, --sg-* tokens) is framework-agnostic.
 */
import { useI18n } from '../i18n'

const { t } = useI18n()

const DARK_TOGGLE_DOM = "document.documentElement.setAttribute('data-sg-theme', 'dark')"

const DARK_VUE_EXAMPLE =
  '\x3c!-- Static HTML approach -->\n' +
  '\x3chtml data-sg-theme="dark">\n' +
  '  ...\n' +
  '\x3c/html>\n' +
  '\n' +
  '\x3c!-- Vue toggle -->\n' +
  '\x3cscript setup lang="ts">\n' +
  "import { ref, watch } from 'vue'\n" +
  "import { Switch } from '@skygraph/vue'\n" +
  '\n' +
  'const dark = ref(false)\n' +
  'watch(dark, (next) => {\n' +
  "  document.documentElement.setAttribute('data-sg-theme', next ? 'dark' : 'light')\n" +
  '})\n' +
  '\x3c/script>\n' +
  '\n' +
  '\x3ctemplate>\n' +
  '  \x3cSwitch v-model:checked="dark" />\n' +
  '\x3c/template>'

const CUSTOM_THEME_CSS = `:root {
  --sg-color-primary: #7c3aed;
  --sg-color-primary-hover: #6d28d9;
  --sg-color-primary-active: #5b21b6;
  --sg-color-primary-bg: rgba(124, 58, 237, 0.08);
}`

const COMPONENT_TOKENS_CSS = `/* Make buttons taller with rounded corners */
:root {
  --sg-btn-height: 40px;
  --sg-btn-border-radius: 20px;
  --sg-btn-font-size: 15px;
}

/* Larger inputs */
:root {
  --sg-input-height: 42px;
  --sg-input-radius: 8px;
}`

const SLOTS_EXAMPLE = `\x3cTable
  :class-names="{
    root: 'orders-table',
    toolbar: 'orders-table__toolbar',
    headerCell: 'orders-table__th',
    bodyCell: 'orders-table__td',
    row: 'orders-table__row',
  }"
  :styles="{
    headerCell: { fontSize: '16px' },
  }"
  ...
/>`

const HEADLESS_EXAMPLE = `\x3cButton unstyled class="my-btn">
  Custom styled
\x3c/Button>

\x3cSelect unstyled class="my-select" :options="opts" />`
</script>

<template>
  <section class="doc-page">
    <h1>{{ t.theming.title }}</h1>
    <p class="doc-lead">{{ t.theming.lead }}</p>

    <h2 id="three-layers">{{ t.theming.threeLayersHeading }}</h2>
    <table class="doc-table">
      <thead>
        <tr>
          <th>{{ t.theming.colLayer }}</th>
          <th>{{ t.theming.colPrefix }}</th>
          <th>{{ t.theming.colPurpose }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>{{ t.theming.layerPalette }}</strong>
          </td>
          <td>
            <code>--sg-palette-*</code>
          </td>
          <td>{{ t.theming.layerPalettePurpose }}</td>
        </tr>
        <tr>
          <td>
            <strong>{{ t.theming.layerSemantic }}</strong>
          </td>
          <td>
            <code>--sg-color-*</code>
          </td>
          <td>{{ t.theming.layerSemanticPurpose }}</td>
        </tr>
        <tr>
          <td>
            <strong>{{ t.theming.layerComponent }}</strong>
          </td>
          <td>
            <code>--sg-btn-*, --sg-input-*</code>
          </td>
          <td>{{ t.theming.layerComponentPurpose }}</td>
        </tr>
      </tbody>
    </table>
    <p>{{ t.theming.layersFooter }}</p>

    <h2 id="dark-mode">{{ t.theming.darkModeHeading }}</h2>
    <p>{{ t.theming.darkModeLead }}</p>
    <pre class="doc-code"><code>{{ DARK_TOGGLE_DOM }}</code></pre>
    <p>{{ t.theming.darkModeNote }}</p>
    <pre class="doc-code"><code>{{ DARK_VUE_EXAMPLE }}</code></pre>

    <h2 id="custom-theme">{{ t.theming.customThemeHeading }}</h2>
    <p>{{ t.theming.customThemeLead }}</p>
    <pre class="doc-code"><code>{{ CUSTOM_THEME_CSS }}</code></pre>
    <p>{{ t.theming.customThemeFooter }}</p>

    <h2 id="component-tokens">{{ t.theming.perComponentHeading }}</h2>
    <p>{{ t.theming.perComponentLead }}</p>
    <pre class="doc-code"><code>{{ COMPONENT_TOKENS_CSS }}</code></pre>

    <h2 id="slots">{{ t.theming.slotsHeading }}</h2>
    <p>{{ t.theming.slotsLead }}</p>
    <pre class="doc-code"><code>{{ SLOTS_EXAMPLE }}</code></pre>

    <h2 id="headless">{{ t.theming.headlessHeading }}</h2>
    <p>{{ t.theming.headlessLead }}</p>
    <pre class="doc-code"><code>{{ HEADLESS_EXAMPLE }}</code></pre>
    <p>{{ t.theming.headlessFooter }}</p>
  </section>
</template>
