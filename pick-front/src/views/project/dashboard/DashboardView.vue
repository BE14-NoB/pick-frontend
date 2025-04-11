<template>
    대시보드
    <div>
        <GitWidget />
    </div>
</template>

<script setup>
import {onMounted} from 'vue';
import GitWidget from '@/components/project/GitWidget.vue'
onMounted(() => {
    console.log("대시보드입니다.")
})


</script>