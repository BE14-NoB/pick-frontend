<template>
    <section class="file-changes-wrapper">
        <!-- 상단 바 -->
        <div class="top-bar">
            <div class="file-summary">
                전체 {{ files.length }}개 파일에서 {{ addedLines }} 줄 추가 / {{ removedLines }} 줄 삭제되었음
            </div>
            <button class="create-pr-button" @click="$emit('click-create-pr')">PR 생성하기</button>
        </div>

        <!-- 본문: 좌우 분할 -->
        <div class="content-split">
            <!-- 왼쪽: 파일 리스트 -->
            <div class="file-list">
                <div v-for="file in files" :key="file.path" class="file-item"
                    :class="{ active: file.path === selectedFile?.path }" @click="selectedFile = file">
                    <div class="file-info">
                        <span :class="`badge ${file.type}`">{{ fileLabel[file.type] }}</span>
                        {{ file.path }}
                    </div>
                </div>
            </div>

            <!-- 오른쪽: Diff2HTML 기반 미리보기 -->
            <div class="file-diff-preview" v-if="selectedFile?.diff">
                <div v-html="renderedDiff" class="diff2html-wrapper" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'

const files = ref([
    {
        path: 'src/Login.vue',
        type: 'modified',
        diff: `
diff --git a/src/Login.vue b/src/Login.vue
index 111..222 100644
--- a/src/Login.vue
+++ b/src/Login.vue
@@ -1,4 +1,5 @@
-import Vue from 'vue'
+import axios from 'axios'
+import axios from 'axios'
+import axios from 'axios'
+import axios from 'axios'
-export default {}
`,
    },
    {
        path: 'src/NewComponent.vue',
        type: 'deleted',
        diff: '',
    },
    {
        path: 'src/OldComponent.vue',
        type: 'renamed',
        diff: '',
    },
    {
        path: 'src/Login.java',
        type: 'added',
        diff: '',
    },
])

const selectedFile = ref(files.value[0])

const fileLabel = {
    modified: '파일 변경',
    added: '파일 추가',
    deleted: '파일 삭제',
    renamed: '이름 변경',
}

// ✅ diff2html 렌더링
const renderedDiff = computed(() => {
  if (!selectedFile.value?.diff) return ''
  return Diff2Html.html(selectedFile.value.diff, {
    drawFileList: false,
    matching: 'lines',
    outputFormat: 'line-by-line',
  })
})

const addedLines = 812
const removedLines = 119
</script>

<style scoped>
.file-changes-wrapper {
    max-width: 1200px;
    margin-bottom: 12px;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.create-pr-button {
    background-color: #1e1e1e;
    color: white;
    padding: 8px 20px;
    border-radius: 6px;
    font-weight: bold;
    border: none;
    cursor: pointer;
}

.file-summary {
    color: #333;
    font-size: 14px;
}

.content-split {
    display: flex;
    gap: 24px;
}

.file-list {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.file-item {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 12px;
    cursor: pointer;
}

.file-item.active {
    border-color: #3e8ed0;
    background-color: #f0f8ff;
}

.file-info {
    font-weight: bold;
}

.badge {
    font-size: 12px;
    padding: 2px 6px;
    margin-right: 6px;
    border-radius: 4px;
    color: #fff;
}

.badge.modified {
    background-color: #3e8ed0;
}

.badge.added {
    background-color: #2ecc71;
}

.badge.deleted {
    background-color: #e74c3c;
}

.badge.renamed {
    background-color: #f39c12;
}

.file-diff-preview {
    width: 70%;
    background-color: #f6f8fa;
    border-radius: 6px;
    overflow-x: auto;
}
</style>