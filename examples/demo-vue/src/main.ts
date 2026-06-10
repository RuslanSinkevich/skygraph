import { createApp, h } from 'vue'
import App from './App.vue'
import { router } from './router'
import { I18nProvider } from './i18n'
import { installInteractionLogger } from './devtools/interactionLogger'
import '@skygraph/styles'
import '@skygraph-examples/shared-vue/layout/styles.css'
import './style.css'
import './demos/components/DemoTOC/demo-toc.css'

installInteractionLogger()

createApp({
  render: () => h(I18nProvider, null, () => h(App)),
})
  .use(router)
  .mount('#app')
