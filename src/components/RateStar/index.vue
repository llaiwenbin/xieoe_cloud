<template>
    <input type="number" max="5" min="0" v-model="rate" />
    <RateStar :value="rate" @updateRate="updateRate" #noDefault="{ value }"
        >测试+<a>{{ value }}</a></RateStar
    > 
    <RateStar :value="(rate + 1) % 5" theme="green"></RateStar>
    <RateStar :value="(rate + 2) % 5" theme="yellow"></RateStar>
    <RateStar :value="(rate + 3) % 5" theme="blue"></RateStar>
    <RateStar :value="(rate + 4) % 5" theme="red"></RateStar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import RateStar from "./RateStar.vue";
const rate = ref(0);
// setInterval(() => {
//     rate.value = Math.floor(Math.random() * 5);
// }, 50);
function updateRate(value) {
    rate.value = value;
}
</script> 