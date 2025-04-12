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
      component: () => import('@/views/project/finished/ProjectListView.vue')
    },
    {
      path: '/project/:id/detail',
      name: 'ProjectDetail',
      component: () => import('@/views/project/finished/ProjectDetailView.vue')
    },
    {
      // <------------------ 프로젝트 페이지 ------------------>
      // path: '/project/:id',
      path: '/project',
      name: 'Project',
      component: () => import('@/views/project/ProjectView.vue'),
      children: [
        {
          path: 'issues',
          component: () => import('@/views/project/issue/IssueList.vue')
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
          path: 'review-pull-request',
          component: () => import('@/views/project/pr/ReviewPRView.vue')
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
          path: 'info',
          component: () => import('@/views/project/info/ProjectInfoView.vue')
        },
        {
          path: 'member',
          component: () => import('@/views/project/member/ProjectMemberView.vue')
        },
        {
          path: 'meetings',
          component: () => import('@/views/project/meeting/MeetingList.vue')
        },
        {
          path: 'create-meeting',
          component: () => import('@/views/project/meeting/CreaetMeeting.vue')
        },
        {
          path: 'review',
          component: () => import('@/views/project/review/ProjectReview.vue')
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
          path: 'login',
          component: () => import('@/components/member/MemberLogin.vue'),
        },
        // {
        //   path: 'signup',
        //   component: () => import('@/components/member/MemberSignUp.vue'),
        // },
      ]
    },
    // 회원가입
    // {
    //   path: 'signup',
    //   name: 'SignUp',
    //   component: SignUp
    // },
    {
      path: '/dailymission',
      name: 'DailyMission',
      component: () => import('@/components/dailymission/views/DailyMission.vue')
    }
  ]
})

export default router;