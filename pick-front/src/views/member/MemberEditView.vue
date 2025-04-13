<!-- src/views/member/MemberEditView.vue -->
<template>
    <div class="member-edit-container">
      <div class="page-title">회원정보 수정</div>
  
      <v-card class="edit-card" elevation="1">
        <div class="profile-image-section">
          <div class="profile-image-container">
            <v-img
              :src="memberInfo.profileImage || defaultProfileImage"
              :width="120"
              :height="120"
              class="profile-img"
              cover
            />
            <div class="image-upload-overlay" @click="triggerFileInput">
              <v-icon icon="mdi-camera" size="large" color="white" />
            </div>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              style="display: none"
              @change="handleImageChange"
            />
          </div>
          <p class="profile-hint">프로필 이미지 변경</p>
        </div>
  
        <v-form ref="form" v-model="isValid" @submit.prevent="saveChanges">
          <div class="form-section">
            <!-- 이메일 (읽기 전용) -->
            <div class="form-group">
              <div class="form-label">이메일</div>
              <v-text-field
                v-model="memberInfo.email"
                variant="outlined"
                readonly
                disabled
                density="compact"
                bg-color="grey-lighten-3"
              ></v-text-field>
            </div>
  
            <!-- 닉네임 -->
            <div class="form-group">
              <div class="form-label">닉네임</div>
              <v-text-field
                v-model="memberInfo.nickname"
                variant="outlined"
                :rules="nicknameRules"
                density="compact"
                placeholder="닉네임을 입력하세요"
              ></v-text-field>
            </div>
  
            <!-- 전화번호 -->
            <div class="form-group">
              <div class="form-label">전화번호</div>
              <v-text-field
                v-model="memberInfo.phone"
                variant="outlined"
                :rules="phoneRules"
                density="compact"
                placeholder="전화번호를 입력하세요"
              ></v-text-field>
            </div>
  
            <!-- 생일 -->
            <div class="form-group">
              <div class="form-label">생일</div>
              <v-text-field
                v-model="birthdayFormatted"
                variant="outlined"
                :rules="birthdayRules"
                density="compact"
                placeholder="YYYY-MM-DD"
              ></v-text-field>
            </div>
  
            <!-- 비밀번호 변경 -->
            <div class="form-group password-section">
              <div class="form-label">비밀번호 변경</div>
              <v-text-field
                v-model="passwordFields.currentPassword"
                variant="outlined"
                type="password"
                density="compact"
                label="현재 비밀번호"
                :rules="currentPasswordRules"
              ></v-text-field>
  
              <v-text-field
                v-model="passwordFields.newPassword"
                variant="outlined"
                type="password"
                density="compact"
                label="새 비밀번호"
                :rules="newPasswordRules"
                class="mt-4"
              ></v-text-field>
  
              <v-text-field
                v-model="passwordFields.confirmPassword"
                variant="outlined"
                type="password"
                density="compact"
                label="새 비밀번호 확인"
                :rules="confirmPasswordRules"
                class="mt-4"
              ></v-text-field>
            </div>
  
            <!-- 버튼 영역 -->
            <div class="action-buttons">
              <v-btn
                color="error"
                variant="outlined"
                @click="resetForm"
                class="cancel-btn"
              >
                취소
              </v-btn>
              <v-btn
                color="primary"
                @click="saveChanges"
                :disabled="!isValid || isLoading"
                class="save-btn"
              >
                <v-progress-circular
                  v-if="isLoading"
                  indeterminate
                  size="20"
                  color="white"
                ></v-progress-circular>
                <span v-else>저장</span>
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-card>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import { updateUser, findUserByEmail, readUsers } from '@/utils/jsonStorage';
  
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();
  const isValid = ref(false);
  const form = ref(null);
  const fileInput = ref(null);
  const defaultProfileImage = 'https://cdn.vuetifyjs.com/images/parallax/material.jpg';
  const isLoading = ref(false);
  
  // 회원 정보 초기화
  const memberInfo = reactive({
    email: '',
    nickname: '',
    phone: '',
    birthday: '',
    profileImage: '',
  });
  
  // 원본 데이터 저장
  const originalInfo = reactive({
    email: '',
    nickname: '',
    phone: '',
    birthday: '',
    profileImage: '',
  });
  
  // 비밀번호 필드
  const passwordFields = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // 생일 포맷팅 (YYYY-MM-DD)
  const birthdayFormatted = computed({
    get: () => memberInfo.birthday,
    set: (value) => {
      memberInfo.birthday = value;
    },
  });
  
  // 유효성 검사 규칙
  const nicknameRules = [
    (v) => !!v || '닉네임을 입력해주세요',
    (v) => (v && v.length >= 2) || '닉네임은 2자 이상이어야 합니다',
    (v) => (v && v.length <= 10) || '닉네임은 10자 이하여야 합니다',
  ];
  
  const phoneRules = [
    (v) =>
      !v ||
      /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(v) ||
      '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)',
  ];
  
  const birthdayRules = [
    (v) =>
      !v ||
      /^\d{4}-\d{2}-\d{2}$/.test(v) ||
      '생일은 YYYY-MM-DD 형식이어야 합니다',
  ];
  
  const currentPasswordRules = [
    (v) =>
      !passwordFields.newPassword ||
      !!v ||
      '현재 비밀번호를 입력해주세요',
  ];
  
  const newPasswordRules = [
    (v) => !v || v.length >= 8 || '비밀번호는 8자 이상이어야 합니다',
    (v) => !v || /[A-Z]/.test(v) || '대문자를 포함해야 합니다',
    (v) => !v || /[0-9]/.test(v) || '숫자를 포함해야 합니다',
    (v) => !v || /[!@#$%^&*]/.test(v) || '특수문자를 포함해야 합니다',
  ];
  
  const confirmPasswordRules = [
    (v) =>
      !passwordFields.newPassword ||
      !!v ||
      '비밀번호 확인을 입력해주세요',
    (v) =>
      !passwordFields.newPassword ||
      v === passwordFields.newPassword ||
      '비밀번호가 일치하지 않습니다',
  ];
  
  // 페이지 로드 시 사용자 정보 가져오기
  onMounted(async () => {
    const userData = route.state?.userData;
    if (userData) {
      Object.assign(memberInfo, userData);
      Object.assign(originalInfo, userData);
    } else {
      await fetchUserData();
    }
  });
  
  const fetchUserData = async () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      router.push('/member/login');
      return;
    }
  
    const user = await findUserByEmail(currentUser.email);
    if (user) {
      Object.assign(memberInfo, user);
      Object.assign(originalInfo, user);
    } else {
      alert('사용자 정보를 찾을 수 없습니다.');
      router.push('/member/login');
    }
  };
  
  // 프로필 이미지 변경
  const triggerFileInput = () => {
    fileInput.value.click();
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 크기는 5MB 이하여야 합니다.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      memberInfo.profileImage = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  // 변경된 필드 추출
  const getChangedFields = async () => {
    const changedFields = {};
  
    // 닉네임 변경 및 중복 확인
    if (memberInfo.nickname !== originalInfo.nickname) {
      const users = await readUsers();
      const nicknameExists = users.some(
        (user) => user.nickname === memberInfo.nickname && user.email !== memberInfo.email
      );
      if (nicknameExists) {
        alert('이미 사용 중인 닉네임입니다.');
        return null;
      }
      changedFields.nickname = memberInfo.nickname;
    }
  
    // 전화번호 변경
    if (memberInfo.phone !== originalInfo.phone) {
      changedFields.phone = memberInfo.phone;
    }
  
    // 생일 변경
    if (memberInfo.birthday !== originalInfo.birthday) {
      changedFields.birthday = memberInfo.birthday;
    }
  
    // 프로필 이미지 변경
    if (memberInfo.profileImage !== originalInfo.profileImage) {
      changedFields.profileImage = memberInfo.profileImage;
    }
  
    // 비밀번호 변경
    if (passwordFields.newPassword && passwordFields.currentPassword) {
      const currentUser = await findUserByEmail(memberInfo.email);
      if (passwordFields.currentPassword !== currentUser.password) {
        alert('현재 비밀번호가 일치하지 않습니다.');
        return null;
      }
      if (passwordFields.newPassword !== passwordFields.confirmPassword) {
        alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
        return null;
      }
      changedFields.password = passwordFields.newPassword;
    }
  
    return changedFields;
  };
  
  // 변경사항 저장
  const saveChanges = async () => {
    console.log('saveChanges called');
    console.log('isValid:', isValid.value);
    console.log('Form data:', memberInfo, passwordFields);
  
    // 폼 유효성 검사
    const valid = await form.value.validate();
    if (!valid) {
      alert('입력된 정보를 확인해주세요.');
      return;
    }
  
    const changedFields = await getChangedFields();
    if (!changedFields) {
      return; // 닉네임 중복 또는 비밀번호 오류
    }
  
    if (Object.keys(changedFields).length === 0) {
      alert('변경된 정보가 없습니다.');
      return;
    }
  
    try {
      isLoading.value = true;
  
      // JSON 데이터 업데이트
      await updateUser(memberInfo.email, changedFields);
  
      // 세션 및 Pinia 스토어 업데이트
      const updatedUser = await findUserByEmail(memberInfo.email);
      sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
      authStore.login(updatedUser); // Pinia 스토어 동기화
  
      alert('회원 정보가 성공적으로 수정되었습니다.');
      router.push('/member/info');
    } catch (error) {
      console.error('회원 정보 수정 중 오류:', error);
      alert('회원 정보 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      isLoading.value = false;
    }
  };
  
  // 폼 초기화 (취소)
  const resetForm = () => {
    if (confirm('변경사항이 저장되지 않습니다. 정말 취소하시겠습니까?')) {
      Object.assign(memberInfo, originalInfo);
      passwordFields.currentPassword = '';
      passwordFields.newPassword = '';
      passwordFields.confirmPassword = '';
      router.push('/member/info');
    }
  };
  </script>
  
  <style scoped>
  .member-edit-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
    color: #333;
  }
  
  .edit-card {
    padding: 32px;
    border-radius: 12px;
  }
  
  .profile-image-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;
  }
  
  .profile-image-container {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .profile-img {
    border-radius: 50%;
  }
  
  .image-upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .image-upload-overlay:hover {
    opacity: 1;
  }
  
  .profile-hint {
    margin-top: 8px;
    font-size: 14px;
    color: #666;
  }
  
  .form-section {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 24px;
  }
  
  .form-label {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #333;
  }
  
  .password-section {
    padding: 16px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #eaeaea;
  }
  
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 32px;
  }
  </style>