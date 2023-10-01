import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import CSComponent from '@/views/CSComponent.vue'
import CSCategory from '@/views/CSCategory.vue'
import Backup from '@/views/Backup.vue'
import Settings from '@/views/Settings.vue'


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
  },
  {
    path: '/Backup',
    name: 'Backup',
    component: Backup
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router