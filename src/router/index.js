import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateForm from '../views/CreateForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/create'
  },
  {
    path: '/create',
    name: 'CreateForm',
    component: CreateForm
  }
]

const scrollBehavior = (to, from, savedPosition) => savedPosition ? savedPosition : { x: 0, y: 0 }

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior
})

export default router
