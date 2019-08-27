import { RouteConfig } from 'vue-router'
import NotFoundView from '@/views/admin/NotFound.vue'
import adminHomepage from '@/views/admin/Home.vue'
import manageUser from '@/views/admin/ManageUser.vue'
import ManageOrder from '@/views/admin/ManageOrder.vue'
import ManageRoom from '@/views/admin/ManageRoom.vue'
import ManageRepair from '@/views/admin/ManageRepair.vue'

export const adminRoutes: RouteConfig[] = [
  {
    path: '',
    component: adminHomepage,
  },
  {
    path: 'manageUser',
    component: manageUser,
  },
  {
    path: 'ManageOrder',
    component: ManageOrder,
  },
  {
    path: 'ManageRoom',
    component: ManageRoom,
  },
  {
    path: 'ManageRepair',
    component: ManageRepair,
  },
  {
    path: '/admin/**',
    component: NotFoundView,
  },
]
