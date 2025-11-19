import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/pages/Main.vue')
  },
  {
    path: '/movie/:id',
    name: 'MoviePage',
    component: () => import('@/pages/MoviePage.vue')
  },
  {
    path: '/movie-select/:id',
    name: 'MovieSelect',
    component: () => import('@/pages/MovieSelect.vue')
  },
  {
    path: '/payment',          // ← новый маршрут для оплаты
    name: 'Payment',
    component: () => import('@/pages/PaymentPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
