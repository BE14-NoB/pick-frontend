<template>
    <div class="form-layout">
        <div class="form-left">
            <FormEditor v-model:titleModel="title" v-model:contentModel="content" titleLabel="PR 제목"
                contentLabel="PR 설명" @submit="$emit('submit')" @cancel="$emit('cancel')" />
        </div>
        <div class="form-right">
            <ProjectDropdwon label="리뷰어" v-model="reviewer" :options="reviewerOptions" :disabled="true"/>
            <ProjectDropdwon label="프로젝트" v-model="creator" :options="projectOptions" :disabled="false"/>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import FormEditor from '@/components/project/FormEditor.vue'
import ProjectDropdwon from '@/components/project/ProjectDropdown.vue'

// 내부 상태 정의
const title = defineModel('title')
const content = defineModel('content')
const reviewer = defineModel('reviewer')
const creator = defineModel('creator')

// 드롭다운 옵션은 이 컴포넌트 내부에서 정의
const reviewerOptions = [
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
.form-layout {
    max-width: 1200px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 30px;
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