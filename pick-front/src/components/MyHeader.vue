<template>
  <div id="header">
    <!-- 왼쪽: 로고 -->
    <RouterLink to="/" class="logo">
      <logo>PICK
        <svg width="20" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0003 2L19.0003 4M19.0003 4L22.0003 7L18.5003 10.5L15.5003 7.5M19.0003 4L15.5003 7.5M11.3903 11.61C11.9066 12.1195 12.3171 12.726 12.598 13.3948C12.879 14.0635 13.0249 14.7813 13.0273 15.5066C13.0297 16.232 12.8887 16.9507 12.6122 17.6213C12.3357 18.2919 11.9293 18.9012 11.4164 19.4141C10.9035 19.9271 10.2942 20.3334 9.62358 20.6099C8.95296 20.8864 8.23427 21.0275 7.50891 21.025C6.78354 21.0226 6.06582 20.8767 5.39707 20.5958C4.72831 20.3148 4.12174 19.9043 3.61227 19.388C2.6104 18.3507 2.05604 16.9614 2.06857 15.5193C2.0811 14.0772 2.65953 12.6977 3.67927 11.678C4.69902 10.6583 6.07849 10.0798 7.52057 10.0673C8.96265 10.0548 10.352 10.6091 11.3893 11.611L11.3903 11.61ZM11.3903 11.61L15.5003 7.5" stroke="#333333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </logo>
    </RouterLink>

    <!-- 중앙: 메뉴 (router-link로 라우팅 연결) -->
    <div class="menu-list">
      <RouterLink
        v-for="(item, index) in menus"
        :key="index"
        :to="item.path"
        class="menu-item"
        active-class="active"
      >
        {{ item.label }}
      </RouterLink>
    </div>

    <!-- 오른쪽: 로그인 상태에 따른 버튼/프로필 -->
    <div class="profile">
      <template v-if="isLogin">
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <div class="profile-img-wrapper">
          <v-img
            :width="40"
            :height="40"
            aspect-ratio="1/1"
            cover
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            class="profile-img"
            v-bind="props"
          />
          </div>
        </template>
        <v-list>
          <v-list-item>
            <RouterLink to="/member/info" class="menu-link">
              <v-list-item-title>내정보 수정</v-list-item-title>
            </RouterLink>
          </v-list-item>
          <v-list-item>
            <RouterLink to="/member/profile" class="menu-link">
              <v-list-item-title>마이페이지</v-list-item-title>
            </RouterLink>
          </v-list-item>
        </v-list>
      </v-menu>
      </template>
      <template v-else>
        <button class="btn login" @click="loginClick">로그인</button>
        <!-- 로그인 창 띄우기 -->
        <RouterLink to="/signup">
          <button class="btn signup">회원가입</button>
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<script setup>

  import { ref } from 'vue'
  import { VImg, VMenu, VList, VListItem, VListItemTitle } from 'vuetify/components';

  // 로그인 여부
  const isLogin = ref(false)

  // 로그인 버튼 클릭 핸들러(로그인창 띄우기)
  const loginClick = () => {
    isLogin.value = true
  }

  const menus = [
    { label: '프로젝트 매칭', path: '/match' },
    { label: '전체 프로젝트', path: '/project' },
    { label: '게시판', path: '/post' },
    { label: '뱃지', path: '/badge' },
  ]
</script>

<style scoped>
  #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: 50px;
    border-bottom: 1px solid #e0e0e0;
    background-color: white;
    min-width:0vmax
  }

  .logo {
    color: #333;
    text-decoration: none; /* 밑줄 제거 */
    font-weight: bold;
    font-size: 24px;
    min-width: fit-content;
  }

  .menu-list {
    display: flex;
    gap: 40px;
    min-width: fit-content;
  }

  .menu-item {
    font-size: 16px;
    font-weight: 500;
    padding: 0px 14px;
    border: none;
    border-radius: 6px;
    color: #333;
    text-decoration: none;
  }

  .menu-item:hover {
    color: #1746a2;
    font-size: 16px;
    font-weight: 500;
  }
  .profile {
    font-size: 16px;
    display: flex;
    gap: 10px;
    align-items: center;
    min-width: 180px; /* 로그인 버튼 + 회원가입 버튼 너비만큼 */
    justify-content: flex-end;
  }

  .active {
    color: white;
    font-size: 16px;
    font-weight: 500;
    background-color: #628ecf;
  }

  .btn {
    padding: 6px 14px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }

  /* 로그인 버튼 */
  .login {
    background-color: #628ecf;
    color: white;
  }
  
  .login:hover {
    background-color: #020715;
  }

  /* 회원가입 버튼 */
  .signup {
    background-color: #1746a2;
    color: white;
  }

  .signup:hover {
    background-color: #020715;
  }
  .profile-img {

  width: 40px;
  height: 40px;
  border-radius: 50%; /* 동그란 이미지 */
  overflow: hidden; /* 이미지가 영역을 넘치지 않도록 */
  cursor: pointer; /* 클릭 가능 커서 */
  }

  .menu-link {
    text-decoration: none;
    color: #333;
  }

  .menu-link:hover {
    color: #1976d2;
  }
</style>
