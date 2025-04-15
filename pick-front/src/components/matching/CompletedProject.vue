<template>
    <div class="completed-project">
        <h2 class=page-title>참여완료 프로젝트</h2>
        <section class="projects-section">
            <v-row>
                <v-col v-for="(project, index) in recentProjects" :key="index" cols="12" sm="6" md="4">
                <ProjectCard
                    :id="project.id"
                    :title="project.title"
                    :subtitle="project.subtitle"
                    :img-src="project.image"
                    :mainCategory="project.mainCategory"
                    :subCategory="project.subCategory"
                />
                </v-col>
            </v-row>
        </section>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import ProjectCard from '@/components/common/ProjectCard.vue';
    import projectsData from '@/json/projects.json';

    // 동적 이미지 로드
    const images = import.meta.glob('@/assets/member/*.png', { eager: true });
    const imageMap = Object.fromEntries(
        Object.entries(images).map(([path, module]) => {
            const fileName = path.split('/').pop();
            return [`/assets/member/${fileName}`, module.default];
        })
    );
    // JSON 데이터를 반응형으로 사용, 이미지 매핑 적용
    const recentProjects = ref(
        projectsData.map(project => ({
            ...project,
            image: imageMap[project.image] || project.image, // 동적 이미지 또는 원본 경로
        }))
    );
</script>
  
<style scoped>
  .completed-project {
    padding: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .page-title {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 25px;
    color: #000;
    margin-bottom: 30px;
  }

</style> 