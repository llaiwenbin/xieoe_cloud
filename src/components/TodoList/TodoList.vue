<template>
    <div class="todoList" ref="todoListRef">
        <h3>todoList</h3>
        <div>
            <input type="text" v-model="title" @keydown.enter="addTodo" />
            <button @click="addTodo">添加</button>
            <button @click="clearList">清除</button>
            <button @click="toggleChoise">反选</button>
        </div>
        <ul v-if="todoList.length">
            <li v-for="todo in todoList">
                <input type="checkbox" v-model="todo.done" />
                <span>{{ todo.title }}</span>
            </li>
        </ul>
        <div v-else>暂无数据</div>
        <div>{{ checkCount }}/{{ allCount }}</div>
        <div>
            全选：
            <input type="checkbox" v-model="isCheckAll" aria-label="全选" />
        </div>
    </div>
    <div class="addCount" ref="addCountRef">
        <h3>累加器</h3>
        <h5 @click="add">{{ count }}</h5>
    </div>
    <div class="getMouse" ref="getMouseRef">
        <h3>鼠标</h3>
        <div>mouseX:{{ mouseX }},mouseY:{{ mouseY }}</div>
    </div>
    <!-- <div>isProps:{{ isProps || "--" }}</div> -->
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import useMouse from "./hooks/useMouse";
import useTodoList from "./hooks/useTodoList";

// const defineProps({
//     isProps: String,
// });

// 累加器逻辑
let count = ref(1);
function add() {
    count.value++;
}

let { mouseX, mouseY } = useMouse();

// todoList逻辑
let {
    title,
    todoList,
    checkCount,
    allCount,
    isCheckAll,
    clearList,
    toggleChoise,
    addTodo,
} = useTodoList();

const getMouseRef = ref(null);
const addCountRef = ref(null);
const todoListRef = ref(null);

onMounted(() => {
    console.log(getMouseRef.value, addCountRef.value, todoListRef.value);
});
// console.log(getMouseRef.value, addCountRef.value, todoListRef.value);
</script>