<template>
  <v-btn color="primary" variant="tonal" class="issue-create-btn" prepend-icon="mdi-tag-plus" @click="handleClick">
    이슈 생성하기
  </v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/project/create-issue')
}
</script>

<style scoped>
.issue-create-btn {
  float: right;
  font-weight: 600;
  margin-bottom: 16px;
  text-transform: none;
}
</style>