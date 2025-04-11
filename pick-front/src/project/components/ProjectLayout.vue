<template>
        <div class="page-header">
            <div class="page-header-inner">
                <h1 class="page-header-title">PICK</h1>
            </div>
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
import Sidebar from '@/project/components/ProjectSidebar.vue'
import { menuItems } from '@/project/data/MenuData.js'
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
    padding: 20px 0;
}

.page-header-inner {
    max-width: 100%;
    margin: 0;
    padding: 0 24px;
}

.page-header-title {
    font-size: 32px;
    font-weight: bold;

    border: 80% 80% 10% 10%;
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