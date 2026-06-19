import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/plan' },
    { path: '/plan', name: 'plan', component: () => import('@/components/plan/PlanTab.vue') },
    {
      path: '/simple',
      name: 'simple',
      component: () => import('@/components/simple/SimpleTab.vue'),
    },
    {
      path: '/weight',
      name: 'weight',
      component: () => import('@/components/weight/WeightTab.vue'),
    },
    {
      path: '/grocery',
      name: 'grocery',
      component: () => import('@/components/grocery/GroceryTab.vue'),
    },
    { path: '/about', name: 'about', component: () => import('@/components/about/AboutTab.vue') },
  ],
})
