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
      path: '/post',
      name: 'Post',
      component: () => import('@/views/PostView.vue'),
      children: [
        {
          path: 'list',
          component: () => import('@/components/post/PostList.vue')
        },
        {
          path: 'write',
          component: () => import('@/components/post/Write.vue')
        }
      ]
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('@/views/BadgeView.vue'),
    },
  ]
})

export default router;
