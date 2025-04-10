<template>
  <v-app>
    <div class="layout-wrapper">
      <MyHeader />

      <main class="main-content">
        <router-view />
      </main>

      <!-- 프로젝트 페이지일 땐 푸터 숨기기 -->
      <MyFooter v-if="!hideFooter" />
    </div>
  </v-app>
</template>

<script setup>
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// 현재 라우트 정보
const route = useRoute()

// 푸터를 숨길 경로들
const hideFooter = computed(() => {
  return route.path.startsWith('/project')
})
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 50px);
}
</style>
