<template>
    <aside class="w-60 bg-white border-r">
        <ul class="divide-y">
            <li>
                <RouterLink to="/dashboard" class="block px-4 py-3 hover:bg-gray-100">대시보드</RouterLink>
            </li>
            <li>
                <RouterLink to="/project-info" class="block px-4 py-3 hover:bg-gray-100">프로젝트 정보</RouterLink>
            </li>
            <li>
                <RouterLink to="/meetings" class="block px-4 py-3 hover:bg-gray-100">회의록</RouterLink>
            </li>
            <li>
                <RouterLink to="/team" class="block px-4 py-3 hover:bg-gray-100">팀원</RouterLink>
            </li>
            <li>
                <RouterLink to="/review" class="block px-4 py-3 hover:bg-gray-100">프로젝트 후기</RouterLink>
            </li>
            <li>
                <RouterLink to="/issues" class="block px-4 py-3 hover:bg-gray-100">이슈</RouterLink>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
</script>