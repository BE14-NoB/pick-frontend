<template>
    <div class="member-profile-container">
      <v-avatar size="100">
        <img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" alt="Profile" />
      </v-avatar>
      <h1>꼼곰보</h1>
      <p>Lv. 31</p>
      <p>완료한 프로젝트: 7개 | 함께한 팀원: 30명 | 보유 뱃지수: 7개 </p>
      <h2>소개</h2>
      <p>안녕하세요! 저는 다양한 프로젝트에 참여하며 성장하는 것을 좋아합니다.</p>
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
  import { VAvatar, VRow, VCol, VCard, VCardTitle, VCardSubtitle, VImg } from 'vuetify/components';
  </script>
  
  <style scoped>
  .member-profile-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    text-align: center;
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
    font-size: 16px;
    color: #666;
    line-height: 1.6;
  }
  </style>