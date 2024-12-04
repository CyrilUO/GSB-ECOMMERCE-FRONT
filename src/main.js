import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";

import './assets/styles/main.css';

import axios from "axios";

const app = createApp(App)


app.use(router)



app.mount('#app')
