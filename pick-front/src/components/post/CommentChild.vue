<!-- CommentChild.vue -->
<template>
    <div :style="{ marginLeft: `${depth * 40 + 10}px` }" class="commentBox">
        <div class="commentBoxHeader">
            <div>{{ comment.nickname }}</div>
            <div v-if="comment.update_at">
                수정일: {{ comment.update_at }} | 신고 | 답글
            </div>
            <div v-else>
                작성일: {{ comment.upload_at }} | 신고 | 답글
            </div>
        </div>
        <div class="commentBoxBody">
            {{ comment.content }}
        </div>
    </div>
    
    <!-- 자식 댓글 재귀 렌더링 -->
    <CommentChild
        v-for="child in comment.children"
        :key="child.id"
        :comment="child"
        :depth="depth + 1"
    />
</template>
    
<script setup>
    import CommentChild from './CommentChild.vue' // 재귀 import
    
    defineProps({
        comment: {
            type: Object,
            required: true,
        },
        depth: {
            type: Number,
            default: 0,
        },
    })
</script>
    
<style scoped>
    .commentBox {
        border: 1px solid #d5d5d5;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
    }

    .commentBoxHeader {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #d5d5d5;
        padding: 5px;
        padding-left: 10px;
    }

    .commentBoxBody {
        padding: 5px;
        padding-left: 10px;
    }
</style>
