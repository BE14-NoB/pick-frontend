<template>
    <div class="searchBox">
        <SearchComboBox hidden/>
        <input type="text" v-model="keyword" style="width:440px; height:25px;">
        <button @click="search" style="width:25px; height:25px;">
            <img src="@/assets/post/icons8-search.svg" alt="돋보기 아이콘" width="25px" height="25px">
        </button>
    </div>
</template>

<script setup>
    import SearchComboBox from './SearchComboBox.vue';

    import {ref, defineEmits} from 'vue';

    const keyword = ref('');
    const result = ref([]);
    const emit = defineEmits(['returnResult']);

    const search = async() => {
        console.log(keyword.value);
        // 백엔드의 검색 기능 호출
        const response = await fetch(`http://localhost:8000/pick-service/post/search/${keyword.value}`);
        console.log('response',response);
        const data = await response.json();
        console.log('data:', data);
        result.value = data;
        emit('returnResult', result);
    };
</script>

<style scoped>
    .searchBox {
        width: 500px;
        height: 40px;
        border: 1px solid #d9d9d9;
        border-radius: 50px;
        padding-left: 20px;
        padding-right: 5px;
        display: flex;
        align-items: center;
    }
    input:focus{
        outline: none;
    }
</style>