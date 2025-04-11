<template>
    <article class="form-container">
        <h2 class="form-title">{{ pageTitle }}</h2>

        <input class="title-box" type="text" :placeholder="titlePlaceholder" :value="titleModel"
            @input="$emit('update:titleModel', $event.target.value)" />

        <textarea class="editor" :value="contentModel" @input="$emit('update:contentModel', $event.target.value)"
            placeholder="이슈에 대한 설명 & 작업 내용">
</textarea>

        <div class="button-wrap">
            <button class="submit-button" @click="onSubmit">{{ buttonText }}</button>
        </div>
    </article>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
    pageTitle: String,
    titlePlaceholder: {
        type: String,
        default: '제목',
    },
    titleModel: String,
    contentModel: String,
    buttonText: {
        type: String,
        default: '제출',
    },
})

const emit = defineEmits(['update:titleModel', 'update:contentModel', 'submit'])

watch(() => props.titleModel, (val) => emit('update:titleModel', val))
watch(() => props.contentModel, (val) => emit('update:contentModel', val))

const onSubmit = () => emit('submit')
</script>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 60px auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
}

.title-box {
    height: 35px;
    padding: 0 15px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
}

.editor {
    height: 250px;
    padding: 14px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    resize: none;
    font-size: 14px;
    line-height: 1.5;
    font-family: inherit;
    white-space: pre-wrap;
}

.button-wrap {
    display: flex;
    flex-direction: row-reverse;
}

.submit-button {
    height: 36px;
    width: 100px;
    border-radius: 8px;
    background-color: #133286;
    color: white;
    font-weight: 500;
    border: none;
    cursor: pointer;
}
</style>