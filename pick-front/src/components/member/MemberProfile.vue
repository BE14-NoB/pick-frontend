<template>
  <div class="member-profile-container">
    <!-- 프로필 헤더 -->
    <v-row class="profile-header">
      <v-col cols="12" md="3" class="avatar-col">
        <v-avatar size="150" v-if="userData.profileImage || defaultProfileImage">
          <img
            :src="userData.profileImage || defaultProfileImage"
            alt="Profile"
            @error="console.error('Profile image failed:', $event)"
          />
        </v-avatar>
        <v-avatar size="150" v-else color="grey">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </v-col>

      <v-col cols="12" md="9" class="info-col">
        <h1>{{ userData.nickname || '꼼곰보' }}</h1>
        <div class="info-item">
          <span class="info-label">레벨</span>
          <div class="info-value">{{ userData.level || 31 }}</div>
          <v-progress-linear
            color="blue-lighten-3"
            :model-value="userData.levelProgress || 20"
            height="10"
            rounded
          ></v-progress-linear>
        </div>
        <div class="info-item">
          <span class="info-label">평점</span>
          <div class="info-value">{{ userData.rating || 3.5 }}</div>
          <v-progress-linear
            color="blue-lighten-3"
            :model-value="(userData.rating || 3.5) * 20"
            height="10"
            rounded
          ></v-progress-linear>
        </div>
        <v-row class="stats-section">
          <v-col cols="4" class="stat-item">
            <span class="stat-label">완료 프로젝트</span>
            <div class="stat-value">{{ userData.completedProjects || 30 }}개</div>
          </v-col>
          <v-col cols="4" class="stat-item">
            <span class="stat-label">함께한 팀원</span>
            <div class="stat-value">{{ userData.teammates || 30 }}명</div>
          </v-col>
          <v-col cols="4" class="stat-item">
            <span class="stat-label">보유 뱃지 수</span>
            <div class="stat-value">{{ userData.badges || 2 }}개</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- 자기소개, 선호 분야, 수상 경력 -->
    <v-row class="intro-section">
      <v-col cols="12" md="6" class="intro-col">
        <v-card class="intro-card full-height">
          <v-card-title>자기소개</v-card-title>
          <v-card-text class="scrollable">
            {{ userData.introduction || defaultIntroduction }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="intro-col">
        <v-card class="intro-card half-height">
          <v-card-title>선호 분야</v-card-title>
          <v-card-text class="scrollable">
            {{ userData.preferredFields || defaultPreferredFields }}
          </v-card-text>
        </v-card>
        <v-card class="intro-card half-height">
          <v-card-title>수상 경력</v-card-title>
          <v-card-text class="scrollable">
            {{ userData.awards || defaultAwards }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 최근 프로젝트 -->
    <section class="projects-section">
      <h2>최근 프로젝트 <span class="more-link">더 보기 →</span></h2>
      <v-row>
        <v-col v-for="(project, index) in recentProjects" :key="index" cols="12" sm="6" md="4">
          <ProjectCard
            :id="project.id"
            :title="project.title"
            :subtitle="project.subtitle"
            :img-src="project.image"
            :mainCategory="project.mainCategory"
            :subCategory="project.subCategory"
          />
        </v-col>
      </v-row>
    </section>

    <!-- 팀원 후기 -->
    <section class="reviews-section">
      <h2>팀원 후기 <span class="more-link">더 보기 →</span></h2>
      <v-row>
        <v-col v-for="(review, index) in reviews" :key="index" cols="12" sm="6" md="4">
          <v-card class="review-card">
            <v-avatar size="50" class="review-avatar">
              <img
                :src="review.avatar"
                alt="Reviewer Avatar"
                @error="console.error('Review avatar failed:', $event)"
              />
            </v-avatar>
            <v-card-title class="review-title">{{ review.name }}</v-card-title>
            <v-progress-linear
              color="blue-lighten-3"
              :model-value="review.rating * 20"
              height="8"
              rounded
            ></v-progress-linear>
            <v-card-text class="review-text">{{ review.rating }} / 5.0</v-card-text>
            <v-card-subtitle class="review-comment">{{ review.comment }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- 최근 획득한 뱃지 -->
    <section class="badges-section">
      <h2>최근 획득한 뱃지 <span class="more-link">더 보기 →</span></h2>
      <v-row>
        <v-col v-for="(badge, index) in recentBadges" :key="index" cols="12" sm="6" md="4">
          <v-card class="badge-card">
            <img
              :src="badge.image"
              height="80px"
              style="object-fit: contain;"
              @error="console.error('Badge image failed:', $event)"
            />
            <v-card-text class="badge-description">{{ badge.description }}</v-card-text>
            <v-card-title class="badge-name">{{ badge.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {
  VAvatar,
  VRow,
  VCol,
  VCard,
  VCardTitle,
  VCardText,
  VCardSubtitle,
  VImg,
  VProgressLinear,
} from 'vuetify/components';
import ProjectCard from '@/components/common/ProjectCard.vue';

// JSON 파일 import
import projectsData from '@/json/projects.json';
import reviewsData from '@/json/reviews.json';
import badgesData from '@/json/badges.json';

// 동적 이미지 로드
const images = import.meta.glob('@/assets/member/*.png', { eager: true });
const imageMap = Object.fromEntries(
  Object.entries(images).map(([path, module]) => [
    `/assets/member/${path.split('/').pop()}`,
    module.default,
  ])
);

// Auth Store에서 사용자 정보 가져오기
const authStore = useAuthStore();
const defaultProfileImage = imageMap['/assets/member/avatar.png'] || '/assets/member/avatar.png'; // 폴백 경로

const userData = ref({
  profileImage: null, // 초기값 null, fetchUserData에서 처리
  nickname: '',
  level: 31,
  levelProgress: 20,
  rating: 3.5,
  completedProjects: 7,
  teammates: 30,
  badges: 2,
  introduction: '',
  preferredFields: '',
  awards: '',
});

const defaultIntroduction = `
컴퓨터 공학과 어떻게 졸업
프로젝트 경험 N회
프론트 - 백엔드 전향
하고 싶은 건 주도적으로 하는 편이에요
추후 사이드 이펙트까지 확인하는 편이에요
기획 단계에 모이고 개발 후부터는 각자 하는 것을 선호합니다

대학교 시절에 보안 관련 랩실 다니다가 이쪽은 아니다 싶어서
프론트로 졸업 프로젝트를 진행했다가 다 까먹고 백엔드에 관심이
생겨서 백엔드로 전향했습니다
`;

const defaultPreferredFields = `
안드로이드 기반의 어플리케이션 관련 선호
안드로이드 기반 커뮤니티 앱 게임 앱 제작
`;

const defaultAwards = `
2023 사이버공격방어대회 청소년 우승, 국가 정보원장상
2022-2024 NO비에이 BE Engineer 지적
2024 Beyond 한화 부트캠프 파이널 프로젝트 1등
2025 서울 알고리즘 히어로 2등

`;

// JSON 데이터를 반응형으로 사용, 이미지 매핑 적용
const recentProjects = ref(
  projectsData.map(project => ({
    ...project,
    image: imageMap[project.image] || project.image, // 동적 이미지 또는 원본 경로
  }))
);

const reviews = ref(
  reviewsData.map(review => ({
    ...review,
    avatar: imageMap[review.avatar] || review.avatar, // 동적 아바타 또는 원본 경로
  }))
);

const recentBadges = ref(
  badgesData.map(badge => ({
    ...badge,
    image: imageMap[badge.image] || badge.image, // 동적 이미지 또는 원본 경로
  }))
);

// 사용자 데이터 가져오기
const fetchUserData = async () => {
  if (authStore.currentUser) {
    userData.value = {
      ...authStore.currentUser,
      profileImage:
        // 외부 URL은 그대로, 로컬 경로면 imageMap 적용
        authStore.currentUser.profileImage?.startsWith('http')
          ? authStore.currentUser.profileImage
          : imageMap[authStore.currentUser.profileImage] || defaultProfileImage,
    };
  } else {
    userData.value.profileImage = defaultProfileImage;
  }
};

onMounted(() => {
  fetchUserData();
  console.log('Image Map:', imageMap);
  console.log('Profile Image:', userData.value.profileImage);
  console.log('Default Image:', defaultProfileImage);
  console.log('Project Images:', recentProjects.value.map(p => p.image));
  console.log('Review Avatars:', reviews.value.map(r => r.avatar));
  console.log('Badge Images:', recentBadges.value.map(b => b.image));
  console.log('Auth Store User:', authStore.currentUser);
});
</script>

<style scoped>
.member-profile-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}

.profile-header {
  align-items: flex-start;
  margin-bottom: 40px;
}

.avatar-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 30px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-item {
  max-width: 400px;
}

.info-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  display: block;
}

.info-value {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.v-progress-linear {
  margin: 5px 0;
  height: 10px;
  border-radius: 5px;
}

.stats-section {
  margin-top: 20px;
}

.stat-item {
  text-align: center;
  border-right: 1px solid #d9d9d9;
}

.stat-item:last-child {
  border-right: none;
}

.stat-label {
  font-size: 14px;
  color: #333;
  display: block;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-top: 5px;
}

.intro-section {
  margin: 20px 0;
}

.intro-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.intro-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.full-height {
  height: 340px;
}

.half-height {
  height: 150px;
}

.scrollable {
  max-height: calc(100% - 60px);
  overflow-y: auto;
  padding-right: 10px;
  white-space: pre-line; /* 개행 반영 */
  line-height: 1.6; /* 줄 간격 조정 */
}

.scrollable::-webkit-scrollbar {
  width: 6px;
}

.scrollable::-webkit-scrollbar-thumb {
  background-color: #d9d9d9;
  border-radius: 3px;
}

.scrollable::-webkit-scrollbar-track {
  background-color: transparent;
}

.projects-section,
.reviews-section,
.badges-section {
  margin: 40px 0;
}

.review-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.review-avatar {
  margin-bottom: 10px;
}

.review-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: center;
}

.review-text {
  font-size: 12px;
  color: #333;
  text-align: center;
  margin-bottom: 5px;
}

.review-comment {
  font-size: 12px;
  color: #666;
  text-align: center;
}

.badge-card {
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  height: 100%;
}

.badge-description {
  font-size: 12px;
  color: #333;
  margin: 5px 0;
}

.badge-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.more-link {
  font-size: 14px;
  color: #5f0080;
  cursor: pointer;
}

.more-link:hover {
  text-decoration: underline;
}
</style>