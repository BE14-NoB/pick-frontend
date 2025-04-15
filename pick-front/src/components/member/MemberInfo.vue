<template>
  <div class="layout-container">
    <MemberSideBar />

    <div class="member-info-container">
      <div class="profile-section">
        <v-avatar size="120" class="avatar">
          <img :src="userData.profileImage || defaultProfileImage" alt="Profile" @error="handleImageError" />
        </v-avatar>

        <div class="name-section">
          <div class="name">{{ userData.name }}</div>
          <div class="nickname">{{ userData.nickname }}</div>
        </div>
      </div>

      <div class="info-section">
        <div class="info-group">
          <div class="info-label">이메일</div>
          <div class="info-value">{{ userData.email }}</div>
        </div>

        <div class="info-group">
          <div class="info-label">전화번호</div>
          <div class="info-value">{{ userData.phone }}</div>
        </div>

        <div class="info-group">
          <div class="info-label">비밀번호</div>
          <div class="info-value">********</div>
        </div>

        <div class="info-group">
          <div class="info-label">생일</div>
          <div class="info-value">{{ userData.birthday }}</div>
        </div>
      </div>

      <div class="github-section">
        <div class="github-box">
          <img class="github-img" :src="githubImage" alt="Github" />
          <!-- 깃허브 닉네임 또는 Github 텍스트 표시 -->
          <div class="github-text">
            <a v-if="userData.githubLink" :href="userData.githubLink" target="_blank" class="github-link">
              {{ githubUsernameDisplay }}
            </a>
            <span v-else>Github</span>
          </div>
          <button class="github-button" @click="userData.githubId ? disconnectGithub() : redirectToGitHubOAuth()">
            {{ userData.githubId ? '연결해제' : '연결하기' }}
          </button>
        </div>
      </div>

      <div class="auth-section">
        <div class="auth-title">회원 권한</div>
        <div class="auth-items">
          <div class="auth-item">
            <v-icon color="success" icon="mdi-alert-circle" size="small"></v-icon>
            <span>{{ userData.auth || 'member' }}</span>
          </div>
          <div class="auth-item">
            <v-icon color="success" icon="mdi-check-circle" size="small"></v-icon>
            <span>Admin</span>
          </div>
        </div>
      </div>

      <div class="button-group">
        <v-btn color="#1976d2" @click="goToEdit">수정</v-btn>
        <v-btn color="#d32f2f" @click="goBack">탈퇴</v-btn>
      </div>
    </div>

    <!-- 깃허브 PAT 입력 모달 -->
    <v-dialog v-model="showGithubModal" max-width="500">
      <v-card>
        <v-card-title>깃허브 연동</v-card-title>
        <v-card-text>
          <p>
            깃허브 Personal Access Token을 입력해주세요. 토큰은
            <a href="https://github.com/settings/tokens" target="_blank">여기</a>에서 생성할 수 있습니다.
            권한은 'user', 'repo'를 선택하세요.
          </p>
          <v-text-field v-model="githubToken" label="Personal Access Token"
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" :error-messages="tokenError"
            @input="tokenError = ''"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="showGithubModal = false">취소</v-btn>
          <v-btn color="primary" text @click="connectGithub">연결</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { VAvatar, VBtn, VIcon, VDialog, VCard, VCardTitle, VCardText, VCardActions, VSpacer } from 'vuetify/components';
import githubImage from '@/assets/issueMaker.png';
import MemberSideBar from '@/components/MemberSideBar.vue';
import { findUserByEmail, updateUser } from '@/utils/jsonStorage';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();

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

const userData = ref({
  profileImage: '',
  name: '',
  nickname: '',
  email: '',
  phone: '',
  password: '',
  birthday: '',
  githubLink: '',
  githubId: null,
  githubAccessToken: '',
  auth: '',
});

const showGithubModal = ref(false);
const githubToken = ref('');
const tokenError = ref('');

// 깃허브 닉네임 표시용 computed 속성
const githubUsernameDisplay = computed(() => {
  if (userData.value.githubLink) {
    return userData.value.githubLink.split('github.com/')[1] || 'Github';
  }
  return 'Github';
});

// 이미지 로드 에러 핸들링
const handleImageError = () => {
  userData.value.profileImage = defaultProfileImage;
};

