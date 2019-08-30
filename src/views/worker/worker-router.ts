import { RouteConfig } from 'vue-router'

export const workerRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'workerHomepage',
    component: () => import('@/views/worker/Home.vue')
  }
]
