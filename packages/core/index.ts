import type { Plugin } from "vue";

import ColorAngle from "./src/components/ColorAngle.vue";
import ColorGradient from "./src/components/ColorGradient.vue";
import Colorful from "./src/components/Colorful.vue";

const plugin: Plugin = {
  install(app) {
    app.component("VueColorful", Colorful);
    app.component("VueColorGradient", ColorGradient);
    app.component("VueColorAngle", ColorAngle);
  },
};

export default plugin;
