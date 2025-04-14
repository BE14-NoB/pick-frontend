<template>
  <div class="team-page">
    <div class="member-header">
      <span style="color:#4c4c4c">
        총 {{ members.length }} 명의 팀원이 프로젝트 후기를 작성해주셨어요! 🙌
      </span>
      <v-btn
        class="review-btn"
        color="primary"
        variant="tonal"
        prepend-icon="mdi-pencil"
        @click="showReviewModal = true"
      >
        프로젝트 후기 작성하기
      </v-btn>
    </div>

    <v-container class="member-box">
      <v-row dense v-if="loading != true">
        <v-col
          v-for="(member, index) in pagedMembers"
          :key="index"
          cols="12"
          sm="6"
        >
          <v-card v-if="member" class="member-card" flat>
            <div class="member-info">
              <v-avatar size="60" class="mr-4">
                <img :src="imageMap[member.profileImage] || profile" alt="avatar" class="avatar-img" />
              </v-avatar>
              <div>
                <div class="name-row">
                  <span class="name">{{ member.nickname }}</span>
                  <span v-if="member.isMe" class="badge">⭐ (ME)</span>
                </div>
                <div v-if="member.reviewDone" class="review-complete">
                  {{ member.reviewContent }}
                </div>
                <div v-else class="review-pending">
                  아직 후기를 작성하지 않았습니다.
                </div>
              </div>
            </div>
          </v-card>
          <div v-else style="height: 100px;"></div>
        </v-col>
      </v-row>
      <!-- 로딩 -->
      <v-row v-else justify="center" class="mt-10 mb-10">
        <v-progress-circular indeterminate color="primary" size="48" />
      </v-row>

      <div class="pagination" v-if="totalPages > 1 && !loading">
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @update:currentPage="currentPage = $event"
        />
      </div>
    </v-container>

    <ProjectReviewModal
      v-model="showReviewModal"
      :members="members"
      @submit="handleSubmitReview"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import profile from '@/assets/img/avatar.png'
import Pagination from '@/components/common/Pagination.vue'
import ProjectReviewModal from '@/components/project/review/ProjectReviewModal.vue'

import participantDummy from '@/json/participants.json'
import projectReviewDummy from '@/json/project_review.json'

const imageModules = import.meta.glob('@/assets/img/member_profile/*.png', { eager: true });
const imageMap = Object.fromEntries(
  Object.entries(imageModules).map(([path, module]) => {
    const filename = path.split('/').pop();
    return [filename, module.default];
  })
);

// 상태
const loading = ref(true);
const members = ref([]);
const currentPage = ref(1);
const pageSize = 6;
const showReviewModal = ref(false);

const totalPages = computed(() =>
  Math.ceil(members.value.length / pageSize)
);

const pagedMembers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const pageData = members.value.slice(start, start + pageSize);
  while (pageData.length < pageSize) {
    pageData.push(null);
  }
  return pageData;
});

function handleSubmitReview({ to, content }) {
  console.log('✅ 후기 제출:', to, content);
  // 실제 API 연동 or 저장 처리
}

onMounted(async () => {
  loading.value = true;
  let memberData, reviewData;

  try {
    const [membersRes, reviewsRes] = await Promise.all([
      fetch('http://localhost:8084/participants'),
      fetch('http://localhost:8084/project-reviews')
    ]);
    memberData = await membersRes.json();
    reviewData = await reviewsRes.json();
  } catch (err) {
    console.warn('🚨 fetch 실패 - 더미 JSON 사용:', err);
    memberData = participantDummy;
    reviewData = projectReviewDummy;
  }

  // 후기 정보 매핑
  members.value = memberData.map(member => {
    const review = reviewData.project_review_list.find(r => r.reviewerId === member.nickname);
    return {
      ...member,
      reviewDone: !!review,
      reviewContent: review?.content || null
    };
  });
  loading.value = false;
});
</script>

<style scoped>
.team-page {
  display: flex;
  flex-direction: column;
}

.member-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.member-box {
  padding: 0;
  margin-top: 20px;
}

.review-btn {
  font-weight: 600;
}

.member-card {
  border: 1px solid #e0e0e0;
  padding: 1rem;
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
  margin-top: 4px;
  color: #2c3e50;
  font-size: 14px;
}

.review-pending {
  margin-top: 4px;
  color: #999;
  font-size: 14px;
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
