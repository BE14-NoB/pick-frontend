<template>
  <div class="modal-wrapper">
    <div class="signup-container">
      <h2 class="signup-title">회원가입</h2>
      <v-btn
        class="close-btn"
        icon="mdi-close"
        variant="text"
        color="grey-darken-2"
        size="large"
        @click="closeModal"
      ></v-btn>
      <v-divider class="divider" />

      <!-- 이메일 -->
      <div class="field-row">
        <v-text-field
          label="이메일*"
          variant="plain"
          readonly
          class="field-label"
          tabindex="-1"
        ></v-text-field>
        <v-text-field
          v-model="form.email"
          placeholder="example01@gmail.com"
          variant="solo"
          class="field-input"
          :error-messages="errors.email"
          @input="validateEmail"
        ></v-text-field>
        <v-btn class="check-btn" color="purple-lighten-2" @click="checkEmail">
          중복확인
        </v-btn>
      </div>

      <!-- 비밀번호 -->
      <div class="field-row">
        <v-text-field
          label="비밀번호*"
          variant="plain"
          readonly
          class="field-label"
          tabindex="-1"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          placeholder="비밀번호를 입력"
          variant="solo"
          type="password"
          class="field-input"
          :error-messages="errors.password"
          @input="validatePassword"
        ></v-text-field>
        <div class="check-btn-placeholder"></div>
      </div>

      <!-- 비밀번호 확인 -->
      <div class="field-row">
        <v-text-field
          label="비밀번호확인*"
          variant="plain"
          readonly
          class="field-label"
          tabindex="-1"
        ></v-text-field>
        <v-text-field
          v-model="form.passwordConfirm"
          placeholder="비밀번호를 한번 더 입력"
          variant="solo"
          type="password"
          class="field-input"
          :error-messages="errors.passwordConfirm"
があれば
          @input="validatePasswordConfirm"
        ></v-text-field>
        <div class="check-btn-placeholder"></div>
      </div>

      <!-- 이름 -->
      <div class="field-row">
        <v-text-field
          label="이름*"
          variant="plain"
          readonly
          class="field-label"
          tabindex="-1"
        ></v-text-field>
        <v-text-field
          v-model="form.name"
          placeholder="이름을 입력"
          variant="solo"
          class="field-input"
          :error-messages="errors.name"
          @input="validateName"
        ></v-text-field>
        <div class="check-btn-placeholder"></div>
      </div>

      <!-- 닉네임 -->
      <div class="field-row">
        <v-text-field
          label="닉네임*"
          variant="plain"
          readonly
          class="field-label"
          tabindex="-1"
        ></v-text-field>
        <v-text-field
          v-model="form.nickname"
          placeholder="닉네임을 입력"
          variant="solo"
          class="field-input"
          :error-messages="errors.nickname"
          @input="validateNickname"
        ></v-text-field>
        <v-btn class="check-btn" color="purple-lighten-2" @click="checkNickname">
          중복확인
        </v-btn>
      </div>

      <!-- 휴대폰 -->
      <div class="field-row">
        <v-text-field
          label="휴대폰*"
          variant="plain"
          readonly
          class="field-label"
          tabindex="-1"
        ></v-text-field>
        <v-text-field
          v-model="form.phone"
          placeholder="010-1234-5678"
          variant="solo"
          class="field-input"
          :error-messages="errors.phone"
          @input="validatePhone"
        ></v-text-field>
        <div class="check-btn-placeholder"></div>
      </div>

      <!-- 생일 -->
      <div class="field-row">
        <v-text-field
          label="생일*"
          variant="plain"
          readonly
          class="field-label"
          tabindex="-1"
        ></v-text-field>
        <div class="field-input birth-wrapper">
          <v-text-field
            v-model="form.birthYear"
            placeholder="년도"
            variant="solo"
            class="birth-field"
            :error-messages="errors.birthYear"
            @input="validateBirthYear"
          ></v-text-field>
          <v-text-field
            v-model="form.birthMonth"
            placeholder="월"
            variant="solo"
            class="birth-field"
            :error-messages="errors.birthMonth"
            @input="validateBirthMonth"
          ></v-text-field>
          <v-text-field
            v-model="form.birthDay"
            placeholder="일"
            variant="solo"
            class="birth-field"
            :error-messages="errors.birthDay"
            @input="validateBirthDay"
          ></v-text-field>
        </div>
        <div class="check-btn-placeholder"></div>
      </div>

      <!-- 주민등록번호 -->
      <div class="field-row">
        <v-text-field
          label="주민등록번호*"
          variant="plain"
          readonly
          class="field-label"
          tabindex="-1"
        ></v-text-field>
        <v-text-field
          v-model="form.ssn"
          placeholder="111111-3000000"
          variant="solo"
          class="field-input"
          :error-messages="errors.ssn"
          @input="validateSsn"
        ></v-text-field>
        <div class="check-btn-placeholder"></div>
      </div>

      <v-divider class="divider" />
      <v-btn
        class="signup-btn"
        color="purple-darken-3"
        size="large"
        block
        @click="signup"
      >
        가입하기
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { readUsers, addUser, findUserByEmail } from '@/utils/jsonStorage';

