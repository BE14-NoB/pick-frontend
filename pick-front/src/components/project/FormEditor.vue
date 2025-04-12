<template>
    <div class="form-wrapper">
        <!-- 제목 입력 -->
        <div class="form-group">
            <label class="input-label">{{ titleLabel }}</label>
            <input class="title-box" type="text" :value="titleModel"
                @input="$emit('update:titleModel', $event.target.value)" />
        </div>

        <!-- 설명 입력 -->
        <div class="form-group">
            <label class="input-label">{{ contentLabel }}</label>
            <textarea class="editor" :value="contentModel"
                @input="$emit('update:contentModel', $event.target.value)"></textarea>
        </div>

        <!-- 버튼 영역 -->
        <div class="button-group">
            <button class="cancel-button" @click="$emit('cancel')">취소하기</button>
            <button class="submit-button" @click="$emit('submit')">생성하기</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    titleModel: String,
    contentModel: String,
    titleLabel: {
        type: String,
        default: '제목',
    },
    contentLabel: {
        type: String,
        default: '설명',
    },
})
defineEmits(['update:titleModel', 'update:contentModel', 'submit', 'cancel'])
</script>

<style scoped>
.form-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.input-label {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #555;
}

.title-box,
.editor {
    padding: 0.6rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
}

.editor {
    min-height: 200px;
    resize: none;
}

/* 버튼 그룹 스타일 */
.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
    gap: 0.5rem;
}

.cancel-button,
.submit-button {
    padding: 0.5rem 1.2rem;
    font-size: 0.95rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.cancel-button {
    background-color: #f2f2f2;
    color: #333;
}

.submit-button {
    background-color: #333;
    color: white;
}
</style>