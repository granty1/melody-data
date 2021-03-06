import Vue from 'vue'
import VueRouter from 'vue-router'
import Connect from '@/views/connect/Connect'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Connect',
    component: Connect,
  },
  {
    path: '/runtime',
    component: () => import('@/layout/BaseLayout'),
    children: [
      {
        path: '/runtime',
        name: 'runtime',
        component: () => import('@/views/runtime/Runtime'),
      },
      {
        path: '/request',
        name: 'request',
        component: () => import('@/views/request/Request'),
      },
      {
        path: '/router',
        name: 'router',
        component: () => import('@/views/router/Router'),
      },
      {
        path: '/debug',
        name: 'debug',
        component: () => import('@/views/debug/Debug'),
      },
      {
        path: '/warnings',
        name: 'warnings',
        component: () => import('@/views/warnings/Warnings'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    let conn = Vue.ls.get('connection')
    if (conn == null) {
      next('/')
    }
  }
  next()
})

export default router
