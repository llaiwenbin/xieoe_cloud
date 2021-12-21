import { ref, reactive, computed, onMounted } from "vue";
export default function useTodoList() {
    let title = ref("");
    let todoList: ITodoItem[] = reactive([]);

    interface ITodoItem {
        title: string;
        done: boolean;
    }

    const checkCount = computed(() => todoList.filter((res) => res.done).length);
    const allCount = computed(() => todoList.length);

    const isCheckAll = computed({
        get: function () {
            return checkCount == allCount;
        },
        set: function (value: boolean) {
            todoList.forEach((res) => {
                res.done = value;
            });
        },
    });

    function clearList() {
        // todoList.length = 0;
        todoList.splice(0, todoList.length);
    }
    function toggleChoise() {
        todoList.forEach((res) => {
            res.done = !res.done;
        });
    }

    function addTodo() {
        let todoItem: ITodoItem = {
            title: title.value,
            done: false,
        };
        todoList.push(todoItem);
        title.value = "";
    }
    onMounted(() => {
        console.log('todoList');

    })
    return {
        title,
        todoList,

        checkCount,
        allCount,
        isCheckAll,

        clearList,
        toggleChoise,
        addTodo
    }
}
