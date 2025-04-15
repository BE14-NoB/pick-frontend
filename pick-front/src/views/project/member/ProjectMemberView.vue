<template>
    <div class="team-page">
        <div class="member-header">
            <span style="color:#4c4c4c">
                총 {{ members.length }} 명의 팀원💪이 프로젝트에 참여하고 있어요!
            </span>
            <v-btn class="review-btn"  color="primary" variant="tonal" prepend-icon="mdi-pencil"
                @click="showReviewModal = true"
                :disabled="reviewButtonDisabled"
                >
                팀원 후기 작성하기
            </v-btn>
        </div>
 
      <v-container class="member-box">
        <v-row dense  v-if="loading != true">
          <v-col
            v-for="(member, index) in pagedMembers"
            :key="index"
            cols="12"
            sm="6"
          >
            <v-card v-if="member" class="member-card" flat>
              <div class="member-info">
                <v-avatar size="60" class="mr-4">
                  <img :src="member.profileImage || profile" class="avatar-img" />

                  <!-- <img :src="member.profileImage" alt="avatar" /> -->
                </v-avatar>
                <div>
                  <div class="name-row">
                    <span class="name">{{ member.nickname }}</span>
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

        <!-- 로딩 -->
        <v-row v-else justify="center" class="mt-10 mb-10">
          <v-progress-circular indeterminate color="primary" size="48" />
        </v-row>
  
        <!-- 페이지네이션 -->
        <div class="pagination" v-if="totalPages > 1 && !loading">
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
  import { ref, computed , onMounted} from 'vue'
  import { useAuthStore } from '@/stores/auth';
  import profile from '@/assets/img/avatar.png'
  import Pagination from '@/components/common/Pagination.vue' 
  import MemberReviewModal from '@/components/project/member/MemberReviewModal.vue'
  import participantDummy from '@/json/participants.json'
  import memberReviews from '@/json/send_member_review.json'; 

  const members = ref([])
  const myReviews = ref([]);

  const authStore = useAuthStore(); 
  console.log(authStore);

  const loading = ref(true);

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
  });

  const imageModules = import.meta.glob('@/assets/img/member_profile/*.png', { eager: true });
  const imageMap = Object.fromEntries(
    Object.entries(imageModules).map(([path, module]) => {
      const filename = path.split('/').pop(); // avatar-1.png
      return [filename, module.default];
    })
  );

  function handleSubmitReview({ to, content }) {
    console.log('✅ 후기 제출:', to, content)
    // 여기서 실제 저장 처리 or API 호출
   }

  onMounted(async () => {
    loading.value = true;
    
    try {
      // 병렬로 participants + reviews 불러오기
      const [participantsRes, reviewsRes] = await Promise.all([
        fetch('http://localhost:8086/participants'),
        fetch('http://localhost:8087/member_reviews')
      ]);

      const [participantsData, reviewsData] = await Promise.all([
        participantsRes.json(),
        reviewsRes.json()
      ]);

      // 현재 유저가 작성한 리뷰
      const myReviewList = reviewsData.filter(r => r.reviewerName === currentUser);

      // participants 구성 + reviewDone 계산
      members.value = participantsData.map(member => ({
        ...member,
        profileImage: imageMap[member.profileImage?.split('/').pop()] || profile,
        reviewDone:
          member.nickname !== currentUser &&
          myReviewList.some(r => r.revieweeName === member.nickname)
      }));

      myReviews.value = myReviewList;
    } catch (err) {
      console.error('❌ 병렬 데이터 불러오기 실패:', err);

      // fallback (더미 participants 사용)
      members.value = participantDummy.map(member => ({
        ...member,
        profileImage: imageMap[member.profileImage?.split('/').pop()] || profile,
        reviewDone: false
      }));

      myReviews.value = memberReviews;
    }

    loading.value = false;
  });
  
  // 작성하기 버튼 - 상태 
  const reviewButtonDisabled = computed(() => {
    const currentUser = authStore.user?.nickname;
    const reviewTargets = members.value.filter(m => m.nickname !== currentUser);
    const reviewedNicknames = myReviews.value.map(r => r.revieweeName);

    // 작성하지 않은 사람이 있다면 false
    return reviewTargets.every(m => reviewedNicknames.includes(m.nickname));
  });


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

  .avatar-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

  </style>
  