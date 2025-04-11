<template>
    <section class="page-wrapper">
        <FormEditor v-model:titleModel="prTitle" v-model:contentModel="prContent" titleLabel="PR 제목"
            contentLabel="PR 설명" />
    </section>
</template>

<script setup>
import { ref } from 'vue'
import FormEditor from '@/components/project/FormEditor.vue'

const issueTitle = ref('')
const issueBody = ref('')

function createIssue() {
    // TODO: 실제 API 연결
    console.log('✅ PR 생성:', issueTitle.value, issueBody.value)
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