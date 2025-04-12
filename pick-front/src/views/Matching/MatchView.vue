<template>
    <div>매칭 페이지</div>
    <MatchingSideBar/>
</template>
  

<script setup>
  import { ref } from 'vue'
  import MatchingSideBar from '@/components/matching/MatchingSideBar.vue'

  const items = ref(Array.from({ length: 30 }, (k, v) => v + 1))

  async function api () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1))
      }, 1000)
    })
  }
  async function load ({ done }) {
    // Perform API call
    const res = await api()

    items.value.push(...res)

    done('ok')
  }
</script>

<style scoped>

</style>