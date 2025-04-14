<template>
    <div class="commit-list-wrapper">
        <div class="status-text">
            {{ statusMessage }}
        </div>
        <hr class="status-hr">

        <div v-if="isLoading">커밋 목록 로딩 중...</div>
        <table v-else class="list-table">
            <tbody>
                <tr v-for="(item, index) in paginatedItems" :key="index">
                    <!-- 메시지 -->
                    <td class="message-cell">{{ item.message }}</td>

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
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios'

const avatarUrl = new URL('@/assets/img/avatar.png', import.meta.url).href
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

// 리스트 위의 문구
const props = defineProps({
    baseBranch: {
        type: String,
        default: 'main'
    },
    commitDiff: {
        type: Number,
        default: 0
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
const isLoading = ref(true)

const statusMessage = computed(() => {
    if (props.commitDiff === 0) return `${props.baseBranch} 브랜치와 동일함`
    if (props.commitDiff > 0) return `${props.baseBranch} 브랜치보다 ${props.commitDiff} 커밋 앞서 있음`
    return `${props.baseBranch} 브랜치보다 ${Math.abs(props.commitDiff)} 커밋 뒤쳐져 있음`
})

// API로 커밋 불러오기
const fetchCommits = async () => {
    isLoading.value = true
    try {
        const response = await axios.get('/api/github/branchCommits', {
            params: {
                repo: props.selectedRepo,
                owner: props.selectedOwner,
                branchName: props.selectedBranch
            }
        })

        // response 데이터에서 필요한 부분만 추출 (예: message, date, author 등)
        allCommits.value = response.data.map(commit => ({
            message: commit.commit.message,
            date: commit.commit.author.date.split('T')[0],
            author: {
                name: commit.commit.author.name,
                avatarUrl: commit.author?.avatar_url || avatarUrl
            }
        }))
    } catch (error) {
        console.error('커밋 불러오기 실패:', error)
        allCommits.value = dummyCommitItems.value
    } finally {
        isLoading.value = false
    }
}

// 브랜치 변경 시마다 새로 fetch
watch(() => props.selectedBranch, fetchCommits, { immediate: true })


// 페이지네이션 로직
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

/* 메시지 */
.message-cell {
    text-align: left;
    width: 70%;
}

/* 날짜 */
.date-cell {
    text-align: right;
    width: 15%;
    color: #444;
}

/* 작성자 이름 + 아바타 (수평정렬 + 오른쪽 정렬) */
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

/* 페이지네이션 */
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
