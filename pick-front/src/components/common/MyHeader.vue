<template>
  <div id="header">
    <!-- 왼쪽: 로고 -->
    <RouterLink to="/" class="logo">
      PICK
    </RouterLink>

    <!-- 중앙: 메뉴 (router-link로 라우팅 연결) -->
    <div class="menu-list">
      <RouterLink v-for="(item, index) in menus" :key="index" :to="item.path" class="menu-item" active-class="active">
        {{ item.label }}
      </RouterLink>
    </div>

    <!-- 오른쪽: 로그인 상태에 따른 버튼/프로필 -->
    <div class="profile">
      <template v-if="authStore.isLoggedIn">
        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <div class="profile-img-wrapper">
              <v-img :width="40" :height="40" :src="profileImage" class="profile-img" v-bind="props" @error="handleImageError" />
            </div>
          </template>
          <v-list class="profile-dropdown">
            <!-- 프로필 정보 -->
            <v-list-item class="profile-info">
              <div class="profile-header">
                <div class="profile-left">
                  <v-img :width="60" :height="60" :src="profileImage" class="profile-img-large" @error="handleImageError" />
                  <div class="nickname">{{ authStore.currentUser.nickname }}</div>
                </div>
                <div class="profile-right">
                  <div class="level-item">
                    <v-progress-circular :model-value="experiencePercentage" :size="70" :width="5" color="blue"
                      class="level-circle">
                      <span class="level-text">Lv. {{ user.level }}</span>
                    </v-progress-circular>
                    <div class="experience-text">
                      {{ user.currentExperience }} / {{ user.totalExperience }}
                    </div>
                  </div>
                </div>
              </div>
            </v-list-item>

            <!-- 통계 섹션 -->
            <v-row class="stats-section">
              <v-col cols="4" class="stat-item">
                <span class="stat-label">완료 프로젝트</span>
                <div class="stat-value">{{ user.completedProjects }}개</div>
              </v-col>
              <v-col cols="4" class="stat-item">
                <span class="stat-label">함께한 팀원</span>
                <div class="stat-value">{{ user.teamMembers }}명</div>
              </v-col>
              <v-col cols="4" class="stat-item">
                <span class="stat-label">보유 뱃지 수</span>
                <div class="stat-value">{{ user.badges }}개</div>
              </v-col>
            </v-row>

            <!-- 버튼 -->
            <v-list-item class="action-buttons">
              <v-btn class="action-btn" variant="outlined" color="primary" block to="/member/info">
                회원 정보
              </v-btn>
            </v-list-item>
            <v-list-item class="action-buttons">
              <v-btn class="action-btn" variant="outlined" color="primary" block to="/member/profile">
                프로필 페이지
              </v-btn>
            </v-list-item>
            <v-list-item class="action-buttons">
              <v-btn class="action-btn" variant="outlined" color="primary" block to="/project/dashboard">
                참여중인 프로젝트
              </v-btn>
            </v-list-item>
            <v-list-item class="action-buttons">
              <v-btn class="action-btn" variant="outlined" color="primary" block @click="handleLogout">
                로그아웃
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <button class="btn login" @click="openLoginModal">로그인</button>
        <button class="btn signup" @click="openSignupModal">회원가입</button>
      </template>
    </div>

    <!-- 로그인 모달 -->
    <div v-if="isLoginModalOpen" class="modal-overlay">
      <div class="modal-content">
        <v-btn class="close-btn" icon="mdi-close" variant="text" color="grey-darken-2" size="large"
          @click="closeLoginModal"></v-btn>
        <MemberLogin @login="handleLogin" />
      </div>
    </div>

    <!-- 회원가입 모달 -->
    <div v-if="isSignupModalOpen" class="modal-overlay">
      <div class="modal-content signup-modal">
        <v-btn class="close-btn" icon="mdi-close" variant="text" color="grey-darken-2" size="large"
          @click="closeSignupModal"></v-btn>
        <MemberSignup @signup="handleSignup" />
      </div>
    </div>

    <!-- 로그인 성공 모달 -->
    <v-dialog v-model="showLoginSuccessModal" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">로그인 성공</v-card-title>
        <v-card-text>로그인에 성공했습니다!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeLoginSuccessModal">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 회원가입 성공 모달 -->
    <v-dialog v-model="showSignupSuccessModal" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">회원가입 완료</v-card-title>
        <v-card-text>회원가입이 완료되었습니다!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeSignupSuccessModal">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { VImg, VMenu, VList, VListItem, VBtn, VRow, VCol, VProgressCircular, VDialog, VCard, VCardTitle, VCardText, VCardActions, VSpacer } from 'vuetify/components';
import MemberLogin from '@/components/member/MemberLogin.vue';
import MemberSignup from '@/components/member/MemberSignUp.vue';
import { useAuthStore } from '@/stores/auth';

// 동적 이미지 로드
const images = import.meta.glob('@/assets/member/*.png', { eager: true });
const imageMap = Object.fromEntries(
  Object.entries(images).map(([path, module]) => {
    const fileName = path.split('/').pop();
    return [`/assets/member/${fileName}`, module.default];
  })
);

