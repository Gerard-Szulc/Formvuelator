import FormVuelator from "./FormVuelator.vue";

export const registerComponent = (instance: any, component: any) => {
    instance.component(component.name, component)
}
const Plugin = {
    install(vue: any) {
        registerComponent(vue, FormVuelator);
    }
};

export default Plugin;

export { FormVuelator };
