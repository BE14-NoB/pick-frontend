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
        <p>프로필 사진</p>
        <!-- <img src="/profile.png" alt="프로필" class="profile-img" /> -->
        <!-- 사진 클릭시 메뉴창 토글 -->
      </template>
      <template v-else>
        <button class="btn login" @click="loginClick">로그인</button>
        <!-- 로그인 창 띄우기 -->
        <RouterLink to="/signup">
          <button class="btn signup">회원가입</button>
        </RouterLink>
      </template>

      <template v-if="isLogin">
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-img
            :width="40"
            aspect-ratio="1/1"
            cover
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            class="profile-img"
            v-bind="props"
          ></v-img>
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
    { label: '게시판', path: '/board' },
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

/* .active {
  color: red;
} */

.menu-link {
  text-decoration: none;
  color: #333;
}

.menu-link:hover {
  color: #1976d2;
}
</style>
