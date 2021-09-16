import { createApp } from 'vue'
import App from './App.vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import { setupStore } from '/@/store'
import router from '/@/router'

import './assets/scss/app.scss'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

const bootstrap = () => {
  const app = createApp(App)
  app.use(router)
  app.use(PerfectScrollbar)
  setupStore(app)
  app.mount('#app')
}
bootstrap()
