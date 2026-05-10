import { createApp, h } from 'vue'
import App from './App.vue'
import { router } from './router'
import { I18nProvider } from './i18n'
import '@skygraph/styles'
import '@skygraph-examples/shared-vue/layout/styles.css'
import './style.css'

createApp({
  render: () => h(I18nProvider, null, () => h(App)),
})
  .use(router)
  .mount('#app')
