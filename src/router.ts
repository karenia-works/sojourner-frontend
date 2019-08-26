import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFoundView from './views/NotFound.vue'
import Login from './views/Login.vue'
import Room from './views/Room.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/s',
      name: 'search',
      component: () => import('./views/Search.vue'),
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
      component: Login,
      props: {
        isSinglePage: true,
        show: true,
        isSignUp: true,
      },
    },
    {
      path: '/u',
      name: 'user',
      children: [
        {
          path: '/me',
          name: 'user_me',
          component: () => import('./views/user/Me.vue'),
        },
      ],
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./views/room/HouseDetail.vue'),
    },
    {
      path: '/r/:id',
      component: Room,
      children: [
        {
          path: 'detail',
          name: 'room_detail',
          component: () => import('./views/room/HouseDetail.vue'),
        },
        {
          path: 'submit',
          name: 'room_submit',
          component: () => import('./views/room/PayCheck.vue'),
        },
        {
          path: 'shortpay',
          name: 'short_term_pay',
          component: () => import('./views/room/ShortTermPay.vue'),
        },
        {
          path: 'longpay',
          name: 'long_term_pay',
          component: () => import('./views/room/LongTermPay.vue'),
        },
      ],
    },
    {
      path: '/**',
      component: NotFoundView,
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
