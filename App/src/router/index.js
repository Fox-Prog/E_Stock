import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import NewComponent from '../views/NewComponent.vue'
import NewCatt from '../views/NewCatt.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/NewComponent',
    name: 'NewComponent',
    component: NewComponent
  },
  {
    path: '/NewCatt',
    name: 'NewCatt',
    component: NewCatt
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
