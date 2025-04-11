<template>
    <aside class="sidebar">
        <ul>
            <li v-for="(item, index) in menuItems" :key="index">
                <RouterLink :to="item.to">{{ item.label }}</RouterLink>
            </li>
        </ul>
    </aside>
</template>

<script setup>
import { menuItems } from '@/project/data/menuData.js'
</script>

<style scoped>
.sidebar {
    width: 200px;
    background: #f0f0f0;
    padding: 1rem;
}
</style>