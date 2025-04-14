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
                    <td class="message-cell">{{ item.message }}</td>

                    <!-- 날짜 -->
                    <td class="date-cell">{{ item.date }}</td>

                    <!-- 작성자 이름 + 아바타 -->
                    <td class="author-cell">
                        <span class="author-name">{{ item.author.name }}</span>
                        <img :src="item.author.avatarUrl" class="avatar" />
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
import { ref, computed } from 'vue';

const avatarUrl = new URL('@/assets/img/avatar.png', import.meta.url).href
const commitItems = [
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
    }
})

const statusMessage = computed(() => {
    if (props.commitDiff === 0) return `${props.baseBranch} 브랜치와 동일함`
    if (props.commitDiff > 0) return `${props.baseBranch} 브랜치보다 ${props.commitDiff} 커밋 앞서 있음`
    return `${props.baseBranch} 브랜치보다 ${Math.abs(props.commitDiff)} 커밋 뒤쳐져 있음`
})


// 페이지네이션 로직
import Pagination from '@/components/common/Pagination.vue'
const allCommits = commitItems
const itemsPerPage = 4
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(allCommits.length / itemsPerPage))

const paginatedItems = computed(() =>
    allCommits.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
)
</script>

<style scoped>

.commit-list-wrapper {
    width: 100%;
    font-size: 14px;
}

.status-text{
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
