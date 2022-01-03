import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
  },
  {
    path:'/404',
    name:'404',
    component:()=>import('../views/404.vue')
  },
  { path: '/SubUnit', name: 'SubUnit', component: () => import('../views/SubUnit/index.vue')  },
  { path: '/Unit', name: 'Unit', component: () => import('../views/Unit/index.vue')  },
  { path: '/Grade', name: 'Grade', component: () => import('../views/Grade/index.vue')  },
  { path: '/Lesson', name: 'Lesson', component: () => import('../views/Lesson/index.vue')  },
  { path: '/Notes', name: 'Notes', component: () => import('../views/Notes/index.vue')  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
