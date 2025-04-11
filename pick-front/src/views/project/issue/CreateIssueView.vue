<template>
    <section class="page-wrapper">
        <div class="form-layout">
            <!-- 왼쪽: Form 입력 -->
            <div class="form-left">
                <FormEditor v-model:titleModel="issueTitle" v-model:contentModel="issueContent" titleLabel="이슈 제목"
                    contentLabel="이슈 설명" />
            </div>

            <!-- 오른쪽: 드롭다운 -->
            <div class="form-right">
                <ProjectDropdwon label="생성자" v-model="selectedCreator" :options="creatorOptions" />
                <ProjectDropdwon label="프로젝트" v-model="selectedProject" :options="projectOptions" />
            </div>
        </div>
    </section>
</template>


<script setup>
import { ref } from 'vue'

// 작성 폼 관련
import FormEditor from '@/components/project/FormEditor.vue'
const issueTitle = ref('')
const issueBody = ref('')

function createIssue() {
    // TODO: 실제 API 연결
    console.log('✅ 이슈 생성:', issueTitle.value, issueBody.value)
}

// 드롭다운 관련
import ProjectDropdwon from '@/components/project/ProjectDropdown.vue'
const selectedCreator = ref('seokhee')
const selectedProject = ref('pick')

const creatorOptions = [
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
    margin-top: 50px;
    padding: 0px;
}

/* 전체 영역 중앙 정렬 */
.form-layout {
    max-width: 1150px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
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