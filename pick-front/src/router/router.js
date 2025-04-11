// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue';
import ProjectView from '@/views/ProjectView.vue';
import BoardView from '@/views/BoardView.vue';
import MatchView from '@/views/MatchView.vue';
import BadgeView from '@/views/BadgeView.vue';

const router = createRouter({
  history: createWebHistory(),

  routes : [
    {
      path: '/',
      name: 'Main',
      component: MainView
    },
    {
      path: '/match',
      name: 'Match',
      component: MatchView
    },
    {
      path: '/project',
      name: 'Project',
      component: ProjectView
    },
    {
      path: '/board',
      name: 'Board',
      component: BoardView
    },
    {
      path: '/badge',
      name: 'Badge',
      component: BadgeView
    },
    // 회원가입
    // {
    //   path: 'signup',
    //   name: 'SignUp',
    //   component: SignUp
    // },
  ]
});

export default router;
