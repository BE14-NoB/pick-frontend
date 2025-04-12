<template>
    <section class="page-wrapper">
        <!-- 브랜치 선택 -->
        <PRBranchSelector />

        <!-- PR 작성 폼 -->
        <PRFormSection v-model:title="prTitle" v-model:content="prContent" v-model:reviewer="selectedReviewer"
            v-model:creator="selectedProject" @submit="goToPRList" @cancel="goToReviewPR" />
    </section>
</template>

<script setup>
import { ref } from 'vue'
import PRBranchSelector from '@/components/project/pr/PRBranchSelector.vue'

// 라우터
import { useRouter } from 'vue-router'
const router = useRouter()


// 작성 폼
import PRFormSection from '@/components/project/pr/PRFormSection.vue'
const prTitle = ref('')
const prContent = ref('')
const selectedReviewer = ref('seokhee')
const selectedProject = ref('pick')

// 취소하기 버튼
function goToReviewPR() {
  router.push('/project/review-pull-request')
}

// 생성하기 버튼
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