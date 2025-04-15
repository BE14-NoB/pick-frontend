<template>
    <div class="commit-list-wrapper">
        <div class="status-text">
            {{ statusMessage }}
        </div>
        <hr class="status-hr">

        <table class="list-table">
            <tbody>
                <tr v-for="(item, index) in paginatedItems" :key="index">

                    <!-- 메시지 -->
                    <td class="message-cell">
                        <!-- 60글자 초과라면 자르기 -->
                        {{ item.message.length > 60 ? item.message.slice(0, 60) + '...' : item.message }}
                    </td>

                    <!-- 날짜 -->
                    <td class="date-cell">{{ item.date }}</td>

                    <!-- 작성자 아바타 + 이름 -->
                    <td class="author-cell">
                        <img :src="item.author.avatarUrl" class="avatar" />
                        <span class="author-name">{{ item.author.name }}</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 페이지네이션 -->
        <Pagination :current-page="currentPage" :total-pages="totalPages"
            @update:currentPage="(page) => (currentPage = page)" />
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import axios from 'axios'

const avatarUrl = new URL('@/assets/img/avatar.png', import.meta.url).href

// 더미 커밋 데이터 (API 실패 시 사용)
const dummyCommitItems = [
    {
        message: 'Feature : 로그인 로직 구현',
        date: '2025-04-07',
        author: {
            name: '꼼곰보',
            avatarUrl: avatarUrl
        }
    },
    {
        message: 'Feature : 로그아웃 로직 구현',
        date: '2025-04-05',
        author: {
            name: '꼼곰보',
            avatarUrl: avatarUrl
        }
    },
    {
        message: 'Feature : 회원가입 로직 구현',
        date: '2025-04-03',
        author: {
            name: '꼼곰보',
            avatarUrl: avatarUrl
        }
    },
    {
        message: 'Design : 로그인 페이지 구현',
        date: '2025-04-01',
        author: {
            name: '꼼곰보',
            avatarUrl: avatarUrl
        }
    }
]

const props = defineProps({
    baseBranch: {
        type: String,
        default: 'main'
    },
    selectedRepo: {
        type: String,
        required: true
    },
    selectedOwner: {
        type: String,
        required: true
    },
    selectedBranch: {
        type: String,
        required: true
    }
})

const allCommits = ref([])
const commitDiff = ref(0)

const statusMessage = computed(() => {
    if (commitDiff.value === 0) return `${props.baseBranch} 브랜치와 동일함`
    if (commitDiff.value > 0) return `${props.baseBranch} 브랜치보다 ${commitDiff.value} 커밋 이상 앞서 있음`
    return `${props.baseBranch} 브랜치보다 ${Math.abs(commitDiff.value)} 커밋 뒤쳐져 있음`
})

// API로 커밋 불러오기
const fetchCommits = async () => {
    try {
        const response = await axios.get('http://localhost:8000/pick-service/api/github/branchCommits', {
            params: {
                repo: props.selectedRepo,
                owner: props.selectedOwner,
                branchName: props.selectedBranch
            }
        })

        allCommits.value = response.data.map(commit => ({
            message: commit.message,
            date: commit.date?.split('T')[0] ?? '',
            author: {
                name: commit.author || 'unknown',
                avatarUrl: commit.avatarUrl || avatarUrl
            }
        }))

        // 커밋 차이 계산
        commitDiff.value = allCommits.value.length

    } catch (error) {
        console.error('커밋 불러오기 실패:', error)
        allCommits.value = dummyCommitItems
        commitDiff.value = dummyCommitItems.length
    }
}

// 브랜치 변경 시마다 새로 fetch
watch(() => props.selectedBranch, fetchCommits, { immediate: true })

// 페이지네이션
import Pagination from '@/components/common/Pagination.vue'
const itemsPerPage = 4
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(allCommits.value.length / itemsPerPage))
const paginatedItems = computed(() =>
    allCommits.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
)

</script>

<style scoped>
.commit-list-wrapper {
    width: 100%;
    font-size: 14px;
}

.status-text {
    margin-bottom: 50px;
    color: #939393;
}

.status-hr {
    margin: 3px;
}

.list-table {
    width: 100%;
    border-collapse: collapse;
}

.list-table td {
    padding: 14px 8px;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
}

.message-cell {
    text-align: left;
    width: 70%;
}

.date-cell {
    text-align: right;
    width: 15%;
    color: #444;
}

.author-cell {
    text-align: right;
    width: 13%;
    white-space: nowrap;
}

.author-name {
    color: #A2A2C2;
    margin-right: 10px;
    font-weight: 500;
}

.avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
}

.page,
.arrow {
    margin: 0 6px;
    cursor: pointer;
}

.page.active {
    font-weight: bold;
    text-decoration: underline;
}
</style>
