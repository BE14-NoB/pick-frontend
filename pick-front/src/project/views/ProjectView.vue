<template>
    <div class="app-container">
        <!-- 헤더 -->
        <header class="header">
            <div class="logo">PICK🔑</div>
            <nav class="nav">
                <a href="#">프로젝트 매칭</a>
                <a href="#">전체 프로젝트</a>
                <a href="#">게시판</a>
                <a href="#">뱃지</a>
                <img class="profile-img" src="https://i.imgur.com/1X3f3xz.png" alt="profile" />
            </nav>
        </header>

        <!-- 바디 -->
        <div class="body">
            <!-- 사이드바 -->
            <aside class="sidebar">
                <ul>
                    <li class="active">대시보드</li>
                    <li>프로젝트 정보</li>
                    <li>회의록</li>
                    <li>팀원</li>
                    <li>프로젝트 후기</li>
                    <li>이슈</li>
                </ul>

                <div class="sidebar-bottom">
                    <div>PR ? 풀 리퀘스트 ?</div>
                    <div>커밋 히스토리</div>
                </div>
            </aside>

            <!-- 본문 -->
            <main class="main-content">
                <h1 class="page-title">페이지 제목</h1>
                <p class="page-subtitle">페이지 세부 내용</p>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectView',
}
</script>

<style scoped>
/* 전체 구조 */
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Pretendard', sans-serif;
}

/* 헤더 */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    height: 64px;
    border-bottom: 1px solid #e5e7eb;
}

.logo {
    font-weight: bold;
    font-size: 20px;
}

.nav {
    display: flex;
    align-items: center;
    gap: 24px;
}

.nav a {
    text-decoration: none;
    color: #333;
    font-size: 14px;
}

.profile-img {
    width: 32px;
    height: 32px;
    border-radius: 9999px;
}

/* 바디 영역 */
.body {
    display: flex;
    flex: 1;
}

/* 사이드바 */
.sidebar {
    width: 220px;
    border-right: 1px solid #e5e7eb;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar li {
    padding: 12px 24px;
    cursor: pointer;
}

.sidebar li:hover {
    background-color: #f3f4f6;
}

.sidebar li.active {
    background-color: #f3f4f6;
    font-weight: bold;
}

.sidebar-bottom {
    font-size: 12px;
    color: #666;
    padding: 16px 24px;
    border-top: 1px solid #e5e7eb;
}

/* 메인 콘텐츠 */
.main-content {
    flex: 1;
    padding: 40px;
}

.page-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
}

.page-subtitle {
    font-size: 14px;
    color: #666;
}
</style>