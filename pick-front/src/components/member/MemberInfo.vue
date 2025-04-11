<template>
    <div class="layout-container">
      <!-- Sidebar 컴포넌트 임포트하여 사용 -->
      <MemberSideBar />

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
  
        <!-- GitHub 링크 (Box.vue의 구조로 대체) -->
        <div class="box">
          <div class="view">
            <div class="div">
              <img class="image" alt="Image" :src="githubImage" />
              <div class="text-wrapper">Github</div>
              <button class="button">
                <div class="overlap-group">
                  <a
                    class="background"
                    :href="userData.githubLink"
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                  <div class="text-wrapper-2">연결하기</div>
                </div>
              </button>
            </div>
          </div>
        </div>
  
        <!-- 계정 권한 그룹 -->
        <div class="member-auth">
          <div class="member-auth-item">
            <div class="member-info">
              <span>회원 권한</span>
            </div>
  
            <div class="member-auth-item-2">
              <v-icon color="success" icon="mdi-alert-circle" size="small"></v-icon>
              <span class="value">{{ userData.auth }}</span>
            </div>
  
            <div class="member-auth-item-2">
              <v-icon color="success" icon="mdi-check-circle" size="small"></v-icon>
              <span class="value">Admin</span>
            </div>
          </div>
        </div>
  
        <!-- 버튼 그룹 -->
        <div class="button-group">
          <v-btn color="#1976d2" @click="goToEdit">수정</v-btn>
          <v-btn color="#d32f2f" @click="goBack">탈퇴</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { VAvatar, VBtn, VIcon } from 'vuetify/components';
  import githubImage from '@/assets/issueMaker.png';
  import MemberSideBar from '@/components/MemberSideBar.vue';
  
  const router = useRouter();
  
  const userData = ref({
    profileImage: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
    name: '고성연',
    nickname: '꼼곰보',
    email: 'rhtjddus0502@gmail.com',
    phone: '010-3791-8329',
    password: '********',
    birthday: '1999.05.02',
    githubLink: 'https://github.com/Gombo2',
    auth: 'member',
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

  
  .layout-container {
    display: flex;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px auto;
  }
  
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
    width: 100px;
    padding-left: 0px;
  }
  
  .value {
    font-size: 16px;
    color: #666;
    flex: 1;
  }
  
  .box {
    height: 30px;
    width: 400px;
    margin: 0px auto;
    position: relative;
    top: 190px;
  }
  
  .box .view {
    background-color: #fdefef;
    border-radius: 17px;
    height: 77px;
    left: 0;
    position: relative;
    top: 0;
    width: 435px;
  }
  
  .box .div {
    height: 77px;
    position: relative;
    width: 437px;
  }
  
  .box .image {
    height: 77px;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 76px;
  }
  
  .box .text-wrapper {
    color: #78767c;
    font-family: "Poppins-SemiBold", Helvetica;
    font-size: 15px;
    font-weight: 600;
    height: 23px;
    left: 105px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 30px;
    width: 62px;
  }
  
  .box .button {
    all: unset;
    box-sizing: border-box;
    height: 66px;
    left: 297px;
    position: absolute;
    top: 5px;
    width: 138px;
  }
  
  .box .overlap-group {
    border-radius: 17px;
    height: 57px;
    left: 5px;
    position: relative;
    top: 5px;
    width: 129px;
  }
  
  .box .background {
    background-color: #5f0080;
    border: 1px solid;
    border-color: #e0e0e0;
    border-radius: 17px;
    height: 57px;
    left: 0;
    position: absolute;
    bottom: 5px;
    width: 129px;
  }
  
  .box .text-wrapper-2 {
    color: #fdfdfd;
    font-family: "Poppins-Medium", Helvetica;
    font-size: 16px;
    font-weight: 500;
    height: 27px;
    right: 23px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 12px;
    width: 80px;
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
  
  .member-auth {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    position: relative;
    bottom: 540px;
    left: 100px;
  }
  
  .member-auth-item {
    font-size: 24px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    position: relative;
  }
  
  .member-auth-item-2 {
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    position: relative;
    top: 20px;
    left: 0px;
  }
  </style>