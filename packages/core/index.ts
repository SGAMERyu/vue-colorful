import type { Plugin } from "vue";

import Colorful from "./src/components/Colorful.vue";

const plugin: Plugin = {
  install(app) {
    app.component("VueColorful", Colorful);
  },
};

export default plugin;
