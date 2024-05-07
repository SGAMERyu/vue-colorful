import type { Plugin } from "vue";

import ColorGradient from "./src/components/ColorGradient.vue";
import Colorful from "./src/components/Colorful.vue";

const plugin: Plugin = {
  install(app) {
    app.component("VueColorful", Colorful);
    app.component("VueColorGradient", ColorGradient);
  },
};

export default plugin;
