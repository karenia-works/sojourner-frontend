import { RouteConfig } from 'vue-router'

export const adminRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'adminHomepage',
    component: () => import('@/views/admin/Home.vue'),
  },
  {
    path: 'manageUser',
    name: 'manageUser',
    component: () => import('@/views/admin/ManageUser.vue'),
  },
  {
    path: 'ManageOrder',
    name: 'ManageOrder',
    component: () => import('@/views/admin/ManageOrder.vue'),
  },
  {
    path: 'ManageRoom',
    name: 'ManageRoom',
    component: () => import('@/views/admin/ManageRoom.vue'),
  },
  {
    path: 'ManageRepair',
    name: 'ManageRepair',
    component: () => import('@/views/admin/ManageRepair.vue'),
  },
]
