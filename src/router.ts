import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFoundView from './views/NotFound.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Room from './views/Room.vue'
import Userland from './views/Userland.vue'
import { adminRoutes } from '@/views/admin/admin-router'
import { workerRoutes } from '@/views/worker/worker-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin',
      // name: 'adminWorld',
      component: () => import('./views/admin/App.vue'),
      children: adminRoutes,
    },
    {
      path: '/worker',
      // name: 'adminWorld',
      component: () => import('./views/worker/App.vue'),
      children: workerRoutes,
    },
    {
      path: '/',
      component: Userland,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: '/s',
          name: 'search',
          component: () =>
            import(/* webpackChunkName: "userland" */ './views/Search.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
          props: {
            isSinglePage: true,
            show: true,
            isSignUp: false,
          },
        },
        {
          path: '/register',
          name: 'register',
          component: Signup,
          props: {
            isSinglePage: true,
            show: true,
            isSignUp: true,
          },
        },
        {
          path: '/u/me',
          name: 'user_me',
          component: () =>
            import(/* webpackChunkName: "userland" */ './views/user/Me.vue'),
        },
        {
          path: '/u/issue',
          name: 'my_issue',
          component: () =>
            import(/* webpackChunkName: "userland" */ './views/user/Issue.vue')
        },
        {
          path: '/u/reply',
          name: 'my_reply',
          component: () =>
            import(/* webpackChunkName: "userland" */ './views/user/Reply.vue')
        },
        {
          path: '/r/:id',
          component: Room,
          children: [
            {
              path: 'detail',
              name: 'room_detail',
              component: () =>
                import(/* webpackChunkName: "userland" */ './views/room/HouseDetail.vue'),
            },
            {
              path: 'submit',
              name: 'room_submit',
              component: () =>
                import(/* webpackChunkName: "userland" */ './views/room/PayCheck.vue'),
            },
            {
              path: 'shortpay',
              name: 'short_term_pay',
              component: () =>
                import(/* webpackChunkName: "userland" */ './views/room/ShortTermPay.vue'),
            },
            {
              path: 'longpay',
              name: 'long_term_pay',
              component: () =>
                import(/* webpackChunkName: "userland" */ './views/room/LongTermPay.vue'),
            },
          ],
        },
        {
          path: '/**',
          component: NotFoundView,
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) return { selector: to.hash }
      else return { x: 0, y: 0 }
    }
  },
})
