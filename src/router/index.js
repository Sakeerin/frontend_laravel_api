import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import { useAuthStore } from '../stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { quest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { quest: true }
    }
  ]
})

router.beforeEach( async(to, from) => {
  const authStore = useAuthStore()
  await authStore.getUser()
  if (authStore.user && to.meta.quest) {
    return { name: 'home' };
  }
  // if (!to.meta.quest && !isAuthenticated) {
  //   return { name: 'login' };
  // }
})

export default router
 