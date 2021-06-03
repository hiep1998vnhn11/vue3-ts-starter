import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./layouts/default.vue'), // use default layout
    children: [
      { path: '/', component: () => import('./pages/index.vue') },
      { path: '/user/:url', component: () => import('./pages/user/_url.vue') },
      {
        path: '/:path(.*)*',
        component: () => import('./layouts/error.vue'),
      },
    ],
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
