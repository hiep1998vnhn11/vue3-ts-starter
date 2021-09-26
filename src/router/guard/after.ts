import { Router } from 'vue-router'
import nProgress from 'nprogress'
export function useAfterRoute(router: Router) {
  router.afterEach(() => {
    nProgress.done()
    console.log('after each')
  })
}
