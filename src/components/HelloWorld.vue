<template>
    <div>姓名：{{ person.name }}</div>
    <div>年龄：{{ person.age }}</div>
    <div>性别：{{ person.sex }}</div>
    <div>性别：{{ person.info.like }}</div>
    <button @click="update">更新</button>
</template>
<script lang="ts" setup>

import { reactive, ref } from "vue";

interface IPerson {
    name: string;
    age: string | number;
    sex: string;
    info: any;
}
const person1 = {
    name: "小白",
    age: 18,
    sex: "男",
    info: {
        like: "what",
    },
};
const a = reactive([]);
let year = ref<string | number>()

const person = reactive<IPerson>(person1);

function update() {
    person.name = "--";
    person.info.like = "啥都搞";
}
</script>
