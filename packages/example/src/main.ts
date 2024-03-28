import Colorful from "@seven/vue-colorful";
import { createApp } from "vue";

import App from "./App.vue";
import "./style.css";

const app = createApp(App);
app.use(Colorful);
app.mount("#app");
