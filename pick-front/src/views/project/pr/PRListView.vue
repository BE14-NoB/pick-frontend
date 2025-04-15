<template>
  <div v-if="isLoading" class="loading-container">
    🔄 PR을 불러오는 중입니다...
  </div>

  <div v-else class="pr-page">
    <ProjectTabs v-model="selectedTab" :tabs="tabs">
      <!-- Open PR -->
      <template #open>
        <p class="desc">
          <!-- 전체 {{ openPRs.length }}개 파일에서 {{ addedLines }}줄 추가 / {{ deletedLines }}줄 삭제되었음 -->
        </p>
        <PRCreateButton />
        <div class="list-card">
          <List :headers="['번호', '제목', '리뷰어', '생성자', '생성일', '댓글 수']" :items="openListItems">
            <template #reviewers="{ value }">
              <v-icon start icon="mdi-account" class="mr-1" /> {{ value }}
            </template>
            <template #creatorDisplay="{ value }">
              <div class="profile-wrapper">
                <img :src="resolveAvatarUrl(value.avatarUrl)" class="profile-img" alt="creator"
                  @error="handleImageError" />
                <span>{{ value.name }}</span>
              </div>
            </template>
            <template #comments="{ value }">
              <v-icon start icon="mdi-comment-outline" class="mr-1" /> {{ value }}
            </template>
          </List>
        </div>
        <Pagination class="pagination" v-model:currentPage="openPage" :totalPages="openTotalPages" />
      </template>

      <!-- Closed PR -->
      <template #closed>
        <p class="desc">전체 {{ closedPRs.length }}개의 PR이 종료되었습니다.</p>
        <div class="list-card">
          <List :headers="['번호', '제목', '리뷰어', '생성자', '생성일', '댓글 수']" :items="closedListItems">
            <template #reviewers="{ value }">
              <v-icon start icon="mdi-account" class="mr-1" /> {{ value }}
            </template>
            <template #creatorDisplay="{ value }">
              <div class="profile-wrapper">
                <img :src="resolveAvatarUrl(value.avatarUrl)" class="profile-img" alt="creator"
                  @error="handleImageError" />
                <span>{{ value.name }}</span>
              </div>
            </template>
            <template #comments="{ value }">
              <v-icon start icon="mdi-comment-outline" class="mr-1" /> {{ value }}
            </template>
          </List>
        </div>
        <Pagination class="pagination" v-model:currentPage="closedPage" :totalPages="closedTotalPages" />
      </template>
    </ProjectTabs>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import List from '@/components/List.vue'
import Pagination from '@/components/common/Pagination.vue'
import ProjectTabs from '@/components/project/ProjectTabs.vue'
import PRCreateButton from '@/components/project/PRCreateButton.vue'
import prData from '@/json/project_prlist.json'

import axios from 'axios'

const selectedTab = ref('open')
const openPage = ref(1)
const closedPage = ref(1)
const itemsPerPage = 5
const allPRs = ref([])
const isLoading = ref(true)

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


onMounted(async () => {
  isLoading.value = true
  try {
    const response = await axios.get('http://localhost:8000/pick-service/api/github/pull-requests', {
      params: {
        owner: 'BE14-NoB',
        repo: 'Pick'
      }
    })

    allPRs.value = response.data.map(pr => ({
      number: pr.number,
      title: pr.title,
      reviewers: pr.reviewerCount,
      creatorDisplay: {
        name: pr.author,
        avatarUrl: pr.avatarUrl
      },
      date: new Date(pr.createdAt).toLocaleDateString('ko-KR'),
      comments: pr.commentCount + pr.reviewCommentCount,
      status: pr.state,
      added: pr.added || 0,
      deleted: pr.deleted || 0
    }))
  } catch (error) {
    console.error('❌ PR 불러오기 실패:', error)

    allPRs.value = prData.map(pr => ({
      ...pr,
      creatorDisplay: {
        name: pr.creator,
        avatarUrl: pr.avatarUrl
      }
    }))
  } finally {
    isLoading.value = false
  }
})


watch(selectedTab, (val) => {
  if (val === 'open') openPage.value = 1
  else closedPage.value = 1
})

const openPRs = computed(() => allPRs.value.filter(pr => pr.status === 'open'))
const closedPRs = computed(() => allPRs.value.filter(pr => pr.status === 'closed'))

const paginatedOpenPRs = computed(() => {
  const start = (openPage.value - 1) * itemsPerPage
  return openPRs.value.slice(start, start + itemsPerPage)
})
const paginatedClosedPRs = computed(() => {
  const start = (closedPage.value - 1) * itemsPerPage
  return closedPRs.value.slice(start, start + itemsPerPage)
})

const openTotalPages = computed(() => Math.ceil(openPRs.value.length / itemsPerPage))
const closedTotalPages = computed(() => Math.ceil(closedPRs.value.length / itemsPerPage))

const addedLines = computed(() => openPRs.value.reduce((acc, cur) => acc + cur.added, 0))
const deletedLines = computed(() => openPRs.value.reduce((acc, cur) => acc + cur.deleted, 0))

const openListItems = computed(() =>
  paginatedOpenPRs.value.map(pr => ({
    number: pr.number,
    title: pr.title,
    reviewers: pr.reviewers,
    creatorDisplay: pr.creatorDisplay,
    date: pr.date,
    comments: pr.comments
  }))
)

const closedListItems = computed(() =>
  paginatedClosedPRs.value.map(pr => ({
    number: pr.number,
    title: pr.title,
    reviewers: pr.reviewers,
    creatorDisplay: pr.creatorDisplay,
    date: pr.date,
    comments: pr.comments
  }))
)

const tabs = [
  { label: 'Open', value: 'open', icon: 'mdi-source-branch' },
  { label: 'Closed', value: 'closed', icon: 'mdi-check-circle-outline' }
]
</script>

<style scoped>
.pr-page {
  padding: 0;
}

.desc {
  font-size: 14px;
  color: #666;
  margin: 16px 0;
}

.list-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.profile-img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 6px;
}

.profile-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
}

.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.loading-container {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #888;
}
</style>
