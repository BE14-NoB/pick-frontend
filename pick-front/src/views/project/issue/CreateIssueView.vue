<template>
    <section class="page-wrapper">
        <FormEditor title-placeholder="이슈 제목" v-model:titleModel="issueTitle"
            v-model:contentModel="issueBody" button-text="생성하기" @submit="createIssue" />
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
    margin: 60px auto;
    padding: 0 20px;
}
</style>