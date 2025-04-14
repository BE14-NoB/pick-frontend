<template>
    <section class="page-wrapper">
        <!-- 브랜치 선택: 선택 불가능하게 표시 -->
        <PRBranchSelector :selected-branch="selectedBranch" :disable-select="true" />

        <!-- PR 작성 폼 -->
        <PRFormSection v-model:title="prTitle" v-model:content="prContent" v-model:reviewer="selectedReviewer"
            v-model:creator="selectedProject" @cancel="goToReviewPR" @submit="goToPRList" />
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PRBranchSelector from '@/components/project/pr/PRBranchSelector.vue'
import PRFormSection from '@/components/project/pr/PRFormSection.vue'

const router = useRouter()

// 브랜치 고정
const selectedBranch = ref(router.currentRoute.value.query.branch || '')

const prTitle = ref('')
const prContent = ref('')
const selectedReviewer = ref('seokhee')
const selectedProject = ref('pick')

function goToReviewPR() {
    router.push('/project/review-pull-request')
}

function goToPRList() {
    router.push('/project/pull-requests')
}
</script>

<style scoped>
.page-wrapper {
    width: 100%;
    padding: 0px;
    margin-top: 20px;
    max-width: 1100px;
}
</style>