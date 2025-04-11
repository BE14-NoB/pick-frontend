<template>
    프로젝트 디테일
    
</template>



<script setup>
    import {ref, computed, onMounted, watch} from 'vue';
    import { useRoute } from 'vue-router'


    const route = useRoute()
    const id = route.params.id  
    const projectData = ref(null)
    

    onMounted(async () => {
        try {
            const res = await fetch(`http://localhost:8080/${id}`)
            const result = await res.json()
            projectData.value = result
        } catch (err) {
            console.error('🚨 fetch 실패', err)
        }
    })

    console.log(projectData);


</script>