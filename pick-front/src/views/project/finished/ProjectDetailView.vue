<template>
  <div class="project-detail-page" v-if="projectData">
    <!-- 목록 보기 버튼 -->
    <v-btn
      :to="'/project-list'"
      prepend-icon="mdi-view-list"
      variant="text"
      size="small"
      color="#C6C6C6"
      style="padding: 0"
    >
      전체 목록 보기
    </v-btn>

    <main class="main-content">
      <!-- 프로젝트 소개 -->
      <section class="project-intro">
        <div class="left-text">
          <div class="project-name">{{ projectData.name }}</div>
          <p class="project-introduction">{{ projectData.introduction }}</p>
          <p class="date">{{ projectData.start_date }} ~ {{ projectData.end_date }}</p>
          <div class="tag-list">
            <CategoryChips 
              :mainCategory="projectData.main_category" 
              :subCategory="projectData.sub_category"
            />
          </div>
          <div class="link-button">
            <v-btn to="/" target="_blank" rel="noopener" append-icon="mdi-web" variant="tonal" size="small">
              사이트 바로가기
            </v-btn>
            <v-btn :href="projectData.repo_url" target="_blank" rel="noopener" append-icon="mdi-github" variant="tonal" size="small">
              깃허브 레포 바로가기
            </v-btn>
          </div>
        </div>
        <div class="right-image">
          <ThumbNailMockup :thumbnailUrl="thumbnailUrl" />
        </div>
      </section>

      <v-divider class="my-4" style="border-color: #333;" />

      <!-- 프로젝트 내용 -->
      <section class="project-content">
        <!-- 설명 -->
        <div>
          <div class="subtitle">프로젝트 설명</div>
          <div v-html="marked(projectData.content)" class="markdown-content"></div>
        </div>

        <!-- 팀원 소개 -->
        <div>
          <div class="subtitle">팀원 소개</div>
          <div class="team-list">
            <div class="member" v-for="(member, index) in participants" :key="index">
              <v-avatar size="60">
                <v-img
                  :src="member.profileImg"
                  :alt="member.name"
                  class="avatar-img"
                />
              </v-avatar>
              <span class="member-name">{{ member.nickname || member.name }}</span>
            </div>
          </div>
        </div>

        <!-- 후기 -->
        <div>
          <div class="subtitle">프로젝트 후기</div>
          <v-slide-group class="review-carousel" show-arrows>
            <v-slide-group-item
              v-for="review in projectReviewData"
              :key="review.id"
            >
              <v-card class="review-card" elevation="2">
                <v-card-text>
                  <strong>{{ review.reviewerId }}</strong>
                  <p style="margin-top: 10px;">{{ review.content }}</p>
                </v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </div>
      </section>
    </main>
  </div>

  <!-- 로딩 -->
  <div v-else class="text-center my-12">
    <v-progress-circular indeterminate color="primary" size="64" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

import CategoryChips from '@/components/project/CategoryChip.vue'
import ThumbNailMockup from '@/components/project/ThumbNailMockup.vue'
import defaultImage from '@/assets/member/default-image.png'

import projectDummy from '@/json/project_entry.json'
import reviewDummy from '@/json/project_review.json'
import participantDummy from '@/json/participants.json'

// 현재 라우트 ID
const route = useRoute()
const id = route.params.id

// 데이터 상태
const projectData = ref(null)
const projectReviewData = ref([])

// 이미지 매핑 (썸네일용)
const projectImages = import.meta.glob('@/assets/member/*.png', { eager: true })
const imageMap = Object.fromEntries(
  Object.entries(projectImages).map(([path, mod]) => [
    `/assets/member/${path.split('/').pop()}`,
    mod.default,
  ])
)

const profileImageModules = import.meta.glob('@/assets/img/member_profile/*.png', { eager: true })
const profileImageMap = Object.fromEntries(
  Object.entries(profileImageModules).map(([path, mod]) => [
    path.split('/').pop(), // 'sy.png' 같은 파일명
    mod.default,
  ])
)
const participants = ref(participantDummy.map(member => ({
  ...member,
  profileImg: profileImageMap[member.profileImage] || defaultImage
})))


