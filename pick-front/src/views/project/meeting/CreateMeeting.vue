<template>
  <div class="note-editor">

    <div class="meeting-header">
      <span style="color:#4c4c4c">
        마크다운✍️을 활용해서 회의록을 작성하실 수 있습니다.
      </span>
      <!-- 저장 버튼 -->
      <MeetingSaveButton
        :id="id"
        :title="title"
        :content="content"
        :template="template"
        :author="author"
        :participants="participants"
        :createdAt="createdAt"
      />
    </div>
    
    <!-- <v-btn class="mt-4" color="primary" @click="saveNote">저장</v-btn> -->
    <!-- 제목 -->
    <input
      v-model="title"
      class="note-title"
      placeholder="회의록 제목을 입력하세요..."
    />

    <!-- 작성/수정일 -->
    <div class="note-meta">
      <div>🕒 작성일: {{ createdAt }}</div>
      <div>🔄 수정일: {{ updatedAt }}</div>
    </div>

    <!-- 작성자/참여자/템플릿 -->
    <div class="note-meta meta-box">
      <!-- 작성자 -->
      <div class="meta-row author">
        <div class="meta-label">👩‍💻 작성자</div>
        <v-select
          v-model="author"
          :items="memberList"
          item-title="name"
          return-object
          variant="underlined"
          density="comfortable"
          class="meta-select"
          chips
        >
          <template #selection="{ item }">
            <div class="d-flex align-center">
              <v-avatar size="32" class="mr-2">
                <img :src="item?.avatar || profile" alt="avatar" />
              </v-avatar>
              <span>{{ item?.name }}</span>
            </div>
          </template>
          <template #item="{ props, item }">
            <v-list-item v-bind="props">
              <template #prepend>
                <v-avatar size="32">
                  <img :src="item.avatar || profile" alt="avatar" />
                </v-avatar>
              </template>
              {{ item.name }}
            </v-list-item>
          </template>
        </v-select>
      </div>

      <!-- 참여자 -->
      <div class="meta-row participants">
        <div class="meta-label">👥 참여자</div>
        <v-select
          v-model="participants"
          :items="memberList"
          item-title="name"
          return-object
          variant="underlined"
          density="comfortable"
          class="meta-select"
          multiple
          chips
        >
          <template #selection="{ item }">
            <v-chip class="me-1" size="small">
              <v-avatar start size="18">
                <img :src="item.avatar" />
              </v-avatar>
            </v-chip>
          </template>
          <template #item="{ props, item }">
            <v-list-item v-bind="props">
              <template #prepend>
                <v-avatar size="24">
                  <img :src="item.raw.avatar" />
                </v-avatar>
              </template>
              <!-- <v-list-item-title>{{ item.raw.name }}</v-list-item-title> -->
            </v-list-item>
          </template>
        </v-select>
      </div>

      <!-- 템플릿 -->
      <div class="meta-row template">
        <div class="meta-label">📄 템플릿</div>
        <v-select
          v-model="template"
          :items="templates"
          return-object
          variant="underlined"
          density="comfortable"
          class="meta-select"
          chips
        />
      </div>
    </div>

    <!-- 내용 -->
    <div class="textarea-wrapper">
      <textarea
        v-model="content"
        class="note-textarea"
        placeholder="회의 내용을 작성하세요. Markdown 지원 ✍️"
        @keydown.down.prevent="highlightNext"
        @keydown.up.prevent="highlightPrev"
        @keydown.enter="handleEnter"
      ></textarea>

      <!-- 명령어 팝업 -->
      <div v-if="showCommandList" class="command-popup">
        <div
          v-for="(cmd, idx) in filteredCommands"
          :key="cmd.name"
          :class="['command-item', { active: idx === selectedIndex }]"
          @click="insertCommand(cmd.insertText)"
        >
          {{ cmd.name }}
        </div>
      </div>
    </div>

    <!-- 미리보기 -->
    <div class="note-preview" v-html="renderedMarkdown" />

    
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import dayjs from 'dayjs'
import profile from '@/assets/img/avatar.png'
import members from '@/json/participants.json'
import MeetingSaveButton from  '@/components/project/MeetingSaveButton.vue'

const route = useRoute()
const id = route.query.id // 수정 모드인지 확인용

const title = ref('')
const content = ref('')
const template = ref(null)
const author = ref(null)
const participants = ref([])
const createdAt = ref(dayjs().format('YYYY.MM.DD'))
const updatedAt = ref(createdAt.value)

const memberList = [
  { name: '꼼꼼보', avatar: profile },
  { name: '석키키키', avatar: profile },
  { name: '시냥주', avatar: profile },
  { name: '민선', avatar: profile },
  { name: 'blueSky', avatar: profile },
  { name: '혬헴헴', avatar: profile }
]

