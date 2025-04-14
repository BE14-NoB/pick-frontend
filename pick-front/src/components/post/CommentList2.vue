<!-- CommentList.vue -->
<template>
    <div class="commentHeader">
        <h4 >댓글 {{ commentNum }}</h4>
    </div>
    <CommentItem
        v-for="comment in nestedComments"
        :key="comment.id"
        :comment="comment"
        :depth="0"
    />
</template>

<script setup>
    import { ref, computed } from 'vue';
    import CommentItem from './CommentItem.vue'; // 재귀 컴포넌트 import
    import commentList from '@/json/comment_list.json';
    import postMember from '@/json/post_member.json';

    const commentData = ref(commentList);
    const memberList = ref(postMember);

    const props = defineProps({
        postId: String
    });
    
    const showableComments = computed(() => {
        const statusFilter = commentData.value.filter(comment => comment.status === 0);
        const idFilter = statusFilter.filter(comment => comment.post_id === Number(props.postId));
        return idFilter;
    });
    
    const comments = computed(() => {
        return showableComments.value.map(comment => {
            const member = memberList.value.find(m => m.id === comment.member_id);
            return {
                id: comment.id,
                root_comment_id: comment.root_comment_id,
                content: comment.content,
                upload_at: comment.upload_at,
                update_at: comment.update_at,
                nickname: member ? member.nickname : '알 수 없음'
            }
        });
    });
    
    // 계층 구조로 변환
    const nestedComments = computed(() => {
        const map = {}
        const roots = []
    
        // 댓글 ID로 매핑
        for (const comment of comments.value) {
        map[comment.id] = { ...comment, children: [] }
        }
    
        for (const comment of comments.value) {
        if (comment.root_comment_id) {
            map[comment.root_comment_id]?.children.push(map[comment.id]);
        } else {
            roots.push(map[comment.id]);
        }
        }
    
        return roots;
    })

    const commentNum = computed(() => comments.value.length);
    const emit = defineEmits(["commentNumber"]);
    emit("commentNumber", commentNum);
</script>

<style scoped>
    .commentHeader {
        border-bottom: 1px solid #d5d5d5;
        margin-bottom: 10px;
        padding-left: 10px;
    }
</style>