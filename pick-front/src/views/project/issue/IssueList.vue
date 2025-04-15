<template>
  <div class="issue-page">

    <div v-if="isLoading" class="loading-container">
      🔄 이슈를 불러오는 중입니다...
    </div>

    <div v-else>
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
            <List :headers="['이슈번호', '제목', '라벨', '타입', '마일스톤', '생성자']" :items="paginatedOpenIssues.map(({ status, creator, avatarUrl, ...rest }) => ({
              ...rest,
              creatorDisplay: {
                name: creator.name,
                avatarUrl: creator.avatarUrl
              }
            }))">
              <!-- 라벨 색상 표시 -->
              <template #label="{ value }">
                <v-chip v-if="value" :color="getLabelColor(value)" variant="tonal" size="small">
                  {{ convertEmoji(value) }}
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
                  <img :src="resolveAvatarUrl(value.avatarUrl)" class="profile-img" alt="creator"
                    @error="handleImageError" />
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
            <List :headers="['이슈번호', '제목', '라벨', '타입', '마일스톤', '생성자']" :items="paginatedClosedIssues.map(({ status, creator, avatarUrl, ...rest }) => ({
              ...rest,
              creatorDisplay: {
                name: creator.name,
                avatarUrl: creator.avatarUrl
              }
            }))">
              <!-- 라벨 색상 표시 -->
              <template #label="{ value }">
                <v-chip v-if="value" :color="getLabelColor(value)" variant="tonal" size="small">
                  {{ convertEmoji(value) }}
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
                  <img :src="resolveAvatarUrl(value.avatarUrl)" class="profile-img" alt="creator"
                    @error="handleImageError" />
                  <span class="creator-name">{{ value.name }}</span>
                </div>
              </template>
            </List>

          </div>
          <Pagination class="pagination" v-model:currentPage="closedPage" :totalPages="closedTotalPages" />
        </template>
      </ProjectTabs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

import List from '@/components/List.vue'
import Pagination from '@/components/common/Pagination.vue'
import IssueCreateButton from '@/components/project/IssueCreateButton.vue'
import ProjectTabs from '@/components/project/ProjectTabs.vue'
import issueJson from '@/json/project_issuelist.json'

const isLoading = ref(true)

const selectedTab = ref('open')
const openPage = ref(1)
const closedPage = ref(1)
const itemsPerPage = 5

const issueData = ref([])

const defaultProfileImage = '/assets/default-avatar.png'

const resolveAvatarUrl = (avatarUrl) => {
  if (!avatarUrl) return defaultProfileImage
  return avatarUrl.startsWith('http')
    ? avatarUrl
    : `/src/assets/img/member_profile/${avatarUrl}`
}

const handleImageError = (event) => {
  event.target.src = defaultProfileImage
}

// 라벨 관련 이모지
const emojiMap = {
  ':sparkles:': '✨',
  ':bug:': '🐛',
  ':memo:': '📝',
  ':hammer:': '🔨',
  ':art:': '🎨',
  ':fire:': '🔥',
  ':rocket:': '🚀',
  ':zap:': '⚡',
  ':recycle:': '♻️',
  ':lock:': '🔒',
  ':construction:': '🚧',
  ':tada:': '🎉',
  ':warning:': '⚠️',
  ':mag:': '🔍',
  ':page_facing_up:': '📄',
}

const convertEmoji = (text) => {
  for (const key in emojiMap) {
    if (text.includes(key)) {
      return text.replaceAll(key, emojiMap[key]);
    }
  }
  return text;
}

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await axios.get('http://localhost:8000/pick-service/api/github/issues', {
      params: {
        repo: 'Pick',
        owner: 'BE14-NoB'
      }
    })

    issueData.value = response.data.map(issue => ({
      number: issue.number,
      title: issue.title,
      label: issue.labels.length > 0 ? issue.labels[0].name : '',
      type: issue.labels.some(l => l.name === 'Feature') ? 'Feature'
        : issue.labels.some(l => l.name === 'Task') ? 'Task'
          : issue.labels.some(l => l.name === 'Bug') ? 'Bug'
            : issue.labels.some(l => l.name === 'Docs') ? 'Docs'
              : 'No type',
      milestone: issue.milestone,
      status: issue.issueState,
      creator: {
        name: issue.creator,
        avatarUrl: issue.avatarUrl
      }
    }))

    console.log(response);
  } catch (error) {
    console.error('❌ 이슈 데이터 로딩 실패:', error)
    issueData.value = issueJson.map(issue => ({
      ...issue,
      creator: {
        name: issue.creator,
        avatarUrl: issue.avatarUrl
      }
    }))
  } finally {
    isLoading.value = false
  }
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

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
}
</style>