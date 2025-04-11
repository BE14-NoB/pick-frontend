<template>
    <div class="project-layout">
        <div class="content-wrapper">
            <Sidebar />
            <main class="main-content">
                <h1 class="page-title">{{ title }}</h1>
                <p class="page-desc">{{ description }}</p>
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '@/project/components/Sidebar.vue'
import { menuItems } from '@/project/data/menuData.js'
import { useRoute } from 'vue-router'
import { computed, watchEffect } from 'vue'

const route = useRoute()

// 경로가 일치하는 메뉴 찾기
const currentMenu = computed(() => {
  const matched = menuItems.filter(item => route.path.startsWith(item.to))
  return matched.sort((a, b) => b.to.length - a.to.length)[0]
})

const title = computed(() => currentMenu.value?.label || '페이지')
const description = computed(() => currentMenu.value?.description || '')

// 브라우저 탭 제목도 변경
watchEffect(() => {
  if (title.value) {
    document.title = `PICK | ${title.value}`
  }
})
</script>

<style scoped>
.project-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.content-wrapper {
    display: flex;
    flex: 1;
}

.main-content {
    flex: 1;
    padding: 24px;
}

.page-title {
    font-size: 24px;
    font-weight: bold;
}

.page-desc {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
}
</style>