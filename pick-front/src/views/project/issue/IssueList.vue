<template>
  <div class="issue-page">
    <!-- 탭 컴포넌트 -->
    <ProjectTabs v-model="selectedTab" :tabs="tabs">
      <!-- Open 탭 -->
      <template #open>
        <p class="desc">
          총 <strong>{{ openIssues.length }}</strong>개의 이슈가 열려있어요! ✨
        </p>
        <div class="issue-header">
          <IssueCreateButton @click="onClickCreateIssue" />
        </div>
        <div class="list-card">
          <List
            :headers="['이슈번호', '제목', '라벨', '타입', '마일스톤', '생성자']"
            :items="paginatedOpenIssues.map(({ status, creator, avatarUrl, ...rest }) => ({
              ...rest,
              creatorDisplay: {
                name: creator.name,
                avatarUrl: creator.avatarUrl
              }
            }))"
          >
            <!-- 라벨 색상 표시 -->
            <template #label="{ value }">
              <v-chip :color="getLabelColor(value)" variant="tonal" size="small">
                {{ value }}
              </v-chip>
            </template>

            <!-- 타입 색상 표시 -->
            <template #type="{ value }">
              <v-chip :color="getTypeColor(value)" variant="tonal" size="small">
                {{ value }}
              </v-chip>
            </template>
            
            <template #creatorDisplay="{ value }">
              <div class="creator-cell">
                <img
                  :src="`/src/assets/img/member_profile/${value.avatarUrl}`"
                  class="profile-img"
                  alt="creator"
                />
                <span class="creator-name">{{ value.name }}</span>
              </div>
            </template>
          </List>

        </div>
        <Pagination class="pagination" v-model:currentPage="openPage" :totalPages="openTotalPages" />
      </template>

      <!-- Closed 탭 -->
      <template #closed>
        <p class="desc">
          완료된 이슈는 총 <strong>{{ closedIssues.length }}</strong>개입니다.
        </p>
        <div class="list-card">
          <List
            :headers="['이슈번호', '제목', '라벨', '타입', '마일스톤', '생성자']"
            :items="paginatedOpenIssues.map(({ status, creator, avatarUrl, ...rest }) => ({
              ...rest,
              creatorDisplay: {
                name: creator.name,
                avatarUrl: creator.avatarUrl
              }
            }))"
          >
            <!-- 라벨 색상 표시 -->
            <template #label="{ value }">
              <v-chip :color="getLabelColor(value)" variant="tonal" size="small">
                {{ value }}
              </v-chip>
            </template>

            <!-- 타입 색상 표시 -->
            <template #type="{ value }">
              <v-chip :color="getTypeColor(value)" variant="tonal" size="small">
                {{ value }}
              </v-chip>
            </template>

            <template #creatorDisplay="{ value }">
              <div class="creator-cell">
                <img
                  :src="`/src/assets/img/member_profile/${value.avatarUrl}`"
                  class="profile-img"
                  alt="creator"
                />
                <span class="creator-name">{{ value.name }}</span>
              </div>
            </template>
          </List>

        </div>
        <Pagination class="pagination" v-model:currentPage="closedPage" :totalPages="closedTotalPages" />
      </template>
    </ProjectTabs>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import List from '@/components/List.vue'
import Pagination from '@/components/common/Pagination.vue'
import IssueCreateButton from '@/components/project/IssueCreateButton.vue'
import ProjectTabs from '@/components/project/ProjectTabs.vue'
import issueJson from '@/json/project_issuelist.json'

const selectedTab = ref('open')
const openPage = ref(1)
const closedPage = ref(1)
const itemsPerPage = 5

const issueData = ref([])

onMounted(() => {
  issueData.value = issueJson.map(issue => ({
    ...issue,
    creator: {
      name: issue.creator,
      avatarUrl: issue.avatarUrl
    }
  }))
})

watch(selectedTab, (newTab) => {
  if (newTab === 'open') openPage.value = 1
  if (newTab === 'closed') closedPage.value = 1
})

const openIssues = computed(() => issueData.value.filter(issue => issue.status === 'open'))
const closedIssues = computed(() => issueData.value.filter(issue => issue.status === 'closed'))

const paginatedOpenIssues = computed(() => {
  const start = (openPage.value - 1) * itemsPerPage
  return openIssues.value.slice(start, start + itemsPerPage)
})

const paginatedClosedIssues = computed(() => {
  const start = (closedPage.value - 1) * itemsPerPage
  return closedIssues.value.slice(start, start + itemsPerPage)
})

const openTotalPages = computed(() => Math.ceil(openIssues.value.length / itemsPerPage))
const closedTotalPages = computed(() => Math.ceil(closedIssues.value.length / itemsPerPage))

const getLabelColor = (label) => {
  if (label.includes('enhancement')) return 'success'
  if (label.includes('refactoring')) return 'blue-grey'
  if (label.includes('bug')) return 'error'
  if (label.includes('question')) return 'purple'
  if (label.includes('docs')) return 'info'
  return 'grey'
}

const getTypeColor = (type) => {
  if (type === 'Feature') return 'blue'
  if (type === 'Task') return 'amber'
  if (type === 'Bug') return 'red'
  if (type === 'Docs') return 'cyan'
  return 'grey'
}

const onClickCreateIssue = () => {
  console.log('이슈 생성 클릭됨!')
}

const tabs = [
  { label: 'Open', value: 'open', icon: 'mdi-folder-open-outline' },
  { label: 'Closed', value: 'closed', icon: 'mdi-check-circle-outline' }
]
</script>

<style scoped>
.issue-page {
  padding: 0;
}

.desc {
  font-size: 14px;
  color: #666;
  margin: 16px 0;
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

.creator-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

}

.profile-img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0;
}
.creator-name {
  font-size: 13px;
  color: #444;
}

.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
