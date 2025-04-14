<template>
  <div class="matching-result">
    <h2 class=page-title>매칭 조회 결과</h2>
    <div class="content-container">
      <v-infinite-scroll 
      v-if="isInit"
        :height="600" 
        @load="loadMore"
        class="scroll-container"
      >
        <template v-for="(result, index) in displayedResults" :key="index">
          <div class="result-card" @click="teamMate(index)">
            <div class="card-content">
              <div class="card-header">
                <!-- <div class="profile-img">

                </div> -->
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
            <button 
              @click.stop="matchingApply(index)"
              :class="['apply-button', { 'applied-button': appliedButtons[index] }]"
            >
              {{ appliedButtons[index] ? '신청 완료' : '신청' }}
            </button>

            <template v-if="openedCardIndex === index">
              <TeamMemberCard :members="result.members" />
            </template>
          </div>
        </template>
        <template v-slot:empty>
          <v-alert type="warning">더 이상 조건에 맞는 매칭이 없습니다.</v-alert>
        </template>
      </v-infinite-scroll>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeMount } from 'vue'
import TeamMemberCard from '@/components/matching/TeamMemberCard.vue'
import matchingList from '@/json/matching_list.json'

const isInit = ref(false)
const openedCardIndex = ref(false)
const appliedButtons = ref([]); // 신청 상태 저장용
const teamMate = (index) => {
  openedCardIndex.value = openedCardIndex.value === index ? false : index
}

const matchingApply = (index) => {
  if (appliedButtons.value[index]) {
    const cancel = window.confirm('신청을 취소하시겠습니까?');
    if (cancel) {
      appliedButtons.value[index] = false;
    }
  } else {
    const confirmed = window.confirm('신청하시겠습니까?');
    if (confirmed) {
      appliedButtons.value[index] = true;
    }
  }
}
// 전체 데이터
const allResults = ref([]);

// 현재 표시되는 결과
const displayedResults = ref([])
const pageSize = 5
let currentPage = 0;

// 초기 데이터 로드
onMounted(async () => {
  try {
      const res = await fetch('http://localhost:8080/matching_filter')
      const result = await res.json()
      if (Array.isArray(result.matching_list)) {
        allResults.value = result.matchingList
      } else {
        throw new Error('Invalid server response format')
      }
    } catch (err) {
      allResults.value = matchingList
    }
    console.log("매칭", allResults)
  
  // ✅ 반드시 done('ok') 호출
  loadMore({
    done: () => {}
  });
})



async function api() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = currentPage * pageSize;
      console.log('start', start);
      if(start >= allResults.value.length) {
        resolve('empty'); // 'empty' 상태 반환
        return;
      }

      const end = start + pageSize;
      const newItems = allResults.value.slice(start, end);

      displayedResults.value.push(...newItems);
      currentPage++;
      resolve('ok'); // 정상적으로 데이터 로드가 완료된 후 'ok' 상태 반환
    }, 300);
  });
}

// 추가 데이터 로드 함수
async function loadMore({ done }) {
  console.log("isInit", isInit.value);
  if (!isInit.value) {
    // 최초 진입 시 자동 호출된 loadMore는 무시
    isInit.value = true
    console.log("초기 호출")
    done('ok');
    return
  }
  const result = await api();
  if (result === 'empty') {
    done('empty');  // 더 이상 데이터가 없으면 done() 호출
  } else {
    done('ok');  // 데이터가 로드되었으면 'ok' 호출
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
  width: 120px;
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

.applied-button {
  background: #9E9E9E;
  cursor: default;
}

.applied-button:hover {
  background: #9E9E9E;
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