const emit = defineEmits(['signup', 'close']);
const router = useRouter();

const form = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  nickname: '',
  phone: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  ssn: '',
});

const errors = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  nickname: '',
  phone: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  ssn: '',
});

const validateEmail = () => {
  if (!form.value.email) {
    errors.value.email = '이메일을 입력해주세요.';
  } else if (!form.value.email.includes('@') || !form.value.email.includes('.')) {
    errors.value.email = '유효한 이메일 형식이 아닙니다.';
  } else {
    errors.value.email = '';
  }
};

const validatePassword = () => {
  if (!form.value.password) {
    errors.value.password = '비밀번호를 입력해주세요.';
  } else if (form.value.password.length < 8) {
    errors.value.password = '비밀번호는 8자 이상이어야 합니다.';
  } else {
    errors.value.password = '';
    validatePasswordConfirm();
  }
};

const validatePasswordConfirm = () => {
  if (!form.value.passwordConfirm) {
    errors.value.passwordConfirm = '비밀번호 확인을 입력해주세요.';
  } else if (form.value.password !== form.value.passwordConfirm) {
    errors.value.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  } else {
    errors.value.passwordConfirm = '';
  }
};

const validateName = () => {
  if (!form.value.name) {
    errors.value.name = '이름을 입력해주세요.';
  } else if (!/^[가-힣]{2,}$/.test(form.value.name)) {
    errors.value.name = '이름은 한글 2자 이상이어야 합니다.';
  } else {
    errors.value.name = '';
  }
};

const validateNickname = () => {
  if (!form.value.nickname) {
    errors.value.nickname = '닉네임을 입력해주세요.';
  } else if (form.value.nickname.length < 2) {
    errors.value.nickname = '닉네임은 2자 이상이어야 합니다.';
  } else {
    errors.value.nickname = '';
  }
};

const validatePhone = () => {
  if (!form.value.phone) {
    errors.value.phone = '휴대폰 번호를 입력해주세요.';
  } else if (!/^\d{3}-\d{4}-\d{4}$/.test(form.value.phone)) {
    errors.value.phone = '형식: 010-1234-5678';
  } else {
    errors.value.phone = '';
  }
};

const validateBirthYear = () => {
  const year = parseInt(form.value.birthYear, 10);
  if (!form.value.birthYear) {
    errors.value.birthYear = '년도를 입력해주세요.';
  } else if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
    errors.value.birthYear = `1900~ ${new Date().getFullYear()}입력`;
  } else {
    errors.value.birthYear = '';
  }
};

const validateBirthMonth = () => {
  const month = parseInt(form.value.birthMonth, 10);
  if (!form.value.birthMonth) {
    errors.value.birthMonth = '월을 입력.';
  } else if (isNaN(month) || month < 1 || month > 12) {
    errors.value.birthMonth = '1 ~ 12';
  } else {
    errors.value.birthMonth = '';
  }
};

const validateBirthDay = () => {
  const day = parseInt(form.value.birthDay, 10);
  if (!form.value.birthDay) {
    errors.value.birthDay = '일을 입력.';
  } else if (isNaN(day) || day < 1 || day > 31) {
    errors.value.birthDay = '1 ~ 31';
  } else {
    errors.value.birthDay = '';
  }
};

const validateSsn = () => {
  if (!form.value.ssn) {
    errors.value.ssn = '주민등록번호를 입력해주세요.';
  } else if (!/^\d{6}-\d{7}$/.test(form.value.ssn)) {
    errors.value.ssn = '형식: 111111-3000000';
  } else {
    errors.value.ssn = '';
  }
};

const checkEmail = async () => {
  if (!form.value.email) {
    errors.value.email = '이메일을 입력해주세요.';
    return;
  }
  const user = await findUserByEmail(form.value.email);
  if (user) {
    errors.value.email = '이미 사용 중인 이메일입니다.';
  } else {
    errors.value.email = '';
    alert('사용 가능한 이메일입니다.');
  }
};

const checkNickname = async () => {
  if (!form.value.nickname) {
    errors.value.nickname = '닉네임을 입력해주세요.';
    return;
  }
  const users = await readUsers();
  const nicknameExists = users.some((user) => user.nickname === form.value.nickname);
  if (nicknameExists) {
    errors.value.nickname = '이미 사용 중인 닉네임입니다.';
  } else {
    errors.value.nickname = '';
    alert('사용 가능한 닉네임입니다.');
  }
};

