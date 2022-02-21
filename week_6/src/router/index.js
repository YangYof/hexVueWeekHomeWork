import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/ProductsViews.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/productsview',
        name: 'ProductsView',
        component: Products
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/AdminProducts.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/AdminOrder.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
