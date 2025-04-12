<template>
    <section class="page-wrapper">
        <!-- 브랜치 선택 -->
        <BranchSelector />
        <div class="form-layout">
            <div class="form-left">
                <FormEditor v-model:titleModel="prTitle" v-model:contentModel="prContent" titleLabel="PR 제목"
                    contentLabel="PR 설명" />
            </div>
            <div class="form-right">
                <ProjectDropdwon label="리뷰어" v-model="selectedReviewer" :options="reviewerOptions" />
                <ProjectDropdwon label="프로젝트" v-model="selectedProject" :options="projectOptions" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

import FormEditor from '@/components/project/FormEditor.vue'
const prTitle = ref('')
const prContent = ref('')

function createPR() {
    // TODO: 실제 API 연결
    console.log('✅ PR 생성:', prTitle.value, prContent.value)
}

// 브랜치 선택
import BranchSelector from '@/components/project/BranchSelector.vue'

// 드롭다운 관련
import ProjectDropdwon from '@/components/project/ProjectDropdown.vue'
const selectedReviewer = ref('seokhee')
const selectedProject = ref('pick')

const reviewerOptions = [
    { label: '석키킥키키', value: 'seokhee' },
    { label: '홍길동', value: 'hong' },
]

const projectOptions = [
    { label: 'PICK', value: 'pick' },
    { label: 'AI 리포트', value: 'ai-report' },
]

</script>

<style scoped>
.page-wrapper {
    width: 100%;
    padding: 0px;
    margin-top: 20px;
}

/* 전체 영역 중앙 정렬 */
.form-layout {
    max-width: 1250px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 30px;
    gap: 2rem;
}

/* 왼쪽 입력 영역 */
.form-left {
    flex: 2;
}

/* 드롭다운 영역: 왼쪽에 살짝 붙은 느낌 */
.form-right {
    flex: 1;
    display: flex;
    flex-direction: column;

    /* 추가 포인트 */
    padding-top: 1.8rem;

    margin-left: 50px;

    /* 폼 라벨과 맞추기 위한 세로 정렬 */
    min-width: 80px;
    max-width: 280px;
}
</style>