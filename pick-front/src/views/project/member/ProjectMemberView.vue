<template>
    <div class="team-page">
        <div class="member-header">
            <span style="color:#4c4c4c">
                총 {{ members.length }} 명의 팀원💪이 프로젝트에 참여하고 있어요!
            </span>
            <v-btn class="review-btn"  color="primary" variant="tonal" prepend-icon="mdi-pencil"
                @click="showReviewModal = true">
                팀원 후기 작성하기
            </v-btn>
        </div>
 
      <v-container class="member-box">
        <v-row dense>
          <v-col
            v-for="(member, index) in pagedMembers"
            :key="index"
            cols="12"
            sm="6"
          >
            <v-card v-if="member" class="member-card" flat>
              <div class="member-info">
                <v-avatar size="60" class="mr-4">
                  <img :src="profile" alt="avatar" />
                </v-avatar>
                <div>
                  <div class="name-row">
                    <span class="name">{{ member.name }}</span>
                    <span v-if="member.isMe" class="badge">⭐ (ME)</span>
                  </div>
                  <div v-if="member.reviewDone" class="review-complete">팀원후기 작성 완료</div>
                  <div class="intro">{{ member.introduction }}</div>
                </div>
              </div>
            </v-card>
            <!-- 빈 칸 -->
            <div v-else style="height: 100px;"></div>
          </v-col>
        </v-row>
  
        <!-- 페이지네이션 -->
        <div class="pagination" v-if="totalPages > 1">
            <Pagination
            v-if="totalPages > 1"
            :currentPage="currentPage"
            :totalPages="totalPages"
            @update:currentPage="currentPage = $event"
            />
        </div>
      </v-container>
    </div>

    <!-- 후기 작성 모달 -->
    <MemberReviewModal
        v-model="showReviewModal"
        :members="members"
        @submit="handleSubmitReview"
    />

  </template>
  
<script setup>
  import { ref, computed } from 'vue'
  import { useAuthStore } from '@/stores/auth';
  import profile from '@/assets/img/avatar.png'
  import Pagination from '@/components/common/Pagination.vue' 
  import MemberReviewModal from '@/components/project/member/MemberReviewModal.vue'


  const members = ref([
    { name: '꼼꼼보', role: '백엔드 개발자', isMe: true, reviewDone: false, avatar: 'https://cdn.jsdelivr.net/gh/monsori/ui/avatar1.png' , introduction : "안녕하세요, 문제 해결을 즐기는 백엔드 개발자 고성연입니다. \n함께 성장하는 걸 좋아해요! "},
      
    { name:  '민선', role: '백엔드 개발자', isMe: false, reviewDone: true, avatar: 'https://cdn.jsdelivr.net/gh/monsori/ui/avatar3.png' , introduction: "사용자에게 진심인 개발자, 정민선입니다.\n 좋은 서비스는 디테일에서 시작된다고 믿어요."},
    { name: '시냥주', role: '백엔드 개발자', isMe: false, reviewDone: false, avatar: 'https://cdn.jsdelivr.net/gh/monsori/ui/avatar4.png' , introduction :  "호기심이 많고 도전하는 걸 좋아하는 장시원입니다.\n 새로운 기술에 빠르게 적응하는 게 장점이에요!"},
    { name: '혬혬혬혬혬', role: '백엔드 개발자', isMe: false, reviewDone: false, avatar: 'https://cdn.jsdelivr.net/gh/monsori/ui/avatar5.png', introduction : "팀워크를 소중히 여기는 소프트한 개발자, 혜민이에요 😊" },
    { name: '석키키키키', role: '백엔드 개발자', isMe: false, reviewDone: false, avatar: 'https://cdn.jsdelivr.net/gh/monsori/ui/avatar6.png', introduction :  "꾸준함이 저의 무기입니다.\n 성실하게 한 걸음씩 나아가는 개발자 김석희입니다." },
    { name: 'BlueSky', role: '프론트엔드 개발자', isMe: false, reviewDone: true, avatar: 'https://cdn.jsdelivr.net/gh/monsori/ui/avatar1.png' , introduction: "푸른 하늘처럼 넓은 시야를 가진 개발자, 이청민입니다.\n 함께하는 모든 순간을 즐깁니다!"},
  ])
  
  const authStore = useAuthStore(); 
  console.log(authStore);


//   const currentPage = ref(0)s
  const currentPage = ref(1)
  const pageSize = 6

  const showReviewModal = ref(false)    // 팀원 후기 생성하기 모달 여부
  
  const totalPages = computed(() => Math.ceil(members.value.length / pageSize))
  
  const pagedMembers = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const pageData = members.value.slice(start, start + pageSize)

    while (pageData.length < pageSize) {
        pageData.push(null)
    }

    return pageData
    })
    
  function handleSubmitReview({ to, content }) {
    console.log('✅ 후기 제출:', to, content)
    // 여기서 실제 저장 처리 or API 호출
    }
</script>
  
  <style scoped>
  .team-page {
    display:flex;
    flex-direction: column;
    /* padding: 10px; */

  }
  .member-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .member-box{
    padding: 0;
    margin-top: 20px;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
  }
  
  .subtitle {
    margin-bottom: 1rem;
    color: #444;
  }
  
  .review-btn {
    float: right;
    font-weight: 600;
    /* margin-bottom: 1rem; */
  }
  
  .member-card {
    border: 1px solid #e0e0e0;
    padding: 1rem;
    height: 100%;
    border-radius: 12px;
  }
  
  .member-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .name-row {
    display: flex;
    align-items: center;
  }
  
  .name {
    font-weight: bold;
    margin-right: 8px;
  }
  
  .badge {
    color: #f39c12;
  }
  
  .review-complete {
    font-size: 0.85rem;
    color: #3498db;
  }
  
  .intro {
    margin-top: 4px;
    font-size: 14px;
    color: #4c4c4c;
    /* white-space: pre-line;  */
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  </style>
  