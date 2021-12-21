import { ref, onMounted, onUnmounted } from 'vue'
export default function useMouse() {
    const mouseX = ref(0)
    const mouseY = ref(0)

    function update(event: MouseEvent): void {
        mouseX.value = event.pageX
        mouseY.value = event.pageY
    }

    // 挂载
    onMounted(() => {
        console.log("mouse");
        document.addEventListener('mousemove', update)
    })
    // vue2 的 destory
    onUnmounted(() => {
        document.removeEventListener('mousemove', update);
    })
    return {
        mouseX,
        mouseY
    }
}