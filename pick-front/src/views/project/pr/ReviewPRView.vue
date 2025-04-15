<template>
    <section class="page-wrapper">
        <BranchSelector v-model:selectedBranch="selectedBranch" />
        <ProjectTabs v-if="selectedBranch" v-model="selectedTab" :tabs="tabList">
            <template #commit>
                <PRCommitList :base-branch="'main'" :selected-repo="'Pick'"
                    :selected-owner="'BE14-NoB'" :selected-branch="selectedBranch" />
            </template>

            <template #file>
                <FileChanges @click-create-pr="goToCreatePR" :selected-branch="selectedBranch" />
            </template>
        </ProjectTabs>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ProjectTabs from '@/components/project/ProjectTabs.vue'
import BranchSelector from '@/components/project/pr/PRBranchSelector.vue'
import PRCommitList from '@/components/project/pr/PRCommitList.vue'
import FileChanges from '@/components/project/pr/PRFileChanges.vue'

const router = useRouter()

const tabList = [
    { label: '커밋', value: 'commit', icon: 'mdi-source-commit' },
    { label: '파일 변경', value: 'file', icon: 'mdi-file-document-edit' },
]
const selectedTab = ref('commit')

const selectedBranch = ref(null)

function goToCreatePR() {
    router.push({
        path: '/project/create-pull-request',
        query: { branch: selectedBranch.value }
    })
}

</script>

<style scoped>
.page-wrapper {
    width: 100%;
    padding: 0px;
    margin-top: 20px;
    max-width: 1100px;
}

.form-layout {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 30px;
    gap: 2rem;
}

.form-left {
    flex: 2;
}

.form-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 1.8rem;
    margin-left: 50px;
    min-width: 80px;
    max-width: 280px;
}
</style>