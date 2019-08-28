import { RouteConfig } from 'vue-router'
import NotFoundView from '@/views/admin/NotFound.vue'
import adminHomepage from '@/views/admin/Home.vue'
import manageUser from '@/views/admin/ManageUser.vue'
import ManageOrder from '@/views/admin/ManageOrder.vue'
import ManageRoom from '@/views/admin/ManageRoom.vue'
import ManageIssue from '@/views/admin/ManageIssue.vue'
import ManageWorker from '@/views/admin/ManageWorker.vue'
import WorkerList from '@/views/admin/WorkerList.vue'
import ReplyIssue from '@/views/admin/ReplyIssue.vue'

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
    path: 'ManageIssue',
    component: ManageIssue,
  },
  {
    path: 'reply',
    component:ReplyIssue,
  },
  {
    path: 'ManageWorker',
    component: ManageWorker,
  },
  {
    path: 'WorkerList',
    component: WorkerList,
  },
  {
    path: '/admin/**',
    component: NotFoundView,
  },
]