// 썸네일 이미지 가져오기
const thumbnailUrl = computed(() =>
  imageMap[projectData.value?.thumbnail_image] || defaultImage
)

// 이름 기준으로 팀원 정보 매칭
const matchedParticipants = computed(() => {
  if (!projectData.value) return []
  return projectData.value.participants.map(name =>
    participants.value.find(p => p.name === name)
  ).filter(Boolean)
})

// 병렬 fetch
onMounted(async () => {
  try {
    const [projectRes, reviewRes] = await Promise.all([
      fetch(`http://localhost:8081/${id}`),
      fetch('http://localhost:8082/project_review_list')
    ])

    const projectResult = await projectRes.json()
    const reviewResult = await reviewRes.json()

    projectData.value = projectResult
    projectReviewData.value = reviewResult ?? []
  } catch (err) {
    console.error('🚨 fetch 실패', err)
    projectData.value = projectDummy[id - 1]
    projectReviewData.value = reviewDummy.project_review_list
  }
})
</script>


<style scoped>
.project-detail-page{
    background-color: #F2F2F2;
    width: 55%;
    margin: 0 auto ;
    padding: 1% 5% 5% 5% ;
    margin-bottom: 120px;
}

.project-intro {
  display: grid;
  grid-template-columns: 1fr 3fr; /* 2등분 */
  gap: 40px;
  align-items: center;
  padding: 40px 0;
  
}
.project-content {
  display: flex;
  flex-direction: column; 
  gap: 40px; 
}
.subtitle{
    color:#4C4C4C;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
}
.content{
    color:#4C4C4C;
    font-size: 13px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

/* 왼쪽 텍스트 스타일 */
.left-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start; 
}
.project-name{
    font-size: 30px;
    font-weight: bold;
}
.project-introduction {
    font-size: 14px;
    color: #4C4C4C;
}
.date{
    color: #B3B3B3;
    font-size: 14px;
    font-weight: normal;
}

/* 오른쪽 이미지 스타일 */
.right-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* background-color: #eaeaea; */
  border-radius: 12px;
  padding: 16px;
  min-height: 200px;
}

.right-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
.link-button {
  display:flex;
  flex-direction: row;
  gap: 8px;
}

/* 태그 스타일 예시 */
.tag-list {
  display: flex;
  justify-content: flex-start;
  /* flex-wrap: wrap; */
  gap: 8px;
}

/* 마크다운 */
.markdown-content p {
  margin-bottom: 1em;
  line-height: 1.7;
}

.markdown-content ul {
  padding-left: 1.5rem;
  margin-bottom: 1em;
}

.markdown-content li {
  list-style-type: disc;
  margin-bottom: 0.4em;
}

.markdown-content strong {
  font-weight: bold;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3 {
  margin: 1em 0 0.5em;
  font-weight: bold;
}

.markdown-content {
  color: #4C4C4C;
  font-size: 14px;
}

/* 팀원 소개 */
.team-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.member {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  gap:10px;
}

.member-name {
  margin-top: 3px;
  font-size: 13px;
  color: #4C4C4C;
  text-align: center;
  word-break: keep-all;
}
/* 후기 */
.review-wrapper {
  overflow-x: auto;
  padding-bottom: 12px;
}

.review-list {
  display: inline-flex;
  gap: 16px;
  padding: 4px;
  min-width: max-content;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.review-list::-webkit-scrollbar {
  height: 8px;
}

.review-list::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 4px;
}
.review-carousel {
  padding: 8px 0;
}

.review-card {
  width: 280px;
  margin: 0 8px;
  border-radius: 12px;
  background-color: #fff;
  cursor: pointer;
}
::v-deep(.v-slide-group__content) {
  padding: 20px 16px;
}
::v-deep(.v-slide-group__next),
::v-deep(.v-slide-group__prev) {
  min-width: 30px !important;
  flex: 0 1 auto;
}

</style>


