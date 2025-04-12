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

  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/main/views/MainView.vue')
    },
    {
      path: '/match',
      name: 'Match',
      component: () => import('@/views/matching/MatchView.vue'),
    },
    {
      path: '/match/result',
      name: 'MatchiResult',
      component: () => import('@/views/matching/SearchResult.vue'),
    },
    {
      path: '/project-list',
      name: 'ProjectList',
      component: () => import('@/project/views/ProjectListView.vue'),
    },
    {
      path: '/project/:id/detail',
      name: 'ProjectDetail',
      component: () => import('@/project/views/ProjectDetailView.vue'),
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
      ]
    },
    {
      path: '/post',
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