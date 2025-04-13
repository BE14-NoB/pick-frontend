<template>
  <div class="matching-result">
    <h2 class=page-title>매칭 조회 결과</h2>
    <div class="content-container">
      <v-infinite-scroll 
        :height="600" 
        :items="displayedResults" 
        @load="loadMore"
        :loading="loading && !isEnd"
        class="scroll-container"
      >
        <template v-for="(result, index) in displayedResults" :key="index">
          <div class="result-card" @click="teamMate(index)">
            <div class="card-content">
              <div class="card-header">
                <div class="profile-img">

                </div>
                <span class="host-info">
                  방장: Lv.{{ result.hostLevel }} {{ result.hostName }}
                </span>
              </div>
              
              <div class="info-section">
                <div class="info-group">
                  <div class="icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <span class="member-count">{{ result.currentMembers }}/{{ result.maxMembers }}명</span>
                </div>

                <div class="info-group">
                  <div class="icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <span class="duration">{{ result.duration }}개월</span>
                </div>

                <div class="info-group">
                  <div class="icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3 9H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9 21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <span class="category">
                    {{ result.mainCategory }}
                    <template v-if="result.subCategory">/ {{ result.subCategory }}</template>
                  </span>
                </div>
              </div>
            </div>
            <button :disabled="disabledButtons[index]" @click.stop="matchingApply(index)" :class="['apply-button', { 'disabled-button': disabledButtons[index] }]">신청</button>
            <template v-if="openedCardIndex === index">
              <TeamMemberCard :members="result.members" />
            </template>
          </div>
        </template>
      </v-infinite-scroll>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TeamMemberCard from '@/components/matching/TeamMemberCard.vue'

const openedCardIndex = ref(false)
const disabledButtons = ref([]);
const teamMate = (index) => {
  openedCardIndex.value = openedCardIndex.value === index ? false : index
}
const matchingApply = (index) => {
  const confiremd = window.confirm('신청하시겠습니까')
  if(confiremd) {
    disabledButtons.value[index] = true;
  }
}
// 전체 데이터
const allResults = [
  {
    hostLevel: 10,
    hostName: '카드값줘체리',
    currentMembers: 3,
    maxMembers: 6,
    duration: 6,
    mainCategory: 'PC',
    subCategory: '게임',
    members: [
    {
    name: '봇치더코드',
    level: 30,
    rating: 4.4,
  },
  {
    name: '체인소개발자',
    level: 27,
    rating: 4.7,
  },
  {
    name: '코드코드체인지',
    level: 35,
    rating: 4.2,
  }
    ]
  },
  {
    hostLevel: 25,
    hostName: '전생했더니개발자였던건에대하여',
    currentMembers: 4,
    maxMembers: 6,
    duration: 3,
    mainCategory: 'PC',
    subCategory: '웹',
    members: []
  },
  {
    hostLevel: 30,
    hostName: '코드아트온라인',
    currentMembers: 2,
    maxMembers: 5,
    duration: 3,
    mainCategory: '모바일',
    subCategory: 'ios',
    members: []
  },
  {
    hostLevel: 17,
    hostName: '개발자X패밀리',
    currentMembers: 4,
    maxMembers: 5,
    duration: 4,
    mainCategory: 'PC',
    subCategory: null,
    members: []
  },
  {
    hostLevel: 20,
    hostName: '코딩용사성공담',
    currentMembers: 4,
    maxMembers: 7,
    duration: 6,
    mainCategory: '모바일',
    subCategory: '게임',
    members: [
]
  },
  {
    hostLevel: 40,
    hostName: '귀멸의코드',
    currentMembers: 3,
    maxMembers: 5,
    duration: 3,
    mainCategory: '모바일',
    subCategory: '안드로이드',
    members: []
  },
  // 추가 데이터 (무한 스크롤 테스트용)
  {
    hostLevel: 15,
    hostName: '코딩마스터',
    currentMembers: 2,
    maxMembers: 4,
    duration: 5,
    mainCategory: 'PC',
    subCategory: '앱',
    members: []
  },
  {
    hostLevel: 35,
    hostName: '개발자의길',
    currentMembers: 5,
    maxMembers: 8,
    duration: 4,
    mainCategory: '모바일',
    subCategory: '웹',
    members: []
  },
  {
    hostLevel: 22,
    hostName: '코딩천사',
    currentMembers: 3,
    maxMembers: 6,
    duration: 3,
    mainCategory: 'PC',
    subCategory: '게임',
    members: []
  },
  {
    hostLevel: 28,
    hostName: '개발자지망생',
    currentMembers: 1,
    maxMembers: 5,
    duration: 6,
    mainCategory: '모바일',
    subCategory: 'ios',
    members: []
  }
]

// 현재 표시되는 결과
const displayedResults = ref([])
const loading = ref(false)
const pageSize = 5
let currentPage = 0;

const isEnd = ref(false);
// 초기 데이터 로드
onMounted(() => {
  loadMore()
})

// 추가 데이터 로드 함수
const loadMore = () => {
  if (loading.value || isEnd.value) return
  loading.value = true
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  setTimeout(() => {
    const start = currentPage * pageSize
    const end = start + pageSize
    if(end >= allResults.length){
      isEnd.value = true;
      loading.value = false;
      return;
    }
    const newItems = allResults.slice(start, end)
    if (newItems.length > 0) {
      displayedResults.value = [...displayedResults.value, ...newItems]
      // displayedResults.value.push(...newItems);
      currentPage++;
    }
    loading.value = false
  }, 300)
  if(isEnd.value) {
    loading.value = false;
    return;
  }
}
</script>

<style scoped>
.matching-result {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 33.4px;
  color: #000;
  margin-bottom: 30px;
}

.content-container {
  display: flex;
  gap: 20px;
}

.scroll-container {
  flex: 1;
  overflow-x: hidden;
}

.sidebar {
  width: 250px;
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 15px;
  height: 600px;
}

.result-card {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 15px;
  padding: 13px 10px;
  border: 1px solid #020725;
  border-radius: 12px;
  width: 800px;
  position: relative;
  margin-bottom: 15px;
  background-color: #fff;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card-header {
  display: flex;
  flex-direction: row;
  font-family: 'Open Sans', sans-serif;
  align-items: center;
  font-weight: 400;
  font-size: 18px;
  color: #000;
}

.info-section {
  display: flex;
  gap: 40px;
  align-items: center;
}

.info-group {
  display: flex;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
}

.icon-wrapper {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #020725;
}

.icon-wrapper svg {
  width: 100%;
  height: 100%;
}

.member-count,
.duration,
.category {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #000;
}

.apply-button {
  width: 100px;
  padding: 10px 20px;
  background: #133E86;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 50%;
  min-height: 50px;
}

.apply-button:hover {
  background: #1a4ca8;
}

.apply-button:disabled,
.disabled-button {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  pointer-events: none;
  transition: none;
}

.apply-button:disabled:hover {
  background-color: #ccc;
}

.page-title {
    font-size: 24px;
    font-weight: bold;
    }
  .profile-img {
    width: 40px;
    height: 40px;
    border: 1px solid #020725;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
  }
</style> 