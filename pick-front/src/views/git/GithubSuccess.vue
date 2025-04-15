<template>
    <div class="success-container">
        <v-card class="pa-6 ma-auto text-center" width="400">
            <v-icon size="48" color="success">mdi-check-circle</v-icon>
            <h2 class="mt-3">GitHub 연동 완료!</h2>
            <p>계정이 성공적으로 연결되었습니다.</p>
            <v-btn color="primary" class="mt-4" @click="goToMemberInfo">내 정보로 이동</v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    methods: {
        // 🚩 우선 임시로 데이터 넘기기 (백에서 조회해서 가져와야 함)
        goToMemberInfo() {
            this.$router.push({
                path: '/member/info',
                query: {
                    profileImage: 'https://avatars.githubusercontent.com/u/106304305?v=4',
                    name: 'Gombo2',
                    githubLink: 'https://github.com/Gombo2',
                    githubId: 'Gombo2'
                }
            });
        }
    }
};
</script>

<style scoped>
.success-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>