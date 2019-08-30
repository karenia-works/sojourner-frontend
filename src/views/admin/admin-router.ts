import { RouteConfig } from 'vue-router'
import NotFoundView from '@/views/admin/NotFound.vue'
import adminHomepage from '@/views/admin/Home.vue'
import manageUser from '@/views/admin/ManageUser.vue'
import ManageOrder from '@/views/admin/ManageOrder.vue'
import ManageRoom from '@/views/admin/ManageRoom.vue'
import ManageIssue from '@/views/admin/ManageIssue.vue'
import ManageWorker from '@/views/admin/ManageWorker.vue'
import WorkerList from '@/views/admin/WorkerList.vue'
import NewRoom from '@/views/forms/NewRoom.vue'
import ReplyIssue from '@/views/admin/ReplyIssue.vue'
import UserOrder from '@/views/admin/UserOrder.vue'
import NewWorker from '@/views/admin/NewWorker.vue'

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
    path: 'UserOrder',
    component: UserOrder,
  },
  {
    path: 'ManageRoom',
    name: "adminRoom",
    component: ManageRoom,
  },
  {
    path: 'ManageRoom/NewRoom',
    component: NewRoom,
  },
  {
    path: 'ManageIssue',
    component: ManageIssue,
  },
  {
    path: 'NewWorker',
    component: NewWorker,
  },
  {
    path: 'reply',
    component: ReplyIssue,
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
