import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
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
