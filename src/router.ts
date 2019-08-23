import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/s',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/u',
      name: 'user',
      children: [
        {
          path: '/me',
          name: 'user_me',
          component: () => import('./views/user/Me.vue')
        }
      ]
    },
    {
      path: '/r/:id',
      children: [
        {
          path: '',
          component: () => import('./views/room/RoomId.vue')
        },
        {
          path: 'submit',
          component: () => import('./views/room/RoomSubmit.vue')
        }
      ]
    }
  ]
})
