<template>
    <section class="page-wrapper">
        <FormEditor v-model:titleModel="issueTitle" v-model:contentModel="issueContent" titleLabel="이슈 제목"
            contentLabel="이슈 설명" />
    </section>
</template>

<script setup>
import { ref } from 'vue'
import FormEditor from '@/components/project/FormEditor.vue'

const issueTitle = ref('')
const issueBody = ref('')

function createIssue() {
    // TODO: 실제 API 연결
    console.log('✅ 이슈 생성:', issueTitle.value, issueBody.value)
}
</script>

<style scoped>
.page-wrapper {
    width: 100%;
    padding: 0px;
    margin-top: 50px;
}

.title {
    margin-bottom: 0;
}
</style>