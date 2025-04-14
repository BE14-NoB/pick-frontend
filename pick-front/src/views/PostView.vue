<template>
    <main>
        <nav>
            <br><br><br>
        </nav>
        <section>
            <aside class="left">
                <SideBar/>
            </aside>
            <article id="postView">
                <RouterView/>
            </article>
        </section>
    </main>
</template>

<script setup>
    import SideBar from '@/components/post/SideBar.vue';
    import {RouterView} from 'vue-router';
</script>

<style scoped>
    aside.left {
        float: left;
        margin-left: 40px;
    }
    #postView {
        margin-left: 330px;
        margin-right: 200px;
    }
</style>
