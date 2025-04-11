// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
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
      path: '/project/:id/detail',
      name: 'ProjectDetail',
      component: () => import('@/views/project/finished/ProjectDetailView.vue'),
    },
    {
      // <------------------ 프로젝트 페이지 ------------------>
      // path: '/project/:id',
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
          component: () => import('@/views/project/issue/CreateIssueView.vue')
        },
        {
          path: 'pull-requests',
          component: () => import('@/views/project/pr/PRListView.vue')
        },
        {
          path: 'create-pull-request',
          component: () => import('@/views/project/pr/CreatePRView.vue')
        },
        {
          path: 'commits',
          component: () => import('@/views/project/commit/CommitListView.vue')
        },
        {
          path: 'dashboard',
          component: () => import('@/views/project/dashboard/DashboardView.vue')
        },
        
        {
          path: 'meetings',
          component: () => import('@/views/project/meeting/MeetingList.vue')
        },
        {
          path: 'create-meeting',
          component: () => import('@/views/project/meeting/CreaetMeeting.vue')
        }
      ]
    },
    {
      path: '/post',
      redirect: '/post/list/free',
      name: 'Post',
      component: () => import('@/views/PostView.vue'),
      children: [
        {
          path: 'list/:category',
          component: () => import('@/components/post/PostList.vue')
        },
        {
          path: 'write',
          component: () => import('@/components/post/Write.vue')
        }
      ]
    },
    { 
      path: '/member',
      name: 'Member',
      component: () => import('@/views/MemberView.vue'),
      children: [
        {
          path: 'info',
          component: () => import('@/components/member/MemberInfo.vue'),
        },
        {
          path: 'profile',
          component: () => import('@/components/member/MemberProfile.vue'),
        },
        {
          path: 'signup',
          component: () => import('@/components/member/MemberLogin.vue'),
        },
      ]
    },
    // 회원가입
    // {
    //   path: 'signup',
    //   name: 'SignUp',
    //   component: SignUp
    // },
    {
      path: '/issueList',
      name: 'IssueList',
      component: () => import('@/components/git/views/IssueList.vue')
    },
    {
      path: '/dailymission',
      name: 'DailyMission',
      component: () => import('@/components/dailymission/views/DailyMission.vue')
    }
  ]
})

export default router;