const closeModal = () => {
  emit('close'); // 부모 컴포넌트에 모달 닫기 이벤트 전달
};

const signup = async () => {
  validateEmail();
  validatePassword();
  validatePasswordConfirm();
  validateName();
  validateNickname();
  validatePhone();
  validateBirthYear();
  validateBirthMonth();
  validateBirthDay();
  validateSsn();

  const hasErrors = Object.values(errors.value).some((error) => error !== '');
  if (hasErrors) {
    alert('모든 필드를 올바르게 입력해주세요.');
    return;
  }

  const userByEmail = await findUserByEmail(form.value.email);
  const users = await readUsers();
  const nicknameExists = users.some((user) => user.nickname === form.value.nickname);
  if (userByEmail || nicknameExists) {
    alert('이메일 또는 닉네임이 이미 사용 중입니다.');
    return;
  }

  const birthday = `${form.value.birthYear}-${form.value.birthMonth.padStart(2, '0')}-${form.value.birthDay.padStart(2, '0')}`;

  const newUser = {
    email: form.value.email,
    password: form.value.password,
    name: form.value.name,
    nickname: form.value.nickname,
    phone: form.value.phone,
    birthday: birthday,
    ssn: form.value.ssn,
    profileImage: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
    githubLink: '',
    auth: 'member',
  };

  await addUser(newUser);
  emit('signup'); // 부모 컴포넌트로 회원가입 성공 이벤트 전달
  router.push('/'); // 메인 페이지로 이동
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.signup-container {
  max-width: 800px;
  height: 100vh; /* 화면 전체 높이에 맞춤 */
  background: #fff;
  border-radius: 0; /* 전체 화면이므로 둥근 모서리 제거 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 20px; /* 내부 여백 유지 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  position: relative; /* 닫기 버튼의 절대 위치를 위해 */
}

.signup-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1001;
}

.divider {
  margin: 20px 0;
}

.field-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 20px;
}

.field-label {
  width: 150px;
  font-size: 14px;
  color: #333;
  height: 50px;
  display: flex;
  align-items: center;
  white-space: nowrap; /* 라벨 잘림 방지 */
}

.field-label >>> .v-label {
  white-space: nowrap; /* Vuetify 라벨 잘림 방지 */
  overflow: visible; /* 라벨이 잘리지 않도록 */
  text-overflow: unset; /* "..." 제거 */
  font-size: 14px; /* 글씨 크기 유지 */
  max-width: 100px;
}

.field-input {
  width: 400px;
  height: 50px;
}

.field-input >>> .v-input__control {
  height: 40px !important;
}

.field-input >>> .v-field {
  height: 35px !important;
  padding: 0 10px !important;
  font-size: 14px;
}

.birth-wrapper {
  display: flex;
  gap: 10px;
  width: 400px;
  height: 40px;
}

.birth-field {
  width: 60px;
  height: 30px;
}

.birth-field >>> .v-input__control {
  height: 35px !important;
}

.birth-field >>> .v-field {
  height: 40px !important;
  padding: 0 10px !important;
  font-size: 14px;
}

.check-btn {
  width: 90px;
  height: 40px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-btn-placeholder {
  width: 90px;
  height: 40px;
}

.signup-btn {
  margin-top: 20px;
  height: 30px;
  font-size: 10px;
}

@media (max-width: 960px) {
  .signup-container {
    max-width: 600px;
    height: 100vh; /* 화면 전체 높이 유지 */
    padding: 15px;
  }

  .signup-title {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .close-btn {
    top: 15px;
    right: 15px;
  }

  .divider {
    margin: 16px 0;
  }

  .field-row {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
    gap: 15px;
  }

  .field-label {
    width: 100%;
    height: 45px;
  }

  .field-input {
    width: 100%;
    height: 35px;
  }

  .field-input >>> .v-input__control {
    height: 35px !important;
  }

  .field-input >>> .v-field {
    height: 35px !important;
    padding: 0 8px !important;
  }

  .birth-wrapper {
    width: 100%;
    height: 35px;
  }

  .birth-field {
    width: 33%;
    height: 35px;
  }

  .birth-field >>> .v-input__control {
    height: 35px !important;
  }

  .birth-field >>> .v-field {
    height: 35px !important;
    padding: 0 8px !important;
  }

  .check-btn,
  .check-btn-placeholder {
    margin-left: 0;
    margin-top: 5px;
    width: 80px;
    height: 35px;
  }

  .signup-btn {
    margin-top: 15px;
    height: 12px;
    font-size: 9px;
  }
}
</style>