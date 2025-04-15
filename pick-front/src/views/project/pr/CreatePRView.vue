<template>
    <section class="page-wrapper">
        <PRBranchSelector :selected-branch="selectedBranch" :disable-select="true" />
        <PRFormSection v-model:title="prTitle" v-model:content="prContent" v-model:reviewer="selectedReviewer"
            v-model:creator="selectedProject" @cancel="goToReviewPR" @submit="createPullRequest" />
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PRBranchSelector from '@/components/project/pr/PRBranchSelector.vue'
import PRFormSection from '@/components/project/pr/PRFormSection.vue'

const router = useRouter()

const selectedBranch = ref(router.currentRoute.value.query.branch || '')

const prTitle = ref('')
const prContent = ref(`### 🪄 PR 타입
- [ ] 신규 기능
- [ ] 기능 수정
- [ ] 버그 픽스

### 🔀 반영 브랜치


### #️⃣ 연관된 이슈
close #이슈번호


### 📝 변경 사항



----

아래 내용은 없을 경우 삭제하면 됩니다.

### 🐛 어떤 위험이나 장애가 발견되었는지 (버그 픽스인 경우)


### 💬 리뷰 요구사항 (선택)
> 리뷰어가 특별히 봐주었으면 하는 부분


### 📷 관련 스크린샷


### 🧪 테스트 계획 또는 완료 사항
- [ ] 테스트항목 1
- [ ] 테스트항목 2`)
const selectedReviewer = ref('석키키키')
const selectedProject = ref('Pick')

function goToReviewPR() {
    router.push('/project/review-pull-request')
}

async function createPullRequest() {
    try {
        const response = await fetch('http://localhost:8000/pick-service/api/github/pull-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                repo: selectedProject.value,
                owner: 'BE14-NoB',
                head: selectedBranch.value,
                title: prTitle.value,
                body: prContent.value || ""
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        alert('✅ PR이 성공적으로 생성되었습니다!')
        router.push('/project/pull-requests')
    } catch (error) {
        console.error('PR 생성 오류:', error)
        alert('❌ PR 생성 중 오류가 발생했습니다')
    }
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