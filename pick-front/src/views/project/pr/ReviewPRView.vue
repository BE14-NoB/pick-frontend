<template>
    <section class="page-wrapper">
        <!-- 브랜치 선택 -->
        <BranchSelector />

        <!-- 탭 메뉴 -->
        <ProjectTabs v-model="selectedTab" :tabs="tabList">
            <template #commit>
                <CommitList />
            </template>

            <template #file>
                <FileChanges @click-create-pr="goToCreatePR" />
            </template>
        </ProjectTabs>
    </section>
</template>

<script setup>
import { ref } from 'vue'

function createPR() {
    // TODO: 실제 API 연결
    console.log('✅ PR 생성:', prTitle.value, prContent.value)
}

// Tabs
import ProjectTabs from '@/components/project/ProjectTabs.vue'
const tabList = [
    { label: '커밋', value: 'commit', icon: 'mdi-source-commit' },
    { label: '파일 변경', value: 'file', icon: 'mdi-file-document-edit' },
]
const selectedTab = ref('commit')

// 브랜치 선택
import BranchSelector from '@/components/project/pr/PRBranchSelector.vue'

// 커밋 목록 탭
import CommitList from '@/components/project/pr/PRCommitList.vue'

// 파일 변경 탭
import FileChanges from '@/components/project/pr/PRFileChanges.vue'

function goToCreatePR() {
    router.push('/project/pr/CreatePRView.vue')
}

</script>

<style scoped>
.page-wrapper {
    width: 100%;
    padding: 0px;
    margin-top: 20px;
    max-width: 1200px;
}

/* 전체 영역 중앙 정렬 */
.form-layout {
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