
<script setup lang="ts">

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from "@/components/HelloWorld.vue";
import { useLink } from "vue-router";
const { route, href, isActive, isExactActive, navigate } = useLink({ to: "/" });
// console.log(route, href, isActive, isExactActive, navigate );
</script>

<template>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <RouterView />
    <!-- <router-link
        to="/home"
        custom
        v-slot="{ navigate, href, route, Component }"
    >
        <span @click="navigate">{{ href }}</span>
        <div>{{ Component }}</div>
    </router-link> -->
</template>

<style lang="scss">
#app {
}
</style>
