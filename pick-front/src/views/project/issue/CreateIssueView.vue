<template>
    <section class="page-wrapper">
        <div class="form-layout">
            <div class="form-left">
                <FormEditor v-model:titleModel="issueTitle" v-model:contentModel="issueBody" titleLabel="이슈 제목"
                    contentLabel="이슈 설명" @cancel="goToIssues" @submit="createIssue" />
            </div>
            <div class="form-right">
                <ProjectDropdwon label="생성자" v-model="selectedCreator" :options="creatorOptions" :disabled="true" />
                <ProjectDropdwon label="프로젝트" v-model="selectedProject" :options="projectOptions" :disabled="false" />
            </div>
        </div>
    </section>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormEditor from '@/components/project/FormEditor.vue'
import ProjectDropdwon from '@/components/project/ProjectDropdown.vue'


const router = useRouter()

// 작성 폼 관련
const issueTitle = ref('')
const issueBody = ref(`### 📄 설명


### ✅ 작업할 내용
> 할 일을 체크박스 형태로 작성해주세요.

`)

// 이슈 목록으로 이동
function goToIssues() {
    router.push('/project/issues')
}

// 생성하기 버튼
async function createIssue() {
    try {
        const response = await fetch('http://localhost:8000/pick-service/api/github/issue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                repo: selectedProject.value,
                owner: 'BE14-NoB',
                title: issueTitle.value,
                body: issueBody.value || ""
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        alert('✅ 이슈가 성공적으로 생성되었습니다!');
        goToIssues();
    } catch (err) {
        console.error('❌ 이슈 생성 실패:', err);
        alert('❌ 이슈 생성 중 오류가 발생했습니다');
    }
}

// 드롭다운 관련
const selectedCreator = ref('꼼꼼보')
const selectedProject = ref('PICK')

const creatorOptions = [
    { label: '꼼꼼보', value: 'Gombo2' },
    { label: '석키키키', value: 'yehang218' },
    { label: '시냥주', value: 'swjang7269' },
    { label: '혬헴헴', value: 'HMYIEN' },
    { label: '민선', value: 'minsun24' },
    { label: 'blueSky', value: 'Bluesky3125' },
]

const projectOptions = [
    { label: 'PICK', value: 'Pick' },
    { label: 'PICK FRONTEND', value: 'pick-frontend' },
]

</script>

<style scoped>
.page-wrapper {
    width: 100%;
    margin-top: 50px;
    padding: 0px;
}

.form-layout {
    max-width: 1150px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
}

.form-left {
    flex: 2;
}

.form-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 1.8rem;
    margin-left: 50px;
    min-width: 80px;
    max-width: 280px;
}
</style>