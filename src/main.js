import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
// import DOMPurify

import './assets/styles/main.css';

const app = createApp(App)
app.use(router)

app.config.globalProperties.$filter()
app.mount('#app')
