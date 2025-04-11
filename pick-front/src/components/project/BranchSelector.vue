<template>
    <div class="branch-wrapper">
        <v-icon class="branch-icon" icon="mdi-source-branch" />

        <div class="branch-box">
            <div class="branch-label">base :</div>
            <div class="branch-value">main</div>
        </div>

        <span class="branch-arrow">←</span>

        <div class="branch-box">
            <div class="branch-label">head :</div>
            <v-select v-model="head" :items="filteredHeadBranches" variant="plain" hide-details density="compact"
                menu-icon="mdi-menu-down" class="branch-select" />
        </div>

        <div v-if="!head" class="warning-box">
            <span class="icon">❌</span>
            <span class="label">자동 머지 방지</span>
            <span class="desc">PR을 생성할 브랜치를 선택해주세요.</span>
        </div>
    </div>
</template>



<script setup>
import { ref, computed } from 'vue'

const base = ref('main')
const head = ref(null)

const branches = ['main', 'dev', 'feature/project']
const baseBranch = 'main'

// head용 브랜치에서 'main' 제거
const filteredHeadBranches = computed(() =>
    branches.filter(b => b !== baseBranch)
)
</script>

<style scoped>
.branch-wrapper {
    display: flex;
    align-items: center;
    background-color: #f5f6f8;
    padding: 12px 16px;
    border-radius: 10px;
    gap: 12px;
}

/* 아이콘 */
.branch-icon {
    color: #444;
    font-size: 20px;
    margin-right: 4px;
}

/* base/head 전체 박스 */
.branch-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px 12px;
    background-color: #eaeaea;
    border-radius: 10px;
    max-height: 100px;
    min-width: 200px;
    font-size: 14px;
}

/* label */
.branch-label {
    font-size: 12px;
    color: #999;

    max-height: 100px;
    min-width: 200px;
}

/* base/head 값 */
.branch-value {
    font-weight: 600;
    color: #333;
    max-height: 100px;
    min-width: 200px;
}

/* head 드롭다운 커스터마이징 */
.branch-select>>>.v-field {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    min-height: 10px;
}

.branch-select>>>.v-field__input {
    font-weight: 600;
    color: #333;
    padding: 0 !important;
}

.branch-select>>>.v-label {
    display: none;
}

/* 가운데 화살표 */
.branch-arrow {
    font-size: 18px;
    color: #555;
}

/* 경고 메시지 */
.warning-box {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: 12px;
    font-size: 20px;
    white-space: nowrap;
}

.warning-box .label {
    color: #e74c3c;
    font-weight: bold;
}

.warning-box .desc {
    color: #999;
    font-size: 13px;
}
</style>