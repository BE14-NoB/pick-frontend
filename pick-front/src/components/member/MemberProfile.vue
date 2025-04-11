<template>
    <div class="member-profile-container">
      <div class="mypage-main">
        <h1>꼼곰보</h1>
        
        <div class="mypage-level">
          <p>31</p>
          <v-progress-linear color="blue-lighten-3" model-value="20" height="20" rounded></v-progress-linear>
          <br />
        </div>

        <div class="mypage-rate">
            <p>3.5</p>
            <v-progress-linear color="blue-lighten-3" model-value="20" height="20" rounded></v-progress-linear>
            <br />
        </div>
  
        <!-- 통계 섹션 -->
        <v-row class="stats-section">
          <v-col cols="4" sm="4" md="4" class="stat-item">
            <span class="stat-label">완료 프로젝트</span>
            <div class="stat-value">7개</div>
          </v-col>
          <v-col cols="4" sm="4" md="4" class="stat-item">
            <span class="stat-label">함께한 팀원</span>
            <div class="stat-value">30명</div>
          </v-col>
          <v-col cols="4" sm="4" md="4" class="stat-item">
            <span class="stat-label">보유 뱃지 수</span>
            <div class="stat-value">2개</div>
          </v-col>
        </v-row>
  
        <h2>소개</h2>
        <p>안녕하세요! 저는 다양한 프로젝트에 참여하며 성장하는 것을 좋아합니다.</p>
      </div>
  
      <div class="mypage-image">
        <v-avatar size="200">
          <img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" alt="Profile" />
        </v-avatar>
      </div>
  
      <h2>최근 프로젝트</h2>
      <v-row>
        <v-col cols="3" sm="3" md="4">
          <v-card>
            <v-img src="https://via.placeholder.com/150" height="150px"></v-img>
            <v-card-title>Pick</v-card-title>
            <v-card-subtitle>개발자를 위한 사이드 프로젝트 플랫폼</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="3" sm="3" md="4">
          <v-card>
            <v-img src="https://via.placeholder.com/150" height="150px"></v-img>
            <v-card-title>To Do List</v-card-title>
            <v-card-subtitle>할 일을 미루는 이들을 위한 체크리스트</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  import { VAvatar, VRow, VCol, VCard, VCardTitle, VCardSubtitle, VImg, VProgressLinear } from 'vuetify/components';
  </script>
  
  <style scoped>
  .member-profile-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
  }
  
  .mypage-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    right: 470px;
    bottom: 420px;
  }
  
  .mypage-main {
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    position: relative;
    left: 300px;
    top: 35px;
  }
  
  h1 {
    font-size: 28px;
    color: #333;
    margin: 20px 0 10px;
  }
  
  h2 {
    font-size: 22px;
    color: #333;
    margin: 30px 0 10px;
  }
  
  p {
    font-size: 18px;
    color: #666;
    line-height: 1.6;
  }
  
  .v-progress-linear {
    margin: 10px 0;
    height: 10px;
    border-radius: 5px;
    max-width: 400px;
  }
  
  
  /* 통계 섹션 스타일 */
  .stats-section {
    justify-content: flex-start;
    margin-top: 20px;
    margin-bottom: 20px;
    max-width: 500px;
  }
  
  .stat-item {
    text-align: center;
    border-right: 1px solid #d9d9d9;
  }
  
  .stat-item:last-child {
    border-right: none;
  }
  
  .stat-label {
    font-size: 14px;
    color: #333;
    display: block;
  }
  
  .stat-value {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-top: 5px;
  }
  </style>