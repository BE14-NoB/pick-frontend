<template>
  <div class="content-wrapper">
    <div class="side-bar">
      <MemberSideBar/>
    </div>
    <div class="content-view">
      <router-view/>
    </div>
    <div class="side-bar">

    </div>
  </div>
</template>
  
<script setup>
  import MemberSideBar from '@/components/MemberSideBar.vue';
</script>
  
<style scoped>
  .content-wrapper {
    display: flex;
  }
  .side-bar {
    flex: 1
  }
  .content-view {
    flex: 3
  }
</style>