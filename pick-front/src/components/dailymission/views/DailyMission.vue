<template>
    <div class="page-layout">
      <MyHeader />
  
      <div class="main-content">
        <!-- 사이드바 -->
        <MemberSideBar class="side" />
  
        <!-- 본문 -->
        <div class="content-area">
          <v-card class="mission-box" elevation="1">
            <v-card-title class="title">TODAY {{ today }}</v-card-title>
            <v-divider />
  
            <v-card-text>
              <v-scroll-y-transition>
                <div class="mission-list">
                  <v-row
                    v-for="(mission, index) in missions"
                    :key="index"
                    class="mission-row"
                    align="center"
                  >
                    <v-col cols="1"><v-checkbox v-model="mission.completed" /></v-col>
                    <v-col cols="8"><span class="mission-text">{{ mission.title }}</span></v-col>
                    <v-col cols="3" class="text-right"><span class="xp">{{ mission.expPoint }} xp</span></v-col>
                  </v-row>
                </div>
              </v-scroll-y-transition>
            </v-card-text>
          </v-card>
  
          <MyFooter />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import MemberSideBar from '@/components/MemberSideBar.vue'
  
  const today = new Date().toISOString().slice(0, 10)
  
  const missions = ref([
    { title: '로그인 하기', expPoint: 10, completed: false },
    { title: '게시글 작성하기', expPoint: 20, completed: false },
    { title: '댓글 작성하기', expPoint: 15, completed: false },
    { title: 'Q&A 채택받기', expPoint: 30, completed: false },
    { title: '일일 커밋하기', expPoint: 20, completed: false }
  ])
  </script>
  
  <style scoped>
  .page-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .main-content {
    display: flex;
    flex: 1;
  }
  
  .side {
    width: 240px;
    background-color: #f9f9f9;
    border-right: 1px solid #ddd;
  }
  
  .content-area {
    flex: 1;
    padding: 40px;
  }
  
  .mission-box {
    padding: 24px;
    background-color: #e0efff;
    border-radius: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .title {
    font-weight: bold;
    font-size: 18px;
    padding-bottom: 10px;
  }
  
  .mission-row {
    padding: 4px 0;
  }
  
  .mission-text {
    font-size: 16px;
  }
  
  .xp {
    font-size: 14px;
    font-weight: bold;
    color: #555;
  }
  </style>
  