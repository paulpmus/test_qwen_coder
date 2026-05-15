import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/tema-1-ref-reactive', name: 'Tema1', component: () => import('../views/Tema01RefReactive.vue') },
  { path: '/tema-2-v-bind', name: 'Tema2', component: () => import('../views/Tema02VBind.vue') },
  { path: '/tema-3-eventos', name: 'Tema3', component: () => import('../views/Tema03Eventos.vue') },
  { path: '/tema-4-listas-condicionales', name: 'Tema4', component: () => import('../views/Tema04ListasCondicionales.vue') },
  { path: '/tema-5-v-model', name: 'Tema5', component: () => import('../views/Tema05VModel.vue') },
  { path: '/tema-6-sfc', name: 'Tema6', component: () => import('../views/Tema06SFC.vue') },
  { path: '/tema-7-props', name: 'Tema7', component: () => import('../views/Tema07Props.vue') },
  { path: '/tema-8-emit', name: 'Tema8', component: () => import('../views/Tema08Emit.vue') },
  { path: '/tema-9-computed', name: 'Tema9', component: () => import('../views/Tema09Computed.vue') },
  { path: '/tema-10-watch-lifecycle', name: 'Tema10', component: () => import('../views/Tema10WatchLifecycle.vue') },
  { path: '/tema-11-composables', name: 'Tema11', component: () => import('../views/Tema11Composables.vue') },
  { path: '/tema-12-api', name: 'Tema12', component: () => import('../views/Tema12API.vue') },
  { path: '/tema-13-router', name: 'Tema13', component: () => import('../views/Tema13Router.vue') },
  { path: '/tema-14-pinia', name: 'Tema14', component: () => import('../views/Tema14Pinia.vue') },
  { path: '/tema-15-slots', name: 'Tema15', component: () => import('../views/Tema15Slots.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
