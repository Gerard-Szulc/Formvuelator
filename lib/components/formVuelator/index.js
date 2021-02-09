import FormVuelator from "./FormVuelator.vue";

import { registerComponent } from "./../../utils/plugins/index";

const Plugin = {
    install(vue) {
        registerComponent(vue, FormVuelator);
    }
};

export default Plugin;

export { FormVuelator };