// 기본 프로필 이미지 설정
const defaultProfileImage = imageMap['/assets/member/profile-image-1.png'] || '/assets/member/profile-image-1.png';

// 라우터 인스턴스 가져오기
const router = useRouter();
const authStore = useAuthStore();

// 프로필 이미지 계산
const profileImage = computed(() => {
  if (authStore.currentUser?.profileImage) {
    return authStore.currentUser.profileImage.startsWith('http')
      ? authStore.currentUser.profileImage
      : imageMap[authStore.currentUser.profileImage] || defaultProfileImage;
  }
  return defaultProfileImage;
});

// 이미지 로드 에러 핸들링
const handleImageError = () => {
  console.error('Header profile image failed');
};

// 로그인/회원가입 모달 표시 여부
const isLoginModalOpen = ref(false);
const isSignupModalOpen = ref(false);
const showLoginSuccessModal = ref(false);
const showSignupSuccessModal = ref(false);

// 사용자 정보 (기본값)
const user = ref({
  profileImage: defaultProfileImage,
  nickname: '꼼곰보',
  level: 31,
  completedProjects: 30,
  teamMembers: 30,
  badges: 2,
  currentExperience: 30, // 현재 경험치
  totalExperience: 100, // 총 경험치 (다음 레벨까지 필요한 경험치)
});

// 경험치 백분율 계산
const experiencePercentage = computed(() => {
  return (user.value.currentExperience / user.value.totalExperience) * 100;
});

// 페이지 로드 시 세션 복원
onMounted(() => {
  authStore.restoreSession();
  if (authStore.currentUser) {
    user.value = {
      ...user.value,
      profileImage: authStore.currentUser.profileImage?.startsWith('http')
        ? authStore.currentUser.profileImage
        : imageMap[authStore.currentUser.profileImage] || defaultProfileImage,
      nickname: authStore.currentUser.nickname,
    };
  }
  console.log('Header Image Map:', imageMap);
  console.log('Header Profile Image:', profileImage.value);
  console.log('Header Default Image:', defaultProfileImage);
});

// 메뉴 항목
const menus = [
  { label: '프로젝트 매칭', path: '/match' },
  { label: '전체 프로젝트', path: '/project-list' },
  { label: '게시판', path: '/post' },
  { label: '뱃지', path: '/badge' },
];

// 로그인 모달 열기
const openLoginModal = () => {
  isLoginModalOpen.value = true;
};

// 로그인 모달 닫기
const closeLoginModal = () => {
  isLoginModalOpen.value = false;
};

// 회원가입 모달 열기
const openSignupModal = () => {
  isSignupModalOpen.value = true;
};

// 회원가입 모달 닫기
const closeSignupModal = () => {
  isSignupModalOpen.value = false;
};

// 로그인 성공 모달 닫기
const closeLoginSuccessModal = () => {
  showLoginSuccessModal.value = false;
  router.push('/'); // 메인 페이지로 이동
};

// 회원가입 성공 모달 닫기
const closeSignupSuccessModal = () => {
  showSignupSuccessModal.value = false;
  router.push('/'); // 메인 페이지로 이동
};

// 로그인 처리
const handleLogin = (user) => {
  closeLoginModal();
  showLoginSuccessModal.value = true;
};

// 회원가입 처리
const handleSignup = () => {
  closeSignupModal();
  showSignupSuccessModal.value = true;
};

// 로그아웃 처리
const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 50px;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
  min-width: 0vmax;
}

.logo {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  font-size: 24px;
}

.menu-list {
  display: flex;
  gap: 40px;
  min-width: fit-content;
}

.menu-item {
  font-size: 16px;
  font-weight: 500;
  padding: 0px 14px;
  border: none;
  border-radius: 6px;
  color: #333;
  text-decoration: none;
}

.menu-item:hover {
  color: #1746a2;
  font-size: 16px;
  font-weight: 500;
}

.profile {
  font-size: 16px;
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 180px;
  justify-content: flex-end;
}

.active {
  color: white;
  font-size: 16px;
  font-weight: 500;
  background-color: #628ecf;
}

.btn {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.login {
  background-color: #628ecf;
  color: white;
}

.login:hover {
  background-color: #020715;
}

.signup {
  background-color: #1746a2;
  color: white;
}

.signup:hover {
  background-color: #020715;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

/* 드롭다운 스타일 */
.profile-dropdown {
  width: 250px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
}

.profile-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-right {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-img-large {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e0e0e0;
}

.nickname {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 8px;
}

.level-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.level-circle {
  position: relative;
}

.level-text {
  font-size: 12px;
  font-weight: bold;
  color: #333;
}

.experience-text {
  font-size: 9px;
  color: #666;
  margin-top: 4px;
}

/* 통계 섹션 스타일 */
.stats-section {
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 8px 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-label {
  font-size: 9px;
  color: #666;
}

.stat-value {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.action-buttons {
  margin-bottom: 8px;
}

.action-btn {
  font-size: 14px;
  text-transform: none;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: white;
  max-width: 500px;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.signup-modal {
  max-width: 600px;
}

.close-btn {
  position: absolute;
  bottom: 290px;
  right: 12px;
  z-index: 1001;
}
</style>