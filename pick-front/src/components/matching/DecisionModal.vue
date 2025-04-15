<template>
    <div class="modal-backdrop" @click.self="onClose">
      <div class="modal-container">
        <h3>모집 중인 프로젝트입니다</h3>
        <p>현재 인원으로 시작하거나 모집을 취소할 수 있습니다.</p>
        <div class="modal-actions">
          <button class="start-button" @click.stop="onStart">현재 인원으로 시작</button>
          <button class="cancel-button" @click.stop="onCancel">모집 취소</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    onStart: Function,
    onCancel: Function,
    onClose: Function,
    selectedIndex: Number  // 선택된 인덱스를 props로 받음
  })
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-container {
    background: white;
    padding: 30px 40px;
    border-radius: 16px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
  
  .modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
  
  .start-button,
  .cancel-button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
  }
  
  .start-button {
    background-color: #020725;
  }
  .cancel-button {
    background-color: red;
  }
  </style>
  