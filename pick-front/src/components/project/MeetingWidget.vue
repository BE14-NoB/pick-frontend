<template>
  <v-card class="widget-container"
          >
    <!-- 헤더 -->
    <div class="header">
      <span class="meeting-title" @click="goToMeetingList">회의록</span>
      <RouterLink to="/project/create-meeting">
        <v-btn icon class="edit-btn" size="small" variant="text">
          <v-icon>mdi-pen</v-icon>
        </v-btn>
      </RouterLink>
    </div>

    <!-- 회의록 리스트 -->
    <div class="meeting-list">
      <RouterLink
        v-for="(meeting, index) in pagedMeetings"
        :key="meeting.id"
        :to="`/project/meeting/${meeting.id}`"
        :class="['meeting-card', { primary: isPrimary(meeting, index) }]"
        @mouseenter="hoveredId = meeting.id"
        @mouseleave="hoveredId = null"
      >
        <span v-if="isPrimary(meeting, index) && meeting.tag" class="tag">{{ meeting.tag }}</span>
        <div class="meeting-content">
          <div class="title">{{ meeting.title }}</div>
          <div v-if="isPrimary(meeting, index) && meeting.date" class="date">{{ meeting.date }}</div>
        </div>
      </RouterLink>
    </div>

    <!-- 도트 페이지네이션 -->
    <div class="indicator">
      <span
        v-for="(_, index) in totalPages"
        :key="index"
        :class="['dot', { active: index === currentPage }]"
        @click="currentPage = index"
      >●</span>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 회의록 데이터 예시
const meetingItems = [
  {
    id: 1,
    tag: '스프린트',
    title: '프론트엔드 UI/UX 설계 회의',
    date: '25.03.31',
    primary: true,
  },
  {
    id: 2,
    tag: '스프린트',
    title: '백엔드 DB 스키마 리뷰',
    date: '25.03.31',
    primary: true,
  },
  {
    id: 3,
    tag: '스프린트',
    title: '프로젝트 일정 점검',
    date: '25.03.31',
    primary: true,
  },
  {
    id: 4,
    tag: '스프린트',
    title: '이슈 트래킹 정례 회의',
    date: '25.03.31',
    primary: true,
  },
  {
    id: 5,
    tag: '스프린트',
    title: '백엔드 DB 스키마 리뷰',
    date: '25.03.31',
    primary: true,
  },
  {
    id: 6,
    tag: '스프린트',
    title: 'API 명세 정리 회의',
    date: '25.03.31',
    primary: true,
  }
]

const router = useRouter()
const currentPage = ref(0)
const itemsPerPage = 3
const totalPages = Math.ceil(meetingItems.length / itemsPerPage)
const hoveredId = ref(null) // 마우스 올라간 회의록 ID

const pagedMeetings = computed(() => {
  const start = currentPage.value * itemsPerPage
  return meetingItems.slice(start, start + itemsPerPage)
})

const goToMeetingList = () => {
  router.push('/project/meeting-list') 
}

function isPrimary(meeting, index) {
  // hover 중이면 hovered 항목만 primary
  if (hoveredId.value !== null) {
    return meeting.id === hoveredId.value
  }
  // 기본은 첫 번째만 primary
  return index === 0
}

</script>

<style scoped>
.widget-container {
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  cursor: pointer; /* 커서 변경 */
  }
  
  .widget-container:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  }
  

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meeting-title {
  font-size: 20px;
  font-weight: bold;
  color: #4C4C4C;
}

.edit-btn {
  background-color: #2e2e2e;
  color: white;
  border-radius: 50%;
}

.meeting-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 🔥 위쪽 정렬 */
  gap: 12px;
  margin-top: 16px;
  flex-grow: 1; /* 🔥 공간 확보해서 위로 쌓이게 */
  min-height: 200px; /* 🔥 줄 수에 맞춰 높이 고정해도 좋음 (선택) */
}

.meeting-card {
  display: block;
  text-decoration: none;
  color: inherit;

  background-color: #e8f1f8;
  border-radius: 12px;
  padding: 12px 16px;
  transition: background 0.2s;
}

.meeting-card:hover,
.meeting-card.primary:hover {
  background-color: #ABCFE7;
  cursor: pointer;
}

.meeting-card.primary {
  background-color: #d9e9f4;
  position: relative;
  padding-top: 32px;
}

.tag {
  position: absolute;
  top: 8px;
  left: 12px;
  background-color: #c2ddef;
  color: white;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
}

.title {
  font-size: 15px;
  color: #333;
  font-weight: 500;
  margin-top: 8px;
}

.date {
  font-size: 12px;
  color: #888;
  text-align: right;
}

.indicator {
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  cursor: pointer;
  font-size: 16px;
  opacity: 0.4;
  transition: opacity 0.2s;
}

.dot.active {
  opacity: 1;
}
</style>
