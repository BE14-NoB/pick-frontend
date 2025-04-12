<template>
    <section class="page-wrapper">
        <!-- 브랜치 선택 -->
        <BranchSelector />

        <!-- PR 작성 폼 -->
        <PRFormSection v-model:title="prTitle" v-model:content="prContent" v-model:reviewer="selectedReviewer"
            v-model:creator="selectedProject" />
    </section>
</template>

<script setup>
import { ref } from 'vue'
import PRBranchSelector from '@/components/project/pr/PRBranchSelector.vue'
import PRFormSection from '@/components/project/pr/PRFormSection.vue'

const prTitle = ref('')
const prContent = ref('')
const selectedReviewer = ref('seokhee')
const selectedProject = ref('pick')
</script>

<style scoped>
.page-wrapper {
    width: 100%;
    padding: 0px;
    margin-top: 20px;
}
</style>