<template>
    <v-card class="widget-container" flat>
      <div class="header">
        <span class="member-title">팀원</span>
  
        <!-- 페이지네이션 -->
        <div class="dot-pagination">
          <span
            v-for="(_, index) in totalPages"
            :key="index"
            :class="['dot', { active: index === currentPage }]"
            @click="currentPage = index"
          />
        </div>
      </div>
  
      <!-- 팀원 리스트 -->
      <div class="member-list">
        <div
          class="member-item"
          v-for="member in pagedMembers"
          :key="member.id"
        >
          <img :src="member.profileImg" class="profile-img" />
          <div class="info">
            <div class="name">{{ member.name }}</div>
            <div class="role">{{ member.role }}</div>
          </div>
        </div>
      </div>
    </v-card>
</template>
  
  


<script setup>
import { ref, computed } from 'vue'

const members = [
  { id: 1, name: '꿈곰보', role: '백엔드 개발자', profileImg: '/avatar.png' },
  { id: 2, name: '서키키키킥', role: '백엔드 개발자', profileImg: '/avatar.png' },
  { id: 3, name: '헴', role: '백엔드 개발자', profileImg: '/avatar.png' },
  { id: 4, name: 'BlueSky', role: '프론트엔드 개발자', profileImg: '/avatar.png' },
  { id: 5, name: '민선', role: 'PM', profileImg: '/avatar.png' },
  { id: 6, name: '시냥주', role: '디자이너',profileImg: '/avatar.png' }
]

const currentPage = ref(0)
const membersPerPage = 4
const totalPages = Math.ceil(members.length / membersPerPage)

const pagedMembers = computed(() => {
  const start = currentPage.value * membersPerPage
  return members.slice(start, start + membersPerPage)
})
</script>




<style scoped>
.widget-container {
  height: 100%;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;

}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-title {
  font-size: 20px;
  font-weight: bold;
  color: #4C4C4C;
}

.dot-pagination {
  display: flex;
  background: #eee;
  padding: 4px 10px;
  border-radius: 999px;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #bcbcbc;
}

.dot.active {
  background-color: #000;
}

.member-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
}

.profile-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}
.role{
    font-weight: lighter;
}

.info .name {
  font-weight: bold;
  font-size: 16px;
}

.info .role {
  font-size: 14px;
  color: #888;
  
}

</style>