const fetchUserData = async () => {
  if (authStore.currentUser) {
    userData.value = {
      ...authStore.currentUser,
      profileImage: authStore.currentUser.profileImage?.startsWith('http')
        ? authStore.currentUser.profileImage
        : imageMap[authStore.currentUser.profileImage] || defaultProfileImage,
    };
  } else {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      router.push('/member/login');
      return;
    }
    const user = await findUserByEmail(currentUser.email);
    if (user) {
      userData.value = {
        ...user,
        profileImage: user.profileImage?.startsWith('http')
          ? user.profileImage
          : imageMap[user.profileImage] || defaultProfileImage,
      };
      authStore.login(userData.value); // authStore에 저장
    } else {
      alert('사용자 정보를 찾을 수 없습니다.');
      router.push('/member/login');
    }
  }
};

// 실제 깃 토큰 연동
const redirectToGitHubOAuth = () => {
  window.location.href = 'http://localhost:8000/pick-service/oauth2/authorization/github';
};


const openGithubModal = () => {
  githubToken.value = '';
  tokenError.value = '';
  showGithubModal.value = true;
};

const connectGithub = async () => {
  if (!githubToken.value.startsWith('ghp_')) {
    tokenError.value = '유효한 Personal Access Token을 입력해주세요.';
    return;
  }

  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${githubToken.value}` },
    });
    const githubUser = response.data;

    userData.value.githubId = githubUser.id;
    userData.value.githubAccessToken = githubToken.value;
    userData.value.githubLink = githubUser.html_url;

    await updateUser(userData.value.email, {
      githubId: githubUser.id,
      githubAccessToken: githubToken.value,
      githubLink: githubUser.html_url,
    });

    authStore.login({ ...userData.value });
    showGithubModal.value = false;
    alert('깃허브 연동이 완료되었습니다.');
  } catch (error) {
    console.error('GitHub API error:', error);
    tokenError.value = '잘못된 토큰입니다. 다시 확인해주세요.';
  }
};

const disconnectGithub = async () => {
  if (confirm('깃허브 연동을 해제하시겠습니까?')) {
    userData.value.githubId = null;
    userData.value.githubAccessToken = '';
    userData.value.githubLink = '';
    userData.value.profileImage = defaultProfileImage;

    await updateUser(userData.value.email, {
      githubId: null,
      githubAccessToken: '',
      githubLink: '',
    });

    authStore.login({ ...userData.value });
    alert('깃허브 연동이 해제되었습니다.');
  }
};

const fetchGitData = (() => {
  const { profileImage, githubLink, githubId } = router.currentRoute.value.query;

  if (profileImage && githubLink && githubId) {
    userData.value.profileImage = profileImage
    userData.value.githubLink = githubLink;
    userData.value.githubId = githubId;
  }
});

onMounted(() => {
  fetchUserData();
  fetchGitData();
  console.log('MemberInfo Image Map:', imageMap);
  console.log('MemberInfo Profile Image:', userData.value.profileImage);
  console.log('MemberInfo Default Image:', defaultProfileImage);
});

const goToEdit = () => {
  router.push({
    path: '/member/edit',
    state: { userData: userData.value },
  });
};

const goBack = () => {
  if (confirm('정말 탈퇴하시겠습니까?')) {
    authStore.logout();
    router.push('/');
  }
};
</script>

<style scoped>
.layout-container {
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
}

.member-info-container {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.name {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.nickname {
  font-size: 16px;
  color: #666;
}

.info-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  font-size: 12px;
  color: #666;
}

.info-value {
  font-size: 16px;
  color: #333;
}

.github-section {
  margin: 24px 0;
}

.github-box {
  display: flex;
  align-items: center;
  background-color: #fdefef;
  border-radius: 16px;
  padding: 12px 16px;
  position: relative;
}

.github-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.github-text {
  margin-left: 16px;
  font-size: 16px;
  color: #666;
}

.github-link {
  color: #5f0080;
  text-decoration: none;
  font-weight: 500;
}

.github-link:hover {
  text-decoration: underline;
}

.github-button {
  position: absolute;
  right: 16px;
  background-color: #5f0080;
  color: white;
  padding: 8px 16px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
}

.auth-section {
  margin: 24px 0;
}

.auth-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}

.auth-items {
  display: flex;
  gap: 16px;
}

.auth-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
  position: relative;
  bottom: 100px;
}

.v-btn {
  color: white;
  text-transform: none;
}
</style>