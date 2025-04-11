<template>
    <aside class="sidebar">
        <ul class="sidebar-list">
            <li v-for="item in menuItems.filter(i => i.type === 'menu')" :key="item.to" class="sidebar-item">
                <RouterLink :to="item.to" class="sidebar-link" :class="{ active: isActive(item.match || [item.to]) }">
                    {{ item.label }}
                </RouterLink>
            </li>
        </ul>
    </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const props = defineProps({
    menuItems: {
        type: Array,
        required: true,
    },
})

const route = useRoute()

const isActive = (matchList) =>
    matchList?.some(path => route.path.startsWith(path))
</script>

<style scoped>
.sidebar {
    display: flex;
    width: 200px;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    margin: 3% 3% 0% 3%;
    border: 1px solid #eee;
    overflow: hidden;
    height: auto;
    align-self: flex-start;
}

.sidebar-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.sidebar-item {
    border-bottom: 1px solid #eee;
}

.sidebar-item:last-child {
    border-bottom: none;
}


.sidebar-link {
    display: block;
    padding: 14px 16px;
    color: #333;
    text-decoration: none;
    font-size: 14px;
    transition: background-color 0.2s;
    margin: 0;
}

.sidebar-link:hover {
    background-color: #f5f5f5;
}

.sidebar-link.active {
    background-color: #f0f0f0;
    font-weight: 600;
}
</style>