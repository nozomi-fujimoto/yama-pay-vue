// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MenuView from '../views/MenuView.vue'
import ChargeView from '@/views/ChargeView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    props: true
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView,
    props: true
  },
  {
    path: '/charge',
    name: 'charge',
    component: ChargeView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
