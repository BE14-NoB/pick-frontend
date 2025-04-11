<template>
    <main>
        <nav>
            <br><br><br>
        </nav>
        <section>
            <aside class="left">
                <SideBar/>
            </aside>
            <RouterView/>
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
        margin-right: 30px;
    }
</style>
