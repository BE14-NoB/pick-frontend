// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router'


const projectChildren = [
  {
    path: 'dashboard',
    name: 'ProjectDashboard',
    component: () => import('@/project/views/DashboardView.vue'),
  },
  {
    path: 'info',
    name: 'ProjectInfo',
    component: () => import('@/project/views/ProjectInfoView.vue'),
  },
  {
    path: 'detail',
    name: 'ProjectDetail',
    component: () => import('@/project/views/ProjectDetailView.vue'),
  },
  // {
  //   path: 'meeting',
  //   name: 'ProjectMeeting',
  //   component: () => import('@/views/project/MeetingView.vue'),
  // },
  // {
  //   path: 'members',
  //   name: 'ProjectMembers',
  //   component: () => import('@/views/project/MembersView.vue'),
  // },
  // {
  //   path: 'reviews',
  //   name: 'ProjectReviews',
  //   component: () => import('@/views/project/ReviewsView.vue'),
  // },
  // {
  //   path: 'issues',
  //   name: 'ProjectIssues',
  //   component: () => import('@/views/project/IssuesView.vue'),
  // },
  // {
  //   path: 'pr',
  //   name: 'ProjectPR',
  //   component: () => import('@/views/project/PRView.vue'),
  // },
  // {
  //   path: 'commit',
  //   name: 'ProjectCommit',
  //   component: () => import('@/views/project/CommitView.vue'),
  // },
 
];

const router = createRouter({
  history: createWebHistory(),

  routes : [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/main/views/MainView.vue')
    },
    {
      path: '/match',
      name: 'Match',
      component: () => import('@/views/MatchView.vue')
    },
    {
      path: '/project-list',
      name: 'ProjectList',
      component: () => import('@/project/views/ProjectListView.vue'),
    },
    {
      path: '/project/:id',
      name: 'Project',
      component: () => import('@/project/views/ProjectRootView.vue'),
      children: projectChildren
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