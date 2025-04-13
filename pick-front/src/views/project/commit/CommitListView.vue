<template>
  <div class="commit-page">
    <div class="dropdowns">
        <div class="dropdown-left">
            <div class="dropdown">
            <label>브랜치</label>
            <v-select v-model="selectedBranch" :items="branches" density="compact" />
            </div>
        </div>

        <div class="dropdown-right">
            <div class="dropdown">
            <label>유저</label>
            <v-select v-model="selectedAuthor" :items="authors" density="compact" />
            </div>
            <div class="dropdown">
            <label>기간</label>
            <v-select v-model="selectedPeriod" :items="periods" density="compact" />
            </div>
        </div>
    </div>

    <List
    :headers="['커밋 해시', '커밋 메시지', '작성자', '브랜치', '작성일']"
    :items="paginatedCommits"
    >
    <template #author="{ value }">
        <div class="profile-wrapper">
        <img :src="profile" class="profile-img" />
        <span>{{ value }}</span>
        </div>
    </template>
    </List>

    <Pagination
      class="pagination"
      v-model:currentPage="currentPage"
      :totalPages="totalPages"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import List from '@/components/List.vue'
import Pagination from '@/components/Pagination.vue'
import commitData from '@/json/project_commitlist.json'
import profile from '@/assets/issueMaker.png'

const commits = ref([])
const currentPage = ref(1)
const itemsPerPage = 5

const selectedBranch = ref('전체')
const selectedAuthor = ref('전체')
const selectedPeriod = ref('전체')

onMounted(() => {
  commits.value = commitData
})

const branches = computed(() => ['전체', ...new Set(commitData.map(c => c.branch))])
const authors = computed(() => ['전체', ...new Set(commitData.map(c => c.author))])
const periods = ['전체', '최근 7일', '최근 30일']

const filteredCommits = computed(() => {
  const now = new Date()
  return commits.value.filter(c => {
    const date = new Date(c.date)
    const branchMatch = selectedBranch.value === '전체' || c.branch === selectedBranch.value
    const authorMatch = selectedAuthor.value === '전체' || c.author === selectedAuthor.value
    const periodMatch =
      selectedPeriod.value === '전체' ||
      (selectedPeriod.value === '최근 7일' && now - date <= 7 * 24 * 60 * 60 * 1000) ||
      (selectedPeriod.value === '최근 30일' && now - date <= 30 * 24 * 60 * 60 * 1000)
    return branchMatch && authorMatch && periodMatch
  })
})

const paginatedCommits = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredCommits.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredCommits.value.length / itemsPerPage))
</script>

<style scoped>
.commit-page {
  padding: 0;
}

.dropdowns {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
}

.dropdown-left {
  flex: 1;
  max-width: 300px;
}

.dropdown-right {
  display: flex;
  gap: 16px;
}

.dropdown {
  display: flex;
  flex-direction: column;
  min-width: 160px;
}

label {
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
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
</style>
