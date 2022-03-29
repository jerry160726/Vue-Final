import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [{
      path: '',
      name: 'home',
      component: HomeView
    },
    {
      path: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: 'product/:id',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: 'confirm',
      component: () => import('../views/OrderConfirmView.vue')
    },
    {
      path: 'success',
      component: () => import('../views/OrderSuccessView.vue')
    }]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/DashBoardView.vue'),
    children: [{
      path: 'products',
      component: () => import('../views/AdminProductsView.vue')
    },
    {
      path: 'orders',
      component: () => import('../views/AdminOrdersView.vue')
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
