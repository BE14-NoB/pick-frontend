<template>
  <div class="meeting-page">
    <div class="meeting-header">
      <p class="desc">
        PICK 에서 총 <strong>{{ filteredMeetings.length }}</strong>개의 회의록을 작성하셨어요! ✨
      </p>
      <MeetingCreateButton @click="onClickCreateMeeting" />
    </div>

    <div class="search-filter-bar">
      <div class="searchBox">
        <SearchComboBox hidden />
        <input v-model="searchQuery" placeholder="제목 검색..." type="text" />
        <button @click="search">
          <img src="@/assets/post/icons8-search.svg" alt="돋보기 아이콘" width="25" height="25" />
        </button>
      </div>

      <v-select v-model="selectedTemplate" :items="templateOptions" label="템플릿" density="compact" class="select" />
      <v-select v-model="selectedAuthor" :items="authorOptionsWithAll" label="작성자" density="compact" class="select" />
      <v-select v-model="sortOrder" :items="sortOptions" label="정렬" density="compact" class="select" />
    </div>

    <div class="list-card">
      <List
        :headers="['번호', '제목', '작성일', '템플릿', '작성자', '참여자']"
        :items="paginatedMeetings.map(({ content, updatedAt, ...rest }) => rest)"
        @row-click="goToDetail"
      >
        <template #template="{ value }">
          <v-chip :color="getTypeColor(value)" variant="tonal" size="small">{{ value }}</v-chip>
        </template>

        <template #author="{ value }">
          <div class="profile-wrapper">
            <img :src="value.profileImage" class="profile-img" />
            <span>{{ value.name }}</span>
          </div>
        </template>

        <template #participants="{ value }">
          <div class="avatar-group">
            <v-avatar
              v-for="(participant, index) in value.slice(0, 3)"
              :key="index"
              size="24"
              class="avatar-overlap"
              :title="participant.name"
            >
              <img :src="participant.profileImage" />
            </v-avatar>
            <span v-if="value.length > 3" class="extra-count">+{{ value.length - 3 }}</span>
          </div>
        </template>
      </List>
    </div>

    <Pagination class="pagination" v-model:currentPage="openPage" :totalPages="openTotalPages" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Pagination from '@/components/common/Pagination.vue'
import List from '@/components/List.vue'
import meetingMaker from '@/assets/img/avatar.png'
import MeetingCreateButton from '@/components/project/MeetingCreateButton.vue'
import { useRouter } from 'vue-router'
import SearchComboBox from '@/components/common/SearchComboBox.vue'
import meetingDummy from '@/json/project_meeting_db.json'
import memberDummy from '@/json/participants.json'

const router = useRouter()

const meetingData = ref([])
const openPage = ref(1)
const itemsPerPage = 5
const searchQuery = ref('')
const selectedTemplate = ref('전체')
const selectedAuthor = ref('전체')
const sortOrder = ref('최신순')
const sortOptions = ['최신순', '오래된순']

const imageModules = import.meta.glob('@/assets/img/member_profile/*.png', { eager: true })
const imageMap = Object.fromEntries(
  Object.entries(imageModules).map(([path, mod]) => [path.split('/').pop(), mod.default])
)

const getProfile = (nickname) => {
  const user = memberDummy.find(m => m.nickname === nickname)
  return {
    name: nickname,
    profileImage: imageMap[user?.profileImage] || meetingMaker
  }
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8080/meetings')
    const data = await res.json()
    meetingData.value = data
      .filter(meeting => meeting.title?.trim() && meeting.content?.trim())
      .map(meeting => ({
        ...meeting,
        author: getProfile(meeting.author),
        participants: meeting.participants.map(getProfile)
      }))
  } catch (err) {
    console.error('❌ 회의록 불러오기 실패:', err)
    meetingData.value = meetingDummy.meetings.map(meeting => ({
      ...meeting,
      author: getProfile(meeting.author),
      participants: meeting.participants.map(getProfile)
    }))
  }
})

const templateOptions = computed(() => ['전체', ...new Set(meetingData.value.map(m => m.template))])
const authorOptions = computed(() => [...new Set(meetingData.value.map(m => m.author.name))])
const authorOptionsWithAll = computed(() => ['전체', ...authorOptions.value])

const filteredMeetings = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  let filtered = meetingData.value.filter(m =>
    m.title?.toLowerCase().includes(query)
  )
  if (selectedTemplate.value !== '전체') {
    filtered = filtered.filter(m => m.template === selectedTemplate.value)
  }
  if (selectedAuthor.value !== '전체') {
    filtered = filtered.filter(m => m.author.name === selectedAuthor.value)
  }
  return filtered.sort((a, b) => {
    const dateA = new Date(a.create_date)
    const dateB = new Date(b.create_date)
    return sortOrder.value === '오래된순' ? dateA - dateB : dateB - dateA
  })
})

const paginatedMeetings = computed(() => {
  const start = (openPage.value - 1) * itemsPerPage
  return filteredMeetings.value.slice(start, start + itemsPerPage)
})

const openTotalPages = computed(() =>
  Math.ceil(filteredMeetings.value.length / itemsPerPage)
)

function goToDetail(row) {
  router.push(`/project/meeting/${row.id}`)
}

function onClickCreateMeeting() {
  console.log('회의록 작성 클릭됨!')
}

function getTypeColor(type) {
  if (type === '정기 회의') return 'blue'
  if (type === '스프린트 킥오프') return 'amber'
  if (type === '코드 리뷰') return 'red'
  if (type === '회고 회의') return 'cyan'
  return 'grey'
}
</script>

<style scoped>
.desc {
  font-size: 14px;
  color: #666;
  margin: 16px 0;
}
.search-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  width: 100%;
}
.search-filter-bar input {
  flex: 2;
  padding: 8px 12px;
  border-radius: 6px;
}
.select {
  max-width: 180px;
}
.meeting-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.list-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.profile-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
}
.profile-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}
.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
.avatar-group {
  display: flex;
  justify-content: center;
}
.avatar-overlap {
  margin-left: -8px;
  border: 2px solid white;
  z-index: 1;
}
.avatar-overlap:first-child {
  margin-left: 0;
}
.extra-count {
  font-size: 12px;
  margin-left: 4px;
  color: #555;
}
.searchBox {
  width: 500px;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 50px;
  padding-left: 20px;
  padding-right: 5px;
  display: flex;
  align-items: center;
}
input:focus {
  outline: none;
}
</style>
