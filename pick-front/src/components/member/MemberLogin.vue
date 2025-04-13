<template>
  <v-card class="login-card" elevation="8" max-width="448" rounded="lg">
    <div class="text-subtitle-1 text-medium-emphasis">이메일</div>

    <v-text-field
      v-model="email"
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :error-messages="errors.email"
      @input="validateEmail"
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      비밀번호
      <a
        class="text-caption text-decoration-none text-blue"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        로그인 비밀번호를 잊으셨나요?
      </a>
    </div>

    <v-text-field
      v-model="password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      :error-messages="errors.password"
      @click:append-inner="visible = !visible"
      @input="validatePassword"
    ></v-text-field>

    <v-card class="mb-12" color="surface-variant" variant="tonal">
      <v-card-text class="text-medium-emphasis text-caption">
        주의: 3번 이상 아이디, 비밀번호 입력 실패 시 계정이 잠길 수 있습니다.
      </v-card-text>
    </v-card>

    <v-btn
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      block
      @click="login"
    >
      로그인
    </v-btn>

    <v-card-text class="text-center">
      <RouterLink to="/member/signup" class="text-blue text-decoration-none">
        회원가입 <v-icon icon="mdi-chevron-right"></v-icon>
      </RouterLink>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { findUserByEmail } from '@/utils/jsonStorage';
import { useRouter } from 'vue-router';

const emit = defineEmits(['login']);
const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const visible = ref(false);
const errors = ref({
  email: '',
  password: '',
});

const validateEmail = () => {
  if (!email.value) {
    errors.value.email = '이메일을 입력해주세요.';
  } else {
    errors.value.email = '';
  }
};

const validatePassword = () => {
  if (!password.value) {
    errors.value.password = '비밀번호를 입력해주세요.';
  } else {
    errors.value.password = '';
  }
};

const login = async () => {
  validateEmail();
  validatePassword();

  if (errors.value.email || errors.value.password) {
    return;
  }

  const user = await findUserByEmail(email.value);
  if (!user) {
    errors.value.email = '등록되지 않은 이메일입니다.';
    return;
  }

  if (user.password !== password.value) {
    errors.value.password = '비밀번호가 일치하지 않습니다.';
    return;
  }

  // Pinia 스토어에 로그인 상태 저장
  authStore.login(user);
  emit('login', user); // 부모 컴포넌트로 로그인 성공 이벤트 전달
  router.push('/'); // 메인 페이지로 이동
};
</script>

<style scoped>
.login-card {
  padding: 24px 32px 16px 32px;
}
</style>