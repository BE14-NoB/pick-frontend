<template>
  <div class="issue-page">
    <!-- 설명 -->
    <p class="desc">
      PICK 에서 총 <strong>{{ issueData.length }}</strong>개의 이슈를 생성하셨어요! ✨
    </p>

    <!-- 상단 버튼 -->
    <div class="issue-header">
      <IssueCreateButton @click="onClickCreateIssue" />
    </div>

    <!-- 이슈 리스트 -->
    <div class="list-card">
      <List
        :headers="['이슈번호', '제목', '라벨', '타입', '마일스톤', '생성자']"
        :items="paginatedItems"
      >
        <!-- 라벨 칩 -->
        <template #label="{ value }">
          <v-chip :color="getLabelColor(value)" variant="tonal" size="small">
            {{ value }}
          </v-chip>
        </template>

        <!-- 타입 칩 -->
        <template #type="{ value }">
          <v-chip color="yellow" variant="tonal" size="small">
            {{ value }}
          </v-chip>
        </template>

        <!-- 생성자 이미지 -->
        <template #creator="{ value }">
          <img :src="value" class="profile-img" alt="creator" />
        </template>
      </List>
    </div>

    <!-- 페이지네이션 -->
    <Pagination
      class="pagination"
      v-model:currentPage="currentPage"
      :totalPages="totalPages"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import List from '@/components/List.vue'
import Pagination from '@/components/Pagination.vue'
import IssueCreateButton from '@/components/project/IssueCreateButton.vue'
import issueMaker from '@/assets/issueMaker.png'

const currentPage = ref(1)
const itemsPerPage = 5

const issueData = [
  {
    number: '#285',
    title: '[project] 프로젝트 회의록 템플릿 기능 구현',
    label: '✨ enhancement',
    type: 'Feature',
    milestone: '2차 MyBatis 구현',
    creator: issueMaker
  },
  {
    number: '#10',
    title: '[프로젝트] 도메인 관련 쿼리 기능 구현',
    label: '🛠️ refactoring',
    type: 'Task',
    milestone: '2차 MyBatis 구현',
    creator: issueMaker
  },
  {
    number: '#1',
    title: '[프로젝트] 도메인 관련 쿼리 기능 구현',
    label: '🛠️ refactoring',
    type: 'Task',
    milestone: '',
    creator: issueMaker
  },
  {
    number: '#17',
    title: '[프로젝트] 도메인 관련 쿼리 기능 구현',
    label: '✨ enhancement',
    type: 'No Type',
    milestone: '',
    creator: issueMaker
  },
  {
    number: '#11',
    title: '[프로젝트] 도메인 관련 쿼리 기능 구현',
    label: '✨ enhancement',
    type: 'No Type',
    milestone: '',
    creator: issueMaker
  }
]

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return issueData.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(issueData.length / itemsPerPage))

const getLabelColor = (label) => {
  if (label.includes('enhancement')) return 'success'
  if (label.includes('refactoring')) return 'blue-grey'
  if (label.includes('bug')) return 'error'
  if (label.includes('question')) return 'purple'
  if (label.includes('docs')) return 'info'
  return 'grey'
}

const onClickCreateIssue = () => {
  console.log('이슈 생성 클릭됨!')
}
</script>

<style scoped>
.issue-page {
  padding: 0;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.issue-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.list-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
}

.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
