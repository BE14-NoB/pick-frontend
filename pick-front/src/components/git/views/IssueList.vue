<template>
  <v-container class="issue-container" fluid>
    <v-row>
      <!-- Sidebar (좌측) -->
      <v-col cols="12" md="3" class="sidebar-col">
        <ProjectSideBar :menu-items="menuItems" />
      </v-col>

      <!-- Main content (우측) -->
      <v-col cols="12" md="9" class="main-content">
        <div class="issue-page">
          <h2 class="page-title">이슈 목록</h2>
          <p class="desc">PICK 에서 총 {{ issueData.length }}개의 이슈를 생성하셨어요! ✨</p>

          <IssueCreateButton @click="onClickCreateIssue" />
          <div class="list-card">
            <List :headers="['이슈번호', '제목', '라벨', '타입', '마일스톤', '생성자']" :items="paginatedItems">
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

          <Pagination
            class="pagination"
            v-model:currentPage="currentPage"
            :totalPages="totalPages"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import List from '@/components/List.vue'
import Pagination from '@/components/Pagination.vue'
import ProjectSideBar from '@/components/project/ProjectSideBar.vue'
import issueMaker from '@/assets/issueMaker.png'
import IssueCreateButton from '@/components/git/components/IssueCreateButton.vue'

const currentPage = ref(1)
const itemsPerPage = 5

// ✅ 사이드바에 전달할 메뉴 리스트
const menuItems = [
  { label: '대시보드', to: '/project/dashboard', type: 'menu' },
  { label: '프로젝트 정보', to: '/project/info', type: 'menu' },
  { label: '회의록', to: '/project/meetings', type: 'menu' },
  { label: '팀원', to: '/project/members', type: 'menu' },
  { label: '프로젝트 후기', to: '/project/review', type: 'menu' },
  { label: 'COMMIT', to: '/project/commit', type: 'menu' },
  { label: 'ISSUE', to: '/project/issue', type: 'menu' },
  { label: 'PR', to: '/project/pr', type: 'menu' }
]

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
.issue-container {
  padding: 40px 20px;
  max-width: 1300px;
  margin: 0 auto;
}

.sidebar-col {
  padding-right: 24px;
}

.main-content {
  padding-left: 24px;
}

.issue-page {
  padding: 16px 0;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.list-card {
  background-color: #fff;
  padding: 32px;
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

.issue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.desc {
  font-size: 14px;
  color: #666;
}
</style>