const templates = ['정기 회의', '스프린트 킥오프', '회고 회의', '코드 리뷰', '데일리 스크럼']

const commands = [
  { name: '할 일 목록', insertText: '- [ ] 할 일 항목' },
  { name: '체크리스트', insertText: '- [ ] 첫 번째 항목\n- [ ] 두 번째 항목' },
  { name: '코드 블록', insertText: '```js\n// 코드 입력\n```' },
  { name: '인용문', insertText: '> 인용문 텍스트' },
  { name: '헤더1', insertText: '# 제목 1' },
  { name: '헤더2', insertText: '## 제목 2' }
]

const emojis = [
  { name: '😀 웃는 얼굴', insertText: '😀' },
  { name: '🔥 불꽃', insertText: '🔥' },
  { name: '💡 아이디어', insertText: '💡' },
  { name: '📌 핀', insertText: '📌' },
  { name: '✅ 완료', insertText: '✅' },
  { name: '🚀 발사', insertText: '🚀' },
  { name: '🍎 사과', insertText: '🍎' },
  { name: '📝 메모', insertText: '📝' },
  { name: '📅 일정', insertText: '📅' }
]

const showCommandList = ref(false)
const commandKeyword = ref('')
const selectedIndex = ref(0)
const commandMode = ref('')

const filteredCommands = computed(() => {
  const list = commandMode.value === '/' ? commands : emojis
  return list.filter(cmd => cmd.name.includes(commandKeyword.value))
})

watch(content, () => {
  const lastLine = content.value.split('\n').pop()
  const slashMatch = lastLine.match(/\/(\S*)$/)
  const emojiMatch = lastLine.match(/:(\S*)$/)

  if (slashMatch) {
    commandKeyword.value = slashMatch[1]
    showCommandList.value = true
    commandMode.value = '/'
    selectedIndex.value = 0
  } else if (emojiMatch) {
    commandKeyword.value = emojiMatch[1]
    showCommandList.value = true
    commandMode.value = ':'
    selectedIndex.value = 0
  } else {
    showCommandList.value = false
    commandKeyword.value = ''
    commandMode.value = ''
  }
})

function insertCommand(insertText) {
  const lines = content.value.split('\n')
  const lastIndex = lines.length - 1
  const replacePattern = commandMode.value === '/' ? /\/(\S*)$/ : /:(\S*)$/
  lines[lastIndex] = lines[lastIndex].replace(replacePattern, insertText)
  content.value = lines.join('\n')
  showCommandList.value = false
}

function highlightNext() {
  if (selectedIndex.value < filteredCommands.value.length - 1) selectedIndex.value++
}
function highlightPrev() {
  if (selectedIndex.value > 0) selectedIndex.value--
}
function selectCommand() {
  if (showCommandList.value) {
    insertCommand(filteredCommands.value[selectedIndex.value].insertText)
  }
}
function handleEnter(e) {
  if (showCommandList.value) {
    e.preventDefault()
    selectCommand()
  }
}

const renderedMarkdown = computed(() => marked(content.value))

onMounted(async () => {
  if (!id) return // 신규 작성이면 skip
  try {
    const res = await fetch('http://localhost:8080/meetings')
    const data = await res.json()
    const existing = data.find(m => m.id === id)
    if (existing) {
      title.value = existing.title
      content.value = existing.content
      template.value = existing.template
      author.value = memberList.find(m => m.name === existing.author)
      participants.value = memberList.filter(m => existing.participants.includes(m.name))
      createdAt.value = existing.create_date
      updatedAt.value = existing.updatedAt || existing.create_date
    }
  } catch (err) {
    console.error('❌ 회의록 수정 데이터 로딩 실패:', err)
  }
})
</script>


<style scoped>
.note-editor {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
}
.meeting-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.note-title {
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 8px;
}
.note-meta {
  font-size: 14px;
  color: #666;
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 8px;
}
.meta-box {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
}
.meta-row {
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;

}

.meta-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}
.meta-select {
  min-width: 200px;
  max-width: 300px;
  font-size: 14px;
}
.v-select {
  --v-field-padding-start: 8px;
}
.textarea-wrapper {
  position: relative;
}
.note-textarea {
  width: 100%;
  min-height: 300px;
  font-size: 16px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
}
.note-preview {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  white-space: pre-wrap;
}
.command-popup {
  position: absolute;
  top: 10px;
  left: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  width: 200px;
}
.command-item {
  padding: 8px 12px;
  cursor: pointer;
}
.command-item.active,
.command-item:hover {
  background-color: #f0f0f0;
}
</style>
