// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
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
      // <------------------ 프로젝트 페이지 ------------------>
      path: '/project',
      name: 'Project',
      component: () => import('@/project/views/ProjectView.vue'),
      children: [
        {
          path: 'issues',
          component: () => import('@/project/views/IssueListView.vue')
        },
        {
          path: 'create-issue',
          component: () => import('@/project/views/CreateIssueView.vue')
        },
        {
          path: 'pull-requests',
          component: () => import('@/project/views/PRListView.vue')
        },
        {
          path: 'create-pull-request',
          component: () => import('@/project/views/CreatePRView.vue')
        },
        {
          path: 'commits',
          component: () => import('@/project/views/CommitListView.vue')
        }
      ]
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
