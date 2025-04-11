<template>
    <div class="member-info-container">
      <div class="member-info-container-item">
        <!-- 프로필 이미지 -->
        <v-avatar size="120" class="avatar">
          <img :src="userData.profileImage" alt="Profile" />
        </v-avatar>
  
        <!-- 이름과 닉네임 -->
        <span class="value name">{{ userData.name }}</span>
        <span class="value nickname">{{ userData.nickname }}</span>
      </div>
  
      <!-- 정보 리스트 -->
      <div class="info-list">
        <div class="info-item">
          <span class="label">이메일</span>
        </div>
        <div class="info-item">
          <span class="value">{{ userData.email }}</span>
        </div>
  
        <div class="info-item">
          <span class="label">전화번호</span>
        </div>
        <div class="info-item">
          <span class="value">{{ userData.phone }}</span>
        </div>
  
        <div class="info-item">
          <span class="label">비밀번호</span>
        </div>
        <div class="info-item">
          <span class="value">{{ userData.password }}</span>
        </div>
  
        <div class="info-item">
          <span class="label">생일</span>
        </div>
        <div class="info-item">
          <span class="value">{{ userData.birthday }}</span>
        </div>
      </div>
  
      <!-- 계정 권한 그룹 -->
      <div class="member-auth"></div>
  
      <!-- GitHub 링크 -->
      <div class="github-link">
        <v-icon icon="mdi-github" size="24" class="github-icon"></v-icon>
        <a :href="userData.githubLink" target="_blank">Github</a>
      </div>
  
      <!-- 버튼 그룹 -->
      <div class="button-group">
        <v-btn color="#1976d2" class="maroon-btn" @click="goToMaroon">마감하기</v-btn>
        <v-btn color="#1976d2" @click="goToEdit">수정</v-btn>
        <v-btn color="#d32f2f" @click="goBack">탈퇴</v-btn>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { VAvatar, VBtn, VIcon } from 'vuetify/components';
  
  const router = useRouter();
  
  // 사용자 데이터를 ref로 정의
  const userData = ref({
    profileImage: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
    name: '고성연',
    nickname: '꼼곰보',
    email: 'rhtjddus0502@gmail.com',
    phone: '010-3791-8329',
    password: '********',
    birthday: '1999.05.02',
    githubLink: 'https://github.com',
  });
  
  const goToEdit = () => {
    router.push('/member/info/edit');
  };
  
  const goBack = () => {
    router.push('/');
  };
  
  const goToMaroon = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .member-info-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    text-align: center;
  }
  
  .avatar {
    margin-bottom: 20px;
  }
  
  .member-info-container-item {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    right: 350px;
    top: 20px;
  }
  
  .name {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 5px;
  }
  
  .nickname {
    font-size: 16px;
    color: #666;
    display: block;
  }
  
  .info-list {
    text-align: left;
    margin: 0 auto;
    max-width: 400px;
    position: relative;
    bottom: 180px;
  }
  
  .info-item {
    text-align: left;
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  
  .label {
    text-align: left;
    font-size: 11px;
    color: #333;
    font-weight: 500;
    width: 100px; /* 라벨의 고정 너비 설정 */
    padding-left: 0px;
  }
  
  .value {
    font-size: 16px;
    color: #666;
    flex: 1; /* 나머지 공간을 값이 차지하도록 */
  }
  
  .github-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
  }
  
  .github-icon {
    margin-right: 8px;
  }
  
  .github-link a {
    font-size: 16px;
    color: #333;
    text-decoration: none;
  }
  
  .github-link a:hover {
    color: #1976d2;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .v-btn {
    color: white;
    text-transform: none;
    font-size: 16px;
    padding: 8px 16px;
    position: relative;
    left: 500px;
  }
  
  .maroon-btn {
    background-color: #d81b60 !important; /* 마감하기 버튼 색상 */
  }
  </style>