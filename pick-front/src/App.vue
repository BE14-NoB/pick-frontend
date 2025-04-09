<template>
  <v-app>
    <div class="layout-wrapper">
      <MyHeader />

      <main class="main-content">
        <router-view /> <!-- 여기서 페이지 컴포넌트가 렌더링 됨 -->
      </main>

      <MyFooter />
    </div>
  </v-app>
</template>


<script setup>
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 전체 화면 높이 기준 */
}

.main-content {
  flex: 1; /* 남는 영역 모두 차지 → 푸터가 맨 아래로 밀림 */
  min-height:100vh;
}
</style>
