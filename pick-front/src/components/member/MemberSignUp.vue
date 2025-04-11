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
        <div class="field-input-wrapper">
          <v-text-field
            v-model="form.email"
            placeholder="example01@gmail.com"
            variant="solo"
            class="field-input"
          ></v-text-field>
          <v-btn
            class="check-btn"
            color="purple-lighten-2"
            @click="checkEmail"
          >
            중복확인
          </v-btn>
        </div>
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
        ></v-text-field>
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
        ></v-text-field>
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
        ></v-text-field>
      </div>
  
      <!-- 닉네임 -->
      <div class="field-row">
        <v-text-field
          label="닉네임*"
          variant="plain"
          readonly
          class="field-label"
        ></v-text-field>
        <div class="field-input-wrapper">
          <v-text-field
            v-model="form.nickname"
            placeholder="닉네임을 입력"
            variant="solo"
            class="field-input"
          ></v-text-field>
          <v-btn
            class="check-btn"
            color="purple-lighten-2"
            @click="checkNickname"
          >
            중복확인
          </v-btn>
        </div>
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
        ></v-text-field>
      </div>
  
      <!-- 생일 -->
      <div class="field-row">
        <v-text-field
          label="생일*"
          variant="plain"
          readonly
          class="field-label"
        ></v-text-field>
        <div class="field-input-wrapper birth-wrapper">
          <v-text-field
            v-model="form.birthYear"
            placeholder="년도"
            variant="solo"
            class="field-input birth-field"
          ></v-text-field>
          <v-text-field
            v-model="form.birthMonth"
            placeholder="월"
            variant="solo"
            class="field-input birth-field"
          ></v-text-field>
          <v-text-field
            v-model="form.birthDay"
            placeholder="일"
            variant="solo"
            class="field-input birth-field"
          ></v-text-field>
        </div>
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
        ></v-text-field>
      </div>
  
      <v-divider class="divider" />
      <v-btn
        class="signup-btn"
        color="purple-darken-3"
        size="large"
        block
        @click="$emit('signup')"
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
  
  // 이메일 중복 확인 (임시)
  const checkEmail = () => {
    console.log('이메일 중복 확인:', form.value.email)
    // 실제로는 백엔드 API 호출 필요
  }
  
  // 닉네임 중복 확인 (임시)
  const checkNickname = () => {
    console.log('닉네임 중복 확인:', form.value.nickname)
    // 실제로는 백엔드 API 호출 필요
  }
  </script>
  
  <style scoped>
  .signup-container {
    max-width: 600px;
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
    gap: 10px;
  }
  
  .field-label {
    width: 100px;
    font-size: 14px;
    color: #333;
  }
  
  .field-input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 400px; /* 고정 너비로 설정 */
  }
  
  .birth-wrapper {
    justify-content: space-between; /* 생일 필드 간격 조정 */
  }
  
  .field-input {
    width: 300px; /* 모든 입력 필드 너비 동일 */
  }
  
  .birth-field {
    width: 90px; /* 생일 필드 너비 조정 */
  }
  
  .check-btn {
    font-size: 12px;
    height: 36px;
    padding: 0 16px;
    width: 90px; /* 중복확인 버튼 너비 고정 */
  }
  
  .signup-btn {
    margin-top: 20px;
  }
  </style>