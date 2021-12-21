<template>
    <div :style="fontstyle" @click="updateRate">{{ rate }}</div>
    <slot name="noDefault" value="我是内部传出来的"></slot>
</template>

<script lang="ts" setup>
import { computed } from "vue";
// import { Theme } from './enum'
let props = defineProps({
    value: Number,
    theme: {
        type: String,
        default: "orange",
    },
});

let emits = defineEmits(["updateRate"]);

let rate = computed(() =>
    "★★★★★☆☆☆☆☆".slice(
        5 - (props.value as number),
        10 - (props.value as number)
    )
);
const Theme: any = {
    black: "#000",
    white: "#fff",
    red: "#f5222d",
    orange: "#fa541c",
    yellow: "#fadb14",
    green: "#73d13d",
    blue: "#40a9ff",
};
const fontstyle = computed(() => {
    return `color:${Theme[props.theme] || Theme.black}`;
});
function updateRate() {
    emits("updateRate", Math.floor(Math.random() * 5));
}
</script>