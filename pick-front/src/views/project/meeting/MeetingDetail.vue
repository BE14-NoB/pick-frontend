<template>
    <div v-if="loading" class="loading-wrapper">
      <v-progress-circular indeterminate color="primary" size="48" />
      <div class="loading-text">회의록을 불러오는 중입니다...</div>
    </div>

    <div v-else-if="meeting" class="note-editor">
      <!-- 상단 헤더 -->
      <div class="meeting-header">
        <span style="color:#4c4c4c; font-weight: 500">
          <!-- 회의록 상세 보기 -->
        </span>
        <div style="display:flex; flex-direction:row; gap:10px;">
          <v-btn
            color="primary"
            variant="tonal"
            prepend-icon="mdi-pencil"
            @click="goToEdit"
          >
            수정하기
          </v-btn>
          <v-btn
            color="gray"
            variant="tonal"
            prepend-icon="mdi-trash-can-outline"
            @click="deleteMeeting"
          >
            삭제하기
          </v-btn>
        </div>
       
      </div>
  
      <!-- 제목 -->
      <input
        v-model="meeting.title"
        class="note-title readonly-input"
        readonly
      />
  
      <!-- 작성/수정일 -->
      <div class="note-meta">
        <div>🕒 작성일: {{ meeting.create_date }}</div>
        <div>🔄 수정일: {{ meeting.updatedAt || '-' }}</div>
      </div>
  
      <!-- 작성자/참여자/템플릿 -->
      <div class="note-meta meta-box">
        <!-- 작성자 -->
        <div class="meta-row author">
          <div class="meta-label">👩‍💻 작성자</div>
          <v-select
          v-model="selectedAuthor"
          :items="memberList"
          item-title="nickname"
          return-object
          variant="underlined"
          density="comfortable"
          class="meta-select readonly-select"
          chips
          readonly
        >
          <template #selection="{ item }">
            <v-chip class="me-1" size="small" color="primary" variant="tonal">
              <v-avatar start size="18">
                <img :src="imageMap[item.profileImage] || profile" />
              </v-avatar>
              {{ item.name }}
            </v-chip>
          </template>
        </v-select>


          <!-- <v-select
            v-model="selectedAuthor"
            :items="memberList"
            item-title="name"
            return-object
            variant="underlined"
            density="comfortable"
            class="meta-select readonly-select"
            chips
            readonly
          /> -->
        </div>
  
        <!-- 참여자 -->
        <div class="meta-row participants">
          <div class="meta-label">👥 참여자</div>

          <v-select
            v-model="selectedParticipants"
            :items="memberList"
            item-title="nickname"
            return-object
            multiple
            variant="underlined"
            density="comfortable"
            class="meta-select readonly-select"
            chips
            readonly
          >
            <template #selection="{ item }">
              <v-chip class="me-1" size="small">
                <v-avatar start size="18">
                  <img :src="imageMap[item.profileImage] || profile" />
                </v-avatar>
                {{ item.name }}
              </v-chip>
            </template>
          </v-select>



          <!-- <v-select
            v-model="selectedParticipants"
            :items="memberList"
            item-title="name"
            return-object
            multiple
            variant="underlined"
            density="comfortable"
            class="meta-select readonly-select"
            chips
            readonly
          /> -->
        </div>
  
        <!-- 템플릿 -->
        <div class="meta-row template">
          <div class="meta-label">📄 템플릿</div>
          <v-select
            v-model="meeting.template"
            :items="templates"
            variant="underlined"
            density="comfortable"
            class="meta-select readonly-select"
            chips
            readonly
          />
        </div>
      </div>
  
      <!-- 내용 미리보기 -->
      <div class="note-preview" v-html="renderedMarkdown" />
    </div>
  
    <div v-else>
      <p>📂 회의록 정보를 찾을 수 없습니다.</p>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import meetingDummy from '@/json/project_meeting_db.json'
import memberDummy from '@/json/participants.json'
import profile from '@/assets/img/avatar.png'

const route = useRoute()
const router = useRouter()
const meeting = ref(null)

const memberList = ref(memberDummy)
const templates = ['정기 회의', '스프린트 킥오프', '회고 회의', '코드 리뷰', '데일리 스크럼']
const loading = ref(true)
const selectedAuthor = ref(null)
const selectedParticipants = ref([])

onMounted(async () => {
  loading.value = true
  const id = route.params.id

  try {
    const res = await fetch('http://localhost:8084/meetings')
    const data = await res.json()
    const target = data.find(m => String(m.id) === String(id))

    if (!target) {
      console.warn('📂 회의록 정보를 찾을 수 없습니다.')
      loading.value = false
      return
    }

    meeting.value = target

    // 매핑 시 nickname 기준으로 연결해야 칩이 잘 뜸
    selectedAuthor.value = memberList.value.find(m => m.nickname === target.author)
    selectedParticipants.value = memberList.value.filter(m => target.participants.includes(m.nickname))
  } catch (err) {
    console.error('❌ 회의록 불러오기 실패:', err)
    const fallback = meetingDummy['meetings'].find(m => String(m.id) === String(id))
    meeting.value = fallback

    selectedAuthor.value = memberList.value.find(m => m.nickname === fallback.author)
    selectedParticipants.value = memberList.value.filter(m => fallback.participants.includes(m.nickname))
  }

  loading.value = false
})

const renderedMarkdown = computed(() =>
  meeting.value?.content ? marked(meeting.value.content) : ''
)

const imageModules = import.meta.glob('@/assets/img/member_profile/*.png', { eager: true })
const imageMap = Object.fromEntries(
  Object.entries(imageModules).map(([path, mod]) => [path.split('/').pop(), mod.default])
)

const goToEdit = () => {
  router.push({ path: '/project/create-meeting', query: { id: meeting.value.id } })
}

const deleteMeeting = async () => {
  const confirmDelete = confirm('이 회의록을 정말 삭제하시겠습니까?')
  if (!confirmDelete) return

  try {
    const res = await fetch(`http://localhost:8084/meetings/${meeting.value.id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('삭제 실패')

    alert('회의록이 삭제되었습니다.')
    router.push('/project/meeting')
  } catch (err) {
    console.error('❌ 삭제 중 오류:', err)
    alert('삭제에 실패했습니다.')
  }
}
</script>

  
  <style scoped>
  .note-editor {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  .meeting-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    /* width: 100%; */
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
  .readonly-input {
    pointer-events: none;
    background-color: transparent;
    border: none;
    color: #333;
    font-size: 24px;
    font-weight: bold;
  }
  .readonly-select {
    pointer-events: none;
    opacity: 1 !important;
  }
  .note-preview {
    padding: 16px;
    background-color: #f9f9f9;
    border-radius: 8px;
    min-height: 200px;
    white-space: pre-wrap;
  }

  .loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  gap: 12px;
}
.loading-text {
  font-size: 14px;
  color: #888;
}


  </style>
  