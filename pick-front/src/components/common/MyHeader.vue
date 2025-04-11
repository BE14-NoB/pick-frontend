<template>
  <div id="header">
    <!-- 왼쪽: 로고 -->
    <RouterLink to="/" class="logo">
      PICK
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
            <v-list-item @click.prevent="handleLogout">
              <RouterLink to="/" class="menu-link" @click.prevent>
                <v-list-item-title>로그아웃</v-list-item-title>
              </RouterLink>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <button class="btn login" @click="openLoginModal">로그인</button>
        <RouterLink to="/member/signup">
          <button class="btn signup">회원가입</button>
        </RouterLink>
      </template>
    </div>

    <!-- 로그인 모달 -->
    <div v-if="isLoginModalOpen" class="modal-overlay">
      <div class="modal-content">
        <v-btn
          class="close-btn"
          icon="mdi-close"
          variant="text"
          color="grey-darken-2"
          size="large"
          @click="closeLoginModal"
        ></v-btn>
        <MemberLogin @login="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { VImg, VMenu, VList, VListItem, VListItemTitle, VBtn } from 'vuetify/components'
import MemberLogin from '@/components/member/MemberLogin.vue'

// 라우터 인스턴스 가져오기
const router = useRouter()

// 로그인 여부
const isLogin = ref(false)
// 로그인 모달 표시 여부
const isLoginModalOpen = ref(false)

// 메뉴 항목
const menus = [
  { label: '프로젝트 매칭', path: '/match' },
  { label: '전체 프로젝트', path: '/project-list' },
  { label: '게시판', path: '/post' },
  { label: '뱃지', path: '/badge' },
]

// 로그인 모달 열기
const openLoginModal = () => {
  isLoginModalOpen.value = true
}

// 로그인 모달 닫기
const closeLoginModal = () => {
  isLoginModalOpen.value = false
}

// 로그인 처리 (임시)
const handleLogin = () => {
  isLogin.value = true
  closeLoginModal()
}

// 로그아웃 처리
const handleLogout = () => {
  isLogin.value = false
  router.push('/') // 로그아웃 후 홈으로 이동
}
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
  min-width: 0vmax;
}

.logo {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  font-size: 24px;
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
  min-width: 180px;
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

.login {
  background-color: #628ecf;
  color: white;
}

.login:hover {
  background-color: #020715;
}

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
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.menu-link {
  text-decoration: none;
  color: #333;
}

.menu-link:hover {
  color: #1976d2;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: white;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1001;
}
</style>