// import type { App } from 'vue'
import { createStore } from 'vuex'

export const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        add(state: any) {
            state.count++
        }
    }
})

// config router
// export function setupStore(app: App<Element>) {
//     app.use(store);
// }