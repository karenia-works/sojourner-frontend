import { RouteConfig } from 'vue-router'

export const adminRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'adminHomepage',
    component: () => import('@/views/admin/Home.vue'),
  },
]
