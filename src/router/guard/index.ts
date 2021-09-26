import type { Router } from 'vue-router'
import { usePermissionRoute } from './permission'
import { useAfterRoute } from './after'
import nProgress from 'nprogress'
export function useGuard(router: Router) {
  usePermissionRoute(router)
  useAfterRoute(router)
  router.beforeEach((to, from, next) => {
    nProgress.start()

    console.log(to.meta)
    console.log(from.meta)
    return next()
  })
}
