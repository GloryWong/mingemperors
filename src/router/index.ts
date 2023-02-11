import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/layout/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'Home'
    },
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        redirect: {
          name: 'Exam'
        }
      },
      {
        path: 'exam',
        name: 'Exam',
        component: () => import('@/views/ExamPage.vue')
      },
      {
        path: 'emperors',
        name: 'EmperorsPage',
        component: () => import('@/views/EmperorsPage.vue'),
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
