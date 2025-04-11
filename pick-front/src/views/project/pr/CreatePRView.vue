<template>
    <ProjectTabs v-model="selectedTab" :tabs="[
        { label: '커밋', value: 'commit', icon: 'mdi-source-branch' },
        { label: '파일 변경', value: 'file', icon: 'mdi-file-document' }
    ]">
        <template #commit>
            <!-- 커밋 내용 -->
        </template>
        <template #file>
            <!-- 파일 변경 내용 -->
        </template>
    </ProjectTabs>
</template>


<script setup>
import { ref } from 'vue'
import ProjectTabs from '@/components/project/ProjectTabs.vue'

const selectedTab = ref('commit')
</script>