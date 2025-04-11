<template>
    <aside class="sidebar">
        <ul>
            <li v-for="item in props.menuItems.filter(i => i.type === 'menu')" :key="item.to">
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
    menuItems: Array
})

const route = useRoute()

const isActive = (matchList) =>
    matchList?.some(path => route.path.startsWith(path))
</script>


<style scoped>
.sidebar {
    width: 180px;
    height: 300px;

    margin-top: 10px;
    border: 1px solid black;
}

.sidebar-link {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #333;
}

.sidebar-link.active {
    background-color: #b0b0b0;
    font-weight: 600;
}

.item {
    margin: 10px 0px 0px 0px;
    border-bottom: 1px solid black;
}
</style>