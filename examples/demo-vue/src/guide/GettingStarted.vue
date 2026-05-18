<script setup lang="ts">
/**
 * Guide → Getting Started — Wave 3.4 port of
 * `examples/demo/src/demos/GettingStartedPage.tsx`.
 *
 * Same DOM (`section.doc-page` + `.doc-code` + `.doc-card-row`) so the
 * existing global stylesheet (style.css) covers it. Code snippets are
 * adapted from React → Vue 3 SFCs.
 */
import { useI18n } from '../i18n'

const { t } = useI18n()

const NPM_INSTALL = 'npm install skygraph-vue'
const PNPM_INSTALL = 'pnpm add skygraph-vue'
const IMPORT_STYLES = '// styles are loaded automatically by skygraph-vue'

// `\x3c` keeps the SFC parser happy by hiding literal `<` from the
// template/parser. See Landing.vue for the same trick.
const BASIC_FORM =
  '\x3cscript setup lang="ts">\n' +
  "import { Form, Field, SubmitButton } from 'skygraph-vue'\n" +
  '\x3c/script>\n' +
  '\n' +
  '\x3ctemplate>\n' +
  '  \x3cForm\n' +
  '    layout="vertical"\n' +
  "    :default-values=\"{ email: '', password: '' }\"\n" +
  '    @submit="(values) => console.log(values)"\n' +
  '  >\n' +
  '    \x3cField\n' +
  '      name="email"\n' +
  '      label="Email"\n' +
  '      :rules="[{ required: true }, { type: \'email\' }]"\n' +
  '    />\n' +
  '    \x3cField\n' +
  '      name="password"\n' +
  '      label="Password"\n' +
  '      type="password"\n' +
  '      :rules="[{ required: true }, { min: 6 }]"\n' +
  '    />\n' +
  '    \x3cSubmitButton>Log in\x3c/SubmitButton>\n' +
  '  \x3c/Form>\n' +
  '\x3c/template>'

const INDIVIDUAL =
  '\x3cscript setup lang="ts">\n' +
  "import { Button, Switch, Select } from 'skygraph-vue'\n" +
  "import { ref } from 'vue'\n" +
  '\n' +
  'const checked = ref(false)\n' +
  'const options = [\n' +
  "  { label: 'React', value: 'react' },\n" +
  "  { label: 'Vue', value: 'vue' },\n" +
  ']\n' +
  '\x3c/script>\n' +
  '\n' +
  '\x3ctemplate>\n' +
  '  \x3cButton type="primary">Click me\x3c/Button>\n' +
  '  \x3cSwitch v-model:checked="checked" />\n' +
  '  \x3cSelect :options="options" placeholder="Pick a framework" />\n' +
  '\x3c/template>'
</script>

<template>
  <section class="doc-page">
    <h1>{{ t.gettingStarted.title }}</h1>
    <p class="doc-lead">{{ t.gettingStarted.lead }}</p>

    <h2 id="installation">{{ t.gettingStarted.installation }}</h2>
    <p>{{ t.gettingStarted.installLeadNpm }}</p>
    <pre class="doc-code"><code>{{ NPM_INSTALL }}</code></pre>
    <p>{{ t.gettingStarted.installLeadPnpm }}</p>
    <pre class="doc-code"><code>{{ PNPM_INSTALL }}</code></pre>

    <h2 id="import-styles">{{ t.gettingStarted.importStyles }}</h2>
    <p>{{ t.gettingStarted.importStylesLead }}</p>
    <pre class="doc-code"><code>{{ IMPORT_STYLES }}</code></pre>
    <p>
      {{ t.gettingStarted.importStylesNote1 }}
      <a href="#/guide/theming" class="doc-link">{{ t.gettingStarted.importStylesNote2Theming }}</a>
      ).
    </p>

    <h2 id="basic-form">{{ t.gettingStarted.basicForm }}</h2>
    <p>{{ t.gettingStarted.basicFormLead }}</p>
    <pre class="doc-code"><code>{{ BASIC_FORM }}</code></pre>

    <h2 id="individual-components">{{ t.gettingStarted.individualComponents }}</h2>
    <p>{{ t.gettingStarted.individualComponentsLead }}</p>
    <pre class="doc-code"><code>{{ INDIVIDUAL }}</code></pre>

    <h2 id="whats-next">{{ t.gettingStarted.whatsNext }}</h2>
    <div class="doc-card-row">
      <a href="#/guide/theming" class="doc-next-card">
        <strong>{{ t.gettingStarted.cardThemingTitle }}</strong>
        <span>{{ t.gettingStarted.cardThemingDesc }}</span>
      </a>
      <a href="#/guide/core-api" class="doc-next-card">
        <strong>{{ t.gettingStarted.cardCoreApiTitle }}</strong>
        <span>{{ t.gettingStarted.cardCoreApiDesc }}</span>
      </a>
      <a href="#/components/button" class="doc-next-card">
        <strong>{{ t.gettingStarted.cardComponentsTitle }}</strong>
        <span>{{ t.gettingStarted.cardComponentsDesc }}</span>
      </a>
    </div>
  </section>
</template>
