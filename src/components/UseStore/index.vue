<template>
    <h1 @click="add">{{ count }}</h1>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore();
const count = computed(() => store.state.count);
function add() {
    store.commit("add");
}
</script>