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
      >
        {{ item.label }}
      </RouterLink>
    </div>

    <!-- 오른쪽: 프로필 영역 -->
    <div class="profile">
      프로필영역
    </div>
  </div>
</template>

<script setup>
const menus = [
  { label: '프로젝트 매칭', path: '/match' },
  { label: '전체 프로젝트', path: '/projects' },
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
</style>
