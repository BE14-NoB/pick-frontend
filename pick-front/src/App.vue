<template>
  <v-app>
    <div class="layout-wrapper">
      <MyHeader />

      <main class="main-content">
        <router-view />
      </main>

      <v-divider class="footer-divider" />

      <MyFooter />
    </div>
  </v-app>
</template>

<script setup>
import MyHeader from '@/components/common/MyHeader.vue'
import MyFooter from '@/components/common/MyFooter.vue'
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-bottom: 32px; /* 선택: 푸터와 여백 */
}

.footer-divider {
  margin: 0;
}
</style>
