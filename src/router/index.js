import { createRouter, createWebHashHistory } from 'vue-router'
import ConverterView from '../views/ConverterView.vue'
import UserView from '../views/UserView.vue'

const routes = [
  {
    path: '/',
    name: 'converter',
    component: ConverterView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
