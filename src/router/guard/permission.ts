import { Router } from 'vue-router'
import { store } from '/@/store'

export function usePermissionRoute(router: Router) {
  router.beforeResolve((to, from) => {
    console.log(store)
    console.log('before resolve')
  })
}
