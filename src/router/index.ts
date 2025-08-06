import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// ===== App Main Routes =====
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/default.vue'),
    // Main app pages (wedding gift tracker)
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue')
      },
      // ===== [New Feature] START =====
      // Gift history/records page (rename file to GiftHistoryView.vue for clarity if desired)
      {
        path: 'gift-history',
        name: 'gift-history',
        component: () => import('../views/DonationHistoryView.vue')
      }
      // ===== [New Feature] END =====
    ]
  },
  // ===== Error/Fallback Routes =====
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../layouts/ErrorLayout.vue'),
    children: [
      {
        path: '',
        name: 'not-found',
        component: () => import('../views/NotFoundView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    // Handle scroll behavior with slow network in mind
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ top: 0 })
        }
      }, 300) // Small delay for smoother transitions
    })
  }
})

export default router