<template>
    <section class="page-wrapper">
        <FormEditor page-title="PR 생성" title-placeholder="PR 제목" v-model:titleModel="prTitle"
            v-model:contentModel="prBody" button-text="생성하기" @submit="createPR" />
    </section>
</template>

<script setup>
import { ref } from 'vue'
import FormEditor from '@/components/project/FormEditor.vue'

const prTitle = ref('')
const prBody = ref('')

function createPR() {
    // TODO: 실제 API 연동
    console.log('✅ PR 생성:', prTitle.value, prBody.value)
}
</script>

<style scoped>
.page-wrapper {
    max-width: 900px;
    margin: 60px auto;
    padding: 0 20px;
}
</style>