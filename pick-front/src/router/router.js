// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes : [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/views/MainView.vue'),
    },
    {
      path: '/match',
      name: 'Match',
      component: () => import('@/views/MatchView.vue'),
    },
    {
      path: '/project',
      name: 'Project',
      component: () => import('@/views/ProjectView.vue'),
    },
    {
      path: '/board',
      name: 'Board',
      component: () => import('@/views/BoardView.vue'),
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('@/views/BadgeView.vue'),
    },
    // 회원가입
    // {
    //   path: 'signup',
    //   name: 'SignUp',
    //   component: SignUp
    // },
  ]
})

export default router;
