<!-- src/views/SignupView.vue -->
<template>
  <div class="signup-container">
    <h2 class="signup-title">회원가입</h2>
    <v-divider class="divider" />

    <!-- 이메일 -->
    <div class="field-row">
      <v-text-field
        label="이메일*"
        variant="plain"
        readonly
        class="field-label"
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
      ></v-text-field>
      <v-text-field
        v-model="form.passwordConfirm"
        placeholder="비밀번호를 한번 더 입력"
        variant="solo"
        type="password"
        class="field-input"
        :error-messages="errors.passwordConfirm"
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
</template>

<script setup>
import { ref } from 'vue'

// 폼 데이터
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
})

// 에러 메시지
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
})

// 유효성 검사 함수
const validateEmail = () => {
  if (!form.value.email) {
    errors.value.email = '이메일을 입력해주세요.'
  } else if (!form.value.email.includes('@') || !form.value.email.includes('.')) {
    errors.value.email = '유효한 이메일 형식이 아닙니다.'
  } else {
    errors.value.email = ''
  }
}

const validatePassword = () => {
  if (!form.value.password) {
    errors.value.password = '비밀번호를 입력해주세요.'
  } else if (form.value.password.length < 8) {
    errors.value.password = '비밀번호는 8자 이상이어야 합니다.'
  } else {
    errors.value.password = ''
    validatePasswordConfirm() // 비밀번호 확인도 재검사
  }
}

const validatePasswordConfirm = () => {
  if (!form.value.passwordConfirm) {
    errors.value.passwordConfirm = '비밀번호 확인을 입력해주세요.'
  } else if (form.value.password !== form.value.passwordConfirm) {
    errors.value.passwordConfirm = '비밀번호가 일치하지 않습니다.'
  } else {
    errors.value.passwordConfirm = ''
  }
}

const validateName = () => {
  if (!form.value.name) {
    errors.value.name = '이름을 입력해주세요.'
  } else if (!/^[가-힣]{2,}$/.test(form.value.name)) {
    errors.value.name = '이름은 한글 2자 이상이어야 합니다.'
  } else {
    errors.value.name = ''
  }
}

const validateNickname = () => {
  if (!form.value.nickname) {
    errors.value.nickname = '닉네임을 입력해주세요.'
  } else if (form.value.nickname.length < 2) {
    errors.value.nickname = '닉네임은 2자 이상이어야 합니다.'
  } else {
    errors.value.nickname = ''
  }
}

const validatePhone = () => {
  if (!form.value.phone) {
    errors.value.phone = '휴대폰 번호를 입력해주세요.'
  } else if (!/^\d{3}-\d{4}-\d{4}$/.test(form.value.phone)) {
    errors.value.phone = '형식: 010-1234-5678'
  } else {
    errors.value.phone = ''
  }
}

const validateBirthYear = () => {
  const year = parseInt(form.value.birthYear, 10)
  if (!form.value.birthYear) {
    errors.value.birthYear = '년도를 입력해주세요.'
  } else if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
    errors.value.birthYear = `1900 ~ ${new Date().getFullYear()} 사이의 값을 입력해주세요.`
  } else {
    errors.value.birthYear = ''
  }
}

const validateBirthMonth = () => {
  const month = parseInt(form.value.birthMonth, 10)
  if (!form.value.birthMonth) {
    errors.value.birthMonth = '월을 입력해주세요.'
  } else if (isNaN(month) || month < 1 || month > 12) {
    errors.value.birthMonth = '1 ~ 12 사이의 값을 입력해주세요.'
  } else {
    errors.value.birthMonth = ''
  }
}

const validateBirthDay = () => {
  const day = parseInt(form.value.birthDay, 10)
  if (!form.value.birthDay) {
    errors.value.birthDay = '일을 입력해주세요.'
  } else if (isNaN(day) || day < 1 || day > 31) {
    errors.value.birthDay = '1 ~ 31 사이의 값을 입력해주세요.'
  } else {
    errors.value.birthDay = ''
  }
}

const validateSsn = () => {
  if (!form.value.ssn) {
    errors.value.ssn = '주민등록번호를 입력해주세요.'
  } else if (!/^\d{6}-\d{7}$/.test(form.value.ssn)) {
    errors.value.ssn = '형식: 111111-3000000'
  } else {
    errors.value.ssn = ''
  }
}

// 이메일 중복 확인 (임시)
const checkEmail = () => {
  if (!form.value.email) {
    errors.value.email = '이메일을 입력해주세요.'
    return
  }
  console.log('이메일 중복 확인:', form.value.email)
  // 실제로는 백엔드 API 호출 필요
}

// 닉네임 중복 확인 (임시)
const checkNickname = () => {
  if (!form.value.nickname) {
    errors.value.nickname = '닉네임을 입력해주세요.'
    return
  }
  console.log('닉네임 중복 확인:', form.value.nickname)
  // 실제로는 백엔드 API 호출 필요
}

// 회원가입 처리
const signup = () => {
  // 모든 필드 유효성 검사 실행
  validateEmail()
  validatePassword()
  validatePasswordConfirm()
  validateName()
  validateNickname()
  validatePhone()
  validateBirthYear()
  validateBirthMonth()
  validateBirthDay()
  validateSsn()

  // 에러가 있는지 확인
  const hasErrors = Object.values(errors.value).some(error => error !== '')
  if (hasErrors) {
    alert('모든 필드를 올바르게 입력해주세요.')
    return
  }

  // 회원가입 처리 (예: API 호출)
  console.log('회원가입 데이터:', form.value)
  alert('회원가입이 완료되었습니다!')
  // $emit('signup') // 필요 시 부모 컴포넌트로 이벤트 전달
}
</script>

<style scoped>
.signup-container {
  max-width: 800px; /* 모달 너비 유지 */
  margin: 0 auto;
  padding: 20px;
}

.signup-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.divider {
  margin: 20px 0;
}

.field-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 20px; /* 요소 간 간격 */
}

.field-label {
  width: 150px; /* 라벨 너비 고정 */
  font-size: 14px;
  color: #333;
}

.field-input {
  width: 400px; /* 텍스트 필드 너비 고정 */
}

.birth-wrapper {
  display: flex;
  gap: 10px;
  width: 400px; /* 생일 필드 전체 너비를 텍스트 필드와 동일하게 설정 */
}

.birth-field {
  width: 12px; /* 400px를 3으로 나눈 값에서 gap(10px * 2)을 고려한 크기 */
}

.check-btn {
  width: 90px; /* 중복확인 버튼 너비 고정 */
  height: 36px;
  font-size: 12px;
}

.check-btn-placeholder {
  width: 90px; /* 중복확인 버튼 자리 확보 */
  height: 36px;
}

.signup-btn {
  margin-top: 20px;
}

/* 반응형 디자인 */
@media (max-width: 960px) {
  .signup-container {
    max-width: 600px;
  }

  .field-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .field-label {
    width: 70%;
  }

  .field-input {
    width: 100%;
  }

  .birth-wrapper {
    width: 100%;
  }

  .birth-field {
    width: 33%;
  }

  .check-btn,
  .check-btn-placeholder {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>