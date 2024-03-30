import Colorful from "@seven/vue-colorful";
// main.ts
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import { createApp } from "vue";

import App from "./App.vue";

const app = createApp(App);
app.use(Colorful);
app.mount("#app");
