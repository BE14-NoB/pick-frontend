import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const currentUser = ref(null);

  const login = (user) => {
    isLoggedIn.value = true;
    currentUser.value = user;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = () => {
    isLoggedIn.value = false;
    currentUser.value = null;
    sessionStorage.removeItem('currentUser');
  };

  // 세션에서 로그인 상태 복원
  const restoreSession = () => {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user) {
      isLoggedIn.value = true;
      currentUser.value = user;
    }
  };

  return { isLoggedIn, currentUser, login, logout, restoreSession };
});