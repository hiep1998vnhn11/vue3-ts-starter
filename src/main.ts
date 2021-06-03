import { createApp } from 'vue'
import App from './App.vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import routes from './routes'

import './assets/scss/app.scss'

const app = createApp(App)
app.use(routes)
app.use(PerfectScrollbar)
app.mount('#app')
