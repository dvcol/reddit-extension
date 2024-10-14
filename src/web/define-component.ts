export enum WebComponents {
  RedditExtension = 'wc-reddit-extension',
}

export type DefineOptions = { baseUrl?: string; view?: { option?: boolean; popup?: boolean; web?: boolean } };
export type DefineComponent = (options?: DefineOptions, component?: WebComponents) => Promise<CustomElementConstructor>;

export const defineComponent: DefineComponent = async (options = {}, component = WebComponents.RedditExtension) => {
  if (customElements.get(component)) {
    console.warn(`Custom element '${component}' is already defined.`);
  } else {
    const [{ createWc }] = await Promise.all([import('./create-wc')]);
    customElements.define(component, createWc(options));
  }
  return customElements.whenDefined(component);
};

export default defineComponent;
