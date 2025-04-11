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

    <!-- 오른쪽: 프로필 영역 -->
    <div class="profile">
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
    </div>
  </div>
</template>

<script setup>
import { VImg, VMenu, VList, VListItem, VListItemTitle } from 'vuetify/components';

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
}

.menu-item {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
}

.menu-item:hover {
  color: #1976d2;
}

.profile {
  font-size: 16px;
}
.active {
  color: red;
}

.profile-img {

width: 40px;
height: 40px;
border-radius: 50%; /* 동그란 이미지 */
overflow: hidden; /* 이미지가 영역을 넘치지 않도록 */
cursor: pointer; /* 클릭 가능 커서 */
}

.active {
  color: red;
}

.menu-link {
  text-decoration: none;
  color: #333;
}

.menu-link:hover {
  color: #1976d2;
}

</style>
