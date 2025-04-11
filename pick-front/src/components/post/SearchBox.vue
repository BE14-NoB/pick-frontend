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
    import SearchComboBox from '@/components/post/SearchComboBox.vue';

    import {ref} from 'vue';

    const keyword = ref('');

    function search(keyword) {
        // 백엔드의 검색 기능 호출
    }
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