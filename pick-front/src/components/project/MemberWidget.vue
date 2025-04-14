<template>
    <v-card class="widget-container" flat 
            >
      <div class="header">
        <span class="member-title">팀원</span>
  
        <!-- 페이지네이션 -->
        <div class="dot-pagination">
          <span
            v-for="(_, index) in totalPages"
            :key="index"
            :class="['dot', { active: index === currentPage }]"
            @click="currentPage = index"
          ></span>
        </div>
      </div>
  
      <!-- 팀원 리스트 -->
      <div class="member-list" @click="goToMemberList">
        <div
          class="member-item"
          v-for="member in pagedMembers"
          :key="member.id"
        >
          <img :src="member.profileImg" class="profile-img" />
          <div class="info">
            <div class="name">{{ member.nickname }}</div>
            <!-- <div class="role">{{ member.role }}</div> -->
          </div>
        </div>
      </div>
    </v-card>
</template>
  
  


<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import memberDummy from '@/json/participants.json'

const router = useRouter()

// ✅ 이미지 파일 자동 매핑
const imageModules = import.meta.glob('@/assets/img/member_profile/*.png', { eager: true })
const imageMap = Object.fromEntries(
  Object.entries(imageModules).map(([path, mod]) => [path.split('/').pop(), mod.default])
)

const members = ref(memberDummy.map(member => ({
  ...member,
  profileImg: imageMap[member.profileImage] || '/default.png'
})))

const currentPage = ref(0)
const membersPerPage = 4
const totalPages = Math.ceil(members.value.length / membersPerPage)

const pagedMembers = computed(() => {
  const start = currentPage.value * membersPerPage
  return members.value.slice(start, start + membersPerPage)
})

const goToMemberList = () => {
  router.push('/project/member')
}
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
  cursor: pointer;
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
  justify-content: flex-start; 
  min-height: 300px; 
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