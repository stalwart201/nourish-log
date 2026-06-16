import { createRouter, createWebHistory } from 'vue-router'
import PlanTab from '@/components/plan/PlanTab.vue'
import SimpleTab from '@/components/simple/SimpleTab.vue'
import WeightTab from '@/components/weight/WeightTab.vue'
import GroceryTab from '@/components/grocery/GroceryTab.vue'
import AboutTab from '@/components/about/AboutTab.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/plan' },
    { path: '/plan', name: 'plan', component: PlanTab },
    { path: '/simple', name: 'simple', component: SimpleTab },
    { path: '/weight', name: 'weight', component: WeightTab },
    { path: '/grocery', name: 'grocery', component: GroceryTab },
    { path: '/about', name: 'about', component: AboutTab },
  ],
})

export default router
