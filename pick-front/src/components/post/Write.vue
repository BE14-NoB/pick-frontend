<!-- index.html 확인 필요 -->
<template>
    <article>
        <h2>{{ pageTitle }}</h2>
        <input class="titleBox" type="text" placeholder="제목" v-model="title" style="width:440px; height:25px;">
        <br>
        <form method="post">
            <textarea id="summernote" name="editordata" v-model="content"></textarea>
        </form>
        <div style="display:flex; flex-direction: row-reverse;">
            <button class="blue" @click="insert">글쓰기</button>
        </div>
    </article>
</template>

<script setup>
    import {ref} from 'vue';

    const pageTitle = ref('글쓰기');
    const title = ref('');
    const content = ref('');

    $(document).ready(function() {
        $('#summernote').summernote({
            height: 400
        });
    });

    function insert() {
        // 백엔드와 연결
    }
</script>

<style scoped>
    .titleBox {
        width: 500px;
        height: 40px;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        padding-left: 20px;
        padding-right: 5px;
        display: flex;
        align-items: center;
        outline: none;
    }
    button.blue {
        border-radius: 10px;
        background-color: #133286;
        color: white;
        height: 30px;
        width: 100px;
        padding-left: 25px;
        padding-right: 25px;
    }
</style>