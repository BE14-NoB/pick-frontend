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
      component: () => import('@/project/views/ProjectView.vue'),
      children: [
        {
          path: 'create-issue',
          component: () => import('@/project/views/CreateIssueView.vue')
        },
        {
          path: 'create-PR',
          component: () => import('@/project/views/CreatePRView.vue')
        }
      ]
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
  ]
})

export default router;
