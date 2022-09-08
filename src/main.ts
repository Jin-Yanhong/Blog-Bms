import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import { isExternal } from "@/utils/validate";

import "normalize.css";
import "element-plus/dist/index.css";
import "./style/global.scss";

const app = createApp(App);

app.config.globalProperties.isExternal = isExternal;

app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
