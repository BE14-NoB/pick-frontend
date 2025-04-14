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
        <div v-if="isLoading" class="loading-wrapper">🔄 변경 내역을 불러오는 중입니다...</div>
        <div v-else class="content-split">
            <!-- 왼쪽: 파일 리스트 -->
            <div class="file-list">
                <div v-for="file in files" :key="file.path" class="file-item"
                    :class="{ active: file.path === selectedFile?.path }" @click="selectedFile = file">
                    <div class="file-info">
                        <span :class="`badge ${file.type}`">{{ fileLabel[file.type] }}</span>
                        {{ formatFilePath(file.path) }}
                    </div>
                </div>
            </div>

            <!-- 오른쪽: Diff2HTML 기반 미리보기 -->
            <div class="file-diff-preview">
                <template v-if="renderedDiff && selectedFile?.diff?.trim()">
                    <div v-html="renderedDiff" class="diff2html-wrapper" />
                </template>
                <template v-else>
                    <div style="padding: 1rem; color: #999;">변경된 내용을 찾을 수 없습니다.</div>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
    selectedBranch: {
        type: String,
        required: true
    }
})

const isLoading = ref(false)

// diff
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'

const dummyFiles = ref([
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

const fileLabel = {
    modified: '파일 변경',
    added: '파일 추가',
    deleted: '파일 삭제',
    renamed: '이름 변경',
}

const selectedRepo = ref('Pick')
const selectedOwner = ref('BE14-NoB')
const files = ref([])  // 파일 목록
const addedLines = ref(0)
const removedLines = ref(0)
const selectedFile = ref(null)

// 변경 줄 수 계산
function calculateLineChanges(files) {
    let totalAdded = 0
    let totalRemoved = 0

    for (const file of files) {
        if (!file.diff) continue

        const lines = file.diff.split('\n')

        for (const line of lines) {
            if (line.startsWith('+++') || line.startsWith('---')) continue
            if (line.startsWith('+')) totalAdded++
            else if (line.startsWith('-')) totalRemoved++
        }
    }

    return { added: totalAdded, removed: totalRemoved }
}

// 파일 변경 내역 확인
const fetchFileDiffs = async () => {
    if (!props.selectedBranch) {
        console.warn('브랜치가 선택되지 않아 파일 변경 내역을 불러오지 않음')
        return
    }

    isLoading.value = true
    const controller = new AbortController()
    const timeout = setTimeout(() => {
        controller.abort() // ❌ 요청 강제 취소
    }, 10000) // 10초

    try {
        const res = await axios.get('http://localhost:8000/pick-service/api/github/branchDiff', {
            params: {
                repo: selectedRepo.value,
                owner: selectedOwner.value,
                base: 'main',
                head: props.selectedBranch
            },
            signal: controller.signal
        })

        files.value = res.data.files
        selectedFile.value = files.value[0]
        
        const result = calculateLineChanges(files.value)
        addedLines.value = result.added
        removedLines.value = result.removed
    } catch (err) {
        files.value = dummyFiles.value
        selectedFile.value = dummyFiles.value[0]

        const result = calculateLineChanges(dummyFiles.value)
        addedLines.value = result.added
        removedLines.value = result.removed

        console.error('파일 변경 내역 불러오기 실패', err)
    } finally {
        clearTimeout(timeout)
        isLoading.value = false
    }
}

// 파일 이름 줄이기
const formatFilePath = (path) => {
  if (path.length <= 40) return path
  return '...' + path.slice(-40) // 뒤에서 40자만
}

watch(() => props.selectedBranch, (newVal) => {
    if (newVal) {
        fetchFileDiffs()
    }
})


// ✅ diff2html 렌더링
const renderedDiff = computed(() => {
    const diffText = selectedFile.value?.diff?.trim()

    if (!diffText) return '<div style="padding:1rem; color:#888;">변경 내용 없음</div>'

    const header = `diff --git a/${selectedFile.value.path} b/${selectedFile.value.path}\n`
        + `--- a/${selectedFile.value.path}\n`
        + `+++ b/${selectedFile.value.path}\n`

    const fullDiff = header + diffText

    try {
        const html = Diff2Html.html(fullDiff, {
            drawFileList: false,
            matching: 'lines',
            outputFormat: 'line-by-line',
        })
        return html
    } catch (e) {
        console.error('Diff2Html 렌더링 실패:', e)
        return '<div style="color:red;">렌더링 실패</div>'
    }
})

onMounted(() => {
    if (props.selectedBranch) {
        fetchFileDiffs()
    }
})

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

.loading-wrapper {
    width: 100%;
    padding: 40px;
    text-align: center;
    font-size: 1.2rem;
    color: #666;
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
    margin-bottom: 50px;
    color: #939393;

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