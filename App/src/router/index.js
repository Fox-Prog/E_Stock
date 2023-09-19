import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import CSComponent from '../views/CSComponent.vue'
import CSCategory from '../views/CSCategory.vue'


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/CSComponent',
    name: 'CSComponent',
    component: CSComponent
  },
  {
    path: '/CSCategory',
    name: 'CSCategory',
    component: CSCategory
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
