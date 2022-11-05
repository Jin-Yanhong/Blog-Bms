import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { dateFormatter, getDate, bitToMbit } from '@/utils';

import 'element-plus/dist/index.css';
import 'normalize.css';
import './style/global.scss';

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$dateFormatter = dateFormatter;
app.config.globalProperties.$getDate = getDate;
app.config.globalProperties.$bitToMbit = bitToMbit;

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');
