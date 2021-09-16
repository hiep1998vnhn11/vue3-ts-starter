import type { App } from 'vue'
import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import errorLog from './modules/errorLog'
import locale from './modules/locale'
import lock from './modules/lock'
import multipleTab from './modules/multipleTab'
import permission from './modules/permission'

const store = createStore({
  modules: {
    user,
    permission,
    app,
    errorLog,
    locale,
    lock,
    multipleTab,
  },
})

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
