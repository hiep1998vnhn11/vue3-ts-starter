import { createApp } from 'vue'
import App from './App.vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import { setupStore } from '/@/store'
import routes from './router'

import './assets/scss/app.scss'

const app = createApp(App)
app.use(routes)
app.use(PerfectScrollbar)
setupStore(app)
app.mount('#app')
