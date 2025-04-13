// src/utils/jsonStorage.js

// JSON 데이터를 fetch로 읽기
export const readUsers = async () => {
    try {
      // 먼저 localStorage에서 데이터 확인
      const localUsers = localStorage.getItem('users');
      if (localUsers) {
        return JSON.parse(localUsers);
      }
  
      // localStorage에 데이터가 없으면 src/json/users.json에서 가져오기
      const response = await fetch('/src/json/users.json');
      if (!response.ok) {
        throw new Error('Failed to fetch users.json');
      }
      const users = await response.json();
      // localStorage에 저장
      localStorage.setItem('users', JSON.stringify(users));
      return users || [];
    } catch (error) {
      console.error('Error reading users.json:', error);
      return [];
    }
  };
  
  // JSON 데이터를 localStorage에 쓰기
  export const writeUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  // 특정 이메일로 사용자 찾기
  export const findUserByEmail = async (email) => {
    const users = await readUsers();
    return users.find((user) => user.email === email);
  };
  
  // 사용자 추가
  export const addUser = async (user) => {
    const users = await readUsers();
    users.push(user);
    writeUsers(users);
  };
  
  // 사용자 업데이트
  export const updateUser = async (email, updatedData) => {
    const users = await readUsers();
    const index = users.findIndex((user) => user.email === email);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
      writeUsers(users);
    }
  };