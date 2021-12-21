import { createApp } from 'vue'
import { store } from '@/store/index'
import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import { ElButton } from 'element-plus'
// import { PhoneInput } from '@/components/PhoneInput/index.vue';
import { setupRouter } from '@/router';

function bootstrap() {

    const app = createApp(App);
    app.use(ElButton);

    // setupStore(app)
    app.use(store)
    setupRouter(app);
    // app.use(PhoneInput);


    app.mount('#app');

    console.log(app)

}

bootstrap();