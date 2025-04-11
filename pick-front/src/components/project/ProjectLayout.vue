<template>
        <div class="page-header">
                <h1 class="page-header-title">PICK</h1>
        </div>

        <div class="content-wrapper">
            <Sidebar :menu-items="menuItems" />
            <main class="main-content">
                <h2 class="page-title">{{ pageTitle }}</h2>
                <p class="page-desc">{{ pageDescription }}</p>
                <slot />
            </main>
        </div>
</template>

<script setup>
import Sidebar from '@/components/project/ProjectSidebar.vue'
import { menuItems } from '@/data/project/MenuData.js'
import { useRoute } from 'vue-router'
import { computed, watchEffect } from 'vue'

const route = useRoute()

const currentMenu = computed(() =>
    menuItems.find(item =>
        item.type === 'menu' &&
        (item.match || [item.to]).some(path => route.path.startsWith(path))
    )
)

const currentPageMeta = computed(() =>
    menuItems.find(item =>
        item.type === 'page' &&
        (item.match || [item.to]).includes(route.path)
    )
)

const pageTitle = computed(() => currentPageMeta.value?.title || '페이지')
const pageDescription = computed(() => currentPageMeta.value?.description || '')

watchEffect(() => {
    if (pageTitle.value) {
        document.title = `PICK | ${pageTitle.value}`
    }
})
</script>

<style scoped>
.project-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.page-header {
    background-color: #cfe3f2;
    padding: 20px 0px 0px 200px;
    margin: 0;
}

.page-header-title {
    font-size: 32px;
    font-weight: bold;
    border: 60% 80% 10% 10%;
    margin: 80px 0px 30px 0px;
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